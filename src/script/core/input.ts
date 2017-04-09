import {interaction, SystemRenderer} from "pixi.js";
import {Mouse, MouseConstraint} from "matter-js";
import Mousetrap = require("mousetrap");

export class InputManager {
    private _manager_touch: interaction.InteractionManager;
    private _manager_keyboard: MousetrapStatic;
    debug_mouse: Mouse;

    constructor(renderer: SystemRenderer, debug_renderer: SystemRenderer) {
        this._manager_touch = new interaction.InteractionManager(renderer);
        this._manager_keyboard = Mousetrap; // keyboard events
        this.debug_mouse = Mouse.create(debug_renderer.view);
    }

    update(): void {}
}