// Import config
const config = <IConfiguration>require("../config.yaml");

type BoundingBoxes = "circle" | "rectangle";

interface IConfigurationGame {
    version: string
    author: string
    debug: boolean
}

interface IConfigurationActor {
    name: string
    render: IConfigurationRender
    physic: IConfigurationPhysic
}

interface IConfigurationRender {
    texture?: string
    position?: IConfigurationPosition
}

interface IConfigurationPhysic {
    boundingBox?: BoundingBoxes
    static?: boolean
    position?: IConfigurationPosition
}

interface IConfigurationAsset {
    textures: IConfigurationTexture[]
}

interface IConfigurationTexture {
    // TODO Fill out
}

interface IConfigurationPosition {
    x?: number
    y?: number
}

export interface IConfiguration {
    game: IConfigurationGame
    actors: IConfigurationActor[]
    assets: IConfigurationAsset
}

export {config as Config};