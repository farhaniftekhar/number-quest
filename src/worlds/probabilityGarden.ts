import { BeadBag } from "../components/beadBag.js";
import { Dice } from "../components/dice.js";
import { ProbabilitySpinner, SpinnerSlice } from "../components/spinner.js";
import { Level, LevelContext } from "../core/types.js";

const SPINNER_SLICES: SpinnerSlice[] = [
  { label: "Blue", weight: 3, color: "#7cc4ff" },
  { label: "Coral", weight: 2, color: "#f8b4a6" },
  { label: "Sun", weight: 1, color: "#ffd166" },
];

export class ProbabilityGarden implements Level {
  id = "probability-garden";
  title = "Chance Meadow: Experimental Probability";
  world = "chance";
  description =
    "Run repeated trials with beads, spinners, and dice. Compare what happens to what you expect.";

  private ctx!: LevelContext;
  private bag = new BeadBag([
    ...Array.from({ length: 6 }, () => ({ color: "#3a6ea5", label: "Blue" })),
    ...Array.from({ length: 3 }, () => ({ color: "#f08c7d", label: "Coral" })),
    ...Array.from({ length: 1 }, () => ({ color: "#ffd166", label: "Sun" })),
  ]);
  private spinner = new ProbabilitySpinner(SPINNER_SLICES);
  private dice = new Dice();
  private counts: Record<string, number> = { Blue: 0, Coral: 0, Sun: 0 };
  private trials = 0;
  private diceValue = 1;
  private complete = false;

  onEnter(context: LevelContext) {
    this.ctx = context;
    this.reset();
    context.ui.setControls([
      { label: "Draw 1 bead", onClick: () => this.draw(1) },
      { label: "Draw 5 beads quickly", onClick: () => this.draw(5) },
      { label: "Spin the probability wheel", onClick: () => this.spin() },
      { label: "Roll the fair dice", onClick: () => this.rollDice(), variant: "secondary" },
      {
        label: "Reflect: Do results match the ratios?",
        onClick: () => this.reflect(),
        variant: "secondary",
      },
    ]);
    context.ui.setFeedback(
      "Run many trials. Experimental probability will creep toward the bead ratios (6:3:1).",
    );
  }

  update(): void {
    // No continuous updates needed.
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.fillStyle = "#f6fbff";
    ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.bag.render(ctx, 40, 120, 280, 160);
    this.bag.renderHistory(ctx, 40, 300, 280, 120);

    ctx.fillStyle = "#1e2a3a";
    ctx.font = "18px Nunito, sans-serif";
    ctx.fillText("Experimental probability board", 360, 120);
    ctx.font = "16px Nunito, sans-serif";
    ctx.fillText(`Trials run: ${this.trials}`, 360, 150);
    ctx.fillText(`Blue: ${this.counts.Blue}`, 360, 180);
    ctx.fillText(`Coral: ${this.counts.Coral}`, 360, 210);
    ctx.fillText(`Sun: ${this.counts.Sun}`, 360, 240);
    const total = Math.max(1, this.trials);
    ctx.fillText(
      `Observed ratios → Blue ${(this.counts.Blue / total).toFixed(2)}, Coral ${(this.counts.Coral / total).toFixed(2)}, Sun ${(this.counts.Sun / total).toFixed(2)}`,
      360,
      280,
    );

    this.spinner.render(ctx, 720, 220, 90);
    ctx.fillStyle = "#1e2a3a";
    ctx.fillText("Spinner shows weighted probability", 620, 340);

    this.dice.render(ctx, 640, 360, 80, this.diceValue);
    ctx.fillText("Dice are fair: every face is equally likely.", 740, 400);
    ctx.restore();
  }

  isComplete(): boolean {
    return this.complete;
  }

  private draw(count: number) {
    const drawn = this.bag.draw(count, this.ctx.random);
    drawn.forEach((bead) => {
      this.counts[bead.label] = (this.counts[bead.label] ?? 0) + 1;
      this.trials += 1;
    });
    this.ctx.ui.setFeedback(
      `You drew ${drawn.length} bead(s). More trials make the ratio settle near 6:3:1.`,
      "info",
    );
  }

  private spin() {
    const result = this.spinner.spin(this.ctx.random);
    this.ctx.ui.setFeedback(`Spinner landed on ${result.label}. It also follows the 6:3:1 ratio.`);
  }

  private rollDice() {
    this.diceValue = this.dice.roll(this.ctx.random);
    this.ctx.ui.setFeedback(`You rolled a ${this.diceValue}. Every face has the same chance.`);
  }

  private reflect() {
    if (this.trials < 10) {
      this.ctx.ui.setFeedback(
        "Try at least 10 draws. Montessori style: repetition reveals patterns.",
        "warn",
      );
      return;
    }
    this.complete = true;
    this.ctx.ui.setFeedback(
      "Great reflection! Experimental results are approaching the expected ratios.",
      "success",
    );
  }

  private reset() {
    this.bag.reset([
      ...Array.from({ length: 6 }, () => ({ color: "#3a6ea5", label: "Blue" })),
      ...Array.from({ length: 3 }, () => ({ color: "#f08c7d", label: "Coral" })),
      ...Array.from({ length: 1 }, () => ({ color: "#ffd166", label: "Sun" })),
    ]);
    this.counts = { Blue: 0, Coral: 0, Sun: 0 };
    this.trials = 0;
    this.complete = false;
  }
}
