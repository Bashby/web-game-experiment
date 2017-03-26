// Load vendor libs
//import {Texture, Sprite, Graphics} from "pixi.js";

// Import local libs
import {Game} from "./core/game";
import {Bunny} from "./actor/bunny";

// Load Styles
require("../styles/base.css");

// Init game
var game = new Game();
game.start();

// Put a bunny on it!
var bunny = new Bunny(game.asset.getTexture(Bunny.TEXTURE_NAME));
game.add(bunny);

// Build GUI
var f1 = game.debug_gui.addFolder('Bunny Visual Position');
f1.add(bunny.getRenderable(), 'visible', {yes: true, no: false});
f1.add(bunny.getRenderable().position, 'x');
f1.add(bunny.getRenderable().position, 'y');
f1.open();
var f2 = game.debug_gui.addFolder('Bunny Physics Position');
f2.add(bunny.getSimulatable().position, 'x').listen();
f2.add(bunny.getSimulatable().position, 'y').listen();
f2.add(bunny.getSimulatable().velocity, 'x').listen();
f2.add(bunny.getSimulatable().velocity, 'y').min(-1).max(5).step(0.01).listen();
f2.open();

// import * as Matter from "matter-js";

// // module aliases
// var Engine = Matter.Engine,
//     World = Matter.World,
//     Bodies = Matter.Bodies;

// // create an engine
// var engine = Engine.create();

// // create two boxes and a ground
// var boxA = Bodies.circle(50, 50, 256);

// // add all of the bodies to the world
// World.add(engine.world, boxA);

// // run the engine
// Engine.run(engine);

function where() {
    console.log(bunny.getSimulatable().position);
}
window.setInterval(where, 1000);