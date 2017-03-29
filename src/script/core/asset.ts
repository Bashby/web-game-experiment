// Import Libs
import {loaders} from "pixi.js";

// Import assets
const image1 = <string>require("../../image/favicon.png");
const spritesheet1 = <string>require("url-loader!../../image/tileset/tileset1.json");
const spritesheet1_image = <string>require("../../image/tileset/tileset1.png");


export class AssetManager {
    loader: loaders.Loader = new loaders.Loader();
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
        this.loader.add('carrot', image1);
        this.loader.add('spritesheet1', spritesheet1);
        this.loader.load((loader: loaders.Loader, resources: loaders.IResourceDictionary ) => {
            this.firstTimeLoaded = true;
            console.log(loader, resources, spritesheet1_image);
        });
    }

    /**
     * getTexture - returns the texture from the texture cache for a given name
     * or null if not found
     * 
     * @param name
     * @returns PIXI.texture
     */
    public getTexture(name: string) {
        var target = this.loader.resources[name];
        if (target) {
            return target.texture;
        } else {
            throw new Error("No Texture Found!");
        }
    }
}
