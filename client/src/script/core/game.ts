//////////////////////
// Third Party Libs //
//////////////////////
import {ticker, settings} from "pixi.js";
import {GUI} from "dat-gui";

////////////////
// Local Libs //
////////////////
import {canRender, RenderManager} from "./render";
import {AssetManager} from "./asset";
import {InputManager} from "./input";
import {canSimulate, PhysicsManager} from "./physic";
import {NetworkManager} from "./network";
import {GameActor} from "./actor";
import {Config, IConfiguration} from "./config";
import {fpsmeter} from "../utils";


export interface IUpdatable {
    update(delta?: number): void;
    scope() : any; // Note: This should return this for the callback function
}

export class Game {
    private readonly _config: IConfiguration = Config; 
    private _ticker: ticker.Ticker;
    private _input: InputManager;
    private _network: NetworkManager;
    private _physics: PhysicsManager;
    renderer: RenderManager;
    asset: AssetManager;
    debug_gui: GUI;
    debug: boolean = false;

    constructor() {
        this.renderer = new RenderManager();
        this.asset = new AssetManager();
        this._input = new InputManager(this.renderer.pixi_renderer, this.renderer.debug_renderer);
        this._network = new NetworkManager();
        this._ticker = new ticker.Ticker();
        this._physics = new PhysicsManager({
            debug: this._config.game.debug || false,
            view: this.renderer.debug_canvas,
            mouse: this._input.debug_mouse,
        });

        // If debugging, show debugging tools
        if (Config.game.debug) {
            this.debug = true;
            this.debug_gui = new GUI();

            let f1 = this.debug_gui.addFolder('Debug Tools');
            f1.add(this, 'debug', {yes: true, no: false}).name("Debug Game").listen();
            f1.add(this._physics, 'debug', {yes: true, no: false}).name("Debug Physics").listen();
            f1.add(this.renderer, 'debug', {yes: true, no: false}).name("Debug Renderer").listen();
            f1.open();
        }

        // Register with core game ticker (loop)
        this._ticker.add(this.update, this);
    }

    public update(delta: number): void {
        fpsmeter.tickStart();

        // Process input
        this._input.update();

        // Process network
        this._network.update();

        // Process physics
        this._physics.update(delta / settings.TARGET_FPMS);

        // Render the stage
        this.renderer.render();

        fpsmeter.tick();
    }

     /**
     * Start this Game class' core execution loop
     */
    public start(): void {
        this._ticker.start();
    }

    /**
     * Stop this Game class' core execution loop
     */
    public stop(): void {
        this._ticker.stop();
    }

    // /**
    //  * Registers listeners to this Game class' execution loop
    //  * 
    //  * @param updatee An object that would like to receive
    //  * ticks from the game loop
    //  */
    // public registerUpdatable(updatee: IUpdatable): void {
    //     this._ticker.add(updatee.update, updatee.scope())
    // }

    /**
     * Adds an actor into the game
     * @param entity An instance or child of BaseActor
     * @returns the passed BaseActor
     */
    public add(entity: GameActor): GameActor {
        if(canRender(entity)) { this.renderer.add(entity); }
        if(canSimulate(entity)) { this._physics.add(entity); }

        return entity;
    }
}


// // Interesting
// // extended
// connect: function( world ){

//     world.on( 'add:body', this.attach, this );
//     world.on( 'remove:body', this.detach, this );
// },

// // extended
// disconnect: function( world ){

//     world.off( 'add:body', this.attach, this );
//     world.off( 'remove:body', this.detach, this );
// },
