import mainCss from '../../../../main.css';
import css from './experience.css';
import html from './experience.html';
import { PageComponent } from '@/types/page-component';

export default class ExperienceComponent
    extends HTMLElement
    implements PageComponent
{
    public name = 'experience';
    private _menuItemName = '';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
      <style>${mainCss.toString()}${css.toString()}</style>
      ${html}
    `;
        this.shadowRoot?.appendChild(template.content.cloneNode(true));

        this.setupEventListeners();
    }

    private setupEventListeners(): void {}

    set menuItemName(value: string) {
        this._menuItemName = value;
    }

    get menuItemName(): string {
        return this._menuItemName;
    }
}
