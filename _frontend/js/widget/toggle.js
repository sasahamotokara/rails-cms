// import modules.
import {Expand} from './modules/expand';

class Toggle {
    /**
     * トグルメニュー
     *
     * @constructor
     * @param {HTMLElement} root - ルートとなる要素
     * @param {Object} options - 設定の変更をする際のオブジェクト
     */
    constructor(root, options) {
        const config = {
            className: {
                heading: 'js-toggle__heading',
                content: 'js-toggle__content',
                control: 'js-toggle__control',
                button: 'p-widget-toggle__button',
                altText: 'c-text-status',
                isOpen: 'is-open',
            },
            text: {
                open: '開く',
                close: '閉じる',
            },
        };

        if (!root) {
            return;
        }

        this.config = Object.assign(config, options);
        this.root = root;
        this.headings = this.root.querySelectorAll(`.${this.config.className.heading}`);
        this.contents = this.root.querySelectorAll(`.${this.config.className.content}`);
        this.controls = this.getControlElement();
        this.toggle = [];
        this.currentIndex = 0;
        this.isOpen = false;
        this.isAnimate = false;

        if (!this.headings.length || !this.contents.length || this.headings.length !== this.contents.length) {
            return;
        }

        this.init();
        this.addEvent();
    }

    /**
     * init - 初期化
     * @return {Void}
     */
    init() {
        this.root.style.maxWidth = `${this.getContentMaxWidth()}px`;
        this.toggle = [...this.contents].map((content, index) => new Expand('toggle', this.controls[index], content, content.classList.contains(this.config.className.isOpen), false));
    }

    createControlElement(heading) {
        const button = document.createElement('button');

        button.type = 'button';
        button.classList.add(this.config.className.button);

        for (const child of heading.childNodes) {
            button.appendChild(child);
        }

        button.insertAdjacentHTML('beforeend', `<span class="${this.config.className.altText}">${this.config.text.open}</span>`);
        heading.insertAdjacentElement('beforeend', button);

        return button;
    }

    getControlElement() {
        const controls = [];

        for (const heading of this.headings) {
            controls.push(heading.querySelector(`.${this.config.className.control}`) || this.createControlElement(heading));
        }

        return controls;
    }

    getContentMaxWidth() {
        return Math.max([...this.contents].map((element) => {
            let width = 0;

            element.style.display = 'inline-block';
            width = element.clientWidth;
            element.style.display = '';

            return width + 1;
        }));
    }

    /**
     * addEvent - イベントバインド
     */
    addEvent() {
        this.controls.forEach((control, index) => {
            control.addEventListener('click', () => {
                if (this.isAnimate) {
                    return;
                }

                this.isAnimate = true;
                this.currentIndex = index;
                this.isOpen = this.contents[index].hidden;
                this.controls[index].lastElementChild.textContent = this.config.text[this.isOpen ? 'close' : 'open'];

                // 開閉処理を実行、false（transition-durationが設定されていない）場合はトランジション後の処理を実行
                if (!this.toggle[index][this.isOpen ? 'open' : 'close']()) {
                    this.isAnimate = this.toggle[index].transitionAfter();
                }
            });
        });

        for (const content of this.contents) {
            content.addEventListener('transitionend', (e) => {
                // height以外のトランジションは検知しない
                if (e.propertyName !== 'height') {
                    return;
                }

                this.isAnimate = this.toggle[this.currentIndex].transitionAfter();
            });
        }
    }
}

/**
 * デフォルト実行処理
 * @return {Void}
 */
export default () => {
    // 汎用タブ
    document.querySelectorAll('.js-toggle').forEach((element) => new Toggle(element));
};
