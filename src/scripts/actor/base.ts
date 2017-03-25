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

export abstract class BaseActor {
    protected abstract sprite: Sprite;
    protected abstract targetTransform: Matrix;
    protected abstract transformLimits: IdeltaStruct;

    public abstract update(delta: number): void
}