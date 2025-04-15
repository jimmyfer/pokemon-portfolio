import { LayerPriority } from './render-types';
import { TriggerCondition } from './trigger';

export interface TileLayer {
    name: string;
    data: number[];
    width: number;
    height: number;
    visible: boolean;
}

export interface TileSet {
    columns: number;
    firstgid: number;
    image: string;
    margin: number;
    spacing: number;
    tilewidth: number;
    tileheight: number;
}

export interface TiledLayer {
    id: number;
    name: string;
    type: 'tilelayer' | 'group';
    visible: boolean;
    opacity: number;
    data?: number[];
    layers?: TiledLayer[];
    offsetx?: number;
    offsety?: number;
}

export interface TiledMapData {
    width: number;
    height: number;
    tilewidth: number;
    tileheight: number;
    layers: TileLayer[];
    tilesets: TileSet[];
}

export interface Tile {
    tile: number;
    offsetX: number;
    offsetY: number;
    flipX: boolean;
    flipY: boolean;
    collidable: boolean;
    condition?: TriggerCondition;
}

export interface MapLayer {
    name: string;
    data: Tile[][];
    visible: boolean;
    collidable: boolean;
    priority: LayerPriority;
}
