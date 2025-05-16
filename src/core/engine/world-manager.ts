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
import { EventSystem } from '../systems/event-system';
import { createHouseRT01 } from '@/game/map/littleroot_town/houses/house-01';
import { createHouseRT01F2 } from '@/game/map/littleroot_town/houses/house-01-f2';
import { createHouseRT02 } from '@/game/map/littleroot_town/houses/house-02';
import { createHouseRT02F2 } from '@/game/map/littleroot_town/houses/house-02-f2';
import { createHouseRTLab } from '@/game/map/littleroot_town/houses/lab';

@Injectable()
export class WorldManager {
    private currentMapNode!: MapNode;
    private currentMap: TileMap;
    private maps = new Map<string, MapNode>();

    private gameStateManager: GameStateManager;
    private camera: Camera;
    private collisionSystem: CollisionSystem;
    private eventSystem: EventSystem;

    constructor() {
        const gameContext = GameContext.getInstance();
        this.gameStateManager = gameContext.getBean(GameStateManager);
        this.camera = gameContext.getBean(Camera);
        this.collisionSystem = gameContext.getBean(CollisionSystem);
        this.eventSystem = gameContext.getBean(EventSystem);
    }

    async initialize() {
        await this.buildWorldGraph();
        await this.loadMap();
        this.setupTransitionListeners();
    }

    private async buildWorldGraph() {
        this.maps.set('little_root_town', {
            id: 'little_root_town',
            name: 'Root Town',
            loader: createLittleRootTown,
            type: 'OPEN_WORLD',
            spawnPoints: new Map([
                [
                    'little_root_town_house01_f1',
                    { spawnPosition: { x: 272, y: 272 }, playerPosition: 'up' },
                ],
                [
                    'little_root_town_house02_f1',
                    { spawnPosition: { x: 272, y: 272 }, playerPosition: 'up' },
                ],
                [
                    'little_root_town_lab',
                    { spawnPosition: { x: 208, y: 400 }, playerPosition: 'up' },
                ],
                [
                    'route_101',
                    { spawnPosition: { x: 496, y: 816 }, playerPosition: 'up' },
                ],
            ]),
        });

        this.maps.set('little_root_town_house01_f1', {
            id: 'little_root_town_house01_f1',
            name: 'Home F1',
            loader: createHouseRT01,
            type: 'INTERIOR',
            spawnPoints: new Map([
                [
                    'little_root_town',
                    {
                        spawnPosition: { x: 304, y: 368 },
                        playerPosition: 'down',
                    },
                ],
                [
                    'little_root_town_house01_f2',
                    {
                        spawnPosition: { x: 304, y: 80 },
                        playerPosition: 'down',
                    },
                ],
            ]),
        });

        this.maps.set('little_root_town_house01_f2', {
            id: 'little_root_town_house01_f2',
            name: 'Home F2',
            loader: createHouseRT01F2,
            type: 'INTERIOR',
            spawnPoints: new Map([
                [
                    'little_root_town_house01_f1',
                    {
                        spawnPosition: { x: 272, y: 112 },
                        playerPosition: 'down',
                    },
                ],
            ]),
        });

        this.maps.set('little_root_town_house02_f1', {
            id: 'little_root_town_house02_f1',
            name: 'RT House 02 F1',
            loader: createHouseRT02,
            type: 'INTERIOR',
            spawnPoints: new Map([
                [
                    'little_root_town',
                    {
                        spawnPosition: { x: 624, y: 368 },
                        playerPosition: 'down',
                    },
                ],
                [
                    'little_root_town_house02_f2',
                    {
                        spawnPosition: { x: 304, y: 80 },
                        playerPosition: 'down',
                    },
                ],
            ]),
        });

        this.maps.set('little_root_town_house02_f2', {
            id: 'little_root_town_house02_f2',
            name: 'RT House 02 F1',
            loader: createHouseRT02F2,
            type: 'INTERIOR',
            spawnPoints: new Map([
                [
                    'little_root_town_house02_f1',
                    {
                        spawnPosition: { x: 272, y: 112 },
                        playerPosition: 'down',
                    },
                ],
            ]),
        });

        this.maps.set('little_root_town_lab', {
            id: 'little_root_town_lab',
            name: 'RT Lab',
            loader: createHouseRTLab,
            type: 'INTERIOR',
            spawnPoints: new Map([
                [
                    'little_root_town',
                    {
                        spawnPosition: { x: 368, y: 688 },
                        playerPosition: 'down',
                    },
                ],
            ]),
        });

        this.maps.set('route_101', {
            id: 'route_101',
            name: 'Route 101',
            loader: createRoute101,
            type: 'OPEN_WORLD',
            spawnPoints: new Map([
                [
                    'little_root_town',
                    {
                        spawnPosition: { x: 496, y: 16 },
                        playerPosition: 'down',
                    },
                ],
            ]),
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

    private setupTransitionListeners() {
        const eventSystem = GameContext.getInstance().getBean(EventSystem);
        eventSystem.on(
            'MAP_TRANSITION_CLOSED',
            (data: { targetMapId: string }) =>
                this.handleMapLoad(data.targetMapId)
        );
    }

    private async handleMapLoad(targetMapId: string) {
        const spawnPoint = this.currentMapNode.spawnPoints?.get(targetMapId);
        if (!spawnPoint) throw new Error('Spawn point invalid');

        this.gameStateManager.updateState((state) => ({
            ...state,
            player: {
                ...state.player,
                position: spawnPoint.spawnPosition,
                spritePosition: spawnPoint.playerPosition,
                canMove: false,
                hidden: false,
            },
            world: { currentMap: targetMapId },
        }));

        await this.loadMap();

        const worldName =
            this.currentMapNode.type === 'OPEN_WORLD'
                ? this.currentMapNode.name
                : null;
        this.eventSystem.emit('MAP_TRANSITION_READY', {});
    }

    update(deltaTime: number): void {
        this.currentMap.update(deltaTime);
    }

    render(priority: LayerPriority): void {
        this.currentMap.render(priority);
    }

    getMapData(mapId: string): MapNode | null {
        return this.maps.get(mapId) ?? null;
    }
}
