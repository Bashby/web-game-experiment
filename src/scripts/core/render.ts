import {Container, autoDetectRenderer, WebGLRenderer, CanvasRenderer, utils} from "pixi.js";

abstract class Renderable {

}

export class RenderManager {
    pixi_renderer: WebGLRenderer | CanvasRenderer;
    stage: Container;
    canvas: HTMLCanvasElement;

    constructor(readonly targetWidth: number = 1280, readonly targetHeight: number = 720) {
        // The main (root) container of the renderer
        this.stage = new Container();

        // Init the renderer
        this.initialize();
    }

    /**
     * Core render loop for the renderer
     */
    public render() {
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
        this.canvas = document.createElement('canvas');
        this.pixi_renderer = autoDetectRenderer(this.targetWidth, this.targetHeight, { view: this.canvas, resolution: window.devicePixelRatio })
        this.pixi_renderer.autoResize = true;
        document.body.appendChild(this.pixi_renderer.view);
    }

    /**
     * Calculate the current window size and set the canvas renderer size accordingly
     */
    public resize() {
        var width = window.innerWidth, height = window.innerHeight;

        this.pixi_renderer.resize(width, height);

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
}
