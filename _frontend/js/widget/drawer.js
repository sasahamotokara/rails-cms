// import global variables.
import {FOCUS_ELEMENTS, MQL} from './utils/global';

// import utilities.
import * as backdrop from './utils/backdrop';
import randomString from './utils/randomString';
import scrollLock from './utils/scrollLock';
import tabIndexControl from './utils/tabIndexControl';

class Drawer {
    /**
     * ドロワーメニュー
     *
     * @constructor
     * @param {HTMLElement} root    - ルートとなる要素
     * @param {Object}      options - 設定の変更をする際のオブジェクト
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
        this.id = this.root.id || randomString('drawer');
        this.mainContent = document.querySelector(`.${this.config.className.mainContent}`);
        this.content = this.root.querySelector(`.${this.config.className.content}`);
        this.textContents = this.content.querySelectorAll(`.${this.config.className.text}`);
        this.control = document.createElement('button');
        this.backdrop = backdrop.createBackdropLayer();
        this.width = 0;
        this.isOpen = MQL.state === 'PC';
        this.isAnimate = false;

        // 不足している要素がある場合は実装しない
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
        // ルート要素にidがなければ付与
        if (!this.root.id) {
            this.root.id = this.id;
        }

        // 開くフラグがfalse（閉じている）場合は閉じる処理
        if (!this.isOpen) {
            for (const text of this.textContents) {
                text.hidden = true;
            }
        }

        this.root.classList.add(this.isOpen ? this.config.className.open : this.config.className.close);
        this.control.classList.add(this.config.className.button);
        this.control.insertAdjacentHTML('beforeend', `<span class="${this.config.className.altText}">${this.config.text[this.isOpen ? 'close' : 'open']}</span>`);
        this.content.insertAdjacentHTML('afterbegin', `<div class="${this.config.className.buttonWrap}"></div>`);
        this.content.firstElementChild.insertAdjacentElement('beforeend', this.control);
    }

    /**
     * addEvent - イベントバインド
     * @returns {Void}
     */
    addEvent() {
        this.control.addEventListener('click', () => {
            this.expand(!this.isOpen);
        });

        this.root.addEventListener(backdrop.eventName, () => {
            this.expand(false);
        });

        this.root.addEventListener('keydown', (e) => {
            // Escキーで閉じる
            if (!this.isOpen || MQL.state !== 'SP' || e.key.indexOf('Esc') === -1) {
                return;
            }

            this.expand(false);
        });

        this.root.addEventListener('transitionend', (e) => {
            // width以外のトランジションは検知しない
            if (e.propertyName !== 'width') {
                return;
            }

            this.isAnimate = this.transitionAfter();
        });

        window.addEventListener(MQL.eventName, () => {
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
            }

            // PC画面サイズの場合
            if (MQL.state === 'PC') {
                if (this.isOpen) {
                    this.backdropControl(false);
                }

                this.width = this.root.clientWidth;
            }
        });
    }

    /**
     * expand - 開閉処理
     * @param  {Boolean} isOpen 開く（true）か閉じる（false）か
     * @return {Void}
     */
    expand(isOpen) {
        // アニメーション中は処理しない
        if (this.isAnimate) {
            return;
        }

        this.isOpen = isOpen;
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
    }

    /**
     * openDrawer - 開く処理
     * @return {Boolean} - transitionの有無を返却
     */
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
            this.backdropControl(true);
        }

        // transition-durationの有無を返却
        return !(duration === '' || parseFloat(duration) === 0);
    }

    /**
     * closeDrawer - 閉じる処理
     * @return {Boolean} - transitionの有無を返却
     */
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

        // SP時は背景を非表示
        if (MQL.state === 'SP') {
            this.backdropControl(false);
        }

        // transitionの有無を返却
        return !(duration === '' || parseFloat(duration) === 0);
    }

    /**
    * backdropControl - 背景レイヤー制御
    * @param {Boolean} enable - 背景レイヤーを有効にする（true）かしない（false）か
    * @return {Void}
    */
    backdropControl(enable) {
        scrollLock(enable);
        backdrop.displayBackdropLayer(enable, this.id);
        tabIndexControl(enable, enable ? [...this.content.querySelectorAll(FOCUS_ELEMENTS), this.control] : [...this.content.querySelectorAll(FOCUS_ELEMENTS)]);
    }

    /**
    * transitionAfter   - トランジション後処理
    * @return {Boolean} - falseを返却
    */
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
