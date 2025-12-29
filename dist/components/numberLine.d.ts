export interface NumberLineMark {
    value: number;
    label?: string;
    color?: string;
}
export interface NumberLineConfig {
    min: number;
    max: number;
    marks?: NumberLineMark[];
    highlight?: {
        start: number;
        end: number;
        color?: string;
        label?: string;
    };
}
export declare class NumberLine {
    private x;
    private y;
    private width;
    constructor(x: number, y: number, width: number);
    render(ctx: CanvasRenderingContext2D, config: NumberLineConfig): void;
    private valueToX;
}
//# sourceMappingURL=numberLine.d.ts.map