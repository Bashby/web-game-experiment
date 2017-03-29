import {interaction, SystemRenderer} from "pixi.js";
import Mousetrap = require("mousetrap");

export class InputManager {
    private _manager_touch: interaction.InteractionManager
    private _manager_keyboard: MousetrapStatic;

    constructor(renderer: SystemRenderer) {
        this._manager_touch = new interaction.InteractionManager(renderer);
        this._manager_keyboard = Mousetrap;
    }

    update(): void {

    }
}