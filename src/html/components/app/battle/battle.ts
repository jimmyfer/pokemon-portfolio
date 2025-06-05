import mainCss from '../../../main.css';
import css from './battle.css';
import html from './battle.html';
import { EventSystem } from '@/core/systems/event-system';
import { GameContext } from '@/core/engine/game-context';
import { BattleState, Move, Pokemon } from '@/types/pokemon';
import { SPECIES_MAP } from '@/mock-data/pokemons';

export default class BattleComponent extends HTMLElement {
    private eventSystem: EventSystem;
    private dialogArea: HTMLDivElement;
    private actionsPanel: HTMLDivElement;
    private dialogTextArea: HTMLDivElement;
    private movePanelArea: HTMLDivElement;

    private playerPokemonNameDisplay: HTMLElement;
    private playerPokemonLevelDisplay: HTMLElement;
    private playerPokemonHealthTextDisplay: HTMLElement;
    private playerPokemonHealthBar: HTMLElement;
    private playerPokemonSpriteImage: HTMLImageElement;
    private playerStateHUD: HTMLElement;
    private playerArena: HTMLElement;

    private opponentPokemonNameDisplay: HTMLElement;
    private opponentPokemonLevelDisplay: HTMLElement;
    private opponentPokemonHealthBar: HTMLElement;
    private opponentPokemonSpriteImage: HTMLImageElement;
    private opponentStateHUD: HTMLElement;
    private opponentArena: HTMLElement;

    private highGrass: HTMLElement;

    private currentPlayerMoves: Move[] = [];

    constructor() {
        super();

        const gameContext = GameContext.getInstance();
        this.eventSystem = gameContext.getBean(EventSystem);

        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>${mainCss.toString()}${css.toString()}</style>
            ${html}
        `;
        this.shadowRoot?.appendChild(template.content.cloneNode(true));

        this.style.display = 'none';

        this.dialogArea = this.shadowRoot?.querySelector(
            '.dialog'
        ) as HTMLDivElement;
        this.actionsPanel = this.shadowRoot?.querySelector(
            '.actions-panel'
        ) as HTMLDivElement;
        this.dialogTextArea = this.shadowRoot?.querySelector(
            '.dialog-text-area'
        ) as HTMLDivElement;
        this.movePanelArea = this.shadowRoot?.querySelector(
            '.moves-panel'
        ) as HTMLDivElement;

        this.playerPokemonNameDisplay = this.shadowRoot!.querySelector(
            '.player-pokemon-name h2'
        ) as HTMLElement;
        this.playerPokemonLevelDisplay = this.shadowRoot!.querySelector(
            '.player-pokemon-level h2'
        ) as HTMLElement;
        this.playerPokemonHealthTextDisplay = this.shadowRoot!.querySelector(
            '.player-pokemon-health-text h2'
        ) as HTMLElement;
        this.playerPokemonHealthBar = this.shadowRoot!.querySelector(
            '.player-state-hud .current-life'
        ) as HTMLElement;
        this.playerPokemonSpriteImage = this.shadowRoot!.querySelector(
            '.player-pokemon img'
        ) as HTMLImageElement;
        this.playerStateHUD = this.shadowRoot!.querySelector(
            '.player-state-hud'
        ) as HTMLElement;
        this.playerArena = this.shadowRoot!.querySelector(
            '.player-arena'
        ) as HTMLElement;

        this.opponentPokemonNameDisplay = this.shadowRoot!.querySelector(
            '.opponent-pokemon-name h2'
        ) as HTMLElement;
        this.opponentPokemonLevelDisplay = this.shadowRoot!.querySelector(
            '.opponent-pokemon-level h2'
        ) as HTMLElement;
        this.opponentPokemonHealthBar = this.shadowRoot!.querySelector(
            '.opponent-state-hud .current-life'
        ) as HTMLElement;
        this.opponentPokemonSpriteImage = this.shadowRoot!.querySelector(
            '.opponent-pokemon img'
        ) as HTMLImageElement;
        this.opponentStateHUD = this.shadowRoot!.querySelector(
            '.opponent-state-hud'
        ) as HTMLElement;
        this.opponentArena = this.shadowRoot!.querySelector(
            '.opponent-arena'
        ) as HTMLElement;

        this.highGrass = this.shadowRoot!.querySelector(
            '.high-grass'
        ) as HTMLElement;

        this.setUpBattleScreen();
    }

    private setUpBattleScreen(): void {
        this.eventSystem.on('BATTLE_TRANSITION_CLOSED', () => {
            this.style.display = 'block';

            setTimeout(() => {
                this.opponentArena.classList.add('active');
                this.playerArena.classList.add('active');
                setTimeout(() => {
                    this.highGrass.classList.add('active');
                }, 200);
                setTimeout(() => {
                    this.playerStateHUD.classList.add('active');
                    this.opponentStateHUD.classList.add('active');
                    this.eventSystem.emit('BATTLE_READY', {});
                    setTimeout(() => {
                        this.actionsPanel.classList.add('active');
                    }, 500);
                }, 2000);
            }, 200);
        });

        this.eventSystem.onAsync(
            'BATTLE_STATE_UPDATE',
            async (battleState: BattleState) => {
                this.updateHud(
                    battleState.playerPokemon,
                    battleState.wildPokemon
                );
                this.currentPlayerMoves = battleState.playerPokemon.moves;
                this.updateMovesPanel(this.currentPlayerMoves);

                const latestMessage =
                    battleState.messages[battleState.messages.length - 1];

                if (battleState.phase === 'player-input') {
                    this.dialogArea.style.display = 'flex';
                    this.actionsPanel.style.display = 'block';
                    this.movePanelArea.style.display = 'none';
                    await this.updateDialogText(
                        `What will ${battleState.playerPokemon.species.toUpperCase()} do?`
                    );
                } else if (
                    battleState.phase === 'attack' ||
                    battleState.phase === 'start' ||
                    battleState.phase === 'flee'
                ) {
                    this.dialogArea.style.display = 'flex';
                    this.actionsPanel.style.display = 'none';
                    this.movePanelArea.style.display = 'none';
                    if (battleState.isDialogUpdate)
                        await this.updateDialogText(latestMessage);
                } else {
                    if (battleState.isDialogUpdate)
                        await this.updateDialogText(latestMessage);
                }
            }
        );

        this.eventSystem.on('BATTLE_CLOSED_TRANSITION_CLOSED', () => {
            this.style.display = 'none';
            this.onBattleEnd([
                this.playerStateHUD,
                this.opponentStateHUD,
                this.actionsPanel,
                this.highGrass,
                this.opponentArena,
                this.playerArena,
            ]);
        });
    }

    private updateHud(playerPokemon: Pokemon, opponentPokemon: Pokemon): void {
        this.playerPokemonNameDisplay.textContent =
            playerPokemon.species.toUpperCase();
        this.playerPokemonLevelDisplay.textContent = `Lv.${playerPokemon.level}`;
        this.playerPokemonHealthTextDisplay.textContent = `${playerPokemon.currentHP}/${playerPokemon.stats.hp}`;
        if (this.playerPokemonHealthBar) {
            const playerHpPercentage =
                (playerPokemon.currentHP / playerPokemon.stats.hp) * 100;
            this.playerPokemonHealthBar.style.width = `${playerHpPercentage}%`;

            if (playerHpPercentage < 20)
                this.playerPokemonHealthBar.style.backgroundColor = 'red';
            else if (playerHpPercentage < 50)
                this.playerPokemonHealthBar.style.backgroundColor = 'yellow';
            else this.playerPokemonHealthBar.style.backgroundColor = 'green';
        }

        this.opponentPokemonNameDisplay.textContent =
            opponentPokemon.species.toUpperCase();
        this.opponentPokemonLevelDisplay.textContent = `Lv.${opponentPokemon.level}`;
        if (this.opponentPokemonHealthBar) {
            const opponentHpPercentage =
                (opponentPokemon.currentHP / opponentPokemon.stats.hp) * 100;
            this.opponentPokemonHealthBar.style.width = `${opponentHpPercentage}%`;

            if (opponentHpPercentage < 20)
                this.opponentPokemonHealthBar.style.backgroundColor = 'red';
            else if (opponentHpPercentage < 50)
                this.opponentPokemonHealthBar.style.backgroundColor = 'yellow';
            else this.opponentPokemonHealthBar.style.backgroundColor = 'green';
        }

        if (SPECIES_MAP[opponentPokemon.species].img.front) {
            this.opponentPokemonSpriteImage!.src =
                SPECIES_MAP[opponentPokemon.species].img.front;
        }

        if (SPECIES_MAP[playerPokemon.species].img.back) {
            this.playerPokemonSpriteImage!.src =
                SPECIES_MAP[playerPokemon.species].img.back;
        }
    }

    private updateDialogText(text: string): Promise<void> {
        if (!text) return new Promise(() => {});
        const h2 = this.dialogTextArea!.querySelector('h2') as HTMLElement;
        h2.textContent = '';

        let charIndex = 0;
        const velocity = 50;

        return new Promise((resolve) => {
            const typeText = () => {
                if (charIndex < text.length) {
                    h2.textContent += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeText, velocity);
                } else {
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                }
            };
            typeText();
        });
    }

    private updateMovesPanel(moves: Move[]): void {
        const desktopMovesContainer = this.shadowRoot!.querySelector(
            '.moves-panel-desktop'
        ) as HTMLElement;
        const mobileMovesContainer = this.shadowRoot!.querySelector(
            '.moves-panel-mobile'
        ) as HTMLElement;

        desktopMovesContainer.innerHTML = '';
        mobileMovesContainer.innerHTML = '';

        moves.forEach((move, index) => {
            const desktopMoveItem = document.createElement('div');
            desktopMoveItem.classList.add('menu-item', 'move-item');
            const desktopH2 = document.createElement('h2');
            desktopH2.textContent = move.name.toUpperCase();
            desktopMoveItem.appendChild(desktopH2);
            desktopMovesContainer.appendChild(desktopMoveItem);

            const mobileMoveItem = document.createElement('div');
            mobileMoveItem.classList.add('menu-item', 'move-item');
            const mobileH2 = document.createElement('h2');
            const maxPP = move.pp || move.maxPP || 0;
            const currentPP = move.pp || 0;
            const elementalType = move.type || move.type || 'UNKNOWN';

            mobileH2.innerHTML = `${move.name.toUpperCase()}<span class="pp">PP ${currentPP}/${maxPP}</span><span class="type">TYPE/${elementalType.toUpperCase()}</span>`;
            mobileMoveItem.appendChild(mobileH2);
            mobileMovesContainer.appendChild(mobileMoveItem);

            const handleMoveClick = () => {
                this.eventSystem.emit('BATTLE_ACTION', {
                    type: 'attack',
                    move: move,
                });
            };
            desktopMoveItem.addEventListener('click', handleMoveClick);
            mobileMoveItem.addEventListener('click', handleMoveClick);

            desktopMoveItem.addEventListener('mouseenter', () => {
                const ppDisplay = this.shadowRoot!.querySelector(
                    '.moves-panel-data .pp-data h2:nth-child(2)'
                ) as HTMLElement;
                ppDisplay.textContent = `${currentPP}/${maxPP}`;

                const typeDisplay = this.shadowRoot!.querySelector(
                    '.moves-panel-data .moves-data-content div:nth-child(2) h2'
                ) as HTMLElement;
                typeDisplay.textContent = `TYPE/${elementalType.toUpperCase()}`;

                desktopMovesContainer
                    .querySelectorAll('h2.active')
                    .forEach((h) => h.classList.remove('active'));
                desktopH2.classList.add('active');
            });
        });

        const firstDesktopMoveItem =
            desktopMovesContainer.firstChild as HTMLElement;
        if (firstDesktopMoveItem && firstDesktopMoveItem.querySelector('h2')) {
            (
                firstDesktopMoveItem.querySelector('h2') as HTMLElement
            ).classList.add('active');
            const event = new MouseEvent('mouseenter', {
                bubbles: true,
                cancelable: true,
            });
            firstDesktopMoveItem.dispatchEvent(event);
        }
    }

    connectedCallback() {
        const menuItems = this.shadowRoot?.querySelectorAll(
            '.actions-menu .menu-item'
        );
        if (menuItems && menuItems.length > 0) {
            const firstH2 = menuItems[0].querySelector('h2');
            firstH2?.classList.add('active');

            menuItems.forEach((item) => {
                const h2 = item.querySelector('h2');
                if (h2) {
                    h2.addEventListener('mouseenter', () => {
                        menuItems.forEach((el) =>
                            el.querySelector('h2')?.classList.remove('active')
                        );
                        h2.classList.add('active');
                    });

                    h2.addEventListener('click', () => {
                        const actionValue = item.getAttribute('action-value');
                        if (actionValue === 'FIGHT') {
                            if (this.actionsPanel)
                                this.actionsPanel.style.display = 'none';
                            if (this.dialogArea)
                                this.dialogArea.style.display = 'none';
                            if (this.movePanelArea)
                                this.movePanelArea.style.display = 'flex';
                        } else if (actionValue === 'BAG') {
                            this.eventSystem.emit('BATTLE_ACTION', {
                                type: 'bag',
                            });
                            console.log(
                                'BAG selected - System logic not yet implemented in provided BattleSystem'
                            );
                        } else if (actionValue === 'POKEMON') {
                            this.eventSystem.emit('BATTLE_ACTION', {
                                type: 'switch',
                            });
                            console.log(
                                'POKEMON selected - System logic not yet implemented in provided BattleSystem'
                            );
                        } else if (actionValue === 'RUN') {
                            this.eventSystem.emit('BATTLE_ACTION', {
                                type: 'flee',
                            });
                        }
                    });
                }
            });
        }
    }

    private onBattleEnd(elements: HTMLElement[]): void {
        elements.forEach((element) => element.classList.remove('active'));
    }
}
