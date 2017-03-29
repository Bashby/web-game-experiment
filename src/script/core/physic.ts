import {Engine, World, Body} from "matter-js";
import {BaseActor} from "../actor/base";
//import {Constructable} from "./utils";

export interface ISimulatable {
        getSimulatable(): Body;
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

export class PhysicsManager {
    private _engine: Engine;
    private _world: World;

    constructor() {
        this._engine = Engine.create();
        this._world = this._engine.world;
    }

    public update(delta: number): void {
        Engine.update(this._engine, delta);
    }

    // public oldadd(object: Composite | Constraint | Body): void {
    //     World.add(this._world, object);
    // }

    add(simulatable: ISimulatable) {
        World.add(this._world, simulatable.getSimulatable());
    }
}