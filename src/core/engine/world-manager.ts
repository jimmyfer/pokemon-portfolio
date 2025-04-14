import { MapNode } from '@/types/map-node';
import { Injectable } from '../decorators/injectable';
import { TileMap } from '@/rendering/tile-map';
import { createLittleRootTown } from '@/game/map/littleroot_town/littleroot-town';
import { GameContext } from './game-context';
import { Camera } from '@/rendering/camera';
import { GameStateManager } from '../systems/game-state-manager';
import { CollisionSystem } from '../systems/collision-system';
import { LayerPriority } from '@/types/render-types';
import { createRoute101 } from '@/game/map/route_101/route-101';
import { createHouse01 } from '@/game/map/littleroot_town/houses/house-01';
import { EventSystem } from '../systems/event-system';
import { Vector2D } from '@/types/sprite-sheet';
import { GAME_CANVAS, TRANSICION_CANVAS } from './canvas-token';

@Injectable()
export class WorldManager {
    private currentMapNode!: MapNode;
    private currentMap: TileMap;
    private maps = new Map<string, MapNode>();

    private gameStateManager: GameStateManager;
    private camera: Camera;
    private collisionSystem: CollisionSystem;
    private eventSystem: EventSystem;

    private transitionPhase: 'closing' | 'opening' | null = null;
    private transitionProgress: number = 0;
    private transitionDuration: number = 1000;
    private transitionTargetMapId: string | null = null;
    private transitionPlayerTargetPosition: Vector2D | null = null;
    private transitionScreenPosition: { x: number; y: number } = { x: 0, y: 0 };
    private maxRadius: number = 0;

    private radiusMapEffect = 0;

    constructor() {
        const gameContext = GameContext.getInstance();
        this.gameStateManager = gameContext.getBean(GameStateManager);
        this.camera = gameContext.getBean(Camera);
        this.collisionSystem = gameContext.getBean(CollisionSystem);
        this.eventSystem = gameContext.getBean(EventSystem);
        console.log(gameContext);
    }

    async initialize() {
        await this.buildWorldGraph();
        await this.loadMap();
        this.listenMapTransitionEvent();
    }

    private async buildWorldGraph() {
        this.maps.set('little_root_town', {
            id: 'little_root_town',
            name: 'Root Town',
            loader: createLittleRootTown,
            type: 'OPEN_WORLD',
            spawnPoints: new Map([
                [
                    'little_root_town_house_1',
                    { spawnPosition: { x: 272, y: 272 } },
                ],
            ]),
        });

        this.maps.set('little_root_town_house_1', {
            id: 'little_root_town_house_1',
            name: 'Home',
            loader: createHouse01,
            type: 'INTERIOR',
            spawnPoints: new Map([
                ['little_root_town', { spawnPosition: { x: 304, y: 368 } }],
            ]),
        });

        this.maps.set('route_101', {
            id: 'route_101',
            name: 'Route 101',
            loader: createRoute101,
            type: 'OPEN_WORLD',
        });
    }

    private async loadMap(): Promise<void> {
        const currentMap = this.gameStateManager.getState().world.currentMap;
        this.currentMapNode = this.maps.get(currentMap)!;
        this.currentMap = await this.currentMapNode.loader();
        this.collisionSystem.setTileMap(this.currentMap);

        this.camera.setBounds(
            this.currentMap.getMapWidth(),
            this.currentMap.getMapHeight()
        );
    }

    listenMapTransitionEvent(): void {
        this.eventSystem.on('MAP_TRANSITION', (data) => {
            this.startTransition(data.to);
        });
    }

    private startTransition(targetMapId: string): void {
        const spawnPoint = this.currentMapNode.spawnPoints?.get(targetMapId);
        if (spawnPoint) {
            const gameCtx = GameContext.getInstance().getBean(GAME_CANVAS);
            this.transitionTargetMapId = targetMapId;
            this.transitionScreenPosition = this.camera.targetCenter();
            this.transitionPlayerTargetPosition = spawnPoint.spawnPosition;
            const screenWidth = gameCtx.canvas.width;
            const screenHeight = gameCtx.canvas.height;
            this.maxRadius = Math.hypot(screenWidth, screenHeight) / 2;
            this.transitionPhase = 'closing';
            this.transitionProgress = 0;
        } else {
            throw new Error('Wrong connection');
        }
    }

    update(deltaTime: number): void {
        this.currentMap.update(deltaTime);
        this.checkTransitionPhase(deltaTime);
    }

    async checkTransitionPhase(deltaTime: number): Promise<void> {
        if (this.transitionPhase) {
            this.transitionEffect();
            if (this.transitionPhase === 'closing') {
                this.transitionProgress += deltaTime / this.transitionDuration;
                if (this.transitionProgress >= 1) {
                    this.transitionProgress = 1;
                    this.gameStateManager.updateState((state) => ({
                        ...state,
                        player: {
                            hidden: false,
                            canMove: true,
                            position: this.transitionPlayerTargetPosition!,
                        },
                        world: {
                            currentMap: this.transitionTargetMapId!,
                        },
                    }));
                    this.loadMap().then(() => {
                        this.transitionPhase = 'opening';
                        this.transitionProgress = 0;
                        this.transitionScreenPosition =
                            this.camera.targetCenter();
                    });
                }
                this.radiusMapEffect =
                    (1 - this.transitionProgress) * this.maxRadius;
            } else if (this.transitionPhase === 'opening') {
                this.transitionProgress += deltaTime / this.transitionDuration;
                if (this.transitionProgress >= 1) {
                    this.transitionPhase = null;
                    this.radiusMapEffect = 0;
                } else {
                    this.radiusMapEffect =
                        this.transitionProgress * this.maxRadius;
                }
            }
        }
    }

    transitionEffect(): void {
        if (this.radiusMapEffect == 0) return;
        const ctx = GameContext.getInstance().getBean(TRANSICION_CANVAS);

        ctx.save();
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'black';
        ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.fill();

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(
            this.transitionScreenPosition.x,
            this.transitionScreenPosition.y,
            this.radiusMapEffect,
            0,
            Math.PI * 2
        );
        ctx.fill();
        ctx.restore();
    }

    render(priority: LayerPriority): void {
        this.currentMap.render(priority);
    }
}
