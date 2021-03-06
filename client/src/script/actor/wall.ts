// Vendor libs

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
