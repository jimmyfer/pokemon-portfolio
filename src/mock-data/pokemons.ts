import { SpeciesData } from '@/types/pokemon';

export const SPECIES_MAP: { [key: string]: SpeciesData } = {
    treecko: {
        baseStats: {
            hp: 40,
            attack: 45,
            defense: 35,
            speed: 70,
            specialAttack: 65,
            specialDefense: 55,
        },
        moves: [
            { moveId: 'pound', level: 1 },
            { moveId: 'leer', level: 1 },
            { moveId: 'quickattack', level: 7 },
        ],
        img: {
            front: 'assets/html/pokemons/front/front_252.png',
            back: 'assets/html/pokemons/back/back_252.png',
        },
    },
    torchic: {
        baseStats: {
            hp: 45,
            attack: 60,
            defense: 40,
            speed: 45,
            specialAttack: 70,
            specialDefense: 50,
        },
        moves: [
            { moveId: 'scratch', level: 1 },
            { moveId: 'growl', level: 1 },
            { moveId: 'ember', level: 7 },
        ],
        img: {
            front: 'assets/html/pokemons/front/front_255.png',
            back: 'assets/html/pokemons/back/back_255.png',
        },
    },
    mudkip: {
        baseStats: {
            hp: 50,
            attack: 70,
            defense: 50,
            speed: 40,
            specialAttack: 50,
            specialDefense: 50,
        },
        moves: [
            { moveId: 'tackle', level: 1 },
            { moveId: 'growl', level: 1 },
            { moveId: 'mudslap', level: 7 },
        ],
        img: {
            front: 'assets/html/pokemons/front/front_258.png',
            back: 'assets/html/pokemons/back/back_258.png',
        },
    },
    poochyena: {
        baseStats: {
            hp: 35,
            attack: 55,
            defense: 35,
            speed: 35,
            specialAttack: 30,
            specialDefense: 30,
        },
        moves: [
            { moveId: 'tackle', level: 1 },
            { moveId: 'bite', level: 5 },
            { moveId: 'howl', level: 9 },
        ],
        img: {
            front: 'assets/html/pokemons/front/front_261.png',
            back: 'assets/html/pokemons/back/back_261.png',
        },
    },
    zigzagoon: {
        baseStats: {
            hp: 38,
            attack: 30,
            defense: 41,
            speed: 60,
            specialAttack: 30,
            specialDefense: 41,
        },
        moves: [
            { moveId: 'tackle', level: 1 },
            { moveId: 'tailwhip', level: 4 },
            { moveId: 'quickattack', level: 7 },
        ],
        img: {
            front: 'assets/html/pokemons/front/front_263.png',
            back: 'assets/html/pokemons/back/back_263.png',
        },
    },
    wurmple: {
        baseStats: {
            hp: 45,
            attack: 45,
            defense: 35,
            speed: 20,
            specialAttack: 20,
            specialDefense: 30,
        },
        moves: [
            { moveId: 'tackle', level: 1 },
            { moveId: 'stringshot', level: 5 },
            { moveId: 'poisonpowder', level: 10 },
        ],
        img: {
            front: 'assets/html/pokemons/front/front_265.png',
            back: 'assets/html/pokemons/back/back_265.png',
        },
    },
};
