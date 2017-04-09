// Vendor libs
import {loaders} from "pixi.js";
import {Howl} from "howler";

// Local libs
import {Config} from "./config";

// Assets
const image1 = <string>require("../../image/favicon.png");
const image2 = <string>require("../../image/stone.jpg");
//const spritesheet1 = <string>require("../../image/tileset/tileset1.json");
//const spritesheet1_image = <string>require("../../image/tileset/tileset1.png");

class AssetLoader {
    // load the spritesheet here using my own code, screw the pixi loader!
}

export class AssetManager {
    private _textureLoader: loaders.Loader = new loaders.Loader();
    firstTimeLoaded: boolean = false;

    /**
     * constructor
     * 
     * @returns nothing
     */
    constructor() {
        // Init on instantiation
        this.initialize();
    }

    /**
     * Loads assets
     * 
     * @returns nothing
     */
    private initialize() {
        this._textureLoader.add('carrot', image1);
        this._textureLoader.add('rock', image2);
        //this.loader.add('spritesheet1', spritesheet1);
        this._textureLoader.load(() => { this.firstTimeLoaded = true; });
    }

    /**
     * getTexture - returns the texture from the texture cache for a given name
     * or null if not found
     * 
     * @param name
     * @returns PIXI.texture
     */
    public getTexture(name: string) {
        var target = this._textureLoader.resources[name];
        if (target) {
            return target.texture;
        } else {
            throw new Error("No Texture Found!");
        }
    }
}
