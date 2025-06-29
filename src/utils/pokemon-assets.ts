import { assetsLoaders } from './assets-loader';

export function getPokemonIconByDex(dex: number): string {
    const file = `icon_${dex}.gif`;
    const url = assetsLoaders.pokemonIcons(file);
    if (!url) throw new Error(`No existe icono ${file}`);
    return url;
}
