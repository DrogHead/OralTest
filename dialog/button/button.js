import Ripple from './ripple/ripple.js';
export default class Button {
    constructor(path) {
        let ripple = new Ripple(path + 'ripple/');
        this.ripple = ripple;
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = path + 'button.css';
        this.link = link;
        this.initialized = false;
        this.initialize = () => {
            this.ripple.init();
            document.head.appendChild(this.link);
        };
        this.destroy = () => {
            this.ripple.end();
            try {
                document.head.removeChild(this.link);
            }
            catch (e) {
            }
        };
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
