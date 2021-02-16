// import global variables.
import {MQL, FOCUS_ELEMENTS, tabIndexControl} from '../utils/global';
import scrollLock from '../utils/scrollLock';
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

        if (MQL.state === 'SP') {
            this.header.insertAdjacentElement('beforeend', this.control);
        }

        this.toggle = new Expand(this.control, this.content, MQL.state !== 'SP', true);
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
            if (!this.isOpen || e.key.indexOf('Esc') === -1) {
                return;
            }

            this.isOpen = false;
            this.isAnimate = true;

            // Escapeキー押下で閉じる
            if (!this.toggle.close()) {
                this.isAnimate = this.toggle.transitionAfter();
            }
        });

        window.addEventListener(MQL.event, () => {
            // 開いている場合、閉じる処理
            if (this.isOpen) {
                scrollLock(false);
                tabIndexControl(true, [...this.content.querySelectorAll(FOCUS_ELEMENTS), this.control]);
            }

            // フラグを更新
            this.isAnimate = false;
            this.isOpen = false;
            this.control.setAttribute('aria-expanded', 'false');

            if (MQL.state !== 'SP') {
                this.content.hidden = false;
                this.header.removeChild(this.control);
            } else {
                this.content.hidden = true;
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
