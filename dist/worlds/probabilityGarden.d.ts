import { Level, LevelContext } from "../core/types.js";
export declare class ProbabilityGarden implements Level {
    id: string;
    title: string;
    world: string;
    description: string;
    private ctx;
    private bag;
    private spinner;
    private dice;
    private counts;
    private trials;
    private diceValue;
    private complete;
    onEnter(context: LevelContext): void;
    update(): void;
    render(ctx: CanvasRenderingContext2D): void;
    isComplete(): boolean;
    private draw;
    private spin;
    private rollDice;
    private reflect;
    private reset;
}
//# sourceMappingURL=probabilityGarden.d.ts.map