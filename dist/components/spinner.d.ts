export interface SpinnerSlice {
    label: string;
    weight: number;
    color: string;
}
export declare class ProbabilitySpinner {
    private slices;
    private angle;
    constructor(slices: SpinnerSlice[]);
    spin(random: () => number): SpinnerSlice;
    render(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number): void;
}
//# sourceMappingURL=spinner.d.ts.map