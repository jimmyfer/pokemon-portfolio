import { GameState } from '@/types/pokemon-state';
import { Injectable } from '../decorators/injectable';

@Injectable()
export class GameStateManager {
    private state: GameState;

    private constructor() {
        this.state = this.initialState();
    }

    private initialState(): GameState {
        return {
            player: {
                position: { x: 500, y: 500 },
                spritePosition: 'down',
                hidden: false,
                canMove: true,
            },
            world: {
                currentMap: 'little_root_town',
            },
        };
    }

    public getState(): Readonly<GameState> {
        return Object.freeze(structuredClone(this.state));
    }

    public updateState(updater: (state: GameState) => GameState): void {
        this.state = updater(structuredClone(this.state));
        this.saveToPersistentStorage();
        this.notifyObservers();
    }

    private saveToPersistentStorage(): void {
        const { player, world } = this.state;
        const filteredState = {
            player: {
                position: player.position,
            },
            world,
        };
        localStorage.setItem('gameState', JSON.stringify(filteredState));
    }

    public loadFromPersistentStorage(): void {
        const saved = localStorage.getItem('gameState');
        if (saved) {
            const loadedState = JSON.parse(saved);
            this.state = {
                ...this.state,
                ...loadedState,
                player: {
                    ...this.state.player,
                    ...loadedState.player,
                },
            };
        }
    }

    private observers: Function[] = [];

    public subscribe(observer: Function): void {
        this.observers.push(observer);
    }

    private notifyObservers(): void {
        this.observers.forEach((observer) => observer(this.getState()));
    }

    public lockPlayerMovement() {
        this.updateState((state) => ({
            ...state,
            player: { ...state.player, canMove: false },
        }));
    }

    public unlockPlayerMovement() {
        this.updateState((state) => ({
            ...state,
            player: { ...state.player, canMove: true },
        }));
    }
}
