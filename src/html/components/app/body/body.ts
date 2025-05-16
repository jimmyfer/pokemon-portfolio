import mainCss from '../../../main.css';
import css from './body.css';
import html from './body.html';
import { EventSystem } from '@/core/systems/event-system';
import { GameContext } from '@/core/engine/game-context';
import { PageComponent } from '@/types/page-component';

export default class BodyComponent extends HTMLElement {
    private eventSystem: EventSystem;

    private currentComponent: PageComponent | null = null;

    private currentMenuItemName: string | null = null;

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

        this.setupTransitionListeners();
    }

    private setupTransitionListeners() {
        const eventSystem = GameContext.getInstance().getBean(EventSystem);

        eventSystem.on(
            'PAGE_TRANSITION_STARTED',
            (data: { component: PageComponent; itemName: string }) =>
                this.preLoadComponent(data)
        );

        eventSystem.on('PAGE_TRANSITION_CLOSED', () =>
            this.showLoadedComponent()
        );

        eventSystem.on('PAGE_CLOSED_TRANSITION_CLOSED', () =>
            this.resetComponent()
        );
    }

    private showLoadedComponent() {
        if (!this.currentComponent) return;
        const componentContainer = this.shadowRoot?.querySelector(
            '.component-container'
        );

        const component = this.currentComponent;

        if (this.currentMenuItemName) {
            component.menuItemName = this.currentMenuItemName;
        }

        componentContainer!.innerHTML = '';
        componentContainer?.appendChild(component);
    }

    private preLoadComponent(data: {
        component: PageComponent;
        itemName: string;
    }) {
        this.currentComponent = data.component;
        this.currentMenuItemName = data.itemName;
        this.toggleBodyContentIndex();
    }

    private resetComponent(): void {
        this.currentComponent = null;
        this.currentMenuItemName = null;
        this.toggleBodyContentIndex();
    }

    toggleBodyContentIndex(): void {
        const bodyContent = this.shadowRoot!.querySelector('.body-content');
        bodyContent!.classList.toggle('active');
        const componentContainer = this.shadowRoot?.querySelector(
            '.component-container'
        );
        componentContainer!.innerHTML = '';
        this.eventSystem.emit('PAGE_CLOSED_TRANSITION_READY', {});
    }
}
