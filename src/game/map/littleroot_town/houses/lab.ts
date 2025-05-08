import { GameContext } from '@/core/engine/game-context';
import { AssetManager } from '@/assets/assetsManager';
import { TileMapBuilder } from '@/rendering/tile-map-builder';
import { LayerPriority } from '@/types/render-types';
import { AreaTriggerCondition } from '@/effects/trigger-conditions/area';
import { KeyPressTriggerCondition } from '@/effects/trigger-conditions/keypress';
import { CompositeTriggerCondition } from '@/effects/trigger-conditions/composite';
import { MapTransitionEvent } from '@/types/game-event';
import { PlayerPositionTriggerCondition } from '@/effects/trigger-conditions/player-position';

export async function createHouseRTLab() {
    const assetManager = GameContext.getInstance().getBean(AssetManager);
    const sprites = assetManager.getSpriteSheet('sprites');

    const MapTransitionEvent: MapTransitionEvent = {
        type: 'MAP_TRANSITION',
        from: 'little_root_town_lab',
        to: 'little_root_town',
    };

    const areaCondition = new AreaTriggerCondition(
        { x: 6, y: 12, width: 2, height: 1 },
        32
    );

    const keyConditionDown = new KeyPressTriggerCondition('ArrowDown');

    const playerDownPosition = new PlayerPositionTriggerCondition([
        'walk-down',
        'down-align',
        'down',
    ]);

    const compositeCondition = new CompositeTriggerCondition([
        areaCondition,
        keyConditionDown,
        playerDownPosition,
    ]);

    const bookcaseTrigger = new AreaTriggerCondition(
        { x: 0, y: 5, width: 5, height: 1 },
        32
    );

    return new TileMapBuilder(16, 2)
        .setTileset(sprites)
        .createLayer('collision', 13, 13, true, LayerPriority.BACKGROUND)
        .buildCollisionRow(1, 0, 13)
        .buildCollisionColum(0, 2, 2)
        .buildCollisionColum(2, 2, 1)
        .buildCollisionColum(12, 2, 6)
        .buildCollisionRec(3, 9, 2, 2)
        .buildCollisionRec(6, 10, 2, 2)
        .buildCollisionRec(9, 11, 3, 2)
        .buildCollisionRec(6, 0, 2, 4)
        .buildCollisionColum(0, 10, 2)
        .buildCollisionColum(1, 9, 3)
        .createLayer('ground', 13, 13, false, LayerPriority.BACKGROUND)
        .fillAreaWithTiles([
            [3037, 3038],
            [3053, 3054],
        ])
        .buildSpriteObjectRow([[19556], [19572]], 0, 0, 0, 0, 13)
        .createLayer('furniture', 13, 13, false, LayerPriority.BACKGROUND_LOW)
        .buildSpriteObjectRow(
            [
                [19611, 19612],
                [19627, 19628],
            ],
            1,
            0,
            0,
            -15
        )
        .buildSpriteObjectRow(
            [
                [19619, 19620],
                [19635, 19636],
            ],
            2,
            2,
            -13,
            -20
        )
        .buildSpriteObjectRow(
            [
                [19562, 19563],
                [19578, 19579],
            ],
            1,
            4,
            -30,
            -10
        )
        .buildSpriteObjectRow(
            [
                [19643, 19644, 19645, 19646],
                [19659, 19660, 19661, 19662],
            ],
            1,
            6,
            0,
            -2
        )
        .buildSingleSprite(19637, 2, 12)
        .buildSingleSprite(19637, 3, 12)
        .buildSingleSprite(19609, 3, 0, false, false, 0, -15)
        .buildSingleSprite(19593, 4, 0, false, false, 0, -30)
        .buildSingleSprite(19609, 4, 9, false, false, 0, -15)
        .buildSingleSprite(19593, 5, 9, false, false, 0, -30)
        .buildSingleSprite(19593, 5, 10, false, false, 0, -30)
        .buildSingleSprite(19593, 12, 12, false, false, 1, -30)
        .buildSpriteObjectRow(
            [
                [19611, 19612],
                [19627, 19628],
            ],
            6,
            0,
            0,
            -15
        )
        .buildSpriteObjectRow(
            [
                [19611, 19612],
                [19627, 19628],
            ],
            8,
            0,
            0,
            -55
        )
        .buildSpriteObjectRow(
            [
                [19611, 19612],
                [19627, 19628],
            ],
            6,
            2,
            0,
            -15
        )
        .buildSpriteObjectRow(
            [
                [19611, 19612],
                [19627, 19628],
            ],
            8,
            2,
            0,
            -55
        )
        .createLayer(
            'furniture_01',
            13,
            13,
            false,
            LayerPriority.BACKGROUND_MED
        )
        .buildSingleSprite(19593, 4, 10, false, false, 0, -10)
        .buildSingleSprite(19593, 11, 12, false, false, 1, -10)
        .buildSingleSprite(19637, 10, 0, false, false, 0, 5)
        .buildSingleSprite(19637, 11, 0, false, false, 0, 5)
        .buildSpriteObjectRow([[19591], [19607], [19623]], 9, 1)
        .buildSpriteObjectRow([[19532], [19548]], 4, 12)
        .buildSpriteObjectRow([[19639, 19640]], 12, 6)
        .buildSpriteObjectRow(
            [
                [19613, 19614],
                [19629, 19630],
            ],
            6,
            10,
            0,
            5
        )
        .buildSpriteObject([[19625], [19641]], 6, 12)
        .buildSpriteObjectRow([[19591], [19607], [19623]], 9, 11, 0, 0, 1, true)
        .buildSingleSprite(19638, 10, 2)
        .buildSingleSprite(19657, 10, 10, true)
        .buildSingleSprite(19657, 3, 4)
        .createLayer(
            'furniture_02',
            13,
            13,
            false,
            LayerPriority.BACKGROUND_HIGH
        )
        .buildSingleSprite(19609, 3, 10, false, false, 0, 5)
        .buildSingleSprite(19609, 10, 12, false, false, 1, 5)
        .createLayer('furniture_03', 13, 13, false, LayerPriority.FOREGROUND)
        .buildSpriteObjectRow(
            [
                [19619, 19620],
                [19635, 19636],
            ],
            9,
            11,
            18,
            -15
        )
        .createLayer(
            'furniture_triggered',
            13,
            13,
            false,
            LayerPriority.FOREGROUND
        )
        .buildSpriteObjectRow(
            [
                [19611, 19612],
                [19627, 19628],
            ],
            6,
            0,
            0,
            -15,
            1,
            false,
            bookcaseTrigger
        )
        .buildSpriteObjectRow(
            [
                [19611, 19612],
                [19627, 19628],
            ],
            8,
            0,
            0,
            -55,
            1,
            false,
            bookcaseTrigger
        )
        .buildSpriteObjectRow(
            [
                [19611, 19612],
                [19627, 19628],
            ],
            6,
            2,
            0,
            -15,
            1,
            false,
            bookcaseTrigger
        )
        .buildSpriteObjectRow(
            [
                [19611, 19612],
                [19627, 19628],
            ],
            8,
            2,
            0,
            -55,
            1,
            false,
            bookcaseTrigger
        )
        .createLayer('effects', 13, 13, false, LayerPriority.BACKGROUND)
        .addMapTransitionTrigger([compositeCondition], MapTransitionEvent)
        .build();
}
