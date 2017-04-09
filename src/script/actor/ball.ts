// Vendor libs
import {Point} from "pixi.js";

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
        super(x, y, Ball.ACTOR_TYPE);
    }

    render(): void {
        this._sprite.position = new Point(this._body.position.x, this._body.position.y);
    }
}

// r.stage.interactive = true;

// r.stage.on("mousedown", function(){  
//   shoot(bunny.rotation, {
//     x: bunny.position.x+Math.cos(bunny.rotation)*20,
//     y: bunny.position.y+Math.sin(bunny.rotation)*20
//   });
// })

// var bullets: Array<Sprite> = [];  
// var bulletSpeed = 5;

// function shoot(rotation: number, startPosition: {x: number, y: number}){  
//   var bullet = new PIXI.Sprite(carrotTex);
//   bullet.position.x = startPosition.x;
//   bullet.position.y = startPosition.y;
//   bullet.scale.x = 0.2;
//   bullet.scale.y = 0.2;
//   bullet.rotation = rotation;
//   r.stage.addChild(bullet);
//   bullets.push(bullet);
// }

// function rotateToPoint(mx: number, my: number, px: number, py: number){  
//   var dist_Y = my - py;
//   var dist_X = mx - px;
//   var angle = Math.atan2(dist_Y,dist_X);
//   //var degrees = angle * 180/ Math.PI;
//   return angle;
// }

//  // just for fun, let's rotate mr rabbit a little
//   bunny.rotation = rotateToPoint(r.renderer.plugins.interaction.mouse.global.x, r.renderer.plugins.interaction.mouse.global.y, bunny.position.x, bunny.position.y);

//   for(var b=bullets.length-1;b>=0;b--){
//       bullets[b].position.x += Math.cos(bullets[b].rotation)*bulletSpeed;
//       bullets[b].position.y += Math.sin(bullets[b].rotation)*bulletSpeed;
//   }

// private generateBackground() {
//     // var background = new Graphics();  
//     // background.beginFill(0x123456);  
//     // background.drawRect(0, 0, r.renderer.width, r.renderer.height);  
//     // background.endFill();  
//     // r.stage.addChild(background);
// }