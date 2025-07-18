import mainCss from '../../../main.css';
import css from './pokemon-switch.css';
import html from './pokemon-switch.html';
import { EventSystem } from '@/core/systems/event-system';
import { GameContext } from '@/core/engine/game-context';
import { PageComponent } from '@/types/page-component';
import { GameStateManager } from '@/core/systems/game-state-manager';
import { Pokemon } from '@/types/pokemon';
import { SpeciesService } from '@/core/services/species';
import { getPokemonIconByDex } from '@/utils/pokemon-assets';
import { MenuService } from '@/core/services/menu-service';
import { BeforeCloseContext } from '@/types/menu';
import DialogComponent from '../game-dialog/game-dialog';

export default class PokemonSwitchComponent
    extends HTMLElement
    implements PageComponent
{
    public name = 'pokemon-switch';

    private _menuItemName = '';

    private eventSystem: EventSystem;
    private menuService: MenuService;

    private speciesService: SpeciesService;

    private selectedCard: HTMLElement | null = null;
    private cardContainers: HTMLElement[] = [];

    private mainCard: HTMLElement;
    private mainCardContainer: HTMLElement;

    private isBattleContext = false;

    private gameStateManager: GameStateManager;
    private party: Pokemon[] = [];

    constructor() {
        super();

        const gameContext = GameContext.getInstance();
        this.eventSystem = gameContext.getBean(EventSystem);
        this.gameStateManager = gameContext.getBean(GameStateManager);
        this.speciesService = gameContext.getBean(SpeciesService);
        this.menuService = gameContext.getBean(MenuService);

        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');

        template.innerHTML = `
            <style>${mainCss.toString()}${css.toString()}</style>
            ${html}
        `;

        this.shadowRoot?.appendChild(template.content.cloneNode(true));

        this.componentInitialization();
    }

    set menuItemName(value: string) {
        this._menuItemName = value;
    }

    get menuItemName(): string {
        return this._menuItemName;
    }

    componentInitialization() {
        this.party = this.gameStateManager.getState().player.party;

        this.initMainCard();
        this.initCardSelection();

        this.renderParty();

        this.gameStateManager.subscribe(() => {
            this.party = this.gameStateManager.getState().player.party;
            this.renderParty();
        });

        this.eventSystem.on('PAGE_CLOSED_TRANSITION_CLOSED', () =>
            this.cleanComponent()
        );

        this.menuService.onAfterClose(() => {
            const dialogBox = this.shadowRoot?.querySelector(
                '.fainted-dialog-box'
            );
            dialogBox!.innerHTML = '';
        });
    }

    public connectedCallback(): void {
        this.menuService.clearBeforeClose();

        this.isBattleContext = !!this.getAttribute('battle-context');

        this.menuService.onBeforeClose(async (ctx: BeforeCloseContext) => {
            const faintedPokemon = this.party[0].currentHP === 0;
            if (faintedPokemon) {
                const gameDialog = new DialogComponent();
                const dialogBox = this.shadowRoot?.querySelector(
                    '.fainted-dialog-box'
                );
                dialogBox?.appendChild(gameDialog);
                dialogBox?.classList.add('hello');
                gameDialog.startDialog({
                    dialogue: [
                        'Main pokemon fainted, swap to an available pokemon!',
                    ],
                });
                ctx.cancel();
            }
        });
    }

    private cleanComponent(): void {
        this.selectedCard = null;
    }

    private renderParty() {
        if (this.party.length > 0) {
            this.updateCard(this.mainCard, this.party[0], true);
        }

        const cards = this.shadowRoot!.querySelectorAll(
            '.pokemon-card-container'
        );
        for (let i = 0; i < 6; i++) {
            const card = cards[i] as HTMLElement;

            if (i < this.party.length) {
                const pokemonCard = card.querySelector(
                    '.pokemon-card'
                ) as HTMLElement;
                this.updateCard(pokemonCard, this.party[i], false);
            } else {
                card.innerHTML = '';
            }
        }
    }

    private updateCard(
        cardElement: HTMLElement,
        pokemon: Pokemon,
        isMain: boolean
    ) {
        const nameElement = cardElement.querySelector(
            isMain
                ? '.main-card.pokemon-name h2'
                : '.second-card.pokemon-name h2'
        ) as HTMLElement;
        if (nameElement) {
            nameElement.textContent = pokemon.species.toUpperCase();
        }

        const levelElement = cardElement.querySelector(
            isMain
                ? '.main-card-level.pokemon-level h2'
                : '.second-card-level.pokemon-level h2'
        ) as HTMLElement;
        if (levelElement) {
            levelElement.textContent = `Lv${pokemon.level}`;
        }

        const hpElement = cardElement.querySelector(
            isMain
                ? '.main-pokemon-hp-hud .pokemon-hp h2'
                : '.pokemon-hp-hud .pokemon-hp h2'
        ) as HTMLElement;
        if (hpElement) {
            hpElement.textContent = `${pokemon.currentHP} / ${pokemon.stats.hp}`;
        }

        const spriteElement = cardElement.querySelector(
            isMain ? '.main-pokemon-sprite img' : '.pokemon-sprite img'
        ) as HTMLImageElement;
        if (spriteElement) {
            spriteElement.src = this.getPokemonSprite(pokemon.species);
        }
    }

    private getPokemonSprite(species: string): string {
        const dexNumber = this.speciesService.getBySpecies(species)!.dexNumber;
        return getPokemonIconByDex(dexNumber);
    }

    initMainCard() {
        this.mainCardContainer = this.shadowRoot?.querySelector(
            '.pokemon-main-card'
        ) as HTMLElement;
        this.mainCard = this.shadowRoot?.querySelector(
            '.main-pokemon-card'
        ) as HTMLElement;

        if (this.mainCard) {
            this.mainCard.addEventListener('click', () =>
                this.handleMainCardClick()
            );
        }
    }

    initCardSelection() {
        const container = this.shadowRoot?.querySelector('.pokemons-cards');
        if (!container) return;

        this.cardContainers = Array.from(
            container.querySelectorAll('.pokemon-card-container')
        );

        this.cardContainers.forEach((container) => {
            const card = container.querySelector(
                '.pokemon-card'
            ) as HTMLElement;
            if (!card) return;

            card.addEventListener('click', () => this.handleCardClick(card));
            card.addEventListener('mouseover', () =>
                this.handleCardHover(card)
            );
            card.addEventListener('mouseout', () =>
                this.handleCardHoverOut(card)
            );
        });

        this.mainCard.addEventListener('mouseover', () =>
            this.handleMainCardHover(this.mainCard)
        );
        this.mainCard.addEventListener('mouseout', () =>
            this.handleCardHoverOut(this.mainCard)
        );
    }

    handleMainCardClick() {
        if (this.selectedCard) {
            this.swapWithMainCard(this.selectedCard);
            this.deselectCard();
            this.deselectMainCard();
            this.mainCard.classList.remove('swap-hover');
            return;
        }

        if (!this.selectedCard && !this.mainCardSelected) {
            this.selectMainCard();
            this.mainCard.classList.remove('swap-hover');
            return;
        }
    }

    handleCardClick(card: HTMLElement) {
        if (!this.selectedCard && !this.mainCardSelected) {
            this.selectCard(card);
            return;
        }

        if (this.selectedCard === card) {
            this.deselectCard();
            return;
        }

        if (this.mainCardSelected) {
            this.swapWithMainCard(card);
            this.deselectMainCard();
            card.classList.remove('swap-hover');
            return;
        }

        this.swapCards(this.selectedCard!, card);
        this.deselectCard();
        card.classList.remove('swap-hover');
    }

    private mainCardSelected: boolean = false;

    selectMainCard() {
        this.deselectMainCard();
        this.mainCardSelected = true;
        this.mainCard?.classList.add('selected');
    }

    deselectMainCard() {
        this.mainCardSelected = false;
        this.mainCard?.classList.remove('selected');
    }

    private swapWithMainCard(secondaryCard: HTMLElement) {
        const secondaryCardContainer = secondaryCard.closest(
            '.pokemon-card-container'
        ) as HTMLElement;
        if (!secondaryCardContainer) return;

        const index = Array.from(
            this.shadowRoot!.querySelectorAll('.pokemon-card-container')
        ).indexOf(secondaryCardContainer);

        if (index === -1) return;

        this.animateMainCardSwap(secondaryCard, () => {
            this.gameStateManager.updateState((state) => {
                const party = [...state.player.party];
                [party[0], party[index]] = [party[index], party[0]];
                if (this.isBattleContext) {
                    this.eventSystem.emit('BATTLE_POKEMON_SWITCHED', {
                        newPokemon: party[0],
                    });
                }
                return {
                    ...state,
                    player: {
                        ...state.player,
                        party,
                    },
                };
            });

            this.mainCardContainer!.style.transform = '';
            secondaryCardContainer.style.transform = '';
        });
    }

    animateMainCardSwap(secondaryCard: HTMLElement, callback: () => void) {
        const secondaryCardContainer = secondaryCard.closest(
            '.pokemon-card-container'
        ) as HTMLElement;

        if (!secondaryCardContainer) return;

        this.mainCardContainer.style.transition = 'transform 0.5s ease-in-out';
        secondaryCardContainer.style.transition = 'transform 0.5s ease-in-out';

        this.mainCardContainer.style.transform = 'translateX(-100vw)';

        secondaryCardContainer.style.transform = 'translateX(100vw)';

        setTimeout(() => {
            callback();
        }, 500);
    }

    swapCardData(mainCard: HTMLElement, secondaryCard: HTMLElement) {
        const mainName = mainCard.querySelector(
            '.main-card.pokemon-name h2'
        )?.textContent;
        const secondaryName = secondaryCard.querySelector(
            '.second-card.pokemon-name h2'
        )?.textContent;

        if (mainName && secondaryName) {
            const mainNameEl = mainCard.querySelector(
                '.main-card.pokemon-name h2'
            );
            const secondaryNameEl = secondaryCard.querySelector(
                '.second-card.pokemon-name h2'
            );

            if (mainNameEl && secondaryNameEl) {
                mainNameEl.textContent = secondaryName;
                secondaryNameEl.textContent = mainName;
            }
        }

        const mainLevel = mainCard.querySelector(
            '.main-card-level.pokemon-level h2'
        )?.textContent;
        const secondaryLevel = secondaryCard.querySelector(
            '.second-card-level.pokemon-level h2'
        )?.textContent;

        if (mainLevel && secondaryLevel) {
            const mainLevelEl = mainCard.querySelector(
                '.main-card-level.pokemon-level h2'
            );
            const secondaryLevelEl = secondaryCard.querySelector(
                '.second-card-level.pokemon-level h2'
            );

            if (mainLevelEl && secondaryLevelEl) {
                mainLevelEl.textContent = secondaryLevel;
                secondaryLevelEl.textContent = mainLevel;
            }
        }

        const mainHP = mainCard.querySelector(
            '.main-pokemon-hp-hud .pokemon-hp h2'
        )?.textContent;
        const secondaryHP =
            secondaryCard.querySelector('.pokemon-hp h2')?.textContent;

        if (mainHP && secondaryHP) {
            const mainHPEl = mainCard.querySelector(
                '.main-pokemon-hp-hud .pokemon-hp h2'
            );
            const secondaryHPEl = secondaryCard.querySelector('.pokemon-hp h2');

            if (mainHPEl && secondaryHPEl) {
                mainHPEl.textContent = secondaryHP;
                secondaryHPEl.textContent = mainHP;
            }
        }

        const mainSprite = mainCard
            .querySelector('.main-pokemon-sprite img')
            ?.getAttribute('src');
        const secondarySprite = secondaryCard
            .querySelector('.pokemon-sprite img')
            ?.getAttribute('src');

        if (mainSprite && secondarySprite) {
            const mainSpriteEl = mainCard.querySelector(
                '.main-pokemon-sprite img'
            );
            const secondarySpriteEl = secondaryCard.querySelector(
                '.pokemon-sprite img'
            );

            if (mainSpriteEl && secondarySpriteEl) {
                mainSpriteEl.setAttribute('src', secondarySprite);
                secondarySpriteEl.setAttribute('src', mainSprite);
            }
        }
    }

    handleCardHover(card: HTMLElement) {
        if (this.selectedCard !== card) {
            card.classList.add('swap-hover');
        }
    }

    handleMainCardHover(card: HTMLElement) {
        if (!this.mainCardSelected) {
            card.classList.add('swap-hover');
        }
    }

    handleCardHoverOut(card: HTMLElement) {
        card.classList.remove('swap-hover');
    }

    selectCard(card: HTMLElement) {
        this.deselectCard();
        this.selectedCard = card;
        card.classList.add('selected');
        card.style.transition = 'none';
        card.classList.remove('swap-hover');
        setTimeout(() => {
            card.style.transition = 'transform 0.3s';
        });
    }

    deselectCard() {
        if (this.selectedCard) {
            this.selectedCard.classList.remove('selected', 'swap-hover');
            this.selectedCard = null;
        }
    }

    private swapCards(card1: HTMLElement, card2: HTMLElement) {
        card1.style.transition = 'transform 0.3s ease-in-out';
        card2.style.transition = 'transform 0.3s ease-in-out';

        const rect1 = card1.getBoundingClientRect();
        const rect2 = card2.getBoundingClientRect();
        const deltaY = rect2.top - rect1.top;

        card1.style.transform = `translateY(${deltaY}px)`;
        card2.style.transform = `translateY(${-deltaY}px)`;

        setTimeout(() => {
            card1.style.transform = '';
            card2.style.transform = '';

            const container1 = card1.closest('.pokemon-card-container');
            const container2 = card2.closest('.pokemon-card-container');

            if (!container1 || !container2 || container1 === container2) return;

            const index1 = this.cardContainers.indexOf(
                container1 as HTMLElement
            );
            const index2 = this.cardContainers.indexOf(
                container2 as HTMLElement
            );

            if (index1 === -1 || index2 === -1) return;

            const parent = container1.parentNode;
            if (!parent) return;

            const temp = document.createElement('div');
            parent.insertBefore(temp, container2);
            parent.insertBefore(container2, container1);
            parent.insertBefore(container1, temp);
            parent.removeChild(temp);

            [this.cardContainers[index1], this.cardContainers[index2]] = [
                this.cardContainers[index2],
                this.cardContainers[index1],
            ];

            this.gameStateManager.updateState((state) => {
                const party = [...state.player.party];
                const container1 = card1.closest(
                    '.pokemon-card-container'
                ) as HTMLElement;
                const container2 = card2.closest(
                    '.pokemon-card-container'
                ) as HTMLElement;

                const index1 = this.cardContainers.indexOf(container1);
                const index2 = this.cardContainers.indexOf(container2);

                if (
                    index1 !== -1 &&
                    index2 !== -1 &&
                    index1 < party.length &&
                    index2 < party.length
                ) {
                    [party[index1], party[index2]] = [
                        party[index2],
                        party[index1],
                    ];
                }

                if (this.isBattleContext && index1 == 0) {
                    console.log('emito!! salida', party[index1]);
                    this.eventSystem.emit('BATTLE_POKEMON_SWITCHED', {
                        newPokemon: party[index1],
                    });
                }

                return {
                    ...state,
                    player: {
                        ...state.player,
                        party,
                    },
                };
            });
        }, 300);
    }
}
