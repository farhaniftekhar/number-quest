import { LevelContext, ProgressStore, World } from "./types.js";
export declare class Game {
    private canvas;
    private ctx;
    private worlds;
    private ui;
    private progress;
    private activeLevel?;
    private lastTimestamp;
    private completeAnnounced;
    private worldIndex;
    private levelIndex;
    constructor(canvas: HTMLCanvasElement, worlds: World[], ui: LevelContext["ui"], progress?: ProgressStore);
    start(): void;
    nextLevel(): void;
    prevLevel(): void;
    resetProgress(): void;
    private tick;
    private loadLevel;
    private updateProgressText;
    private flattenLevels;
    private currentWorld;
    private currentLevel;
    private findLevelById;
}
//# sourceMappingURL=game.d.ts.map