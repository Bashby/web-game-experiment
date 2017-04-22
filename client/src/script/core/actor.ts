// Vendor libs
import {Sprite, extras, Texture, Point, utils} from "pixi.js";
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
        x: number,
        y: number,
        w?: number,
        h?: number,
        scale?: number,
        rotation?: number,
        actorType: string = 'base',
        staticBody: boolean = false,
        spriteType: string = 'sprite',
    ) {
        super();

        // Assign configs, where available
        let actorConfig = find(Config.actors, ["name", actorType]);

        // Assign config variables as overrides
        w = actorConfig.render.size ? actorConfig.render.size.w : w;
        h = actorConfig.render.size ? actorConfig.render.size.h : h;
        staticBody = actorConfig.physic.static || staticBody;
        spriteType = actorConfig.render.sprite_type || spriteType;
        scale = actorConfig.render.scale || scale || 1.0;
        rotation = actorConfig.render.rotation || rotation || 0;

        // render
        this._texture = utils.TextureCache[actorConfig.render.texture];
        switch(spriteType) {
            case "sprite": {
                this._sprite = new Sprite(this._texture);
                // Note: Overrides the texture size
                if (w) { this._sprite.width = w; }
                if (h) { this._sprite.height = h; }
                break;
            }

            case "tiling sprite": {
                this._sprite = new extras.TilingSprite(
                    this._texture,
                    w,
                    h
                );
                break;
            }

            default: {
                throw Error("Unknown sprite type!");
            }
        }
        this._sprite.anchor.set(0.5);
        this._sprite.position.set(x, y);
        this._sprite.scale.set(scale);
        this._sprite.rotation = rotation;

        // physic
        let options = { isStatic: staticBody, restitution: 0.6, friction: 0.1, angle: rotation };
        switch(actorConfig.physic.bounding_box) {
            case "circle": {
                this._body = Bodies.circle(x, y, this._sprite.width / 2, options);
                break;
            }

            case "rectangle": {
                this._body = Bodies.rectangle(x, y, this._sprite.width, this._sprite.height, options);
                break;
            }

            default: {
                throw Error("Unknown bounding box!");
            }
        }
    }

    render(): void {
        this._sprite.position = new Point(this._body.position.x, this._body.position.y);
        this._sprite.rotation = this._body.angle;
    }

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
