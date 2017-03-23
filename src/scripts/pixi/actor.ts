import {Sprite, Texture, Matrix} from "pixi.js";

interface IdeltaStruct {
    maxRotation: number; // radians
    minRotation: number;
    maxAcceleration: number;
    minAcceleration: number;
    maxVelocity: number;
    minVelocity: number;
    minSize: number;
    maxSize: number;
}

abstract class Actor {
    protected abstract sprite: Sprite;
    protected abstract targetTransform: Matrix;
    protected abstract transformLimits: IdeltaStruct;

    public abstract update(delta: number): void
}

export class Bunny implements Actor {
    public static readonly TEXTURE_NAME: string = "carrot";
    private _sprite: Sprite;
    private _transformLimits: IdeltaStruct = {
        maxRotation: 0.1, // radians
        minRotation: 0.01,
        maxAcceleration: 0.8,
        minAcceleration: 0.1,
        maxVelocity: 15,
        minVelocity: 0,
        minSize: 100,
        maxSize: 1000,
    };

    constructor(texture: Texture) {
        this._sprite = new Sprite(texture);
        this._sprite.anchor.set(0.5);
    }

    public update(delta: number) {
        this.updateTransform(delta);
    }

    private updateTransform(delta: number) {
       // this.sprite.rotation = 
    }
}