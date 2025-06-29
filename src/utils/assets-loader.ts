export function importAll(
    r: __WebpackModuleApi.RequireContext
): Record<string, string> {
    return r.keys().reduce<Record<string, string>>((images, filePath) => {
        const key = filePath.replace('./', '');
        images[key] = r(filePath) as string;
        return images;
    }, {});
}

export function createLoader(
    context: __WebpackModuleApi.RequireContext
): (fileName: string) => string | undefined {
    const assets = importAll(context);
    return (fileName: string) => assets[fileName];
}

const pokemonIconsContext = require.context(
    '@/assets/html/pokemons/pokemon_icons',
    false,
    /\.gif$/
);
const frontSpritesContext = require.context(
    '@/assets/html/pokemons/front',
    false,
    /\.(png|jpg)$/
);
const backSpritesContext = require.context(
    '@/assets/html/pokemons/back',
    false,
    /\.(png|jpg)$/
);

export const assetsLoaders = {
    pokemonIcons: createLoader(pokemonIconsContext),
    frontSprites: createLoader(frontSpritesContext),
    backSprites: createLoader(backSpritesContext),
};
