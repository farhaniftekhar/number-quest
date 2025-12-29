import { Level, LevelContext, ProgressStore, World } from "./types.js";
import { LocalProgress } from "./persistence.js";

export class Game {
  private ctx: CanvasRenderingContext2D;
  private worlds: World[];
  private ui: LevelContext["ui"];
  private progress: ProgressStore;
  private activeLevel?: Level;
  private lastTimestamp = 0;
  private completeAnnounced = false;

  private worldIndex = 0;
  private levelIndex = 0;

  constructor(
    private canvas: HTMLCanvasElement,
    worlds: World[],
    ui: LevelContext["ui"],
    progress?: ProgressStore,
  ) {
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Canvas 2D context unavailable");
    }
    this.ctx = context;
    this.worlds = worlds;
    this.ui = ui;
    this.progress = progress ?? new LocalProgress();
  }

  start() {
    const saved = this.progress.load();
    if (saved.lastLevelId) {
      const located = this.findLevelById(saved.lastLevelId);
      if (located) {
        this.worldIndex = located.worldIndex;
        this.levelIndex = located.levelIndex;
      }
    }
    this.loadLevel();
    requestAnimationFrame((ts) => this.tick(ts));
  }

  nextLevel() {
    const flat = this.flattenLevels();
    const currentId = this.currentLevel()?.id;
    if (!currentId) return;
    const idx = flat.findIndex((entry) => entry.level.id === currentId);
    if (idx >= 0 && idx < flat.length - 1) {
      const next = flat[idx + 1];
      this.worldIndex = next.worldIndex;
      this.levelIndex = next.levelIndex;
      this.loadLevel();
    }
  }

  prevLevel() {
    const flat = this.flattenLevels();
    const currentId = this.currentLevel()?.id;
    if (!currentId) return;
    const idx = flat.findIndex((entry) => entry.level.id === currentId);
    if (idx > 0) {
      const prev = flat[idx - 1];
      this.worldIndex = prev.worldIndex;
      this.levelIndex = prev.levelIndex;
      this.loadLevel();
    }
  }

  resetProgress() {
    this.progress.reset();
    this.ui.setFeedback("Progress reset. Start exploring again!", "warn");
    this.updateProgressText();
  }

  private tick(timestamp: number) {
    const delta = this.lastTimestamp ? (timestamp - this.lastTimestamp) / 1000 : 0;
    this.lastTimestamp = timestamp;

    const level = this.activeLevel;
    if (level) {
      level.update(delta);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      level.render(this.ctx);

      if (level.isComplete() && !this.completeAnnounced) {
        this.completeAnnounced = true;
        this.progress.unlockLevel(level.id);
        this.ui.setFeedback("Level mastered! You can move to the next world when ready.", "success");
        this.updateProgressText();
      }
    }

    requestAnimationFrame((ts) => this.tick(ts));
  }

  private loadLevel() {
    const level = this.currentLevel();
    if (!level) return;
    this.completeAnnounced = false;
    this.activeLevel?.onExit?.();
    this.activeLevel = level;
    this.ui.setFeedback("Use the controls to explore. There are no penalties for trying!");
    this.progress.saveLastLevel(level.id);
    this.ui.setWorldInfo(this.currentWorld().title, this.currentWorld().description);
    this.ui.setLevelInfo(level.title, level.description);
    const context: LevelContext = {
      canvas: this.canvas,
      ctx: this.ctx,
      ui: this.ui,
      progress: this.progress,
      random: () => Math.random(),
    };
    level.onEnter(context);
    this.updateProgressText();
  }

  private updateProgressText() {
    const flat = this.flattenLevels();
    const unlocked = flat.filter((entry) => this.progress.isUnlocked(entry.level.id)).length;
    const total = flat.length;
    const currentIdx =
      flat.findIndex((entry) => entry.level.id === this.currentLevel()?.id) + 1;
    this.ui.setProgress(`Level ${currentIdx}/${total} • ${unlocked}/${total} mastered`);
  }

  private flattenLevels() {
    return this.worlds.flatMap((world, worldIndex) =>
      world.levels.map((level, levelIndex) => ({ worldIndex, levelIndex, level })),
    );
  }

  private currentWorld() {
    return this.worlds[this.worldIndex];
  }

  private currentLevel(): Level | undefined {
    return this.worlds[this.worldIndex]?.levels[this.levelIndex];
  }

  private findLevelById(levelId: string) {
    return this.flattenLevels().find((entry) => entry.level.id === levelId);
  }
}
