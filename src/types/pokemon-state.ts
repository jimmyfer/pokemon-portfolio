import { Vector2D } from './sprite-sheet';
export interface GameState {
    player: PlayerState;
    world: WorldState;
}

export interface PlayerState {
    position: Vector2D;
    spritePosition: string;
    hidden: boolean;
    canMove: boolean;
}

export interface WorldState {
    currentMap: string;
    weather?: any;
    trainersDefeated?: Record<string, boolean>;
    hiddenItemsCollected?: string[];
}
