import { ProgressSnapshot, ProgressStore } from "./types.js";
export declare class LocalProgress implements ProgressStore {
    private snapshot;
    constructor();
    unlockLevel(levelId: string): void;
    reset(): void;
    isUnlocked(levelId: string): boolean;
    saveLastLevel(levelId: string): void;
    load(): ProgressSnapshot;
    private persist;
}
//# sourceMappingURL=persistence.d.ts.map