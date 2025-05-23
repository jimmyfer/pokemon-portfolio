import { NPC } from '@/game/npc/npc';
import { Vector2D } from './sprite-sheet';
import { TriggerCondition } from './trigger';
import { SkinType } from '@/game/npc/npc-skins';

export type NPCBehavior = 'static' | 'wandering';
export type InteractionType = 'dialogue';

export interface NPCConfig {
    id: string;
    name: string;
    position: Vector2D;
    spriteSheet: string;
    initialAnimation: string;
    interactionTrigger: (npc: NPC) => TriggerCondition;
    skin?: SkinType;
    interactionType?: InteractionType;
    behavior?: NPCBehavior;
    dialogue?: string[];
    movementRange?: number;
    movementSpeed?: number;
}
