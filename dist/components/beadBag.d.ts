export interface Bead {
    color: string;
    label: string;
}
export declare class BeadBag {
    private beads;
    private history;
    constructor(beads: Bead[]);
    draw(count: number, random?: () => number): Bead[];
    remaining(): number;
    reset(beads: Bead[]): void;
    render(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void;
    renderHistory(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void;
    private roundRect;
}
//# sourceMappingURL=beadBag.d.ts.map