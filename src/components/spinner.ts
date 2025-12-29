export interface SpinnerSlice {
  label: string;
  weight: number;
  color: string;
}

export class ProbabilitySpinner {
  private angle = 0;

  constructor(private slices: SpinnerSlice[]) {}

  spin(random: () => number) {
    const total = this.slices.reduce((acc, s) => acc + s.weight, 0);
    const pick = random() * total;
    let cumulative = 0;
    let result = this.slices[0];
    for (const slice of this.slices) {
      cumulative += slice.weight;
      if (pick <= cumulative) {
        result = slice;
        break;
      }
    }
    this.angle = random() * Math.PI * 2;
    return result;
  }

  render(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
    const total = this.slices.reduce((acc, s) => acc + s.weight, 0);
    let start = -Math.PI / 2 + this.angle;
    this.slices.forEach((slice) => {
      const sweep = (slice.weight / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x, y, radius, start, start + sweep);
      ctx.closePath();
      ctx.fillStyle = slice.color;
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();

      const mid = start + sweep / 2;
      ctx.fillStyle = "#1e2a3a";
      ctx.font = "14px Nunito, sans-serif";
      ctx.fillText(slice.label, x + Math.cos(mid) * (radius * 0.6), y + Math.sin(mid) * (radius * 0.6));

      start += sweep;
    });

    ctx.fillStyle = "#1e2a3a";
    ctx.beginPath();
    ctx.moveTo(x + radius + 10, y);
    ctx.lineTo(x + radius + 30, y - 10);
    ctx.lineTo(x + radius + 30, y + 10);
    ctx.closePath();
    ctx.fill();
  }
}
