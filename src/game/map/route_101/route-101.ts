import { GameContext } from '@/core/engine/game-context';
import { AssetManager } from '@/assets/assetsManager';
import { TileMapBuilder } from '@/rendering/tile-map-builder';
import { LayerGroup, LayerPriority } from '@/types/render-types';
import { KeyPressTriggerCondition } from '@/effects/trigger-conditions/keypress';
import { MapTransitionEvent } from '@/types/game-event';
import { CompositeTriggerCondition } from '@/effects/trigger-conditions/composite';
import { AreaTriggerCondition } from '@/effects/trigger-conditions/area';
import { PlayerJumpSequence } from '@/types/effects';
import { JumpAreaTriggerCondition } from '@/effects/trigger-conditions/jump-area';
import { PlayerPositionTriggerCondition } from '@/effects/trigger-conditions/player-position';

export async function createRoute101() {
    const assetManager = GameContext.getInstance().getBean(AssetManager);
    const sprites = assetManager.getSpriteSheet('sprites');

    const MapTransitionEventTo101: MapTransitionEvent = {
        type: 'MAP_TRANSITION',
        from: 'route_101',
        to: 'little_root_town',
    };

    const areaConditionTo101 = new AreaTriggerCondition(
        { x: 15, y: 25, width: 2, height: 1 },
        32
    );

    const jumpArea01 = new JumpAreaTriggerCondition(
        { x: 11, y: 8, width: 4, height: 1 },
        32
    );

    const jumpArea02 = new JumpAreaTriggerCondition(
        { x: 3, y: 10, width: 7, height: 1 },
        32
    );

    const keyConditionDown = new KeyPressTriggerCondition('ArrowDown');

    const playerDownPosition = new PlayerPositionTriggerCondition([
        'walk-down',
        'down-align',
        'down',
    ]);

    const compositeConditionToRT = new CompositeTriggerCondition([
        areaConditionTo101,
        keyConditionDown,
        playerDownPosition,
    ]);

    const compositeJumpCondition01 = new CompositeTriggerCondition([
        jumpArea01,
        keyConditionDown,
    ]);

    const compositeJumpCondition02 = new CompositeTriggerCondition([
        jumpArea02,
        keyConditionDown,
    ]);

    return (
        new TileMapBuilder(16, 2)
            .setTileset(sprites)
            .createLayer(
                LayerGroup.COLLISION,
                29,
                26,
                true,
                LayerPriority.BACKGROUND
            )
            .buildCollisionRec(0, 0, 4, 12)
            .buildCollisionRec(0, 17, 4, 12)
            .buildCollisionRow(25, 0, 15)
            .buildCollisionRec(0, 0, 26, 2)
            .buildCollisionRec(0, 27, 26, 2)
            .buildCollisionRec(22, 17, 4, 11)
            .buildCollisionRec(9, 16, 6, 3)
            .buildCollisionRec(10, 19, 3, 2)
            .buildCollisionRec(4, 25, 3, 2)
            .buildCollisionRec(19, 25, 3, 2)
            .buildCollisionRec(19, 17, 3, 3)
            .buildCollisionRec(13, 2, 6, 3)
            .buildCollisionRec(13, 7, 2, 2)
            .buildCollisionRec(10, 2, 2, 1)
            .buildCollisionRec(11, 3, 1, 7)
            .buildCollisionRec(9, 10, 3, 1)
            .buildCollisionRec(9, 11, 1, 4)
            .buildCollisionRec(8, 15, 2, 1)
            .createLayer('ground', 29, 26, false, LayerPriority.BACKGROUND)
            .fillArea(2246, 0, 0, 32, 32)
            .createLayer('cliffs', 29, 26, false, LayerPriority.BACKGROUND_LOW)
            .buildSpriteRow(
                [4967, 4968, 4968, 4968, 4968, 4968, 4968, 4968, 4970],
                11,
                2
            )
            .buildSingleSprite(4954, 10, 10, false)
            .buildSingleSprite(4989, 9, 10)
            .buildSpriteRow([4968, 4968, 4968, 4968, 4970], 9, 11)
            .buildSingleSprite(4885, 10, 2, true)
            .buildSingleSprite(4885, 8, 15, false)
            .createLayer(
                'bush_ground',
                29,
                26,
                false,
                LayerPriority.BACKGROUND_LOW
            )
            // rigth south area
            .buildSpriteRow([2254, 2254], 13, 19, 0, 6)
            .buildSpriteRow([2254, 2254], 14, 19, 0, 6)
            .buildSpriteRow([2254, 2254, 2254, 2254, 2254], 15, 16, 0, 6)
            .buildSpriteRow([2254, 2254, 2254, 2254, 2254, 2254], 16, 16, 0, 6)
            .buildSpriteRow([2254, 2254, 2254, 2254, 2254, 2254], 17, 16, 0, 6)
            .buildSpriteRow([2254, 2254, 2254, 2254, 2254], 18, 17, 0, 6)
            .buildSpriteRow([2254, 2254], 19, 20, 0, 6)
            .buildSpriteRow([2254, 2254], 20, 20, 0, 6)
            // left south area
            .buildSpriteRow([2254, 2254, 2254], 19, 2, 0, 6)
            .buildSpriteRow([2254, 2254, 2254, 2254], 20, 2, 0, 6)
            .buildSpriteRow([2254, 2254, 2254, 2254, 2254], 21, 2, 0, 6)
            .buildSpriteRow([2254, 2254, 2254, 2254, 2254, 2254], 22, 2, 0, 6)
            .buildSpriteRow([2254, 2254, 2254, 2254, 2254], 23, 2, 0, 6)
            .buildSpriteRow([2254, 2254, 2254, 2254], 24, 2, 0, 6)
            // left north area
            .buildSpriteRow([2254, 2254, 2254, 2254], 4, 2, 0, 6)
            .buildSpriteRow([2254, 2254, 2254, 2254, 2254], 5, 2, 0, 6)
            .buildSpriteRow([2254, 2254, 2254, 2254, 2254, 2254], 6, 2, 0, 6)
            .buildSpriteRow([2254, 2254, 2254, 2254, 2254, 2254], 7, 2, 0, 6)
            .buildSpriteRow([2254, 2254, 2254, 2254, 2254], 8, 2, 0, 6)
            .buildSpriteRow([2254, 2254, 2254, 2254], 9, 2, 0, 6)
            .buildSpriteRow([2254, 2254], 10, 3, 0, 6)
            // rigth north area
            .buildSpriteRow([2254, 2254, 2254, 2254], 4, 21, 0, 6)
            .buildSpriteRow([2254, 2254, 2254, 2254, 2254], 5, 20, 0, 6)
            .buildSpriteRow([2254, 2254, 2254, 2254, 2254, 2254], 6, 19, 0, 6)
            .buildSpriteRow(
                [2254, 2254, 2254, 2254, 2254, 2254, 2254],
                7,
                18,
                0,
                6
            )
            .buildSpriteRow([2254, 2254, 2254, 2254, 2254, 2254], 8, 19, 0, 6)
            .buildSpriteRow([2254, 2254, 2254, 2254, 2254], 9, 19, 0, 6)
            .createLayer(
                LayerGroup.BUSH,
                29,
                26,
                false,
                LayerPriority.FOREGROUND
            )
            // rigth south area
            .buildBushSpriteRow([2255, 2255], 13, 19, 0, 6)
            .buildBushSpriteRow([2255, 2255], 14, 19, 0, 6)
            .buildBushSpriteRow([2255, 2255, 2255, 2255, 2255], 15, 16, 0, 6)
            .buildBushSpriteRow(
                [2255, 2255, 2255, 2255, 2255, 2255],
                16,
                16,
                0,
                6
            )
            .buildBushSpriteRow(
                [2255, 2255, 2255, 2255, 2255, 2255],
                17,
                16,
                0,
                6
            )
            .buildBushSpriteRow([2255, 2255, 2255, 2255, 2255], 18, 17, 0, 6)
            .buildBushSpriteRow([2255, 2255], 19, 20, 0, 6)
            .buildBushSpriteRow([2255, 2255], 20, 20, 0, 6)
            // left south area
            .buildBushSpriteRow([2255, 2255, 2255], 19, 2, 0, 6)
            .buildBushSpriteRow([2255, 2255, 2255, 2255], 20, 2, 0, 6)
            .buildBushSpriteRow([2255, 2255, 2255, 2255, 2255], 21, 2, 0, 6)
            .buildBushSpriteRow(
                [2255, 2255, 2255, 2255, 2255, 2255],
                22,
                2,
                0,
                6
            )
            .buildBushSpriteRow([2255, 2255, 2255, 2255, 2255], 23, 2, 0, 6)
            .buildBushSpriteRow([2255, 2255, 2255, 2255], 24, 2, 0, 6)
            // left north area
            .buildBushSpriteRow([2255, 2255, 2255, 2255], 4, 2, 0, 6)
            .buildBushSpriteRow([2255, 2255, 2255, 2255, 2255], 5, 2, 0, 6)
            .buildBushSpriteRow(
                [2255, 2255, 2255, 2255, 2255, 2255],
                6,
                2,
                0,
                6
            )
            .buildBushSpriteRow(
                [2255, 2255, 2255, 2255, 2255, 2255],
                7,
                2,
                0,
                6
            )
            .buildBushSpriteRow([2255, 2255, 2255, 2255, 2255], 8, 2, 0, 6)
            .buildBushSpriteRow([2255, 2255, 2255, 2255], 9, 2, 0, 6)
            .buildBushSpriteRow([2255, 2255], 10, 3, 0, 6)
            // rigth north area
            .buildBushSpriteRow([2255, 2255, 2255, 2255], 4, 21, 0, 6)
            .buildBushSpriteRow([2255, 2255, 2255, 2255, 2255], 5, 20, 0, 6)
            .buildBushSpriteRow(
                [2255, 2255, 2255, 2255, 2255, 2255],
                6,
                19,
                0,
                6
            )
            .buildBushSpriteRow(
                [2255, 2255, 2255, 2255, 2255, 2255, 2255],
                7,
                18,
                0,
                6
            )
            .buildBushSpriteRow(
                [2255, 2255, 2255, 2255, 2255, 2255],
                8,
                19,
                0,
                6
            )
            .buildBushSpriteRow([2255, 2255, 2255, 2255, 2255], 9, 19, 0, 6)
            .createLayer('trees', 900, 900, false, LayerPriority.FOREGROUND)
            // tree object
            .buildSpriteObjectRow([[176, 177, 178, 179]], 0, 0, -35, 0, 5)
            .buildSpriteObjectRow([[176, 177, 178, 179]], 0, 24, -244, 0, 5)
            // tree object
            .buildSpriteObjectRow([[144, 145, 146, 147]], 1, 0, -35, -5, 5)
            .buildSpriteObjectRow([[160, 161, 162, 163]], 2, 0, -35, -5, 5)
            .buildSpriteObjectRow([[176, 177, 178, 179]], 3, 0, -35, -5, 5)
            // tree object
            .buildSpriteObjectRow([[144, 145, 146, 147]], 4, 0, -35, -5, 1)
            .buildSpriteObjectRow([[160, 161, 162, 163]], 5, 0, -35, -5, 1)
            .buildSpriteObjectRow([[176, 177, 178, 179]], 6, 0, -35, -5, 1)
            // tree object
            .buildSpriteObjectRow([[144, 145, 146, 147]], 7, 0, -35, -5, 1)
            .buildSpriteObjectRow([[160, 161, 162, 163]], 8, 0, -35, -5, 1)
            .buildSpriteObjectRow([[176, 177, 178, 179]], 9, 0, -35, -5, 1)
            // tree object
            .buildSpriteObjectRow([[144, 145, 146, 147]], 10, 0, -35, -5, 1)
            .buildSpriteObjectRow([[160, 161, 162, 163]], 11, 0, -35, -5, 1)
            .buildSpriteObjectRow([[176, 177, 178, 179]], 12, 0, -35, -5, 1)
            //
            .buildSpriteObjectRow([[144, 145, 146, 147]], 9, 20, -148, -10, 1)
            .buildSpriteObjectRow([[160, 161, 162, 163]], 10, 20, -148, -10, 1)
            .buildSpriteObjectRow([[176, 177, 178, 179]], 11, 20, -148, -10, 1)
            // tree object
            .buildSpriteObjectRow([[144, 145, 146, 147]], 9, 24, -190, 30, 1)
            .buildSpriteObjectRow([[160, 161, 162, 163]], 10, 24, -190, 30, 1)
            .buildSpriteObjectRow([[176, 177, 178, 179]], 11, 24, -190, 30, 1)
            // tree object
            .buildSpriteObjectRow([[144, 145, 146, 147]], 12, 20, -148, -10, 1)
            .buildSpriteObjectRow([[160, 161, 162, 163]], 13, 20, -148, -10, 1)
            .buildSpriteObjectRow([[176, 177, 178, 179]], 14, 20, -148, -10, 1)
            // tree object
            .buildSpriteObjectRow([[144, 145, 146, 147]], 13, 0, -35, -5, 2)
            .buildSpriteObjectRow([[160, 161, 162, 163]], 14, 0, -35, -5, 2)
            .buildSpriteObjectRow([[176, 177, 178, 179]], 15, 0, -35, -5, 2)
            // tree object
            .buildSpriteObjectRow([[144, 145, 146, 147]], 16, 0, -35, -5, 2)
            .buildSpriteObjectRow([[160, 161, 162, 163]], 17, 0, -35, -5, 2)
            .buildSpriteObjectRow([[176, 177, 178, 179]], 18, 0, -35, -5, 2)
            // tree object
            .buildSpriteObjectRow([[144, 145, 146, 147]], 19, 0, -35, -5, 1)
            .buildSpriteObjectRow([[160, 161, 162, 163]], 20, 0, -35, -5, 1)
            .buildSpriteObjectRow([[176, 177, 178, 179]], 21, 0, -35, -5, 1)
            // tree object
            .buildSpriteObjectRow([[144, 145, 146, 147]], 22, 0, -35, -5, 1)
            .buildSpriteObjectRow([[160, 161, 162, 163]], 23, 0, -35, -5, 1)
            .buildSpriteObjectRow([[176, 177, 178, 179]], 24, 0, -35, -5, 1)
            // tree object
            .buildSpriteObjectRow([[144, 145, 146, 147]], 25, 0, -35, -5, 6)
            .buildSpriteObjectRow([[160, 161, 162, 163]], 26, 0, -35, -5, 6)
            .buildSpriteObjectRow([[176, 177, 178, 179]], 27, 0, -35, -5, 6)
            // tree object
            .buildSpriteObjectRow([[144, 145, 146, 147]], 1, 24, -244, -5, 5)
            .buildSpriteObjectRow([[160, 161, 162, 163]], 2, 24, -244, -5, 5)
            .buildSpriteObjectRow([[176, 177, 178, 179]], 3, 24, -244, -5, 5)
            // tree object
            .buildSpriteObjectRow([[144, 145, 146, 147]], 4, 31, -228, -10, 2)
            .buildSpriteObjectRow([[160, 161, 162, 163]], 5, 31, -228, -10, 2)
            .buildSpriteObjectRow([[176, 177, 178, 179]], 6, 31, -228, -10, 2)
            // tree object
            .buildSpriteObjectRow([[144, 145, 146, 147]], 7, 31, -148, -10, 1)
            .buildSpriteObjectRow([[160, 161, 162, 163]], 8, 31, -148, -10, 1)
            .buildSpriteObjectRow([[176, 177, 178, 179]], 9, 31, -148, -10, 1)
            // tree object
            .buildSpriteObjectRow([[144, 145, 146, 147]], 10, 31, -148, -10, 1)
            .buildSpriteObjectRow([[160, 161, 162, 163]], 11, 31, -148, -10, 1)
            .buildSpriteObjectRow([[176, 177, 178, 179]], 12, 31, -148, -10, 1)
            // tree object
            .buildSpriteObjectRow([[144, 145, 146, 147]], 13, 31, -148, -10, 1)
            .buildSpriteObjectRow([[160, 161, 162, 163]], 14, 31, -148, -10, 1)
            .buildSpriteObjectRow([[176, 177, 178, 179]], 15, 31, -148, -10, 1)
            // tree object
            .buildSpriteObjectRow([[144, 145, 146, 147]], 16, 31, -148, -10, 1)
            .buildSpriteObjectRow([[160, 161, 162, 163]], 17, 31, -148, -10, 1)
            .buildSpriteObjectRow([[176, 177, 178, 179]], 18, 31, -148, -10, 1)
            // tree object
            .buildSpriteObjectRow([[144, 145, 146, 147]], 19, 31, -228, -10, 2)
            .buildSpriteObjectRow([[160, 161, 162, 163]], 20, 31, -228, -10, 2)
            .buildSpriteObjectRow([[176, 177, 178, 179]], 21, 31, -228, -10, 2)
            .buildSpriteObjectRow([[144, 145, 146, 147]], 19, 24, -244, -10, 1)
            .buildSpriteObjectRow([[160, 161, 162, 163]], 20, 24, -244, -10, 1)
            .buildSpriteObjectRow([[176, 177, 178, 179]], 21, 24, -244, -10, 1)
            // tree object
            .buildSpriteObjectRow([[144, 145, 146, 147]], 22, 31, -468, -10, 5)
            .buildSpriteObjectRow([[160, 161, 162, 163]], 23, 31, -468, -10, 5)
            .buildSpriteObjectRow([[176, 177, 178, 179]], 24, 31, -468, -10, 5)
            // tree object
            .buildSpriteObjectRow([[144, 145, 146, 147]], 25, 31, -468, -10, 5)
            .buildSpriteObjectRow([[160, 161, 162, 163]], 26, 31, -468, -10, 5)
            .buildSpriteObjectRow([[176, 177, 178, 179]], 27, 31, -468, -10, 5)
            .createLayer('signs', 29, 26, false, LayerPriority.BACKGROUND_LOW)
            .buildSpriteObjectRow(
                [
                    [9636, 9637],
                    [9652, 9653],
                ],
                13,
                7
            )
            .createLayer('roads', 29, 26, false, LayerPriority.BACKGROUND_MED)
            // First road
            .buildSpriteObjectRow([[2001, 2002, 2002, 2002, 2004]], 14, 10)
            .buildSpriteObjectRow(
                [[2001, 2002, 2002, 2030, 2018, 2018, 2018, 2020]],
                15,
                7
            )
            .buildSpriteObjectRow(
                [[2017, 2018, 2018, 2018, 2018, 2018, 2018, 2020]],
                16,
                7
            )
            .buildSpriteObjectRow(
                [[2017, 2018, 2018, 2018, 2018, 2018, 2018, 2020]],
                17,
                7
            )
            .buildSpriteObjectRow(
                [[2049, 2050, 2014, 2018, 2018, 2013, 2051, 2052]],
                18,
                7
            )
            .buildSpriteObjectRow([[2049, 2050, 2050, 2052]], 19, 9)
            // Second road
            .buildSpriteObjectRow([[2001, 2002, 2004]], 11, 23)
            .buildSpriteObjectRow([[2001, 2030, 2018, 2020]], 12, 22)
            .buildSpriteObjectRow([[2017, 2018, 2018, 2029, 2004]], 13, 22)
            .buildSpriteObjectRow([[2049, 2014, 2018, 2018, 2020]], 14, 22)
            .buildSpriteObjectRow([[2049, 2014, 2018, 2020]], 15, 23)
            .buildSpriteObjectRow([[2049, 2051, 2052]], 16, 24)
            // Third road
            .buildSpriteObjectRow([[2033, 2018, 2018, 2036]], 0, 13, -10)
            .buildSpriteObjectRow([[2033, 2018, 2018, 2036]], 1, 13, -10)
            .buildSpriteObjectRow([[2049, 2050, 2050, 2052]], 2, 13, -10)
            .createLayer('effects', 29, 26, false, LayerPriority.BACKGROUND)
            .addJumpEffectTrigger(
                PlayerJumpSequence.JUMP_DOWN,
                compositeJumpCondition01
            )
            .addJumpEffectTrigger(
                PlayerJumpSequence.JUMP_DOWN,
                compositeJumpCondition02
            )
            .addMapTransitionTrigger(
                [compositeConditionToRT],
                MapTransitionEventTo101
            )
            .build()
    );
}
