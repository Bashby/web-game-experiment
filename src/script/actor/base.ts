// Vendor libs
import {Sprite, Texture, Point, utils} from "pixi.js";
import {Body, Bodies} from "matter-js";

// Local libs
import {Config} from "../core/config";
export {Ball} from "./ball";
export {Wall} from "./wall";

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
export class GameActor extends BaseActor implements IGameActor {
    protected _texture: Texture;
    protected _sprite: Sprite;
    protected _body: Body;

    constructor(
        x: number = 0,
        y: number = 0,
        actorType: string = 'base',
        staticBody: boolean = false
    ) {
        super();
        this._texture = utils.TextureCache[Config.actors[actorType].texture];
        this._sprite = new Sprite(this._texture);
        this._sprite.anchor.set(0.5);
        this._sprite.position.set(x, y);

        this._body = Bodies.circle(x, y, this._sprite.width / 2, { isStatic: staticBody });
    }

    render(): void {}

    getSimulatable(): Body {
        return this._body;
    }

    getRenderable(): Sprite {
        return this._sprite;
    }

    hide(): void {
        this._sprite.visible = false;
    }

    show(): void {
        this._sprite.visible = true;
    }

    isVisible(): boolean {
        return this._sprite.visible;
    }
}

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
