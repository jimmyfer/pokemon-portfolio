import { TileMap } from '@/rendering/tile-map';
import { Vector2D } from './sprite-sheet';

export type SpawnConection = {
    spawnPosition: Vector2D;
    playerPosition: string;
};

export interface MapNode {
    id: string;
    name: string;
    loader: () => Promise<TileMap>;
    type: 'OPEN_WORLD' | 'INTERIOR';
    spawnPoints?: Map<string, SpawnConection>;
}
