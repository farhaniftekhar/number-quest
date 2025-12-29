import { ControlSpec, Tone, UIHooks } from "../core/types.js";

export class UIManager implements UIHooks {
  private controlsEl: HTMLElement;
  private feedbackEl: HTMLElement;
  private progressEl: HTMLElement;
  private worldTitle: HTMLElement;
  private worldDescription: HTMLElement;
  private levelTitle: HTMLElement;
  private levelDescription: HTMLElement;

  constructor() {
    const controls = document.getElementById("controls");
    const feedback = document.getElementById("feedback");
    const progress = document.getElementById("progress");
    const worldTitle = document.getElementById("world-title");
    const worldDescription = document.getElementById("world-description");
    const levelTitle = document.getElementById("level-title");
    const levelDescription = document.getElementById("level-description");

    if (
      !controls ||
      !feedback ||
      !progress ||
      !worldTitle ||
      !worldDescription ||
      !levelTitle ||
      !levelDescription
    ) {
      throw new Error("UI elements missing from DOM");
    }

    this.controlsEl = controls;
    this.feedbackEl = feedback;
    this.progressEl = progress;
    this.worldTitle = worldTitle;
    this.worldDescription = worldDescription;
    this.levelTitle = levelTitle;
    this.levelDescription = levelDescription;
  }

  setControls(controls: ControlSpec[]) {
    this.controlsEl.innerHTML = "";
    controls.forEach((control) => {
      const btn = document.createElement("button");
      btn.textContent = control.label;
      btn.className = control.variant === "secondary" ? "secondary" : "";
      if (control.disabled) {
        btn.disabled = true;
      }
      if (control.ariaLabel) {
        btn.setAttribute("aria-label", control.ariaLabel);
      }
      btn.addEventListener("click", () => control.onClick());
      this.controlsEl.appendChild(btn);
    });
  }

  setFeedback(message: string, tone: Tone = "info") {
    this.feedbackEl.textContent = message;
    this.feedbackEl.setAttribute("data-tone", tone);
  }

  setProgress(message: string) {
    this.progressEl.textContent = message;
  }

  setWorldInfo(title: string, description: string) {
    this.worldTitle.textContent = title;
    this.worldDescription.textContent = description;
  }

  setLevelInfo(title: string, description: string) {
    this.levelTitle.textContent = title;
    this.levelDescription.textContent = description;
  }
}
