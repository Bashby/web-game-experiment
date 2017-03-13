
// Import vender libs
//import { join } from "lodash";
import {Texture, Sprite, Graphics} from "pixi.js";

// Import local libs
import {Renderer} from "./pixi/utils";

// Import assets
const image1 = <string>require("./img/favicon.png");

var r = new Renderer();
var s = r.stage;

// create a texture from an image path
var texture = Texture.fromImage(image1);  
var carrotTex = Texture.fromImage(image1);

// create a new Sprite using the texture
var bunny = new Sprite(texture);

// center the sprite's anchor point
bunny.anchor.x = 0.5;  
bunny.anchor.y = 0.5;

// move the sprite to the center of the screen
bunny.position.x = 200;  
bunny.position.y = 150;

// set scale
bunny.scale.x = 0.75;
bunny.scale.y = 0.75;

var background = new Graphics();  
background.beginFill(0x123456);  
background.drawRect(0, 0, r.renderer.width, r.renderer.height);  
background.endFill();  
r.stage.addChild(background);

r.stage.addChild(bunny);

r.stage.interactive = true;

r.stage.on("mousedown", function(){  
  shoot(bunny.rotation, {
    x: bunny.position.x+Math.cos(bunny.rotation)*20,
    y: bunny.position.y+Math.sin(bunny.rotation)*20
  });
})

var bullets: Array<Sprite> = [];  
var bulletSpeed = 5;

function shoot(rotation: number, startPosition: {x: number, y: number}){  
  var bullet = new PIXI.Sprite(carrotTex);
  bullet.position.x = startPosition.x;
  bullet.position.y = startPosition.y;
  bullet.scale.x = 0.2;
  bullet.scale.y = 0.2;
  bullet.rotation = rotation;
  r.stage.addChild(bullet);
  bullets.push(bullet);
}

function rotateToPoint(mx: number, my: number, px: number, py: number){  
  var dist_Y = my - py;
  var dist_X = mx - px;
  var angle = Math.atan2(dist_Y,dist_X);
  //var degrees = angle * 180/ Math.PI;
  return angle;
}

setInterval(function(){ console.log(s.width, s.height, background.width, background.height); }, 1000);

// start animating
animate();  
function animate() {  
  requestAnimationFrame(animate);

  // just for fun, let's rotate mr rabbit a little
  bunny.rotation = rotateToPoint(r.renderer.plugins.interaction.mouse.global.x, r.renderer.plugins.interaction.mouse.global.y, bunny.position.x, bunny.position.y);

  for(var b=bullets.length-1;b>=0;b--){
    bullets[b].position.x += Math.cos(bullets[b].rotation)*bulletSpeed;
    bullets[b].position.y += Math.sin(bullets[b].rotation)*bulletSpeed;
  }
  // render the container
  r.render();
}