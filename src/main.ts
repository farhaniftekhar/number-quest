import { Game } from "./core/game.js";
import { LocalProgress } from "./core/persistence.js";
import { createWorlds } from "./worlds/worldRegistry.js";
import { UIManager } from "./ui/uiManager.js";

function bootstrap() {
  const canvas = document.getElementById("game-canvas") as HTMLCanvasElement | null;
  if (!canvas) {
    throw new Error("Missing canvas");
  }

  const ui = new UIManager();
  const progress = new LocalProgress();
  const worlds = createWorlds();
  const game = new Game(canvas, worlds, ui, progress, Math.random);

  const nextBtn = document.getElementById("next-level");
  const prevBtn = document.getElementById("prev-level");
  const resetBtn = document.getElementById("reset-progress");

  nextBtn?.addEventListener("click", () => game.nextLevel());
  prevBtn?.addEventListener("click", () => game.prevLevel());
  resetBtn?.addEventListener("click", () => game.resetProgress());

  game.start();

  registerServiceWorker();
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // offline support is optional; ignore failures
    });
  }
}

document.addEventListener("DOMContentLoaded", bootstrap);
