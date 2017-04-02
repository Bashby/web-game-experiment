// Vendor libs
import {Sprite, Texture, Point, utils} from "pixi.js";
import {Body, Bodies} from "matter-js";

// Local libs
import {GameActor} from "./base";

export class Wall extends GameActor {
    static readonly ACTOR_TYPE = 'wall';

    constructor(x: number, y: number) {
        super(x, y, Wall.ACTOR_TYPE, true);
    }



}
