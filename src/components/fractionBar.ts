export class FractionBar {
  constructor(
    private x: number,
    private y: number,
    private width: number,
    private height: number,
  ) {}

  render(ctx: CanvasRenderingContext2D, value: number, label: string) {
    const clamped = Math.max(0, Math.min(1, value));
    ctx.save();
    ctx.strokeStyle = "#1e2a3a";
    ctx.lineWidth = 2;
    ctx.fillStyle = "#d8e8ff";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = "#3a6ea5";
    ctx.fillRect(this.x, this.y, this.width * clamped, this.height);

    ctx.fillStyle = "#1e2a3a";
    ctx.font = "16px Nunito, sans-serif";
    ctx.fillText(label, this.x, this.y - 8);
    ctx.restore();
  }
}
