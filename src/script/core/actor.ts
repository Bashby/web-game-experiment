// Vendor libs
import {Sprite, Texture, Point, utils} from "pixi.js";
import {Body, Bodies} from "matter-js";
import {find} from "lodash";

// Local libs
import {Config} from "./config";

// Define Interfaces
import {ISimulatable} from "./physic";
import {IRenderable} from "./render";
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
        x: number = 50,
        y: number = 50,
        actorType: string = 'base',
        staticBody: boolean = false
    ) {
        super();

        // Assign configs, where available
        let actorConfig = find(Config.actors, ["name", actorType]);

        // Assign custom render position, if defined
        if (actorConfig.render.position) {
            x = actorConfig.render.position.x || x;
            y = actorConfig.render.position.y || y;
        }
        
        // Assign custom physic position, if defined
        let physic_x, physic_y;
        if (actorConfig.physic.position) {
            physic_x = actorConfig.physic.position.x || x;
            physic_y = actorConfig.physic.position.x || x;
        } else {
            physic_x = x;
            physic_y = y;
        }

        // render
        this._texture = utils.TextureCache[actorConfig.render.texture];
        this._sprite = new Sprite(this._texture);
        this._sprite.anchor.set(0.5);
        this._sprite.position.set(x, y);
        this._sprite.width = 100;
        this._sprite.height = 100;

        // physic
        staticBody = actorConfig.physic.static || staticBody;
        let options = { isStatic: staticBody, restitution: 0.6, friction: 0.1 };
        switch(actorConfig.physic.boundingBox) {
            case "circle": {
                this._body = Bodies.circle(physic_x, physic_y, this._sprite.width / 2, options);
                break;
            }

            case "rectangle": {
                this._body = Bodies.rectangle(physic_x, physic_y, 500, 50, options);
                break;
            }

            default: {
                throw Error("Unknown boundingBox!");
            }
        }
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

// Export actors
export {Ball} from "../actor/ball";
export {Wall} from "../actor/wall";