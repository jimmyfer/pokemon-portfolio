import { Vector2D } from './sprite-sheet';
import { Player } from '../game/player/player';
import { PlayerState } from './pokemon-state';

export interface MapTransitionEvent {
    type: 'MAP_TRANSITION';
    from: string;
    to: string;
    playerState?: Partial<PlayerState>;
}

export interface InteractionEvent {
    type: 'INTERACTION';
    targetType: 'NPC' | 'DOOR' | 'OBJECT';
    targetId: string;
    position: Vector2D;
}

export interface EffectTriggerEvent {
    type: 'EFFECT_TRIGGER';
    effectId: string;
    params?: Record<string, any>;
}

export type GameEvent =
    | MapTransitionEvent
    | InteractionEvent
    | EffectTriggerEvent;
