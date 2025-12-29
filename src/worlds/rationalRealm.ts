import { FractionBar } from "../components/fractionBar.js";
import { NumberLine } from "../components/numberLine.js";
import { Level, LevelContext } from "../core/types.js";

export class RationalRealm implements Level {
  id = "rational-irrational";
  title = "Rational Realm: Finite vs Endless";
  world = "rationality";
  description =
    "See how rational numbers land neatly while √2 and π keep stretching. No beads can finish them.";

  private ctx!: LevelContext;
  private showSqrt = false;
  private showPi = false;
  private showRepeating = false;
  private complete = false;

  private line = new NumberLine(80, 260, 800);
  private fractionBar = new FractionBar(120, 140, 240, 40);

  onEnter(context: LevelContext) {
    this.ctx = context;
    this.complete = false;
    this.showSqrt = false;
    this.showPi = false;
    this.showRepeating = false;

    context.ui.setControls([
      { label: "Highlight √2 on the line", onClick: () => this.toggleSqrt() },
      { label: "Highlight π on the line", onClick: () => this.togglePi() },
      {
        label: "Show repeating decimal 1/3",
        onClick: () => this.toggleRepeating(),
        variant: "secondary",
      },
      {
        label: "Capture my insight",
        onClick: () => this.capture(),
        variant: "secondary",
      },
    ]);
    context.ui.setFeedback(
      "Rational numbers can be completed with beads or bars. Irrational numbers stretch forever.",
    );
  }

  update(): void {
    // No continuous updates required.
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.fillStyle = "#fdf6ec";
    ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    ctx.fillStyle = "#1e2a3a";
    ctx.font = "18px Nunito, sans-serif";
    ctx.fillText("Rational numbers land exactly on the line.", 80, 80);
    ctx.fillText("Irrational numbers keep going; we can only approximate.", 80, 108);

    this.fractionBar.render(ctx, 1 / 3, "1/3 = 0.333… repeating forever");

    const marks = [
      { value: 1, label: "1", color: "#1e2a3a" },
      { value: 1.5, label: "1.5", color: "#1e2a3a" },
      { value: 2, label: "2", color: "#1e2a3a" },
      { value: 3, label: "3", color: "#1e2a3a" },
    ];

    const highlightSqrt = this.showSqrt
      ? { start: Math.SQRT2, end: Math.SQRT2, color: "#3a6ea5", label: "√2 ≈ 1.414..." }
      : undefined;
    const highlightPi = this.showPi
      ? { start: Math.PI, end: Math.PI, color: "#f08c7d", label: "π ≈ 3.141..." }
      : undefined;

    this.line.render(ctx, {
      min: 0,
      max: 4,
      marks,
      highlight: highlightSqrt ?? highlightPi,
    });

    if (highlightSqrt && highlightPi) {
      this.line.render(ctx, {
        min: 0,
        max: 4,
        marks,
        highlight: { start: Math.SQRT2, end: Math.PI, color: "rgba(255,209,102,0.35)", label: "Irrational gap" },
      });
    }

    ctx.fillStyle = "#1e2a3a";
    ctx.font = "16px Nunito, sans-serif";
    ctx.fillText(
      "Beads can model 1/3 or 3/4 because they finish. They cannot finish √2 or π.",
      80,
      320,
    );
    ctx.restore();
  }

  isComplete(): boolean {
    return this.complete;
  }

  private toggleSqrt() {
    this.showSqrt = true;
    this.ctx.ui.setFeedback("√2 is the diagonal of a unit square. It never ends as a decimal.");
  }

  private togglePi() {
    this.showPi = true;
    this.ctx.ui.setFeedback("π measures a circle's perimeter vs diameter. Also never ending.");
  }

  private toggleRepeating() {
    this.showRepeating = true;
    this.ctx.ui.setFeedback("Repeating decimals like 0.333… are rational because they loop.", "info");
  }

  private capture() {
    if (this.showPi && this.showSqrt && this.showRepeating) {
      this.complete = true;
      this.ctx.ui.setFeedback("Insight saved: rational numbers end or repeat; irrationals do not.", "success");
    } else {
      this.ctx.ui.setFeedback("Toggle each highlight first so you can compare them closely.", "warn");
    }
  }
}
