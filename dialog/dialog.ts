import Button from './button/button.js';

export default class Dialog {

    title: string;
    content: string;
    yesBtn: string;
    noBtn: string;

    backgroundColor: string;
    titleColor: string;
    contentColor: string;
    yesBtnColor: string;
    noBtnColor: string;

    yesCallback: () => void;
    noCallback: () => void;

    link: HTMLLinkElement;
    initialize: () => void;
    destroy: () => void;

    button: Button;

    initialized: boolean;

    constructor(path: string = 'dialog/') {

        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = path + 'dialog.css';
        this.link = link;

        this.initialized = false;

        let button = new Button(path + 'button/');
        this.button = button;

        this.initialize = () => {

            this.button.init();

            document.head.appendChild(this.link);

        };
        this.destroy = () => {

            this.button.end();

            try {

                document.head.removeChild(this.link);

            } catch (e) {

            }

        };

        this.title = '';
        this.content = '';
        this.yesBtn = '';
        this.noBtn = '';

        this.backgroundColor = '';
        this.titleColor = '';
        this.contentColor = '';
        this.yesBtnColor = '';
        this.noBtnColor = '';

        this.yesCallback = () => { };
        this.noCallback = () => { };

    }

    setTitle(title: string, color: string): void {

        if (title !== '' && title !== undefined)
            this.title = title;

        if (color !== '' && color !== undefined)
            this.titleColor = color;

    }

    setContent(content: string, color: string): void {

        if (content !== '' && content !== undefined)
            this.content = content;

        if (color !== '' && color !== undefined)
            this.contentColor = color;

    }

    setYesBtn(text: string, color: string, onclick: () => void): void {

        if (text !== '' && text !== undefined)
            this.yesBtn = text;

        if (color !== '' && color !== undefined)
            this.yesBtnColor = color;

        this.yesCallback = onclick;

    }

    setNoBtn(text: string, color: string, onclick: () => void): void {

        if (text !== '' && text !== undefined)
            this.noBtn = text;

        if (color !== '' && color !== undefined)
            this.noBtnColor = color;

        this.noCallback = onclick;

    }

    setBackgroundColor(backgroundColor: string): void {

        if (backgroundColor !== '' && backgroundColor !== undefined)
            this.backgroundColor = backgroundColor;

    }

    show(): void {

        if (!this.initialized)
            return;

        let container = document.createElement('div');
        container.className = 'dialog-container';

        let dialog = document.createElement('div');
        dialog.className = 'dialog';

        let title = document.createElement('h1');
        title.className = 'dialog-title';

        let content = document.createElement('h4');
        content.className = 'dialog-content';

        let dialogButtonsContainer = document.createElement('div');
        dialogButtonsContainer.className = 'dialog-buttons';

        let noBtn = document.createElement('button');
        noBtn.className = 'dialog-no dialog-button dialog-button-ripple';

        let yesBtn = document.createElement('button');
        yesBtn.className = 'dialog-yes dialog-button dialog-button-ripple';

        if (this.title === '' || this.title === undefined) {

            title.style.display = 'none';
            title.style.margin = '0';

        } else {

            title.innerHTML = this.title;

            if (this.titleColor !== '' && this.titleColor !== undefined)
                title.style.color = this.titleColor;

        }

        if (this.content === '' || this.content === undefined) {

            content.style.display = 'none';
            content.style.margin = '0';

        } else {

            content.innerHTML = this.content;

            if (this.contentColor !== '' && this.contentColor !== undefined)
                content.style.color = this.contentColor;

        }

        if (this.yesBtn === '' || this.yesBtn === undefined) {

            noBtn.style.margin = '0';

            yesBtn.style.display = 'none';
            yesBtn.style.margin = '0';

        } else {

            yesBtn.innerHTML = this.yesBtn;

            if (this.yesBtnColor !== '' && this.yesBtnColor !== undefined)
                yesBtn.style.color = this.yesBtnColor;

            yesBtn.addEventListener('click', this.yesCallback);

        }

        if (this.noBtn === '' || this.noBtn === undefined) {

            noBtn.style.display = 'none';
            noBtn.style.margin = '0';

        } else {

            noBtn.innerHTML = this.noBtn;

            if (this.noBtnColor !== '' && this.noBtnColor !== undefined)
                noBtn.style.color = this.noBtnColor;

            noBtn.addEventListener('click', this.noCallback);

        }

        if (this.yesBtn === '' && this.noBtn === '' || this.yesBtn === undefined && this.noBtn === undefined)
            content.style.margin = '0';

        if (this.yesBtn === '' && this.noBtn === '' && this.content === ''
            || this.yesBtn === undefined && this.noBtn === undefined && this.content === undefined)
            title.style.margin = '0';

        if (this.backgroundColor !== '' && this.backgroundColor !== undefined)
            dialog.style.backgroundColor = this.backgroundColor;

        dialogButtonsContainer.appendChild(noBtn);
        dialogButtonsContainer.appendChild(yesBtn);

        dialog.appendChild(title);
        dialog.appendChild(content);
        dialog.appendChild(dialogButtonsContainer);

        container.appendChild(dialog);

        // closing animation
        let f = (): any => {

            container.style.animation = 'fadeOut 0.2s linear';

            let i = setInterval((): any => {

                let g = (): any => {

                    try {

                        document.body.removeChild(container);

                    } catch (e) {

                    }

                    container.removeEventListener('animationend', g);

                };
                container.addEventListener('animationend', g);

                clearInterval(i);

            }, 10);

        };
        container.addEventListener('click', f);
        yesBtn.addEventListener('click', f);
        noBtn.addEventListener('click', f);

        dialog.addEventListener('mouseenter', (): any => container.removeEventListener('click', f));
        dialog.addEventListener('mouseleave', (): any => container.addEventListener('click', f));

        document.body.appendChild(container);

        this.button.end();
        this.button.init();

    }

    init() {

        if (!this.initialized) {

            this.initialize();
            this.initialized = true;

        }

    }

    end() {

        if (this.initialized) {

            this.destroy();
            this.initialized = false;

        }

    }

}