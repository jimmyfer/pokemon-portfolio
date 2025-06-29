import { SPECIES_MAP } from '@/mock-data/pokemons';
import { SpeciesData } from '@/types/pokemon';
import { Injectable } from '../decorators/injectable';
import { assetsLoaders } from '@/utils/assets-loader';

@Injectable()
export class SpeciesService {
    private speciesMap: Record<string, SpeciesData>;

    private dexIndex: Record<number, string>;

    constructor(map: Record<string, SpeciesData> = SPECIES_MAP) {
        this.speciesMap = map;

        this.dexIndex = Object.entries(map).reduce(
            (acc, [key, data]) => {
                acc[data.dexNumber] = key;
                return acc;
            },
            {} as Record<number, string>
        );
    }

    getAll(): SpeciesData[] {
        return Object.values(this.speciesMap);
    }

    getBySpecies(speciesId: string): SpeciesData | undefined {
        return this.speciesMap[speciesId];
    }

    getByDexNumber(dexNumber: number): SpeciesData | undefined {
        const key = this.dexIndex[dexNumber];
        return key ? this.speciesMap[key] : undefined;
    }

    getFrontImg(speciesId: string): string | undefined {
        return this.speciesMap[speciesId]?.img.front;
    }

    findByMove(moveId: string): SpeciesData[] {
        return Object.values(this.speciesMap).filter((s) =>
            s.moves.some((m) => m.moveId === moveId)
        );
    }

    getRandom(n: number): SpeciesData[] {
        const all = Object.values(this.speciesMap);
        const shuffled = all.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n);
    }
}
