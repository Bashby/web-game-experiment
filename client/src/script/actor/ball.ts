// Vendor libs

// Local libs
import {GameActor} from "../core/actor";

export class Ball extends GameActor {
    static readonly ACTOR_TYPE = 'ball';

    /**
     * Create a Ball at an xy position
     * @param x the x position to create the Ball
     * @param y the y position to create the Ball
     */
    constructor(x: number, y: number) {
        super(x, y, null, null, null, null, Ball.ACTOR_TYPE);
    }
}
