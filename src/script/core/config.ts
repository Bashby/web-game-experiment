// Import config
const config = <IConfiguration>require("../config.yaml");

type BoundingBoxes = "circle" | "rectangle";
type SpriteTypes = "sprite" | "animated sprite" | "tiling sprite";

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
    size?: IConfigurationSize
    sprite_type?: SpriteTypes
    scale?: number
    rotation?: number
}

interface IConfigurationPhysic {
    bounding_box?: BoundingBoxes
    static?: boolean
    size?: IConfigurationSize
}

interface IConfigurationAsset {
    textures: IConfigurationTexture[]
}

interface IConfigurationTexture {
    // TODO Fill out
}

interface IConfigurationSize {
    w: number
    h: number
}

export interface IConfiguration {
    game: IConfigurationGame
    actors: IConfigurationActor[]
    assets: IConfigurationAsset
}

export {config as Config};