import {BaseActor, IGameActor} from "./base";
import {Sprite, Texture, Graphics} from "pixi.js";
import {Body, Bodies} from "matter-js";

export class Bunny extends BaseActor implements IGameActor {
    static readonly TEXTURE_NAME: string = "carrot";
    private _sprite: Sprite;
    private _body: Body;

    private graphics: Graphics;

    constructor(texture: Texture) {
        super();
        //this._sprite = new Sprite(PIXI.Texture.fromImage('http://i.imgur.com/1Deua.png')); // This works?
        this._sprite = new Sprite(texture);
        this._sprite.anchor.set(0.5);
        this._sprite.position.set(200, 200);
        this._sprite.scale.set(0.75);
        //this._sprite.

        this._body = Bodies.circle(this._sprite.position.x, this._sprite.position.y, 256);

        let graphics = new Graphics();
        graphics.beginFill(0xe74c3c);
        this.graphics = graphics.drawCircle(100, 100, 25);
        graphics.endFill();
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

// Create a new Sprite using the texture
//var bunny = new Bunny(world.assets.getTexture(Bunny.textureName));

// // center the sprite's anchor point
// bunny.anchor.x = 0.5;  
// bunny.anchor.y = 0.5;

// // move the sprite to the center of the screen
// bunny.position.x = 200;  
// bunny.position.y = 150;

// // Build GUI
// var gui = new GUI();
// var f1 = gui.addFolder('Emitter Position');
// f1.add(bunny.position, 'x');
// f1.add(bunny.position, 'y');
// f1.open();

// // set scale
// bunny.scale.x = 0.75;
// bunny.scale.y = 0.75;



// r.stage.addChild(bunny);

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