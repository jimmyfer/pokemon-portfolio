import {
    Pokemon,
    Move,
    Stats,
    BattleAction,
    BattleState,
} from '@/types/pokemon';
import { EventSystem } from './event-system';
import { GameStateManager } from './game-state-manager';
import { Injectable } from '../decorators/injectable';
import { GameContext } from '../engine/game-context';

@Injectable()
export class BattleSystem {
    private inBattle = false;
    private battleState!: BattleState;

    private gameStateManager: GameStateManager;
    private eventSystem: EventSystem;

    constructor() {
        const gameContext = GameContext.getInstance();
        this.gameStateManager = gameContext.getBean(GameStateManager);
        this.eventSystem = gameContext.getBean(EventSystem);
    }

    public initialize(): void {
        this.eventSystem.on('POKEMON_ENCOUNTER', async (pokemon: Pokemon) => {
            this.setUpBattle(pokemon);
        });

        this.eventSystem.on('BATTLE_READY', async (pokemon: Pokemon) => {
            this.startBattle();
        });

        this.eventSystem.onAsync(
            'BATTLE_ACTION',
            async (action: BattleAction) => {
                await this.handlePlayerAction(action);
            }
        );
        this.eventSystem.on('BATTLE_CLOSED_TRANSITION_COMPLETE', () => {
            this.gameStateManager.unlockPlayerMovement();
        });
    }

    private async setUpBattle(wildPokemon: Pokemon): Promise<void> {
        this.inBattle = true;

        const playerPokemon = this.getFirstAvailablePokemon();

        this.battleState = {
            phase: 'start',
            playerPokemon,
            wildPokemon,
            messages: [],
            battleEnded: false,
            isDialogUpdate: true,
        };

        this.eventSystem.emit('BATTLE_TRANSITION', {});

        this.gameStateManager.lockPlayerMovement();
        this.updateBattleState(true);
    }

    private async startBattle(): Promise<void> {
        await this.addBattleMessage(
            `A wild ${this.battleState.wildPokemon.species} appeared!`,
            true
        );

        if (
            this.inBattle &&
            this.battleState &&
            !this.battleState.battleEnded
        ) {
            this.battleState.messages.push({
                message: `What will ${this.battleState.playerPokemon.species.toUpperCase()} do?`,
                manualAvance: false,
            });
            this.battleState.phase = 'player-input';
            this.updateBattleState();
        }
    }

    private getFirstAvailablePokemon(): Pokemon {
        const party = this.gameStateManager.getState().player.party;
        return party.find((p) => p.currentHP > 0) || party[0];
    }

    private async updateBattleState(
        isDialogUpdate: boolean = false
    ): Promise<void> {
        if (this.battleState) {
            this.battleState.isDialogUpdate = isDialogUpdate;
            await this.eventSystem.emit(
                'BATTLE_STATE_UPDATE',
                this.battleState
            );
        }
    }

    private async addBattleMessage(
        message: string,
        manualAvance: boolean = false
    ): Promise<void> {
        if (this.battleState) {
            this.battleState.messages.push({
                message,
                manualAvance,
            });
            await this.updateBattleState(true);
        }
    }

    private async handlePlayerAction(action: BattleAction): Promise<void> {
        if (!this.inBattle || !this.battleState || this.battleState.battleEnded)
            return;

        const playerPokemon = this.battleState.playerPokemon;
        const wildPokemon = this.battleState.wildPokemon;

        switch (action.type) {
            case 'attack':
                const chosenMove = action.move!;
                const playerGoesFirst =
                    playerPokemon.stats.speed >= wildPokemon.stats.speed;

                if (playerGoesFirst) {
                    await this.executeMove(
                        playerPokemon,
                        wildPokemon,
                        chosenMove
                    );
                    if (this.checkFainted(wildPokemon)) {
                        await this.handleWildPokemonFainted();
                        break;
                    }
                    if (this.battleState.battleEnded) break;

                    await this.executeEnemyTurn();
                    if (this.checkFainted(playerPokemon)) {
                        this.handlePlayerPokemonFainted();
                        break;
                    }
                } else {
                    await this.executeEnemyTurn();
                    if (this.checkFainted(playerPokemon)) {
                        this.handlePlayerPokemonFainted();
                        break;
                    }
                    if (this.battleState.battleEnded) break;

                    await this.executeMove(
                        playerPokemon,
                        wildPokemon,
                        chosenMove
                    );
                    if (this.checkFainted(wildPokemon)) {
                        this.handleWildPokemonFainted();
                        break;
                    }
                }
                break;

            case 'capture':
                console.log('Capture action selected (stub)');
                break;

            case 'switch':
                console.log('Switch action selected (stub)');
                break;

            case 'flee':
                this.battleState.phase = 'flee';
                await this.addBattleMessage('You escaped the battle!', true);
                this.endBattle();
                break;
        }

        if (
            this.inBattle &&
            this.battleState &&
            !this.battleState.battleEnded
        ) {
            this.battleState.phase = 'player-input';
            this.updateBattleState();
        }
    }

    private async executeEnemyTurn(): Promise<void> {
        if (!this.inBattle || !this.battleState || this.battleState.battleEnded)
            return;

        const enemyMove = this.selectRandomMove(
            this.battleState.wildPokemon.moves
        );

        if (enemyMove) {
            await this.executeMove(
                this.battleState.wildPokemon,
                this.battleState.playerPokemon,
                enemyMove
            );
        } else {
            this.addBattleMessage(
                `${this.battleState.wildPokemon.species.toUpperCase()} doesn’t know what to do!`
            );
            await this.delay(1000);
        }
    }

    private async executeMove(
        attacker: Pokemon,
        defender: Pokemon,
        move: Move
    ): Promise<void> {
        if (!this.inBattle || !this.battleState || this.battleState.battleEnded)
            return;

        this.battleState.phase = 'attack';
        await this.addBattleMessage(
            `${attacker.species.toUpperCase()} used ${move.name.toUpperCase()}!`
        );

        if (Math.random() * 100 > move.accuracy) {
            await this.addBattleMessage('The attack missed!');
            this.updateBattleState();
        } else {
            const damage = this.calculateDamage(attacker, defender, move);
            defender.currentHP = Math.max(0, defender.currentHP - damage);

            if (damage > 0) {
                await this.addBattleMessage(
                    `It did ${damage} points of damage!`
                );
            } else if (move.power > 0) {
                await this.addBattleMessage(`"It didn’t have much effect...`);
            } else {
                await this.addBattleMessage(
                    `${move.name.toUpperCase()} was used.`
                );
            }

            if (defender.currentHP === 0) {
                await this.addBattleMessage(
                    `${defender.species.toUpperCase()} has fainted!`
                );
            }
            this.updateBattleState();
        }

        await this.delay(1500);
    }

    private calculateDamage(
        attacker: Pokemon,
        defender: Pokemon,
        move: Move
    ): number {
        const attackStat =
            move.type === 'physical'
                ? attacker.stats.attack
                : attacker.stats.specialAttack;

        const defenseStat =
            move.type === 'physical'
                ? defender.stats.defense
                : defender.stats.specialDefense;

        if (move.power === 0) {
            return 0;
        }

        const baseDamage = Math.floor(
            (((2 * attacker.level) / 5 + 2) *
                move.power *
                (attackStat / defenseStat)) /
                50 +
                2
        );

        return Math.floor(baseDamage * (0.85 + Math.random() * 0.15));
    }

    private checkFainted(pokemon: Pokemon): boolean {
        return pokemon.currentHP <= 0;
    }

    private async handleWildPokemonFainted(): Promise<void> {
        await this.awardExperience();
        this.endBattle();
    }

    private handlePlayerPokemonFainted(): void {
        this.addBattleMessage('Your Pokémon has fainted!');
        if (this.hasUsablePokemon()) {
            this.addBattleMessage('You must select another Pokémon.');
            // this.battleState.phase = 'player-must-switch';
            this.updateBattleState();
        } else {
            this.addBattleMessage('You have lost the battle!');
            this.endBattle();
        }
    }

    private hasUsablePokemon(): boolean {
        return this.gameStateManager
            .getState()
            .player.party.some((p) => p.currentHP > 0);
    }

    private async awardExperience(): Promise<void> {
        const experience = Math.floor(
            this.battleState.wildPokemon.level *
                100 *
                (this.battleState.wildPokemon.stats.hp / 7)
        );

        if (!experience || experience <= 0) return;

        await this.gameStateManager.asyncUpdateState(async (state) => {
            const pokemon = state.player.party.find(
                (p) =>
                    p.id === this.battleState.playerPokemon.id &&
                    p.currentHP > 0
            );
            if (pokemon) {
                await this.addBattleMessage(
                    `${pokemon.species.toUpperCase()} gained ${experience} Exp. Points!`
                );
                this.updateBattleState();
                pokemon.experience = (pokemon.experience || 0) + experience;
                await this.checkLevelUp(pokemon);
            }
            return state;
        });
    }

    private async checkLevelUp(pokemon: Pokemon): Promise<void> {
        const requiredExp = pokemon.level * 1000;
        if (pokemon.experience >= requiredExp) {
            pokemon.level++;
            pokemon.experience = pokemon.experience - requiredExp;
            await this.addBattleMessage(
                `${pokemon.species.toUpperCase()} leveled up to ${pokemon.level}!`
            );
            this.updateBattleState();
        }
    }

    private selectRandomMove(moves: Move[]): Move | undefined {
        if (!moves || moves.length === 0) return undefined;
        return moves[Math.floor(Math.random() * moves.length)];
    }

    private async delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    public endBattle(): void {
        if (!this.inBattle) return;

        this.inBattle = false;
        if (this.battleState) {
            this.battleState.battleEnded = true;
            this.battleState.phase = 'end';
        }
        this.eventSystem.emit('BATTLE_END', {});
        this.eventSystem.emit('BATTLE_CLOSED_TRANSITION', {});
        this.updateBattleState();
    }
}
