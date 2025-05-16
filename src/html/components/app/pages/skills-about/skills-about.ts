import mainCss from '../../../../main.css';
import css from './skills-about.css';
import html from './skills-about.html';
import { PageComponent } from '@/types/page-component';

export default class SkillsAboutComponent
    extends HTMLElement
    implements PageComponent
{
    public name = 'page-skills-about';
    private _menuItemName = '';
    private currentRotation = 0;

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

    private setupEventListeners(): void {
        this.shadowRoot
            ?.querySelector('.arrow-left')
            ?.addEventListener('click', () => this.handleCardRotation('left'));
        this.shadowRoot
            ?.querySelector('.arrow-right')
            ?.addEventListener('click', () => this.handleCardRotation('right'));
        this.shadowRoot
            ?.querySelector('.movil-arrow-right')
            ?.addEventListener('click', () => this.moveRespHeaderBag('right'));
        this.shadowRoot
            ?.querySelector('.movil-arrow-left')
            ?.addEventListener('click', () => this.moveRespHeaderBag('left'));
    }

    private handleCardRotation(direction: 'left' | 'right'): void {
        const cardInner = this.shadowRoot?.querySelector(
            '.card-inner'
        ) as HTMLElement;
        const multiplier = direction === 'left' ? 1 : -1;

        if (this._menuItemName === 'ABOUT ME') {
            this.currentRotation += multiplier * 180;
            this._menuItemName = 'SKILLS';
        } else if (this._menuItemName === 'SKILLS') {
            this.currentRotation -= multiplier * 180;
            this._menuItemName = 'ABOUT ME';
        }

        cardInner.style.transform = `rotateY(${this.currentRotation}deg)`;
    }

    set menuItemName(value: string) {
        this._menuItemName = value;
        this.rotateInnerCard();
        this.setUpResponsiveHeader();
    }

    get menuItemName(): string {
        return this._menuItemName;
    }

    public moveRespHeaderBag(dir: 'left' | 'right'): void {
        const contentAbout = this.shadowRoot?.querySelector(
            '.content-about'
        ) as HTMLDivElement;
        const contentSkills = this.shadowRoot?.querySelector(
            '.content-skills'
        ) as HTMLDivElement;
        contentAbout.style.display = 'none';
        contentSkills.style.display = 'none';

        const inventoryContent = this.shadowRoot?.querySelector(
            '.inventory-content'
        ) as HTMLDivElement;
        inventoryContent.classList.remove('expanded');

        const textContainer = this.shadowRoot?.querySelector(
            '.header-title .text-container'
        ) as HTMLElement;
        const directionFactor = dir === 'left' ? 1 : -1;
        textContainer.style.transform = `translateX(${directionFactor * -100}%)`;

        setTimeout(() => {
            if (directionFactor === 1) {
                textContainer.appendChild(textContainer.firstElementChild!);
            } else {
                textContainer.prepend(textContainer.lastElementChild!);
            }
            textContainer.style.transition = 'none';
            textContainer.style.transform = 'translateX(0)';
            setTimeout(() => {
                textContainer.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
        }, 500);

        setTimeout(() => {
            if (this._menuItemName === 'ABOUT ME') {
                this._menuItemName = 'SKILLS';
                setTimeout(() => {
                    const contentSkills = this.shadowRoot?.querySelector(
                        '.content-skills'
                    ) as HTMLDivElement;
                    contentSkills.style.display = 'block';
                }, 250);
            } else if (this._menuItemName === 'SKILLS') {
                this._menuItemName = 'ABOUT ME';
                setTimeout(() => {
                    const contentAbout = this.shadowRoot?.querySelector(
                        '.content-about'
                    ) as HTMLDivElement;
                    contentAbout.style.display = 'block';
                }, 250);
            }
            inventoryContent.classList.add('expanded');
        }, 200);
    }

    public setUpResponsiveHeader(): void {
        const textContainer = this.shadowRoot?.querySelector(
            '.header-title .text-container'
        ) as HTMLElement;

        if (this._menuItemName === 'ABOUT ME') {
            const contentAbout = this.shadowRoot?.querySelector(
                '.content-about'
            ) as HTMLDivElement;
            contentAbout.style.display = 'block';
            if (textContainer.firstElementChild?.classList.contains('about')) {
                textContainer.appendChild(textContainer.firstElementChild);
            }
        } else if (this._menuItemName === 'SKILLS') {
            const contentSkills = this.shadowRoot?.querySelector(
                '.content-skills'
            ) as HTMLDivElement;
            contentSkills.style.display = 'block';
            if (textContainer.firstElementChild?.classList.contains('skills')) {
                textContainer.prepend(textContainer.firstElementChild);
            }
        }
    }

    public rotateInnerCard(): void {
        if (this._menuItemName === 'ABOUT ME') {
            this.currentRotation = 180;
            const cardInner = this.shadowRoot?.querySelector(
                '.card-inner'
            ) as HTMLElement;
            cardInner.style.transform = `rotateY(${this.currentRotation}deg)`;
        }
    }
}
