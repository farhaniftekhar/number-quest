const STORAGE_KEY = "number-quest-progress";
export class LocalProgress {
    constructor() {
        this.snapshot = this.load();
    }
    unlockLevel(levelId) {
        if (!this.snapshot.unlockedLevelIds.includes(levelId)) {
            this.snapshot.unlockedLevelIds.push(levelId);
            this.persist();
        }
    }
    reset() {
        this.snapshot = { unlockedLevelIds: [] };
        this.persist();
    }
    isUnlocked(levelId) {
        return this.snapshot.unlockedLevelIds.includes(levelId);
    }
    saveLastLevel(levelId) {
        this.snapshot.lastLevelId = levelId;
        this.persist();
    }
    load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                return { unlockedLevelIds: [] };
            }
            const parsed = JSON.parse(raw);
            return {
                unlockedLevelIds: parsed.unlockedLevelIds ?? [],
                lastLevelId: parsed.lastLevelId,
            };
        }
        catch {
            return { unlockedLevelIds: [] };
        }
    }
    persist() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.snapshot));
    }
}
//# sourceMappingURL=persistence.js.map