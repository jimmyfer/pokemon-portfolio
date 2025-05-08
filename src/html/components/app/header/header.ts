import { MENU_CONFIG } from '@/html/menu/menu-config';
import mainCss from '../../../main.css';
import css from './header.css';
import html from './header.html';
import MenuItemComponent from '../../ui/menu-item/menu-item';
import { EventSystem } from '@/core/systems/event-system';
import { GameContext } from '@/core/engine/game-context';

export default class HeaderComponent extends HTMLElement {
    private eventSystem: EventSystem;
    private logoElement: HTMLDivElement;
    private transitionTimeout: ReturnType<typeof setTimeout> | null = null;

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

        this.shadowRoot
            ?.querySelector('.open-menu-btn')
            ?.addEventListener('click', () => {
                this.shadowRoot
                    ?.querySelector('.menu-body-container')
                    ?.classList.toggle('active');
            });

        this.shadowRoot
            ?.querySelector('.close-menu')
            ?.addEventListener('click', () => {
                this.shadowRoot
                    ?.querySelector('.menu-body-container')
                    ?.classList.toggle('active');
            });

        MENU_CONFIG.forEach((item) => {
            const menuItemsContainer =
                this.shadowRoot?.querySelector('.menu-items');

            const menuItem = document.createElement(
                'ui-menu-item'
            ) as MenuItemComponent;
            menuItem.itemName = item.itemName;

            menuItemsContainer?.appendChild(menuItem);
        });

        this.logoElement = this.shadowRoot?.querySelector(
            '.logo'
        ) as HTMLDivElement;
        const logoHeight = this.logoElement.offsetHeight;
        this.logoElement.style.transform = `translateY(-${logoHeight + 10}px)`;

        this.listenMapTransitionEvent();
    }

    listenMapTransitionEvent(): void {
        this.eventSystem.on('MAP_TRANSITION', () => {
            const logoHeight = this.logoElement.offsetHeight;
            this.logoElement.style.transform = `translateY(-${logoHeight + 10}px)`;
        });

        this.eventSystem.on('MAP_TRANSITION_COMPLETED', (data) => {
            this.logoElement.style.transform = 'translateY(0px)';
            this.logoElement.childNodes[3].textContent = data.mapName ?? '';

            if (this.transitionTimeout) {
                clearTimeout(this.transitionTimeout);
            }

            this.transitionTimeout = setTimeout(() => {
                const logoHeight = this.logoElement.offsetHeight;
                this.logoElement.style.transform = `translateY(-${logoHeight + 10}px)`;
            }, 2000);
        });
    }
}
