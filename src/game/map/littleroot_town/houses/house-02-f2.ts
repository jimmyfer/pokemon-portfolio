import { GameContext } from '@/core/engine/game-context';
import { AssetManager } from '@/assets/assetsManager';
import { TileMapBuilder } from '@/rendering/tile-map-builder';
import { LayerPriority } from '@/types/render-types';
import { AreaTriggerCondition } from '@/effects/trigger-conditions/area';
import { KeyPressTriggerCondition } from '@/effects/trigger-conditions/keypress';
import { CompositeTriggerCondition } from '@/effects/trigger-conditions/composite';
import { MapTransitionEvent } from '@/types/game-event';
import { PlayerMovementEffect } from '@/effects/sprites-effects/player-movement';
import { PlayerMovementSequence } from '@/types/effects';

export async function createHouseRT02F2() {
    const assetManager = GameContext.getInstance().getBean(AssetManager);
    const sprites = assetManager.getSpriteSheet('sprites');

    const MapTransitionEvent: MapTransitionEvent = {
        type: 'MAP_TRANSITION',
        from: 'little_root_town_house02_f2',
        to: 'little_root_town_house02_f1',
    };

    const areaCondition = new AreaTriggerCondition(
        { x: 9, y: 2, width: 1, height: 1 },
        32
    );

    const playerEffect = new PlayerMovementEffect(
        { x: 9, y: 1 },
        MapTransitionEvent
    );

    const bedCondition = new AreaTriggerCondition(
        { x: 0, y: 4, width: 3, height: 1 },
        32
    );

    const keyCondition = new KeyPressTriggerCondition('ArrowUp');

    const compositeCondition = new CompositeTriggerCondition([
        areaCondition,
        keyCondition,
    ]);

    return new TileMapBuilder(16, 2)
        .setTileset(sprites)
        .createLayer('collision', 11, 8, true, LayerPriority.BACKGROUND)
        .buildCollisionRow(1, 0, 11)
        .buildCollisionRow(2, 4, 2)
        .buildCollisionRow(5, 1, 1)
        .createLayer('ground', 11, 8, false, LayerPriority.BACKGROUND)
        .fillArea(19553, 0, 0, 32, 32)
        .buildSpriteObjectRow([[19556], [19572]], 0, 0, 0, 0, 11)
        .createLayer('furniture', 11, 8, false, LayerPriority.BACKGROUND_LOW)
        .buildSpriteObject(
            [
                [19562, 19563],
                [19578, 19579],
            ],
            1,
            0,
            false,
            0,
            -15
        )
        .buildSpriteObject([[19461], [19477]], 1, 5)
        .buildSingleSprite(19606, 2, 4)
        .buildSpriteObject(
            [
                [19494, 19495, 19497, 19498, 19499],
                [19510, 19511, 19513, 19514, 19515],
                [19510, 19511, 19513, 19514, 19515],
                [19526, 19527, 19529, 19530, 19531],
            ],
            3,
            5,
            false,
            0,
            15
        )
        .buildSingleSprite(19605, 0, 2, false, false, 0, 5)
        .buildSingleSprite(19621, 0, 6, false, false, 0, 20)
        .buildSpriteObject(
            [
                [19517, 19518],
                [19533, 19534],
            ],
            4,
            1,
            false,
            -16,
            -2
        )
        .createLayer('furniture_01', 11, 8, false, LayerPriority.BACKGROUND_LOW)
        .buildSingleSprite(19505, 2, 0, false, false, 0, 5)
        .createLayer('furniture_02', 11, 8, false, LayerPriority.BACKGROUND_LOW)
        .buildSpriteObject(
            [
                [19617, 19618],
                [19633, 19634],
            ],
            0,
            9,
            false,
            -17,
            12
        )
        .createLayer('furniture_03', 11, 8, false, LayerPriority.FOREGROUND)
        .buildSpriteObject([[19549, 19550]], 4, 1, false, -16, -2)
        .createLayer('effects', 11, 9, false, LayerPriority.FOREGROUND)
        .buildSingleSprite(19533, 5, 1, false, false, -16, -2, bedCondition)
        .buildSingleSprite(19534, 5, 2, false, false, -16, -2, bedCondition)
        .createLayer('effects_01', 11, 9, false, LayerPriority.BACKGROUND)
        .addEnterIntoBuildingTriggerEffect(
            [playerEffect],
            [PlayerMovementSequence.WALK_UP],
            [compositeCondition],
            500
        )
        .build();
}
