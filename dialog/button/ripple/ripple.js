export default class Ripple {
    constructor(path) {
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = path + 'ripple.css';
        this.link = link;
        this.initialized = false;
        this.functions = [];
        this.initialize = () => {
            this.functions = [];
            let ripples = document.getElementsByClassName('dialog-button-ripple');
            for (let i = 0; i < ripples.length; i++) {
                let element = ripples[i];
                let f = (ev) => {
                    let x = ev.x - element.getBoundingClientRect().left;
                    let y = ev.y - element.getBoundingClientRect().top + window.scrollY;
                    let circle = document.createElement('div');
                    let CIRCLE_DIMEN = Math.max(element.offsetWidth, element.offsetHeight);
                    CIRCLE_DIMEN += CIRCLE_DIMEN / 2;
                    let MARGIN_TOP;
                    let MARGIN_LEFT;
                    if (element.offsetHeight > element.offsetWidth) {
                        MARGIN_TOP = -(CIRCLE_DIMEN / 6);
                        MARGIN_LEFT = -((CIRCLE_DIMEN - element.offsetWidth) / 2);
                    }
                    else {
                        MARGIN_TOP = -((CIRCLE_DIMEN - element.offsetHeight) / 2);
                        MARGIN_LEFT = -(CIRCLE_DIMEN / 6);
                    }
                    circle.style.marginTop = MARGIN_TOP + 'px';
                    circle.style.marginLeft = MARGIN_LEFT + 'px';
                    circle.style.width = CIRCLE_DIMEN + 'px';
                    circle.style.height = CIRCLE_DIMEN + 'px';
                    circle.className = 'dialog-button-ripple-circle';
                    circle.style.animation = 'expand 0.6s cubic-bezier(.23,1.03,.62,.97)';
                    element.appendChild(circle);
                    let percW = (-MARGIN_LEFT + x) / circle.offsetWidth * 100;
                    let percH = (-MARGIN_TOP + y) / circle.offsetHeight * 100;
                    if (!((50 - (element.offsetHeight / CIRCLE_DIMEN * 50)) <= percH && percH <= (50 + (element.offsetHeight / CIRCLE_DIMEN * 50)))) {
                        console.log(percH);
                        y -= window.scrollY;
                        percH = (-MARGIN_TOP + y) / circle.offsetHeight * 100;
                    }
                    circle.style.transformOrigin = percW + '% ' + percH + '%';
                    let g = (ev) => {
                        element.removeEventListener('mouseleave', g);
                        let h = (ev) => {
                            window.removeEventListener('mouseup', h);
                            circle.style.animation += ', fadeOut 0.6s linear';
                            let i = setInterval(() => {
                                try {
                                    element.removeChild(circle);
                                }
                                catch (e) {
                                }
                                clearInterval(i);
                            }, 590);
                        };
                        window.addEventListener('mouseup', h);
                    };
                    element.addEventListener('mouseleave', g);
                    let f = (ev) => {
                        element.removeEventListener('mouseup', f);
                        element.removeEventListener('mouseleave', g);
                        circle.style.animation += ', fadeOut 0.6s linear';
                        let i = setInterval(() => {
                            try {
                                element.removeChild(circle);
                            }
                            catch (e) {
                            }
                            clearInterval(i);
                        }, 590);
                    };
                    element.addEventListener('mouseup', f);
                };
                this.functions.push(f);
                element.addEventListener('mousedown', this.functions[i]);
            }
            document.head.appendChild(this.link);
        };
        this.destroy = () => {
            let ripples = document.getElementsByClassName('dialog-button-ripple');
            for (let i = 0; i < ripples.length; i++) {
                let element = ripples[i];
                element.removeEventListener('mousedown', this.functions[i]);
            }
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
