import { FractionCompareLevel } from "./fractionCompare.js";
import { ProbabilityGarden } from "./probabilityGarden.js";
import { RationalRealm } from "./rationalRealm.js";
export function createWorlds() {
    return [
        {
            id: "fractions",
            title: "Bead Grove",
            description: "Concrete beads make fractions feel countable before we fade to bars.",
            levels: [new FractionCompareLevel()],
        },
        {
            id: "chance",
            title: "Chance Meadow",
            description: "Spin, draw, and roll to see probability settle through repetition.",
            levels: [new ProbabilityGarden()],
        },
        {
            id: "rationality",
            title: "Rational Realm",
            description: "See where rational numbers land cleanly and irrationals stretch forever.",
            levels: [new RationalRealm()],
        },
    ];
}
//# sourceMappingURL=worldRegistry.js.map