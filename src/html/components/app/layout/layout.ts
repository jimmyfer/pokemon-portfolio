import mainCss from '../../../main.css';
import css from './layout.css';
import html from './layout.html';

export default class LayoutComponent extends HTMLElement {
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
}
