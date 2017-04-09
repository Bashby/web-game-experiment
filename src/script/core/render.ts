// Vender libs
import {Sprite, Container, autoDetectRenderer, WebGLRenderer, CanvasRenderer, Point, utils} from "pixi.js";

// Local Libs
//import {Constructable} from "./utils";
import {BaseActor} from "./actor";

export interface IRenderable {
    getRenderable(): Sprite;
    render(): void;
}

export function canRender(arg: BaseActor): arg is IRenderable {
   return (arg as IRenderable).render !== undefined && (arg as IRenderable).getRenderable !== undefined;
}

// export function Renderable<BC extends Constructable>(Base: BC) {
//     return class extends Base implements IRenderable {
//         protected _sprite: Sprite;
//         get sprite(): Sprite {
//             return this._sprite;
//         }
//         set sprite(sprite: Sprite) {
//             this._sprite = sprite;
//         }
//         public render(): void {}
//     };
// }

// function canRender(arg: BaseActor): arg is IRender {
//    return (arg as IRender).render !== undefined;
// }

// export abstract class Renderable {
//     protected abstract sprite: Sprite;
//     abstract render(): void;
// }

export class RenderManager {
    pixi_renderer: WebGLRenderer | CanvasRenderer;
    debug_renderer: CanvasRenderer;
    stage: Container;
    canvas: HTMLCanvasElement;
    debug_canvas: HTMLCanvasElement;
    renderables: IRenderable[] = [];
    debug: boolean = false;

    constructor(
        readonly targetWidth: number = 1280,
        readonly targetHeight: number = 720,
    ) {
        // The main (root) container of the renderer
        this.stage = new Container();

        // Init the renderer
        this.initialize();
    }

    /**
     * Core render loop for the renderer
     */
    public render() {
        // Render the renderables
        this.renderables.forEach((renderable) => { renderable.render(); });

        // Render the stage
        this.pixi_renderer.render(this.stage);
    }

     /**
     * Gets the renderer ready for first use
     */
    private initialize() {
        utils.skipHello();
        this.createRenderTargets();
        this.registerResize();
        this.resize(); // Do a first resize on init
    }

    /**
     * Add listeners for canvas scaling with window resizing and device rotation
     */
    private registerResize() {
        window.addEventListener('resize', function() { this.resize(); }.bind(this), false);
        window.addEventListener('deviceOrientation', function() { this.resize(); }.bind(this), false);
    }

    /**
     * Create the DOM render target (canvas), and the PIXI render target (renderer)
     */
    private createRenderTargets() {
        // Create DOM target
        this.canvas = document.createElement('canvas');
        this.canvas.className = "renderer";
        this.canvas.id = "app";
        this.debug_canvas = document.createElement('canvas');
        this.debug_canvas.className = "renderer";
        this.debug_canvas.id = "debug";

        // Construct renderers for targets
        this.pixi_renderer = autoDetectRenderer(this.targetWidth, this.targetHeight, { backgroundColor : 0x1099bb, view: this.canvas, resolution: window.devicePixelRatio })
        this.pixi_renderer.autoResize = true;
        this.debug_renderer = new CanvasRenderer(this.targetWidth, this.targetHeight, { transparent: true, view: this.debug_canvas, resolution: window.devicePixelRatio })
        this.debug_renderer.autoResize = true;
        

        // Append to DOM
        document.body.appendChild(this.pixi_renderer.view);
        document.body.appendChild(this.debug_renderer.view);
    }

    /**
     * Calculate the current window size and set the canvas renderer size accordingly
     */
    public resize() {
        var width = window.innerWidth, height = window.innerHeight;

        this.pixi_renderer.resize(width, height);
        this.debug_renderer.resize(width, height);

        /**
         * Scale the canvas horizontally and vertically keeping in mind the screen estate we have
         * at our disposal. This keeps the relative game dimensions in place.
         */
        if (height / this.targetHeight < width / this.targetWidth) {
            this.stage.scale.x = this.stage.scale.y = height / this.targetHeight;
        } else {
            this.stage.scale.x = this.stage.scale.y = width / this.targetWidth;
        }

        /**
         * iOS likes to scroll when rotating - fix that 
         */
        window.scrollTo(0, 0);
    }

    /**
     * Add actors to the rendering loop
     * 
     * @param renderable an actor that implements IRenderable
     */
    public add(renderable: IRenderable) {
        this.stage.addChild(renderable.getRenderable());
        this.renderables.push(renderable);
    }

    /**
     * Returns a Point that is the center of the renderer
     */
    public getCenterOfStage(): Point {
        return new Point(this.pixi_renderer.width / 2, this.pixi_renderer.height / 2);
    }
}
