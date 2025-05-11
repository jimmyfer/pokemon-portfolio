import mainCss from '../../../main.css';
import css from './body.css';
import html from './body.html';
import { EventSystem } from '@/core/systems/event-system';
import { GameContext } from '@/core/engine/game-context';

export default class BodyComponent extends HTMLElement {
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
    }
}
