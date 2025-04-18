import mainCss from '../../../main.css';
import css from './header.css';
import html from './header.html';

export default class HeaderComponent extends HTMLElement {
    constructor() {
        super();

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
                    ?.querySelector('.menu-body')
                    ?.classList.toggle('active');
            });

        this.shadowRoot
            ?.querySelector('.close-menu')
            ?.addEventListener('click', () => {
                this.shadowRoot
                    ?.querySelector('.menu-body')
                    ?.classList.toggle('active');
            });
    }
}
