export declare class Dice {
    private sides;
    constructor(sides?: number);
    roll(random: () => number): number;
    render(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, value: number): void;
    private roundRect;
}
//# sourceMappingURL=dice.d.ts.map