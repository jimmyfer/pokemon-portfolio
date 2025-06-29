import mainCss from '../../../main.css';
import css from './game-dialog.css';
import html from './game-dialog.html';
import { EventSystem } from '@/core/systems/event-system';
import { GameContext } from '@/core/engine/game-context';
import downRedArrow from '@/assets/html/game-images/red_arrow_down.png';

export default class DialogComponent extends HTMLElement {
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

        this.eventSystem.on('START_DIALOG', (data) => this.startDialog(data));
    }

    startDialog(data: { dialogue: string[]; name?: string }): void {
        const dialogBox = this.shadowRoot!.querySelector(
            '.dialog-box'
        ) as HTMLDivElement;
        dialogBox.style.display = 'block';
        const dialogContent = this.shadowRoot?.querySelector(
            '.dialog-content'
        ) as HTMLDivElement;
        this.writeDialog(dialogContent, data.dialogue, 50);
    }

    writeDialog(
        container: HTMLDivElement,
        texts: string[],
        velocity: number,
        index = 0
    ): void {
        if (index >= texts.length) {
            const dialogBox = this.shadowRoot!.querySelector(
                '.dialog-box'
            ) as HTMLDivElement;
            dialogBox.style.display = 'none';
            this.eventSystem.emit('CLOSE_DIALOG', {});
            return;
        }

        container.innerHTML = '';

        const dialogLine = document.createElement('div');
        dialogLine.classList.add('dialog-line');
        container.appendChild(dialogLine);

        const header = document.createElement('h1');
        dialogLine.appendChild(header);

        let charIndex = 0;
        let isFast = false;
        const fastDelay = Math.max(10, velocity / 5);

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'Space' || event.key === ' ') {
                isFast = true;
                event.preventDefault();
            }
        };

        const onKeyUp = (event: KeyboardEvent) => {
            if (event.code === 'Space' || event.key === ' ') {
                isFast = false;
                event.preventDefault();
            }
        };

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);

        const typeText = () => {
            if (charIndex < texts[index].length) {
                header.textContent += texts[index].charAt(charIndex);
                charIndex++;
                const delay = isFast ? fastDelay : velocity;

                if (
                    index !== texts.length - 1 &&
                    charIndex === texts[index].length
                ) {
                    const currentText = header.textContent;
                    if (currentText) {
                        const span = document.createElement('span');
                        span.classList.add('last-letter');

                        const lastCharNode = document.createTextNode(
                            currentText.slice(-1)
                        );
                        span.appendChild(lastCharNode);

                        const icon = document.createElement('img');
                        icon.src = downRedArrow;

                        span.appendChild(icon);

                        header.textContent = currentText.slice(0, -1);
                        header.appendChild(span);
                    }
                }

                setTimeout(typeText, delay);
            } else {
                document.removeEventListener('keydown', onKeyDown);
                document.removeEventListener('keyup', onKeyUp);

                const waitForRelease = (event: KeyboardEvent) => {
                    if (event.code === 'Space' || event.key === ' ') {
                        document.removeEventListener('keyup', waitForRelease);
                        const onAdvance = (ev: KeyboardEvent) => {
                            if (ev.code === 'Space' || ev.key === ' ') {
                                ev.preventDefault();
                                document.removeEventListener(
                                    'keydown',
                                    onAdvance
                                );
                                this.writeDialog(
                                    container,
                                    texts,
                                    velocity,
                                    index + 1
                                );
                            }
                        };
                        document.addEventListener('keydown', onAdvance);
                    }
                };

                document.addEventListener('keyup', waitForRelease);
            }
        };

        typeText();
    }
}
