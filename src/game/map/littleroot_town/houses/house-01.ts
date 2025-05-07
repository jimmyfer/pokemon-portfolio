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
import { PlayerPositionTriggerCondition } from '@/effects/trigger-conditions/player-position';

export async function createHouseRT01() {
    const assetManager = GameContext.getInstance().getBean(AssetManager);
    const sprites = assetManager.getSpriteSheet('sprites');

    const MapTransitionEventRT: MapTransitionEvent = {
        type: 'MAP_TRANSITION',
        from: 'little_root_town_house01_f1',
        to: 'little_root_town',
    };

    const MapTransitionEventF2: MapTransitionEvent = {
        type: 'MAP_TRANSITION',
        from: 'little_root_town_house01_f1',
        to: 'little_root_town_house01_f2',
    };

    const areaConditionToRT = new AreaTriggerCondition(
        { x: 8, y: 8, width: 1, height: 1 },
        32
    );

    const areaConditionToF2 = new AreaTriggerCondition(
        { x: 8, y: 3, width: 1, height: 1 },
        32
    );

    const playerEffect = new PlayerMovementEffect(
        { x: 8, y: 2 },
        MapTransitionEventF2
    );

    const keyConditionDown = new KeyPressTriggerCondition('ArrowDown');

    const keyConditionUp = new KeyPressTriggerCondition('ArrowUp');

    const playerUpPosition = new PlayerPositionTriggerCondition([
        'walk-up',
        'up-align',
    ]);
    const playerDownPosition = new PlayerPositionTriggerCondition([
        'walk-down',
        'down-align',
    ]);

    const compositeConditionToRT = new CompositeTriggerCondition([
        areaConditionToRT,
        keyConditionDown,
        playerDownPosition,
    ]);

    const compositeConditionToF2 = new CompositeTriggerCondition([
        areaConditionToF2,
        keyConditionUp,
        playerUpPosition,
    ]);

    return new TileMapBuilder(16, 2)
        .setTileset(sprites)
        .createLayer('collision', 11, 9, true, LayerPriority.BACKGROUND)
        .buildCollisionRow(1, 0, 7)
        .buildCollisionRow(2, 0, 5)
        .buildCollisionRow(2, 7, 4)
        .buildCollisionRow(4, 2, 3)
        .buildCollisionRow(6, 3, 2)
        .buildCollisionRow(7, 3, 2)
        .createLayer('ground', 11, 9, false, LayerPriority.BACKGROUND)
        .fillArea(19553, 0, 0, 32, 32)
        .buildSpriteRow([19556], 0, 0, 0, 0)
        .buildSpriteObjectRow([[19556], [19572]], 0, 0, 0, 0, 7)
        .buildSpriteObjectRow([[19556], [19572]], 1, 8, 0, 0, 7)
        .buildSpriteObjectRow([[19558], [19574]], 1, 7, 0, 0, 1)
        .buildSpriteObjectRow([[19560], [19576]], 1, 10, 0, 0, 1)
        .buildSingleSprite(19604, 0, 7)
        .cleanSprite(0, 8)
        .cleanSprite(0, 9)
        .cleanSprite(0, 10)
        .createLayer('furniture', 11, 9, false, LayerPriority.BACKGROUND_LOW)
        .buildSpriteObjectRow([[19501, 19502]], 8, 8, 0, 5, 1)
        .buildSpriteObject(
            [
                [19585, 19586],
                [19601, 19602],
            ],
            2,
            8,
            false,
            -17,
            -20
        )
        .buildSpriteObject([[19450], [19466]], 1, 0, false, 0, 0)
        .buildSpriteObject(
            [
                [19452, 19453],
                [19468, 19469],
            ],
            1,
            1,
            false,
            5,
            0
        )
        .buildSpriteObject(
            [
                [19457, 19458],
                [19473, 19474],
            ],
            1,
            3,
            false,
            0,
            0
        )
        .buildSpriteObject(
            [
                [19459, 19460],
                [19475, 19476],
            ],
            3,
            2,
            false,
            0,
            10
        )
        .buildSpriteObject([[19461], [19477]], 3, 4, false, 0, 10)
        .buildSpriteObject(
            [
                [19494, 19495, 19496, 19497, 19498, 19499],
                [19510, 19511, 19512, 19513, 19514, 19515],
                [19526, 19527, 19528, 19529, 19530, 19531],
            ],
            6,
            1,
            false,
            0,
            -10
        )
        .createLayer('furniture_02', 11, 9, false, LayerPriority.BACKGROUND_MED)
        .buildSpriteObject(
            [
                [19505, 19506, 19507, 19508],
                [19521, 19522, 19523, 19524],
            ],
            6,
            2,
            false,
            0,
            5
        )
        .createLayer('furniture_03', 11, 9, false, LayerPriority.FOREGROUND)
        .buildSpriteRow([19459, 19460], 3, 2, 0, 10)
        .buildSpriteRow([19461], 3, 4, 0, 10)
        .createLayer('effects', 11, 9, false, LayerPriority.BACKGROUND)
        .addMapTransitionTrigger([compositeConditionToRT], MapTransitionEventRT)
        .addEnterIntoBuildingTriggerEffect(
            [playerEffect],
            [PlayerMovementSequence.WALK_UP],
            [compositeConditionToF2],
            500
        )
        .build();
}
