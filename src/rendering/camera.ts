import { Injectable } from '@/core/decorators/injectable';
import { GameContext } from '@/core/engine/game-context';
import { Player } from '@/game/player/player';
import { Vector2D } from '@/types/sprite-sheet';

@Injectable()
export class Camera {
    position: Vector2D = { x: 0, y: 0 };
    viewport: { width: number; height: number };
    private target?: Player;
    private mapWidth: number = 0;
    private mapHeight: number = 0;

    private bounds = { minX: 0, minY: 0, maxX: Infinity, maxY: Infinity };

    constructor() {
        this.viewport = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        window.addEventListener('resize', () => {
            this.viewport = {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        });
    }

    public targetCenter(): { x: number; y: number } {
        if (this.target) {
            const frame = this.target.sprite.getCurrentFrame();
            return {
                x: this.target.position.x - this.position.x,
                y: this.target.position.y - this.position.y,
            };
        }
        throw new Error('No target detected');
    }

    setBounds(mapWidth: number, mapHeight: number): void {
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
    }

    follow(target: Player): void {
        this.target = target;
    }

    update(deltaTime: number): void {
        if (!this.target) return;

        const scale = GameContext.getInstance().getGameScale();

        const logicalViewportWidth = this.viewport.width / scale;
        const logicalViewportHeight = this.viewport.height / scale;

        const targetX = this.target.position.x - logicalViewportWidth / 2;
        const targetY = this.target.position.y - logicalViewportHeight / 2;

        this.bounds = {
            minX: 0,
            minY: 0,
            maxX: Math.max(this.mapWidth - logicalViewportWidth, 0),
            maxY: Math.max(this.mapHeight - logicalViewportHeight, 0),
        };

        const clampedX = this.clamp(
            targetX,
            this.bounds.minX,
            this.bounds.maxX
        );
        const clampedY = this.clamp(
            targetY,
            this.bounds.minY,
            this.bounds.maxY
        );

        const damping = 0.1 * (deltaTime / 16.67);

        this.position.x += (clampedX - this.position.x) * damping;
        this.position.y += (clampedY - this.position.y) * damping;
    }

    clamp(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(value, max));
    }
}
