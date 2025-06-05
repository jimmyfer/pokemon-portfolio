import { GameState } from '@/types/pokemon-state';
import { Injectable } from '../decorators/injectable';
import { Pokemon } from '@/types/pokemon';

@Injectable()
export class GameStateManager {
    private state: GameState;

    private constructor() {
        this.state = this.initialState();
    }

    private initialState(): GameState {
        return {
            player: {
                party: [
                    {
                        id: 'initial-1717123456789',
                        species: 'treecko',
                        nickname: 'None',
                        level: 5,
                        experience: 0,
                        stats: {
                            hp: 19,
                            attack: 10,
                            defense: 9,
                            speed: 14,
                            specialAttack: 12,
                            specialDefense: 9,
                        },
                        currentHP: 19,
                        moves: [
                            {
                                id: 'pound',
                                name: 'Pound',
                                type: 'Normal',
                                power: 40,
                                accuracy: 100,
                                pp: 35,
                                maxPP: 35,
                            },
                            {
                                id: 'leer',
                                name: 'Leer',
                                type: 'Normal',
                                power: 0,
                                accuracy: 100,
                                pp: 30,
                                maxPP: 30,
                            },
                        ],
                        status: 'healthy',
                    },
                ],
                position: { x: 500, y: 500 },
                spritePosition: 'down',
                hidden: false,
                canMove: true,
                pc: [],
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
