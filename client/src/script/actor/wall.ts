<<<<<<< Updated upstream:client/src/script/actor/wall.ts
// Vendor libs
import {Sprite, Texture, Point, utils} from "pixi.js";
import {Body, Bodies} from "matter-js";

// Local libs
import {GameActor} from "../core/actor";

export class Wall extends GameActor {
    static readonly ACTOR_TYPE = 'wall';

    /**
     * Create a Wall at an xy position
     * @param x the x position to create the actor
     * @param y the y position to create the actor
     */
    constructor(x: number, y: number) {
        super(x, y, null, null, null, null, Wall.ACTOR_TYPE, true);
    }



}
=======
// Vendor libs
import {Sprite, Texture, Point, utils} from "pixi.js";
import {Body, Bodies} from "matter-js";

// Local libs
import {GameActor} from "../core/actor";

export class Wall extends GameActor {
    static readonly ACTOR_TYPE = 'wall';

    /**
     * Create a Wall at an xy position
     * @param x the x position to create the actor
     * @param y the y position to create the actor
     */
    constructor(x: number, y: number) {
        super(x, y, null, null, null, null, Wall.ACTOR_TYPE, true);
    }
}
>>>>>>> Stashed changes:src/script/actor/wall.ts
