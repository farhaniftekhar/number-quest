import { Level, LevelContext } from "../core/types.js";
export declare class RationalRealm implements Level {
    id: string;
    title: string;
    world: string;
    description: string;
    private ctx;
    private showSqrt;
    private showPi;
    private showRepeating;
    private complete;
    private line;
    private fractionBar;
    onEnter(context: LevelContext): void;
    update(): void;
    render(ctx: CanvasRenderingContext2D): void;
    isComplete(): boolean;
    private toggleSqrt;
    private togglePi;
    private toggleRepeating;
    private capture;
}
//# sourceMappingURL=rationalRealm.d.ts.map