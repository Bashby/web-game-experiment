// // import {Matrix} from "pixi.js";
// import {Sprite} from "pixi.js";
// import {Body} from "matter-js";

// Define Interfaces
import {ISimulatable} from "../core/physic";
import {IRenderable} from "../core/render";
// import {IUpdatable} from "../core/game";

export interface IGameActor extends ISimulatable, IRenderable {}
// interface IPhysicalActor extends ISimulatable, IUpdatable {}
// interface IRenderableActor extends IRenderable, IUpdatable {}

// // abstract class MixinClass {
// //     private _mixins: Array<any>;
// //     constructor() {
// //         this.applyMixins();
// //     }

// //     private applyMixins(): void {
// //         applyMixins(this, this._mixins);
// //     }
// // }

// // interface IdeltaStruct {
// //     maxRotation: number; // radians
// //     minRotation: number;
// //     maxAcceleration: number;
// //     minAcceleration: number;
// //     maxVelocity: number;
// //     minVelocity: number;
// //     minSize: number;
// //     maxSize: number;
// // }

export class BaseActor {}

// export abstract class RenderableActor extends BaseActor implements IRenderableActor {
//     render(): void {
//         throw new Error('Method not implemented.');
//     }
//     update(delta?: number): void {
//         throw new Error('Method not implemented.');
//     }
//     scope() {
//         throw new Error('Method not implemented.');
//     }
// }

// export abstract class PhysicalActor extends BaseActor implements IPhysicalActor {
//     getBody(): Body {
//         throw new Error('Method not implemented.');
//     }
//     update(): void {
//         throw new Error('Method not implemented.');
//     }
//     scope() {
//         throw new Error('Method not implemented.');
//     }
// }

// export abstract class GameActor extends BaseActor implements IGameActor {
//     update(): void {
//         throw new Error('Method not implemented.');
//     }
//     scope() {
//         throw new Error('Method not implemented.');
//     }

//     body: Body;
//     getBody(): Body { return this.body}
//     render(): void {}
// }

// export abstract class VisualActor extends Renderable(BaseActor) {}
// export abstract class PhysicalActor extends Simulatable(BaseActor) {}
// export abstract class GameActor extends Renderable(Simulatable(BaseActor)) {}
