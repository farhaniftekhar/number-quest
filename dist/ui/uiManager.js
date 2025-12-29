export class UIManager {
    constructor() {
        const controls = document.getElementById("controls");
        const feedback = document.getElementById("feedback");
        const progress = document.getElementById("progress");
        const worldTitle = document.getElementById("world-title");
        const worldDescription = document.getElementById("world-description");
        const levelTitle = document.getElementById("level-title");
        const levelDescription = document.getElementById("level-description");
        if (!controls ||
            !feedback ||
            !progress ||
            !worldTitle ||
            !worldDescription ||
            !levelTitle ||
            !levelDescription) {
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
    setControls(controls) {
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
    setFeedback(message, tone = "info") {
        this.feedbackEl.textContent = message;
        this.feedbackEl.setAttribute("data-tone", tone);
    }
    setProgress(message) {
        this.progressEl.textContent = message;
    }
    setWorldInfo(title, description) {
        this.worldTitle.textContent = title;
        this.worldDescription.textContent = description;
    }
    setLevelInfo(title, description) {
        this.levelTitle.textContent = title;
        this.levelDescription.textContent = description;
    }
}
//# sourceMappingURL=uiManager.js.map