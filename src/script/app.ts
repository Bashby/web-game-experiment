// Load vendor libs


// Import local libs
import {Game} from "./core/game";
import {Ball, Wall} from "./actor/base";
//import {Ball} from "./actor/ball";
//import {Floor} from "./actor/ball";

// Load Styles
require("../stylesheet/base.css");

// Init game
var game = new Game();

function check() {
    if (game.asset.firstTimeLoaded) {
        game.asset.firstTimeLoaded = false;

        // Put actors on the stage
        var ball = game.add(new Ball(300, 200));

        //var floor = game.add(new Wall());

        // Build GUI
        var f1 = game.debug_gui.addFolder('Bunny Visuals');
        f1.add(ball.getRenderable(), 'visible', {yes: true, no: false});
        f1.add(ball.getRenderable().position, 'x').name("Pos. X").listen();
        f1.add(ball.getRenderable().position, 'y').name("Pos. Y").listen();
        f1.open();
        var f2 = game.debug_gui.addFolder('Bunny Physics');
        f2.add(ball.getSimulatable().position, 'x').name("Pos. X").listen();
        f2.add(ball.getSimulatable().position, 'y').name("Pos. Y").listen();
        f2.add(ball.getSimulatable().velocity, 'x').name("Vel. X").listen();
        f2.add(ball.getSimulatable().velocity, 'y').name("Vel. Y").listen();
        f2.open();

        game.start();
    }
}
window.setInterval(check, 100);