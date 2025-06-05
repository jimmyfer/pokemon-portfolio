import { GameStateManager } from './game-state-manager';
import { EventSystem } from './event-system';
import {
    Encounter,
    EncounterTable,
    LearnableMove,
    Move,
    Pokemon,
    SpeciesData,
    Stats,
} from '../../types/pokemon';
import { Vector2D } from '@/types/sprite-sheet';
import { Injectable } from '../decorators/injectable';
import { GameContext } from '../engine/game-context';
import { WorldManager } from '../engine/world-manager';
import { SPECIES_MAP } from '@/mock-data/pokemons';
import { MOVES_MAP } from '@/mock-data/moves';

@Injectable()
export class EncounterSystem {
    private encounterChance = 0.3;
    private lastEncounterPosition: Vector2D | null = null;

    private gameStateManager: GameStateManager;
    private eventSystem: EventSystem;
    private worldManager: WorldManager;

    constructor() {
        const gameContext = GameContext.getInstance();
        this.gameStateManager = gameContext.getBean(GameStateManager);
        this.eventSystem = gameContext.getBean(EventSystem);
        this.worldManager = gameContext.getBean(WorldManager);
    }

    public initialize(): void {
        this.eventSystem.on('PLAYER_MOVED', (pos) => this.checkEncounter(pos));
    }

    private getCurrentMapEncounters(): EncounterTable | undefined {
        const currentMapId = this.gameStateManager.getState().world.currentMap;
        const currentMapNode = this.worldManager.getMapData(currentMapId);

        if (!currentMapNode) return undefined;

        return currentMapNode.encounterTable;
    }

    private checkEncounter(position: Vector2D) {
        const currentTile = this.getTileType(position);

        if (
            currentTile === 'grass' &&
            !this.isSameTileAsLastEncounter(position)
        ) {
            if (Math.random() < this.encounterChance) {
                const encounterTable = this.getCurrentMapEncounters()?.grass;
                if (encounterTable) {
                    const encounter = this.selectEncounter(encounterTable);
                    this.triggerEncounter(encounter);
                    this.lastEncounterPosition = position;
                }
            }
        }
    }

    private selectEncounter(encounters: Encounter[]): Encounter {
        const totalRarity = encounters.reduce((sum, e) => sum + e.rarity, 0);
        const random = Math.random() * totalRarity;

        let cumulative = 0;
        for (const entry of encounters) {
            cumulative += entry.rarity;
            if (random <= cumulative) {
                return entry;
            }
        }
        return encounters[0];
    }

    private triggerEncounter(encounter: Encounter) {
        const level =
            Math.floor(
                Math.random() * (encounter.maxLevel - encounter.minLevel + 1)
            ) + encounter.minLevel;

        const wildPokemon = this.generateWildPokemon(encounter.species, level);
        this.eventSystem.emit('POKEMON_ENCOUNTER', wildPokemon);
        this.gameStateManager.lockPlayerMovement();
    }

    private getTileType(position: Vector2D): string {
        return this.worldManager.getCurrentWorldTileType(position);
    }

    private isSameTileAsLastEncounter(pos: Vector2D): boolean {
        if (!this.lastEncounterPosition) return false;
        return (
            Math.floor(pos.x) === Math.floor(this.lastEncounterPosition.x) &&
            Math.floor(pos.y) === Math.floor(this.lastEncounterPosition.y)
        );
    }

    private generateWildPokemon(species: string, level: number): Pokemon {
        const speciesData = this.getSpeciesData(species);

        const stats = this.calculateStats(speciesData.baseStats, level);

        const moves = this.getAvailableMoves(speciesData.moves, level);

        return {
            id: `wild-${Date.now()}`,
            species,
            level,
            experience: 0,
            currentHP: stats.hp,
            stats: stats,
            moves: moves.slice(0, 4),
        };
    }

    private getSpeciesData(species: string): SpeciesData {
        if (!SPECIES_MAP[species]) {
            throw new Error(`Species not found: ${species}`);
        }

        return SPECIES_MAP[species];
    }

    private calculateStats(baseStats: Stats, level: number): Stats {
        return {
            hp: Math.floor((2 * baseStats.hp * level) / 100 + level + 10),
            attack: Math.floor((2 * baseStats.attack * level) / 100 + 5),
            defense: Math.floor((2 * baseStats.defense * level) / 100 + 5),
            speed: Math.floor((2 * baseStats.speed * level) / 100 + 5),
            specialAttack: Math.floor(
                (2 * baseStats.specialAttack * level) / 100 + 5
            ),
            specialDefense: Math.floor(
                (2 * baseStats.specialDefense * level) / 100 + 5
            ),
        };
    }

    private getAvailableMoves(moves: LearnableMove[], level: number): Move[] {
        const availableMoves = moves
            .filter((m) => m.level <= level)
            .sort((a, b) => b.level - a.level);

        return availableMoves.map((m) => this.getMoveData(m.moveId));
    }

    private getMoveData(moveId: string): Move {
        return MOVES_MAP[moveId];
    }
}
