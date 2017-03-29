// Load vendor libs
import {utils} from "pixi.js";

// Import local libs
import {Game} from "./core/game";
import {Bunny} from "./actor/bunny";

// Load Styles
require("../stylesheet/base.css");

// Init game
var game = new Game();

function check() {
    if (game.asset.firstTimeLoaded) {
        game.asset.firstTimeLoaded = false;

        // Put a bunny on it!
        var bunny = new Bunny(utils.TextureCache[Bunny.TEXTURE_NAME]);
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

        console.log(utils.TextureCache);

        game.start();
    }
}
window.setInterval(check, 100);