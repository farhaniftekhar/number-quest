export class Dice {
  constructor(private sides = 6) {}

  roll(random: () => number) {
    return Math.floor(random() * this.sides) + 1;
  }

  render(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, value: number) {
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#1e2a3a";
    ctx.lineWidth = 2;
    this.roundRect(ctx, x, y, size, size, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#3a6ea5";
    ctx.font = "20px Nunito, sans-serif";
    ctx.fillText(`${value}`, x + size / 2 - 6, y + size / 2 + 6);
    ctx.restore();
  }

  private roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
  ) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
}
