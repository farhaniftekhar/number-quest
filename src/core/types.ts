export type Tone = "info" | "success" | "warn";

export interface ControlSpec {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  ariaLabel?: string;
}

export interface UIHooks {
  setControls: (controls: ControlSpec[]) => void;
  setFeedback: (message: string, tone?: Tone) => void;
  setProgress: (message: string) => void;
  setWorldInfo: (title: string, description: string) => void;
  setLevelInfo: (title: string, description: string) => void;
}

export interface LevelContext {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  ui: UIHooks;
  progress: ProgressStore;
  random: () => number;
}

export interface Level {
  id: string;
  title: string;
  world: string;
  description: string;
  onEnter: (context: LevelContext) => void;
  update: (delta: number) => void;
  render: (ctx: CanvasRenderingContext2D) => void;
  onExit?: () => void;
  isComplete: () => boolean;
}

export interface World {
  id: string;
  title: string;
  description: string;
  levels: Level[];
}

export interface ProgressSnapshot {
  unlockedLevelIds: string[];
  lastLevelId?: string;
}

export interface ProgressStore {
  unlockLevel: (levelId: string) => void;
  reset: () => void;
  isUnlocked: (levelId: string) => boolean;
  saveLastLevel: (levelId: string) => void;
  load: () => ProgressSnapshot;
}
