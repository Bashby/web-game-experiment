// Import Libs
import {loaders} from "pixi.js";

// Import assets
const image1 = <string>require("../../images/favicon.png");


export class AssetManager {
    readonly loader: loaders.Loader; // = new loaders.Loader();

    /**
     * constructor
     * 
     * @returns nothing
     */
    constructor() {
        this.loader = new loaders.Loader();

        // Init on instantiation
        this.initialize();
    }

    /**
     * Loads assets
     * 
     * @returns nothing
     */
    private initialize() {
        this.loader.add('carrot', image1).load();
    }

    /**
     * getTexture - returns the texture from the texture cache for a given name
     * or null if not found
     * 
     * @param name
     * @returns PIXI.texture
     */
    public getTexture(name: string) {
        let target = this.loader.resources[name];
        console.log("TEX:", target);
        if (target) {
            return target.texture;
        } else {
            throw new Error("No Texture Found!");
        }
    }
}
