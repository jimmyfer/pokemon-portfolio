export const SkinType = {
    WOMAN_01: 'woman_01',
    WOMAN_02: 'woman_02',
} as const;

export type SkinType = (typeof SkinType)[keyof typeof SkinType];

export const NPCSkins: Record<
    SkinType,
    { animations: { [name: string]: number[][][] } }
> = {
    [SkinType.WOMAN_01]: {
        animations: {
            idle: [[[0]]],
            up: [[[1]]],
            down: [[[0]]],
            left: [[[2]]],
            right: [[[2]]],
            walkDown: [[[3]], [[0]], [[4]], [[0]]],
            walkUp: [[[5]], [[1]], [[6]], [[1]]],
            walkLeft: [[[7]], [[2]], [[8]], [[2]]],
            walkRight: [[[7]], [[2]], [[8]], [[2]]],
        },
    },
    [SkinType.WOMAN_02]: {
        animations: {
            idle: [[[20]]],
            up: [[[21]]],
            down: [[[20]]],
            left: [[[22]]],
            right: [[[22]]],
            walkDown: [[[23]], [[20]], [[24]], [[20]]],
            walkUp: [[[25]], [[21]], [[26]], [[21]]],
            walkLeft: [[[27]], [[22]], [[28]], [[22]]],
            walkRight: [[[27]], [[22]], [[28]], [[22]]],
        },
    },
};
