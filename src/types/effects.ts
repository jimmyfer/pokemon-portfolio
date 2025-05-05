export enum PlayerJumpSequence {
    JUMP_DOWN = 'JUMP_DOWN',
}

export enum PlayerMovementSequence {
    WALK_UP = 'WALK_UP',
}

export enum DoorSequence {
    OPEN_EFFECT = 'OPEN_EFFECT',
    CLOSE_EFFECT = 'CLOSE_EFFECT',
}

export enum LabDoorSequence {
    OPEN_EFFECT = 'OPEN_EFFECT',
    CLOSE_EFFECT = 'CLOSE_EFFECT',
}

export type SequenceTypes =
    | DoorSequence
    | LabDoorSequence
    | PlayerMovementSequence
    | PlayerJumpSequence;
