import { GameContext } from '@/core/engine/game-context';
import { GameStateManager } from '@/core/systems/game-state-manager';
import { TriggerCondition } from '@/types/trigger';
import { NPC } from '@/game/npc/npc';

export class NPCProximityTriggerCondition implements TriggerCondition {
    private gameStateManager: GameStateManager;
    private readonly TILE_SIZE = 32;

    constructor(private npc: NPC) {
        const gameContext = GameContext.getInstance();
        this.gameStateManager = gameContext.getBean(GameStateManager);
    }

    isMet(): boolean {
        const player = this.gameStateManager.getState().player;
        const playerPosition = player.position;
        const npcPosition = this.npc.position;

        const playerTileX = Math.round(playerPosition.x / this.TILE_SIZE);
        const playerTileY = Math.round(playerPosition.y / this.TILE_SIZE);
        const npcTileX = Math.round(npcPosition.x / this.TILE_SIZE);
        const npcTileY = Math.round(npcPosition.y / this.TILE_SIZE);

        const deltaX = playerTileX - npcTileX;
        const deltaY = playerTileY - npcTileY;

        const isAdjacent =
            (Math.abs(deltaX) === 1 && deltaY === 0) ||
            (Math.abs(deltaY) === 1 && deltaX === 0);

        if (!isAdjacent) return false;

        let requiredDirection: string;
        if (deltaX === 1) requiredDirection = 'left';
        else if (deltaX === -1) requiredDirection = 'right';
        else if (deltaY === 1) requiredDirection = 'up';
        else requiredDirection = 'down';

        const playerDirection = this.getBaseDirection(player.spritePosition);

        return playerDirection === requiredDirection;
    }

    private getBaseDirection(spritePosition: string): string {
        if (spritePosition.includes('left')) return 'left';
        if (spritePosition.includes('right')) return 'right';
        if (spritePosition.includes('up')) return 'up';
        if (spritePosition.includes('down')) return 'down';
        return 'down';
    }
}
