import { BeadBag } from "../components/beadBag.js";
import { FractionBar } from "../components/fractionBar.js";
import { Level, LevelContext } from "../core/types.js";

const targetAFraction = 0.75;
const targetBFraction = 2 / 3;

export class FractionCompareLevel implements Level {
  id = "fraction-compare";
  title = "Bead Grove: Compare Fractions";
  world = "fractions";
  description =
    "Use bead scoops to feel which fraction is greater. Notice the part–whole relationship.";

  private bagA = new BeadBag([
    ...Array.from({ length: 9 }, () => ({ color: "#3a6ea5", label: "A" })),
    ...Array.from({ length: 3 }, () => ({ color: "#f08c7d", label: "A" })),
  ]);
  private bagB = new BeadBag([
    ...Array.from({ length: 8 }, () => ({ color: "#3a6ea5", label: "B" })),
    ...Array.from({ length: 4 }, () => ({ color: "#f08c7d", label: "B" })),
  ]);

  private drawsA = 0;
  private drawsB = 0;
  private blueA = 0;
  private blueB = 0;
  private ready = false;
  private complete = false;
  private ctx!: LevelContext;
  private barATarget = new FractionBar(420, 140, 240, 36);
  private barAObserved = new FractionBar(420, 188, 240, 28);
  private barBTarget = new FractionBar(420, 250, 240, 36);
  private barBObserved = new FractionBar(420, 298, 240, 28);

  onEnter(context: LevelContext) {
    this.ctx = context;
    this.reset();
    context.ui.setControls([
      {
        label: "Scoop 4 beads for Fraction A (3/4)",
        onClick: () => this.scoopA(),
      },
      {
        label: "Scoop 4 beads for Fraction B (2/3)",
        onClick: () => this.scoopB(),
      },
      {
        label: "Which feels larger?",
        onClick: () => this.check(),
        variant: "secondary",
      },
      {
        label: "Reset bags",
        onClick: () => this.reset(),
        variant: "secondary",
      },
    ]);
    context.ui.setFeedback(
      "Scoop beads to fill each bar. The bar fills only with blue beads, just like counting shaded parts.",
    );
  }

  update(): void {
    this.ready = this.drawsA > 0 && this.drawsB > 0;
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.fillStyle = "#eef3ff";
    ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    ctx.fillStyle = "#1e2a3a";
    ctx.font = "18px Nunito, sans-serif";
    ctx.fillText("Fraction A target: 3/4", 420, 120);
    ctx.fillText("Fraction B target: 2/3", 420, 230);

    this.barATarget.render(ctx, targetAFraction, "Target bar A");
    this.barAObserved.render(ctx, this.observedA(), "Observed A");
    this.barBTarget.render(ctx, targetBFraction, "Target bar B");
    this.barBObserved.render(ctx, this.observedB(), "Observed B");

    ctx.font = "16px Nunito, sans-serif";
    ctx.fillText(`Draws: ${this.drawsA} | Blue: ${this.blueA}`, 420, 180);
    ctx.fillText(`Draws: ${this.drawsB} | Blue: ${this.blueB}`, 420, 320);

    this.bagA.render(ctx, 60, 100, 280, 140);
    this.bagB.render(ctx, 60, 280, 280, 140);
    this.bagA.renderHistory(ctx, 60, 250, 280, 80);
    this.bagB.renderHistory(ctx, 60, 430, 280, 80);

    ctx.fillStyle = "#1e2a3a";
    ctx.fillText("Blue beads = shaded parts. Scoop to feel the fraction!", 60, 80);
    ctx.restore();
  }

  onExit() {
    this.reset();
  }

  isComplete(): boolean {
    return this.complete;
  }

  private scoopA() {
    const drawn = this.bagA.draw(4, this.ctx.random);
    this.drawsA += drawn.length;
    this.blueA += drawn.filter((b) => b.color === "#3a6ea5").length;
    this.ctx.ui.setFeedback(
      `You scooped ${drawn.length} beads for A. Blue parts show the shaded fraction.`,
    );
  }

  private scoopB() {
    const drawn = this.bagB.draw(4, this.ctx.random);
    this.drawsB += drawn.length;
    this.blueB += drawn.filter((b) => b.color === "#3a6ea5").length;
    this.ctx.ui.setFeedback(
      `You scooped ${drawn.length} beads for B. Notice how many are shaded.`,
    );
  }

  private check() {
    if (!this.ready) {
      this.ctx.ui.setFeedback("Scoop from both bags first so you can compare.", "warn");
      return;
    }
    const larger = this.observedA() > this.observedB() ? "A" : "B";
    this.ctx.ui.setFeedback(
      `Your scoops suggest Fraction ${larger} is larger. The target was that A (3/4) is greater than B (2/3).`,
      "success",
    );
    this.complete = true;
  }

  private observedA() {
    return this.drawsA === 0 ? 0 : this.blueA / this.drawsA;
  }

  private observedB() {
    return this.drawsB === 0 ? 0 : this.blueB / this.drawsB;
  }

  private reset() {
    this.bagA.reset([
      ...Array.from({ length: 9 }, () => ({ color: "#3a6ea5", label: "A" })),
      ...Array.from({ length: 3 }, () => ({ color: "#f08c7d", label: "A" })),
    ]);
    this.bagB.reset([
      ...Array.from({ length: 8 }, () => ({ color: "#3a6ea5", label: "B" })),
      ...Array.from({ length: 4 }, () => ({ color: "#f08c7d", label: "B" })),
    ]);
    this.drawsA = 0;
    this.drawsB = 0;
    this.blueA = 0;
    this.blueB = 0;
    this.complete = false;
  }
}
