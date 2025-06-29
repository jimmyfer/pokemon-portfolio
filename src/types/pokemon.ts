export interface Pokemon {
    id: string;
    species: string;
    level: number;
    experience: number;
    stats: Stats;
    currentHP: number;
    moves: Move[];
    status?:
        | 'healthy'
        | 'poisoned'
        | 'paralyzed'
        | 'burned'
        | 'asleep'
        | 'frozen';
}

export interface Encounter {
    species: string;
    minLevel: number;
    maxLevel: number;
    rarity: number;
}

export interface EncounterTable {
    grass: Encounter[];
    water?: Encounter[];
    cave?: Encounter[];
}

export interface SpeciesData {
    baseStats: Stats;
    dexNumber: number;
    moves: LearnableMove[];
    img: {
        front: string;
        back: string;
    };
}

export interface LearnableMove {
    moveId: string;
    level: number;
}

export interface Stats {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    specialAttack: number;
    specialDefense: number;
}

export interface Move {
    id: string;
    name: string;
    type: string;
    power: number;
    pp: number;
    maxPP: number;
    accuracy: number;
}

export interface BattleState {
    phase:
        | 'start'
        | 'player-input'
        | 'attack'
        | 'end'
        | 'flee'
        | 'player-must-switch';
    playerPokemon: Pokemon;
    wildPokemon: Pokemon;
    messages: BattleMessage[];
    battleEnded: boolean;
    isDialogUpdate: boolean;
}

export interface BattleMessage {
    message: string;
    manualAvance: boolean;
}

export type BattleAction = {
    type: 'attack' | 'capture' | 'switch' | 'flee';
    move?: Move;
    pokemon?: Pokemon;
};

export interface GameItem {
    id: string;
    name: string;
    quantity: number;
    type: 'pokeball' | 'potion' | 'berry';
}
