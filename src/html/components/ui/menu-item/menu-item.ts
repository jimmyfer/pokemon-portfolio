import { PageComponent } from '@/types/page-component';
import mainCss from '../../../main.css';
import css from './menu-item.css';
import html from './menu-item.html';
import { EventSystem } from '@/core/systems/event-system';
import { GameContext } from '@/core/engine/game-context';

export default class MenuItemComponent extends HTMLElement {
    private _pageComponent: PageComponent | null = null;

    private _itemName: string | null = null;

    private eventSystem: EventSystem;

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
            ?.querySelector('.menu-item')
            ?.addEventListener('click', () => {
                if (this._pageComponent) {
                    this.eventSystem.emit('PAGE_TRANSITION', {
                        component: this._pageComponent,
                        itemName: this._itemName,
                    });
                }
            });
    }

    set itemName(value: string) {
        this.shadowRoot!.querySelector('.item-name')!.innerHTML = value;
        this._itemName = value;
    }

    get itemName(): string {
        return this._itemName!;
    }

    set pageComponent(value: PageComponent) {
        this._pageComponent = value;
    }

    get pageComponent(): PageComponent {
        return this._pageComponent!;
    }
}
