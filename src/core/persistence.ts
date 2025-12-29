import { ProgressSnapshot, ProgressStore } from "./types.js";

const STORAGE_KEY = "number-quest-progress";

export class LocalProgress implements ProgressStore {
  private snapshot: ProgressSnapshot;

  constructor() {
    this.snapshot = this.load();
  }

  unlockLevel(levelId: string) {
    if (!this.snapshot.unlockedLevelIds.includes(levelId)) {
      this.snapshot.unlockedLevelIds.push(levelId);
      this.persist();
    }
  }

  reset() {
    this.snapshot = { unlockedLevelIds: [] };
    this.persist();
  }

  isUnlocked(levelId: string) {
    return this.snapshot.unlockedLevelIds.includes(levelId);
  }

  saveLastLevel(levelId: string) {
    this.snapshot.lastLevelId = levelId;
    this.persist();
  }

  load(): ProgressSnapshot {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return { unlockedLevelIds: [] };
      }
      const parsed = JSON.parse(raw) as ProgressSnapshot;
      return {
        unlockedLevelIds: parsed.unlockedLevelIds ?? [],
        lastLevelId: parsed.lastLevelId,
      };
    } catch {
      return { unlockedLevelIds: [] };
    }
  }

  private persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.snapshot));
  }
}
