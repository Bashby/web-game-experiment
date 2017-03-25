import {Engine, World, Body, Constraint, Composite} from "matter-js";

abstract class Simulatable {

}

export class PhysicsManager {
    private _engine: Engine;
    private _world: World;

    constructor() {
        this._engine = Engine.create();
        this._world = this._engine.world;
    }

    public scope() {
        return this;
    }

    public update(delta: number): void {
        Engine.update(this._engine, delta);
    }

    public add(object: Composite | Constraint | Body): void {
        World.add(this._world, object);
    }

}