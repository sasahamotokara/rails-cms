// import global variables.
import {FOCUS_ELEMENTS, tabIndexControl} from '../utils/global';
import * as backdrop from '../utils/backdrop';
import scrollLock from '../utils/scrollLock';

class Modal {
    /**
     * モーダル
     *
     * @constructor
     * @param {HTMLElement} root - ルートとなる要素
     * @param {Object} options - 設定の変更をする際のオブジェクト
     */
    constructor(root, options) {
        const config = {
            className: {
                label: 'js-modal__label',
                existsCloseButton: 'js-modal__close',
                description: 'js-modal__description',
                closeButton: 'admin-modal__close',
                altText: 'u-altText',
            },
        };

        // ルートとなる要素が無い場合は実装しない
        if (!root) {
            return;
        }

        this.config = Object.assign(config, options);
        this.root = root;
        this.id = this.root.id;
        this.controls = document.querySelectorAll(`[href="#${this.id}"], [data-href="#${this.id}"]`);
        this.modalLabel = this.root.querySelector(`.${this.config.className.label}`);
        this.modalDescription = this.root.querySelector(`.${this.config.className.description}`);
        this.closeButton = document.createElement('button');
        this.existsCloseButton = this.root.querySelectorAll(`.${this.config.className.existsCloseButton}`);
        this.backdrop = backdrop.createBackdropLayer();
        this.focusableElements = [...this.root.querySelectorAll(FOCUS_ELEMENTS), this.root];
        this.current = null;
        this.isOpen = false;

        // コントロールボタンがない場合は何もしない
        if (!this.controls.length) {
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
        for (const control of this.controls) {
            // button要素以外にはbutton roleを追加
            if (control.tagName.toLowerCase() !== 'button') {
                control.setAttribute('role', 'button');
                control.tabIndex = 0;
            }

            control.setAttribute('aria-expanded', 'false');
            control.setAttribute('aria-haspopup', 'true');
            control.setAttribute('aria-controls', this.id);
        }

        // モーダルのラベルが指定されている場合の紐づけ
        if (this.modalLabel) {
            this.modalLabel.id = `${this.id}-label`;
            this.root.setAttribute('aria-labelledby', `${this.id}-label`);
        }

        // モーダルの説明が指定されている場合の紐づけ
        if (this.modalDescription) {
            this.modalDescription.id = `${this.id}-description`;
            this.root.setAttribute('aria-describedby', `${this.id}-description`);
        }

        this.root.hidden = true;
        this.root.tabIndex = -1;
        this.root.setAttribute('role', 'dialog');
        this.root.setAttribute('aria-modal', 'true');

        this.closeButton.type = 'button';
        this.closeButton.classList.add(this.config.className.closeButton);
        this.closeButton.insertAdjacentHTML('beforeend', `<span class="${this.config.className.altText}">閉じる</span>`);

        this.root.insertAdjacentElement('beforeend', this.closeButton);
        this.focusableElements.push(this.closeButton);
    }

    /**
     * addEvent - イベントバインド
     */
    addEvent() {
        this.root.addEventListener(backdrop.eventName, this.modalClose.bind(this));

        this.root.addEventListener('keydown', (e) => {
            // 閉じている場合は無効
            if (!this.isOpen || e.key.indexOf('Esc') === -1) {
                return;
            }

            // Escapeキー押下で閉じる
            this.modalClose(e);
        });

        for (const control of this.controls) {
            control.addEventListener('click', this.modalOpen.bind(this));
        }

        for (const button of [this.closeButton, ...this.existsCloseButton]) {
            button.addEventListener('click', this.modalClose.bind(this));
        }
    }

    /**
     * modalOpen - 開く処理
     * @param  {clickEvent} event イベントオブジェクト
     * @return {void}
     */
    modalOpen(event) {
        const {currentTarget} = event;

        // すでに展開されている場合は何もしない
        if (this.isOpen) {
            return;
        }

        event.preventDefault();

        // フラグを更新
        this.isOpen = true;
        this.root.hidden = false;
        this.current = currentTarget;

        currentTarget.setAttribute('aria-expanded', 'true');
        this.root.focus();

        // タブインデックス・スクロールの制御
        tabIndexControl(true, this.focusableElements);
        backdrop.displayBackdropLayer(true, this.id);
        scrollLock(true);
    }

    /**
     * modalClose - 閉じる処理
     * @return {Void}
     */
    modalClose() {
        // すでに閉じられている場合は何もしない
        if (!this.isOpen) {
            return;
        }

        // フラグを更新
        this.isOpen = false;
        this.root.hidden = true;

        this.current.setAttribute('aria-expanded', 'false');
        this.current.focus();

        // タブインデックス・スクロールの制御
        tabIndexControl(false, this.focusableElements);
        backdrop.displayBackdropLayer(false);
        scrollLock(false);
    }
}

/**
 * デフォルト実行処理
 * @return {Void}
 */
export default () => {
    // 汎用モーダル
    document.querySelectorAll('.admin-modal').forEach((element) => new Modal(element));
};
