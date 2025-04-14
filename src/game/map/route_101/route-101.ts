import { GameContext } from '@/core/engine/game-context';
import { AssetManager } from '@/assets/assetsManager';
import { TileMapBuilder } from '@/rendering/tile-map-builder';
import { LayerPriority } from '@/types/render-types';

export async function createRoute101() {
    const assetManager = GameContext.getInstance().getBean(AssetManager);
    const sprites = assetManager.getSpriteSheet('sprites');

    return new TileMapBuilder(16, 2)
        .setTileset(sprites)
        .createLayer('ground', 29, 27, false, LayerPriority.BACKGROUND)
        .fillArea(2246, 0, 0, 32, 32)
        .build();
}
