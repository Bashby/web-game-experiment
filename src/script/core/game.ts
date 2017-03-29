// Third Party Libs
import {ticker} from "pixi.js";
import {GUI} from "dat-gui";

// Local Libs
// System Managers
import {canRender, RenderManager} from "./render";
import {AssetManager} from "./asset";
import {InputManager} from "./input";
import {canSimulate, PhysicsManager} from "./physic";
import {NetworkManager} from "./network";

import {BaseActor} from "../actor/base";
import {fpsmeter} from "../utils";

export interface IUpdatable {
    update(delta?: number): void;
    scope() : any; // Note: This should return this for the callback function
}

export class Game {
    private _renderer: RenderManager;
    private _ticker: ticker.Ticker;
    private _input: InputManager;
    private _network: NetworkManager;
    private _physics: PhysicsManager;
    public asset: AssetManager;
    debug_gui: GUI;

    constructor() {
        this._renderer = new RenderManager();
        this.asset = new AssetManager();
        this._input = new InputManager(this._renderer.pixi_renderer);
        this._network = new NetworkManager();
        this._ticker = new ticker.Ticker();
        this._physics = new PhysicsManager();
        this.debug_gui = new GUI();

        // Register updatables
        // this._ticker.add(this._input.update, this._input);
        // this._ticker.add(this._network.update, this._network);
        // this._ticker.add(this._physics.update, this._physics);
        this._ticker.add(this.update, this);
    }

    public update(delta: number): void {
        fpsmeter.tickStart();

        // Process input
        this._input.update();

        // Process network
        this._network.update();

        // Process physics
        this._physics.update(delta);

        // Render the stage
        this._renderer.render();

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

    public add(entity: BaseActor) {
        if(canRender(entity)) { this._renderer.add(entity); }
        if(canSimulate(entity)) { this._physics.add(entity); }
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
