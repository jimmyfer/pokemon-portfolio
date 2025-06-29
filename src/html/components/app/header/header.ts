import { MENU_CONFIG } from '@/html/menu/menu-config';
import mainCss from '../../../main.css';
import css from './header.css';
import html from './header.html';
import MenuItemComponent from '../../ui/menu-item/menu-item';
import { EventSystem } from '@/core/systems/event-system';
import { GameContext } from '@/core/engine/game-context';
import { MenuService } from '@/core/services/menu-service';
import { AfterCloseHandler } from '@/types/menu';

export default class HeaderComponent extends HTMLElement {
    private eventSystem: EventSystem;
    private menuService: MenuService;
    private logoElement: HTMLDivElement;
    private transitionTimeout: ReturnType<typeof setTimeout> | null = null;
    private pageActive = false;
    private activePokemonSwitchComponent = false;

    constructor() {
        super();

        const gameContext = GameContext.getInstance();
        this.eventSystem = gameContext.getBean(EventSystem);
        this.menuService = gameContext.getBean(MenuService);

        this.attachShadow({ mode: 'open' });
        this.initializeTemplate();

        this.initializeMenuButtons();
        this.initializeMenuItems();

        this.initializeLogo();

        this.listenMapTransitionEvent();

        this.eventSystem.on('PAGE_TRANSITION_CLOSED', () =>
            this.updateToPageMode()
        );

        this.eventSystem.on('SWITCH_POKEMON_TRANSITION_CLOSED', () => {
            this.updateToPageMode();
            this.activePokemonSwitchComponent = true;
        });

        this.eventSystem.on('PAGE_CLOSED_TRANSITION_CLOSED', () =>
            this.updateToGameMode()
        );
        this.eventSystem.on('POKEMON_SWITCH_CLOSED_TRANSITION_CLOSED', () =>
            this.updateToGameMode()
        );

        this.menuService.onAfterClose(() => {
            if (this.activePokemonSwitchComponent) {
                this.eventSystem.emit('POKEMON_SWITCH_CLOSED_TRANSITION', {});
            } else {
                this.eventSystem.emit('PAGE_CLOSED_TRANSITION', {});
            }
        });
    }

    private initializeTemplate(): void {
        const template = document.createElement('template');
        template.innerHTML = `
        <style>${mainCss.toString()}${css.toString()}</style>
        ${html}
      `;
        this.shadowRoot?.appendChild(template.content.cloneNode(true));
    }

    private initializeMenuButtons(): void {
        const openMenuBtn = this.shadowRoot?.querySelector('.open-menu-btn');
        const closeMenuBtn = this.shadowRoot?.querySelector('.close-menu');

        openMenuBtn?.addEventListener('click', () => this.clickedMenu());
        closeMenuBtn?.addEventListener('click', () => this.clickedMenu());
    }

    private clickedMenu(): void {
        if (this.pageActive) {
            this.closeActivePage();
        } else {
            this.toggleMenu();
        }
    }

    private closeActivePage(): void {
        this.menuService.requestClose();
    }

    private toggleMenu(): void {
        const menuContainer = this.shadowRoot?.querySelector(
            '.menu-body-container'
        );
        menuContainer?.classList.toggle('active');
    }

    private desactivateMenu(): void {
        const menuContainer = this.shadowRoot?.querySelector(
            '.menu-body-container'
        ) as HTMLDivElement;
        menuContainer.style = 'display: none';
        menuContainer?.classList.remove('active');

        setTimeout(() => {
            menuContainer.style = 'display: block';
        }, 350);
    }

    private initializeMenuItems(): void {
        MENU_CONFIG.forEach((item) => {
            const menuItemsContainer =
                this.shadowRoot?.querySelector('.menu-items');

            const menuItem = new MenuItemComponent();
            menuItem.itemName = item.itemName;

            if (item.component) {
                menuItem.pageComponent = new item.component();
            }

            menuItemsContainer?.appendChild(menuItem);
        });
    }

    private initializeLogo(): void {
        this.logoElement = this.shadowRoot?.querySelector(
            '.logo'
        ) as HTMLDivElement;
        const logoHeight = this.logoElement.offsetHeight;
        this.logoElement.style.transform = `translateY(-${logoHeight + 10}px)`;
    }

    private listenMapTransitionEvent(): void {
        this.eventSystem.on('MAP_TRANSITION', () => {
            const logoHeight = this.logoElement.offsetHeight;
            this.logoElement.style.transform = `translateY(-${logoHeight + 10}px)`;
        });

        this.eventSystem.on('MAP_TRANSITION_READY', (data) => {
            if (!data.mapName) return;

            this.logoElement.style.transform = 'translateY(0px)';
            this.logoElement.childNodes[3].textContent = data.mapName;

            if (this.transitionTimeout) {
                clearTimeout(this.transitionTimeout);
            }

            this.transitionTimeout = setTimeout(() => {
                const logoHeight = this.logoElement.offsetHeight;
                this.logoElement.style.transform = `translateY(-${logoHeight + 10}px)`;
            }, 2000);
        });
    }

    updateToPageMode(): void {
        const imgComponent = this.shadowRoot?.querySelector(
            '.menu-btn-img'
        ) as HTMLImageElement;
        imgComponent.style.display = 'none';
        this.pageActive = true;
        this.desactivateMenu();
    }

    updateToGameMode(): void {
        const imgComponent = this.shadowRoot?.querySelector(
            '.menu-btn-img'
        ) as HTMLImageElement;
        imgComponent.style.display = 'block';
        this.pageActive = false;
        this.activePokemonSwitchComponent = false;
    }
}
