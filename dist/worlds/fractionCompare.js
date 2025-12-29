import { BeadBag } from "../components/beadBag.js";
import { FractionBar } from "../components/fractionBar.js";
const targetAFraction = 0.75;
const targetBFraction = 2 / 3;
export class FractionCompareLevel {
    constructor() {
        this.id = "fraction-compare";
        this.title = "Bead Grove: Compare Fractions";
        this.world = "fractions";
        this.description = "Use bead scoops to feel which fraction is greater. Notice the part–whole relationship.";
        this.bagA = new BeadBag([
            ...Array.from({ length: 9 }, () => ({ color: "#3a6ea5", label: "A" })),
            ...Array.from({ length: 3 }, () => ({ color: "#f08c7d", label: "A" })),
        ]);
        this.bagB = new BeadBag([
            ...Array.from({ length: 8 }, () => ({ color: "#3a6ea5", label: "B" })),
            ...Array.from({ length: 4 }, () => ({ color: "#f08c7d", label: "B" })),
        ]);
        this.drawsA = 0;
        this.drawsB = 0;
        this.blueA = 0;
        this.blueB = 0;
        this.ready = false;
        this.complete = false;
        this.barA = new FractionBar(420, 140, 240, 36);
        this.barB = new FractionBar(420, 220, 240, 36);
    }
    onEnter(context) {
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
        context.ui.setFeedback("Scoop beads to fill each bar. The bar fills only with blue beads, just like counting shaded parts.");
    }
    update() {
        this.ready = this.drawsA > 0 && this.drawsB > 0;
    }
    render(ctx) {
        ctx.save();
        ctx.fillStyle = "#eef3ff";
        ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        ctx.fillStyle = "#1e2a3a";
        ctx.font = "18px Nunito, sans-serif";
        ctx.fillText("Fraction A target: 3/4", 420, 120);
        ctx.fillText("Fraction B target: 2/3", 420, 200);
        this.barA.render(ctx, targetAFraction, "Target bar A");
        this.barA.render(ctx, this.observedA(), "Observed A");
        this.barB.render(ctx, targetBFraction, "Target bar B");
        this.barB.render(ctx, this.observedB(), "Observed B");
        ctx.font = "16px Nunito, sans-serif";
        ctx.fillText(`Draws: ${this.drawsA} | Blue: ${this.blueA}`, 420, 190);
        ctx.fillText(`Draws: ${this.drawsB} | Blue: ${this.blueB}`, 420, 270);
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
    isComplete() {
        return this.complete;
    }
    scoopA() {
        const drawn = this.bagA.draw(4, this.ctx.random);
        this.drawsA += drawn.length;
        this.blueA += drawn.filter((b) => b.color === "#3a6ea5").length;
        this.ctx.ui.setFeedback(`You scooped ${drawn.length} beads for A. Blue parts show the shaded fraction.`);
    }
    scoopB() {
        const drawn = this.bagB.draw(4, this.ctx.random);
        this.drawsB += drawn.length;
        this.blueB += drawn.filter((b) => b.color === "#3a6ea5").length;
        this.ctx.ui.setFeedback(`You scooped ${drawn.length} beads for B. Notice how many are shaded.`);
    }
    check() {
        if (!this.ready) {
            this.ctx.ui.setFeedback("Scoop from both bags first so you can compare.", "warn");
            return;
        }
        const larger = this.observedA() > this.observedB() ? "A" : "B";
        this.ctx.ui.setFeedback(`Your scoops suggest Fraction ${larger} is larger. The target was that A (3/4) is greater than B (2/3).`, "success");
        this.complete = true;
    }
    observedA() {
        return this.drawsA === 0 ? 0 : this.blueA / this.drawsA;
    }
    observedB() {
        return this.drawsB === 0 ? 0 : this.blueB / this.drawsB;
    }
    reset() {
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
//# sourceMappingURL=fractionCompare.js.map