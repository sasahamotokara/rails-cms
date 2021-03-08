// import global variables.
import {MQL} from './utils/global';

// import modules.
import {Expand} from './modules/expand';

class ToggleMenu {
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
                header: 'l-header__inner',
                content: 'js-toggle-menu__content',
                control: 'c-button-menu',
                altText: 'u-altText',
            },
            text: {
                button: 'メニュー',
            },
        };

        if (!root) {
            return;
        }

        this.config = Object.assign(config, options);
        this.root = root;
        this.header = document.querySelector(`.${this.config.className.header}`);
        this.content = this.root.querySelector(`.${this.config.className.content}`);
        this.control = document.createElement('button');
        this.toggle = null;
        this.isOpen = false;
        this.isAnimate = false;

        if (!this.content) {
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
        this.control.classList.add(this.config.className.control);
        this.control.insertAdjacentHTML('beforeend', `<span class="${this.config.className.altText}">${this.config.text.button}</span>`);
        this.toggle = new Expand('menu', this.control, this.content, false, true);

        if (MQL.state === 'SP') {
            this.header.insertAdjacentElement('beforeend', this.control);
        } else {
            this.toggle.reset();
        }
    }

    /**
     * addEvent - イベントバインド
     */
    addEvent() {
        this.control.addEventListener('click', () => {
            if (this.isAnimate) {
                return;
            }

            this.isOpen = !this.isOpen;
            this.isAnimate = true;

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

        this.root.addEventListener('keydown', (e) => {
            if (!this.isOpen || this.isAnimate || !e.key.includes('Esc')) {
                return;
            }

            this.isOpen = false;
            this.isAnimate = true;

            // Escapeキー押下で閉じる
            if (!this.toggle.close()) {
                this.isAnimate = this.toggle.transitionAfter();
            }
        });

        window.addEventListener(MQL.eventName, () => {
            // フラグを更新
            this.isAnimate = false;
            this.isOpen = false;

            if (MQL.state !== 'SP') {
                this.toggle.reset();
                this.header.removeChild(this.control);
            } else {
                this.toggle.init();
                this.header.insertAdjacentElement('beforeend', this.control);
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
    document.querySelectorAll('.js-toggle-menu').forEach((element) => new ToggleMenu(element));
};
