// Third Party Libs
import {Container, ticker} from "pixi.js";
import {GUI} from "dat-gui";

// Local Libs
import {RenderManager} from "./render";
import {AssetManager} from "./asset";
import {InputManager} from "./input";
import {PhysicsManager} from "./physic";
import {fpsmeter} from "../utils";

interface IUpdatable {
    update(delta?: number): void;
    scope(): any; // Note: This should return this for the callback function
}

interface IPhysical {
    getBody():
}

export class Game {
    private _renderer: RenderManager;
    private _ticker: ticker.Ticker;
    stage: Container;
    asset: AssetManager;
    private _input: InputManager;
    private _physics: PhysicsManager;
    debug_gui: GUI;

    constructor() {
        this._renderer = new RenderManager();
        this.stage = this._renderer.stage;
        this.asset = new AssetManager();
        this._input = new InputManager(this._renderer.pixi_renderer);
        this._ticker = new ticker.Ticker();
        this._physics = new PhysicsManager();
        this.debug_gui = new GUI();

        // Register updatables
        this.registerUpdatable(this);
        this.registerUpdatable(this._physics);
    }

    public update(): void {
        fpsmeter.tickStart();

        // Render the world
        this._renderer.render();

        fpsmeter.tick();
    }

    public scope(): Game {
        return this;
    }

    public start(): void {
        this._ticker.start();
    }

    public stop(): void {
        this._ticker.stop();
    }

    public registerUpdatable(updatee: IUpdatable): void {
        this._ticker.add(updatee.update, updatee.scope())
    }

    public add(entity: IPhysical | IUpdatable) {
        
    }
}