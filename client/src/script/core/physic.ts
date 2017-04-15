import {Engine, World, Body, Constraint, Composite, Mouse, MouseConstraint, Render} from "matter-js";
import {BaseActor} from "./actor";
//import {Constructable} from "./utils";

export interface ISimulatable {
        getSimulatable(): Body | Constraint | Composite;
}

export function canSimulate(arg: BaseActor): arg is ISimulatable {
   return (arg as ISimulatable).getSimulatable !== undefined;
}

// export function Simulatable<BC extends Constructable>(Base: BC) {
//     return class extends Base implements ISimulatable {
//         protected body: Body;
//         getBody(): Body {
//             return this.body;
//         }
//     };
// }

// export abstract class Simulatable {
//     abstract getBody(): Body;
// }

interface DebuggingData {
    debug?: boolean;
    view?: HTMLCanvasElement;
    mouse?: Mouse;
}

export class PhysicsManager {
    private _engine: Engine;
    private _world: World;
    private _debug_renderer: Render;
    debug: boolean = false;

    constructor(debug_data: DebuggingData = {}) {
        this._engine = Engine.create();
        this._world = this._engine.world;

        // Handle debugging, if requested
        if (debug_data.debug) {
            this._setupDebugging(debug_data); 
        }
    }

    private _setupDebugging(data: DebuggingData): void {
        // Create a debugging canvas renderer
        this._debug_renderer = Render.create({
            canvas: data.view,
            engine: this._engine,
            options: {
                width: 0, // Prevent Matter from controlling canvas size
                height: 0,
            }
        });

        // Setup mouse input
        let mouseConstraint = MouseConstraint.create(this._engine, {
            mouse: data.mouse,
        });
        World.add(this._world, mouseConstraint);
        (this._debug_renderer as any).mouse = data.mouse;

        // Set some other debugging options on the debugging renderer
        // Note: Typings for Matter lib are missing properties, override!
        (this._debug_renderer.options as any).wireframeBackground = 'transparent';
        (this._debug_renderer.options as any).background = 'transparent';
        (this._debug_renderer.options as any).showDebug = true;
        (this._debug_renderer.options as any).showVelocity = true;
        (this._debug_renderer.options as any).showCollisions = true;
        (this._debug_renderer.options as any).showAxes = true;
        (this._debug_renderer.options as any).showPositions = true;
        (this._debug_renderer.options as any).showAngleIndicator = true;
        (this._debug_renderer.options as any).showIds = true;
        (this._debug_renderer.options as any).showMousePosition = true;
    }

    public update(delta: number): void {
        Engine.update(this._engine, delta);

        if (this._debug_renderer) {
            Render.world(this._debug_renderer);
        }
    }

    public add(simulatable: ISimulatable) {
        World.add(this._world, simulatable.getSimulatable());
    }
}