import { ControlSpec, Tone, UIHooks } from "../core/types.js";
export declare class UIManager implements UIHooks {
    private controlsEl;
    private feedbackEl;
    private progressEl;
    private worldTitle;
    private worldDescription;
    private levelTitle;
    private levelDescription;
    constructor();
    setControls(controls: ControlSpec[]): void;
    setFeedback(message: string, tone?: Tone): void;
    setProgress(message: string): void;
    setWorldInfo(title: string, description: string): void;
    setLevelInfo(title: string, description: string): void;
}
//# sourceMappingURL=uiManager.d.ts.map