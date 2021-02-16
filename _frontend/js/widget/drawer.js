// import global variables.
import {MQL, FOCUS_ELEMENTS, tabIndexControl, randomString} from '../utils/global';
import * as backdrop from '../utils/backdrop';
import scrollLock from '../utils/scrollLock';

class Drawer {
    /**
     * ドロワーメニュー
     *
     * @constructor
     * @param {HTMLElement} root - ルートとなる要素
     * @param {Object} options - 設定の変更をする際のオブジェクト
     */
    constructor(root, options) {
        const config = {
            drawerMinWidth: 200,
            className: {
                mainContent: 'admin-main',
                buttonWrap: 'admin-drawer',
                button: 'admin-drawer__button',
                content: 'js-drawer__content',
                text: 'js-drawer__controlText',
                altText: 'u-altText',
                open: 'is-open',
                close: 'is-close',
                animate: 'is-animate',
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
        this.id = this.root.id || randomString('drawer-');
        this.mainContent = document.querySelector(`.${this.config.className.mainContent}`);
        this.content = this.root.querySelector(`.${this.config.className.content}`);
        this.textContents = this.content.querySelectorAll(`.${this.config.className.text}`);
        this.control = document.createElement('button');
        this.backdrop = backdrop.createBackdropLayer();
        this.width = 0;
        this.isOpen = MQL.state === 'PC';
        this.isAnimate = false;

        if (!this.mainContent || !this.content || !this.textContents.length) {
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
        if (!this.isOpen) {
            for (const text of this.textContents) {
                text.hidden = true;
            }
        }

        if (!this.root.id) {
            this.root.id = this.id;
        }

        this.root.classList.add(this.isOpen ? this.config.className.open : this.config.className.close);
        this.control.classList.add(this.config.className.button);
        this.control.insertAdjacentHTML('beforeend', `<span class="${this.config.className.altText}">${this.config.text[this.isOpen ? 'close' : 'open']}</span>`);
        this.content.insertAdjacentHTML('afterbegin', `<div class="${this.config.className.buttonWrap}"></div>`);
        this.content.firstElementChild.insertAdjacentElement('beforeend', this.control);
    }

    /**
     * addEvent - イベントバインド
     */
    addEvent() {
        this.root.addEventListener(backdrop.eventName, () => {
            if (this.isAnimate) {
                return;
            }

            this.isOpen = false;
            this.isAnimate = true;
            this.width = this.root.clientWidth;

            this.root.classList.add(this.config.className.animate);
            this.root.classList.add(this.config.className.close);
            this.root.classList.remove(this.config.className.open);
            this.control.lastElementChild.textContent = this.config.text.open;

            if (!this.closeDrawer()) {
                this.isAnimate = this.transitionAfter();
            }
        });

        this.control.addEventListener('click', () => {
            if (this.isAnimate) {
                return;
            }

            this.isOpen = !this.isOpen;
            this.isAnimate = true;
            this.width = this.root.clientWidth;

            this.root.classList.add(this.config.className.animate);
            this.root.classList.add(this.config.className[this.isOpen ? 'open' : 'close']);
            this.root.classList.remove(this.config.className[this.isOpen ? 'close' : 'open']);
            this.control.lastElementChild.textContent = this.config.text[this.isOpen ? 'close' : 'open'];

            // 開閉処理を実行、false（transition-durationが設定されていない）場合はトランジション後の処理を実行
            if (!this[this.isOpen ? 'openDrawer' : 'closeDrawer']()) {
                this.isAnimate = this.transitionAfter();
            }
        });

        this.root.addEventListener('keydown', (e) => {
            if (MQL.state !== 'SP' || !this.isOpen || e.key.indexOf('Esc') === -1) {
                return;
            }

            this.isOpen = false;
            this.isAnimate = true;
            this.width = this.root.clientWidth;

            this.root.classList.add(this.config.className.close);
            this.root.classList.remove(this.config.className.open);
            this.control.lastElementChild.textContent = this.config.text.open;

            // Escapeキー押下で閉じる
            if (!this.closeDrawer()) {
                this.isAnimate = this.transitionAfter();
            }
        });

        this.root.addEventListener('transitionend', (e) => {
            // width以外のトランジションは検知しない
            if (e.propertyName !== 'width') {
                return;
            }

            this.isAnimate = this.transitionAfter();
        });

        window.addEventListener(MQL.event, () => {
            // フラグを更新
            this.isAnimate = false;
            // SP画面サイズ かつ 開いている場合、閉じる処理

            if (MQL.state === 'SP' && this.isOpen) {
                this.isOpen = false;

                this.root.classList.add(this.config.className.close);
                this.root.classList.remove(this.config.className.open);
                this.control.lastElementChild.textContent = this.config.text.open;

                for (const text of this.textContents) {
                    text.hidden = true;
                }

                const width = Math.min(this.root.offsetWidth, this.root.scrollWidth);

                this.mainContent.style.marginLeft = `${width}px`;
            }

            if (MQL.state === 'PC') {
                if (this.isOpen) {
                    scrollLock(false);
                    backdrop.displayBackdropLayer(false);
                    tabIndexControl(true, [...this.content.querySelectorAll(FOCUS_ELEMENTS), this.control]);
                }

                this.width = this.root.clientWidth;
                this.mainContent.style.marginLeft = `${this.width}px`;
            }
        });
    }

    openDrawer() {
        const duration = window.getComputedStyle(this.root).getPropertyValue('transition-duration');

        this.root.style.minWidth = 'auto';

        for (const text of this.textContents) {
            text.hidden = false;
        }

        this.root.style.width = `${this.width}px`;
        this.root.style.width = `${Math.max(this.root.offsetWidth, this.config.drawerMinWidth)}px`;
        this.content.focus();

        // SP時は背景を表示
        if (MQL.state === 'SP') {
            scrollLock(true);
            backdrop.displayBackdropLayer(true, this.id);
            tabIndexControl(true, [...this.content.querySelectorAll(FOCUS_ELEMENTS), this.control]);
        } else {
            this.mainContent.style.marginLeft = '';
        }

        // transition-durationの有無を返却
        return !(duration === '' || parseFloat(duration) === 0);
    }

    closeDrawer() {
        const duration = window.getComputedStyle(this.root).getPropertyValue('transition-duration');

        this.root.style.minWidth = 'auto';

        for (const text of this.textContents) {
            text.hidden = true;
        }

        const width = Math.min(this.root.offsetWidth, this.root.scrollWidth);

        this.root.style.width = `${this.width}px`;
        this.root.style.width = `${Math.min(width, this.root.offsetWidth)}px`;
        this.control.focus();

        // 背景レイヤーをの制御が必要 かつ 背景レイヤーが存在する場合
        if (MQL.state === 'SP') {
            scrollLock(false);
            backdrop.displayBackdropLayer(false);
            tabIndexControl(false, [...this.content.querySelectorAll(FOCUS_ELEMENTS)]);
        } else {
            this.mainContent.style.marginLeft = `${width}px`;
        }

        // transitionの有無を返却
        return !(duration === '' || parseFloat(duration) === 0);
    }

    transitionAfter() {
        this.root.style.width = '';
        this.root.style.minWidth = '';
        this.root.classList.remove(this.config.className.animate);

        return false;
    }
}

/**
 * デフォルト実行処理
 * @return {Void}
 */
export default () => {
    // 汎用タブ
    document.querySelectorAll('.js-drawer').forEach((element) => new Drawer(element));
};
