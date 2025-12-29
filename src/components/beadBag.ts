export interface Bead {
  color: string;
  label: string;
}

export class BeadBag {
  private static readonly DEFAULT_COLOR = "#3a6ea5";

  private beads: Bead[];
  private history: Bead[] = [];

  constructor(beads: Bead[]) {
    this.beads = [...beads];
  }

  draw(count: number, random: () => number = Math.random) {
    const drawn: Bead[] = [];
    for (let i = 0; i < count && this.beads.length > 0; i += 1) {
      const index = Math.floor(random() * this.beads.length);
      const [bead] = this.beads.splice(index, 1);
      drawn.push(bead);
      this.history.push(bead);
    }
    return drawn;
  }

  remaining() {
    return this.beads.length;
  }

  reset(beads: Bead[]) {
    this.beads = [...beads];
    this.history = [];
  }

  render(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    ctx.save();
    ctx.fillStyle = "#f5f7fb";
    ctx.strokeStyle = "#1e2a3a";
    ctx.lineWidth = 2;
    this.roundRect(ctx, x, y, width, height, 16);
    ctx.fill();
    ctx.stroke();

    const max = Math.min(this.beads.length, 40);
    for (let i = 0; i < max; i += 1) {
      const bead = this.beads[i];
      if (!bead) continue;
      const bx = x + 12 + (i % 8) * 18;
      const by = y + 16 + Math.floor(i / 8) * 18;
      ctx.fillStyle = bead?.color ?? BeadBag.DEFAULT_COLOR;
      ctx.beginPath();
      ctx.arc(bx, by, 7, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "#1e2a3a";
    ctx.font = "14px Nunito, sans-serif";
    ctx.fillText(`Beads left: ${this.beads.length}`, x + 8, y + height - 10);
    ctx.restore();
  }

  renderHistory(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    ctx.save();
    ctx.fillStyle = "rgba(58,110,165,0.08)";
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = "#1e2a3a";
    ctx.font = "14px Nunito, sans-serif";
    ctx.fillText("Recent draws", x + 8, y + 18);
    const slice = this.history.slice(-12);
    slice.forEach((bead, idx) => {
      const bx = x + 14 + (idx % 6) * 22;
      const by = y + 36 + Math.floor(idx / 6) * 24;
      ctx.fillStyle = bead.color;
      ctx.beginPath();
      ctx.arc(bx, by, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#1e2a3a";
      ctx.fillText(bead.label, bx + 10, by + 4);
    });
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
