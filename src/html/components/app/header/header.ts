import { MENU_CONFIG } from '@/html/menu/menu-config';
import mainCss from '../../../main.css';
import css from './header.css';
import html from './header.html';
import MenuItemComponent from '../../ui/menu-item/menu-item';

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
            console.log(menuItemsContainer);

            menuItemsContainer?.appendChild(menuItem);
        });
    }
}
