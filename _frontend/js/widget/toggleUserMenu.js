// import global variables.
import {Expand} from './modules/expand';

class ToggleUserMenu {
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
                heading: 'js-toggle-user__heading',
                content: 'js-toggle-user__content',
                control: 'js-toggle-user__control',
                button: 'admin-user__button',
                altText: 'u-altText',
            },
            text: {
                altText: 'ユーザーメニュー',
            },
        };

        if (!root) {
            return;
        }

        this.config = Object.assign(config, options);
        this.root = root;
        this.heading = this.root.querySelector(`.${this.config.className.heading}`);
        this.content = this.root.querySelector(`.${this.config.className.content}`);
        this.control = this.heading.querySelector(`.${this.config.className.control}`) || this.createControlElement(this.heading);
        this.toggle = null;
        this.isOpen = false;
        this.isAnimate = false;

        if (!this.heading || !this.content) {
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
        this.toggle = new Expand(this.control, this.content, false, false);
    }

    createControlElement(heading) {
        const button = document.createElement('button');

        button.type = 'button';
        button.classList.add(this.config.className.button);

        for (const child of heading.childNodes) {
            button.appendChild(child);
        }

        button.insertAdjacentHTML('beforeend', `<span class="${this.config.className.altText}">${this.config.text.altText}</span>`);
        heading.insertAdjacentElement('beforeend', button);

        return button;
    }

    /**
     * addEvent - イベントバインド
     */
    addEvent() {
        this.control.addEventListener('click', () => {
            if (this.isAnimate) {
                return;
            }

            this.isAnimate = true;
            this.isOpen = this.content.hidden;

            // 開閉処理を実行、false（transition-durationが設定されていない）場合はトランジション後の処理を実行
            if (!this.toggle[this.isOpen ? 'open' : 'close']()) {
                this.isAnimate = this.toggle.transitionAfter();
            }
        });

        this.content.addEventListener('transitionend', (e) => {
            // height以外のトランジションは検知しない
            if (e.propertyName !== 'height') {
                return;
            }

            this.isAnimate = this.toggle.transitionAfter();
        });

        document.addEventListener('click', (e) => {
            if (!this.isOpen) {
                return;
            }

            const {target} = e;
            const closestRoot = target.closest('.js-toggle-user');

            if (closestRoot) {
                return;
            }

            this.isAnimate = true;
            this.isOpen = false;

            // 開閉処理を実行、false（transition-durationが設定されていない）場合はトランジション後の処理を実行
            if (!this.toggle.close()) {
                this.isAnimate = this.toggle.transitionAfter();
            }
        });
    }
}

/**
 * デフォルト実行処理
 * @return {Void}
 */
export default () => {
    // 汎用タブ
    document.querySelectorAll('.js-toggle-user').forEach((element) => new ToggleUserMenu(element));
};
