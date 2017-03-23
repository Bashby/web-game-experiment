// Third Party Libs
import {Container, ticker as Ticker} from "pixi.js";
import {GUI} from "dat-gui";

// Local Libs
import {Renderer} from "./utils";
import {fpsmeter} from "../utils";
import {AssetManager} from "./assets";
import {InputManager} from "./input";

export class World {
    private _renderer: Renderer;
    private _ticker: Ticker.Ticker;
    stage: Container;
    assets: AssetManager;
    input: InputManager;
    
    debug_gui: GUI;

    constructor() {
        this._renderer = new Renderer();
        this.stage = this._renderer.stage;
        this.assets = new AssetManager();
        this.input = new InputManager();
        this.debug_gui = new GUI();

        // Register Ticker
        this._ticker = Ticker.shared;
        this._ticker.autoStart = true;
        this._ticker.add(this.update, this);

        // Build a background to the world
        this.generateBackground();
    }

    private generateBackground() {
        // var background = new Graphics();  
        // background.beginFill(0x123456);  
        // background.drawRect(0, 0, r.renderer.width, r.renderer.height);  
        // background.endFill();  
        // r.stage.addChild(background);
    }

    public update() {
        fpsmeter.tickStart();

        // Render the world
        this._renderer.render();

        fpsmeter.tick();
    }
}