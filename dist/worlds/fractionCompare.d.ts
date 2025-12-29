import { Level, LevelContext } from "../core/types.js";
export declare class FractionCompareLevel implements Level {
    id: string;
    title: string;
    world: string;
    description: string;
    private bagA;
    private bagB;
    private drawsA;
    private drawsB;
    private blueA;
    private blueB;
    private ready;
    private complete;
    private ctx;
    private barATarget;
    private barAObserved;
    private barBTarget;
    private barBObserved;
    onEnter(context: LevelContext): void;
    update(): void;
    render(ctx: CanvasRenderingContext2D): void;
    onExit(): void;
    isComplete(): boolean;
    private scoopA;
    private scoopB;
    private check;
    private observedA;
    private observedB;
    private reset;
}
//# sourceMappingURL=fractionCompare.d.ts.map