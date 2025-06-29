import { GameState } from '@/types/pokemon-state';
import { Injectable } from '../decorators/injectable';
import { Pokemon } from '@/types/pokemon';
import { initialState } from '@/data/initial-state';

@Injectable()
export class GameStateManager {
    private state: GameState;

    private constructor() {
        this.state = initialState;
    }

    public getState(): Readonly<GameState> {
        return Object.freeze(structuredClone(this.state));
    }

    public updateState(updater: (state: GameState) => GameState): void {
        this.state = updater(structuredClone(this.state));
        this.saveToPersistentStorage();
        this.notifyObservers();
    }

    public async asyncUpdateState(
        updater: (state: GameState) => Promise<GameState>
    ): Promise<void> {
        this.state = await updater(structuredClone(this.state));
        this.saveToPersistentStorage();
        this.notifyObservers();
    }

    private saveToPersistentStorage(): void {
        const { player, world } = this.state;
        const filteredState = {
            player: {
                party: player.party,
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

    public addToParty(pokemon: Pokemon): void {
        this.updateState((state) => {
            if (state.player.party.length < 6) {
                state.player.party.push(pokemon);
            } else {
                state.player.pc.push(pokemon);
            }
            return state;
        });
    }

    public healParty(): void {
        this.updateState((state) => ({
            ...state,
            pokemon: {
                ...state.player,
                party: state.player.party.map((p) => ({
                    ...p,
                    currentHP: p.stats.hp,
                    status: 'healthy',
                })),
            },
        }));
    }
}
