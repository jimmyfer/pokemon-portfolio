import { Pokemon } from './pokemon';
import { Vector2D } from './sprite-sheet';

export interface GameState {
    player: PlayerState;
    world: WorldState;
}

export interface PlayerState {
    party: Pokemon[];
    position: Vector2D;
    spritePosition: string;
    hidden: boolean;
    canMove: boolean;
    pc: Pokemon[];
}

export interface WorldState {
    currentMap: string;
    weather?: any;
    trainersDefeated?: Record<string, boolean>;
    hiddenItemsCollected?: string[];
}
