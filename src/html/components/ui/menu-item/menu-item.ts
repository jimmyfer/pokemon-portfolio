import mainCss from '../../../main.css';
import css from './menu-item.css';
import html from './menu-item.html';

export default class MenuItemComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');

        template.innerHTML = `
                    <style>${mainCss.toString()}${css.toString()}</style>
                    ${html}
                `;

        this.shadowRoot?.appendChild(template.content.cloneNode(true));
    }

    set itemName(value: string) {
        this.shadowRoot!.querySelector('.item-name')!.innerHTML = value;
    }
}
