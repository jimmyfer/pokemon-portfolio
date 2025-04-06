import { GameContext } from "@/core/engine/game-context";
import { AssetManager } from "@/assets/assetsManager";
import { TileMapBuilder } from "@/rendering/tile-map-builder";
import { LayerPriority } from "@/types/render-types";
import { DoorOpenEffect } from "@/game/effects/door-open";
import { AreaTrigger } from "@/effects-triggers/area";
import { KeyPressTrigger } from "@/effects-triggers/keypress";
import { CompositeTrigger } from "@/effects-triggers/composite";

export async function createLittleRootTown() {
  const assetManager = GameContext.getInstance().getBean(AssetManager);
  const sprites = assetManager.getSpriteSheet("sprites");
  const appScale = GameContext.getInstance().getTilesScale();

  const doorEffect = new DoorOpenEffect(304, 324, appScale);
  const areaCondition = new AreaTrigger(
    { x: 9, y: 11, width: 1, height: 1 },
    32
  );
  const keyCondition = new KeyPressTrigger("ArrowUp");
  const compositeCondition = new CompositeTrigger([
    areaCondition,
    keyCondition,
  ]);

  return (
    new TileMapBuilder(16, 2)
      .setTileset(sprites)
      .createLayer("collision", 29, 27, true, LayerPriority.BACKGROUND)
      .buildCollisionRow(0, 0, 15)
      .buildCollisionRow(1, 0, 15)
      .buildCollisionRow(2, 0, 15)
      .buildCollisionRow(3, 0, 15)
      .buildCollisionRow(0, 17, 12)
      .buildCollisionRow(1, 17, 12)
      .buildCollisionRow(2, 17, 12)
      .buildCollisionRow(3, 17, 12)
      .buildCollisionRow(4, 0, 5)
      .buildCollisionRow(5, 0, 5)
      .buildCollisionRow(6, 0, 5)
      .buildCollisionRow(4, 25, 4)
      .buildCollisionRow(5, 25, 4)
      .buildCollisionRow(6, 25, 4)
      .buildCollisionColum(0, 7, 15)
      .buildCollisionColum(1, 7, 15)
      .buildCollisionColum(27, 7, 12)
      .buildCollisionColum(28, 7, 12)
      .buildCollisionRow(22, 0, 5)
      .buildCollisionRow(23, 0, 5)
      .buildCollisionRow(24, 0, 5)
      .buildCollisionRow(19, 25, 4)
      .buildCollisionRow(20, 25, 4)
      .buildCollisionRow(21, 25, 4)
      .buildCollisionRow(22, 22, 7)
      .buildCollisionRow(23, 22, 7)
      .buildCollisionRow(24, 22, 7)
      .buildCollisionRow(25, 0, 28)
      .buildCollisionRow(26, 0, 28)
      .buildCollisionRec(6, 6, 5, 5)
      .buildCollisionRec(6, 18, 5, 5)
      .buildCollisionRec(15, 7, 6, 8)
      .buildSingleCollision(10, 11)
      .buildSingleCollision(10, 17)
      .buildSingleCollision(17, 22)
      .buildSingleCollision(21, 10)
      .createLayer("ground", 29, 27, false, LayerPriority.BACKGROUND)
      .fillArea(2246, 0, 0, 32, 32)
      .createLayer("trees", 900, 900, false, LayerPriority.FOREGROUND)
      //line right
      .buildSpriteObjectRow([176, 177, 178, 179], 0, 0, -35, 0, 6)
      .buildSpriteObjectRow([176, 177, 178, 179], 0, 24, -244, 0, 5)
      // line right
      .buildSpriteObjectRow([144, 145, 146, 147], 1, 0, -35, -5, 6)
      .buildSpriteObjectRow([160, 161, 162, 163], 2, 0, -35, -5, 6)
      .buildSpriteObjectRow([176, 177, 178, 179], 3, 0, -35, -5, 6)
      // line right
      .buildSpriteObjectRow([144, 145, 146, 147], 4, 0, -35, -5, 2)
      .buildSpriteObjectRow([160, 161, 162, 163], 5, 0, -35, -5, 2)
      .buildSpriteObjectRow([176, 177, 178, 179], 6, 0, -35, -5, 2)
      // line right
      .buildSpriteObjectRow([144, 145, 146, 147], 7, 0, -35, -5, 1)
      .buildSpriteObjectRow([160, 161, 162, 163], 8, 0, -35, -5, 1)
      .buildSpriteObjectRow([176, 177, 178, 179], 9, 0, -35, -5, 1)
      // line right
      .buildSpriteObjectRow([144, 145, 146, 147], 10, 0, -35, -5, 1)
      .buildSpriteObjectRow([160, 161, 162, 163], 11, 0, -35, -5, 1)
      .buildSpriteObjectRow([176, 177, 178, 179], 12, 0, -35, -5, 1)
      // line right
      .buildSpriteObjectRow([144, 145, 146, 147], 13, 0, -35, -5, 1)
      .buildSpriteObjectRow([160, 161, 162, 163], 14, 0, -35, -5, 1)
      .buildSpriteObjectRow([176, 177, 178, 179], 15, 0, -35, -5, 1)
      // line right
      .buildSpriteObjectRow([144, 145, 146, 147], 16, 0, -35, -5, 1)
      .buildSpriteObjectRow([160, 161, 162, 163], 17, 0, -35, -5, 1)
      .buildSpriteObjectRow([176, 177, 178, 179], 18, 0, -35, -5, 1)
      // line right
      .buildSpriteObjectRow([144, 145, 146, 147], 19, 0, -35, -5, 1)
      .buildSpriteObjectRow([160, 161, 162, 163], 20, 0, -35, -5, 1)
      .buildSpriteObjectRow([176, 177, 178, 179], 21, 0, -35, -5, 1)
      // line right
      .buildSpriteObjectRow([144, 145, 146, 147], 22, 0, -35, -5, 2)
      .buildSpriteObjectRow([160, 161, 162, 163], 23, 0, -35, -5, 2)
      .buildSpriteObjectRow([176, 177, 178, 179], 24, 0, -35, -5, 2)
      // line right
      .buildSpriteObjectRow([144, 145, 146, 147], 25, 0, -35, -5, 12)
      .buildSpriteObjectRow([160, 161, 162, 163], 26, 0, -35, -5, 12)
      .buildSpriteObjectRow([176, 177, 178, 179], 27, 0, -35, -5, 12)
      // line left
      .buildSpriteObjectRow([144, 145, 146, 147], 1, 24, -244, -5, 5)
      .buildSpriteObjectRow([160, 161, 162, 163], 2, 24, -244, -5, 5)
      .buildSpriteObjectRow([176, 177, 178, 179], 3, 24, -244, -5, 5)
      // line left
      .buildSpriteObjectRow([144, 145, 146, 147], 4, 31, -228, -10, 2)
      .buildSpriteObjectRow([160, 161, 162, 163], 5, 31, -228, -10, 2)
      .buildSpriteObjectRow([176, 177, 178, 179], 6, 31, -228, -10, 2)
      // line left
      .buildSpriteObjectRow([144, 145, 146, 147], 7, 31, -148, -10, 1)
      .buildSpriteObjectRow([160, 161, 162, 163], 8, 31, -148, -10, 1)
      .buildSpriteObjectRow([176, 177, 178, 179], 9, 31, -148, -10, 1)
      // line left
      .buildSpriteObjectRow([144, 145, 146, 147], 10, 31, -148, -10, 1)
      .buildSpriteObjectRow([160, 161, 162, 163], 11, 31, -148, -10, 1)
      .buildSpriteObjectRow([176, 177, 178, 179], 12, 31, -148, -10, 1)
      // line left
      .buildSpriteObjectRow([144, 145, 146, 147], 13, 31, -148, -10, 1)
      .buildSpriteObjectRow([160, 161, 162, 163], 14, 31, -148, -10, 1)
      .buildSpriteObjectRow([176, 177, 178, 179], 15, 31, -148, -10, 1)
      // line left
      .buildSpriteObjectRow([144, 145, 146, 147], 16, 31, -148, -10, 1)
      .buildSpriteObjectRow([160, 161, 162, 163], 17, 31, -148, -10, 1)
      .buildSpriteObjectRow([176, 177, 178, 179], 18, 31, -148, -10, 1)
      // line left
      .buildSpriteObjectRow([144, 145, 146, 147], 19, 31, -228, -10, 2)
      .buildSpriteObjectRow([160, 161, 162, 163], 20, 31, -228, -10, 2)
      .buildSpriteObjectRow([176, 177, 178, 179], 21, 31, -228, -10, 2)
      // line left
      .buildSpriteObjectRow([144, 145, 146, 147], 22, 31, -308, -10, 3)
      .buildSpriteObjectRow([160, 161, 162, 163], 23, 31, -308, -10, 3)
      .buildSpriteObjectRow([176, 177, 178, 179], 24, 31, -308, -10, 3)
      .createLayer("signs", 29, 27, false, LayerPriority.FOREGROUND)
      .buildSpriteObject(
        [
          [9580, 9581],
          [9596, 9597],
        ],
        9,
        11,
        false,
        -16,
        8
      )
      .buildSpriteObject(
        [
          [9580, 9581],
          [9596, 9597],
        ],
        9,
        17,
        false,
        -16,
        8
      )
      .buildSpriteObject(
        [
          [9580, 9581],
          [9596, 9597],
        ],
        20,
        10,
        false,
        -16,
        8
      )
      .buildSpriteObject(
        [
          [9580, 9581],
          [9596, 9597],
        ],
        16,
        22,
        false,
        -16,
        8
      )
      .buildSingleSprite(2440, 10, 3)
      .buildSingleSprite(2440, 14, 3)
      .buildSingleSprite(2440, 12, 4)
      .buildSingleSprite(2440, 13, 6)
      .buildSingleSprite(2440, 18, 4)
      .buildSingleSprite(2440, 9, 26)
      .buildSingleSprite(2440, 10, 25)
      .buildSingleSprite(2440, 11, 26)
      .buildSingleSprite(2440, 13, 23)
      .buildSingleSprite(2440, 13, 25)
      .buildSingleSprite(2440, 20, 17)
      .buildSingleSprite(2440, 17, 20)
      .buildSpriteObject(
        [
          [2440, 2440, 2440],
          [2440, 2440, 2440],
        ],
        21,
        6
      )
      .createLayer("houses", 29, 27, false, LayerPriority.FOREGROUND)
      .buildSpriteObject(
        [
          [15688, 15689, 15690, 15691, 15692, 15693],
          [15704, 15705, 15706, 15707, 15708, 15709],
          [15720, 15721, 15722, 15723, 15724, 15725],
          [15736, 15737, 15738, 15739, 15740, 15741],
          [15752, 15753, 15754, 15755, 15756, 15757],
          [15768, 15769, 15770, 15771, 15772, 15773],
          [15784, 15785, 15786, 15787, 15788, 15789],
          [15800, 15801, 15802, 15803, 15804, 15805],
          [15816, 15817, 15818, 15819, 15820, 15821],
        ],
        5,
        6,
        false,
        -12,
        -10
      )
      .buildSpriteObject(
        [
          [15688, 15689, 15690, 15691, 15692, 15693],
          [15704, 15705, 15706, 15707, 15708, 15709],
          [15720, 15721, 15722, 15723, 15724, 15725],
          [15736, 15737, 15738, 15739, 15740, 15741],
          [15752, 15753, 15754, 15755, 15756, 15757],
          [15768, 15769, 15770, 15771, 15772, 15773],
          [15784, 15785, 15786, 15787, 15788, 15789],
          [15800, 15801, 15802, 15803, 15804, 15805],
          [15816, 15817, 15818, 15819, 15820, 15821],
        ],
        5,
        18,
        true,
        -20,
        -10
      )
      .buildSpriteObject(
        [
          [15840, 15841, 15842, 15843, 15844, 15845, 15846, 15847, 15848],
          [15856, 15857, 15858, 15859, 15860, 15861, 15862, 15863, 15864],
          [15872, 15873, 15874, 15875, 15876, 15877, 15878, 15879, 15880],
          [15888, 15889, 15890, 15891, 15892, 15893, 15894, 15895, 15896],
          [15904, 15905, 15906, 15907, 15908, 15909, 15910, 15911, 15912],
          [15920, 15921, 15922, 15923, 15924, 15925, 15926, 15927, 15928],
          [15936, 15937, 15938, 15939, 15940, 15941, 15942, 15943, 15944],
          [15952, 15953, 15954, 15955, 15956, 15957, 15958, 15959, 15960],
        ],
        15,
        8,
        false,
        -20,
        -10
      )
      .createLayer("effects", 29, 27, false, LayerPriority.FOREGROUND)
      .addEffectTrigger(doorEffect, [compositeCondition])
      .build()
  );
}
