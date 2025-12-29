export class NumberLine {
    constructor(x, y, width) {
        this.x = x;
        this.y = y;
        this.width = width;
    }
    render(ctx, config) {
        const { min, max, marks = [], highlight } = config;
        ctx.save();
        ctx.strokeStyle = "#1e2a3a";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.stroke();
        ctx.fillStyle = "#1e2a3a";
        ctx.font = "14px Nunito, sans-serif";
        if (highlight) {
            const startX = this.valueToX(highlight.start, min, max);
            const endX = this.valueToX(highlight.end, min, max);
            const width = Math.max(4, Math.abs(endX - startX));
            const left = Math.min(startX, endX);
            ctx.fillStyle = highlight.color ?? "rgba(58, 110, 165, 0.2)";
            ctx.fillRect(left, this.y - 12, width, 24);
            if (highlight.label) {
                ctx.fillStyle = "#1e2a3a";
                ctx.fillText(highlight.label, left + 4, this.y - 16);
            }
        }
        marks.forEach((mark) => {
            const tickX = this.valueToX(mark.value, min, max);
            ctx.strokeStyle = mark.color ?? "#1e2a3a";
            ctx.beginPath();
            ctx.moveTo(tickX, this.y - 10);
            ctx.lineTo(tickX, this.y + 10);
            ctx.stroke();
            if (mark.label) {
                ctx.fillStyle = mark.color ?? "#1e2a3a";
                ctx.fillText(mark.label, tickX - 8, this.y + 26);
            }
        });
        ctx.restore();
    }
    valueToX(value, min, max) {
        const t = (value - min) / (max - min);
        return this.x + t * this.width;
    }
}
//# sourceMappingURL=numberLine.js.map