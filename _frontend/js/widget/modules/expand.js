// import global variables.
import {FOCUS_ELEMENTS, MQL} from '../utils/global';

// import utilities.
import * as backdrop from '../utils/backdrop';
import randomString from '../utils/randomString';
import scrollLock from '../utils/scrollLock';
import tabIndexControl from '../utils/tabIndexControl';

export class Expand {
    /**
     * 開閉機能
     *
     * @constructor
     * @param {String}         idPrefix     - id名の接頭辞
     * @param {HTMLElement}    control      - 開閉ボタンとして機能する要素
     * @param {HTMLElement}    content      - 開閉するコンテンツ部分
     * @param {Boolean}        isOpen       - 初期表示を開く状態にする（true）かしない(false)か
     * @param {Boolean|String} withBackdrop - 開閉時に背景レイヤーの表示・非表示をする（true）かしない(false)か、または特定の画面サイズ（SP|PC）のみ表示するか
     */
    constructor(idPrefix, control, content, isOpen, withBackdrop) {
        // ボタンまたはコンテンツとなる要素が無い場合は実装しない
        if (!control || !content) {
            return;
        }

        this.control = control;
        this.content = content;
        this.id = this.content.id || randomString(idPrefix);
        this.isOpen = isOpen;
        this.backdropOnlyScreen = typeof withBackdrop === 'string' && (withBackdrop === 'PC' || withBackdrop === 'SP') ? withBackdrop : '';
        this.withBackdrop = typeof withBackdrop === 'string' ? withBackdrop === 'PC' || withBackdrop === 'SP' : withBackdrop;
        this.backdrop = this.withBackdrop ? backdrop.createBackdropLayer() : null;

        this.init();
    }

    /**
    * init - 初期化
    * @return {Void}
    */
    init() {
        // コンテンツにidが指定されていなかったら指定
        if (!this.content.id) {
            this.content.id = this.id;
        }

        this.content.hidden = !this.isOpen;
        this.control.setAttribute('aria-expanded', `${this.isOpen}`);
        this.control.setAttribute('aria-controls', this.id);
    }

    /**
    * reset - リセット処理
    * @return {Void}
    */
    reset() {
        this.content.hidden = false;
        this.control.removeAttribute('aria-expanded');
        this.control.removeAttribute('aria-controls');

        // 背景レイヤーをの制御が必要な場合、無効にする
        if (this.withBackdrop) {
            this.backdropControl(false);
        }
    }

    /**
    * backdropControl - 背景レイヤー制御
    * @param {Boolean} enable - 背景レイヤーを有効にする（true）かしない（false）か
    * @return {Void}
    */
    backdropControl(enable) {
        // 背景レイヤーをの制御が不要な場合は処理しない
        if (!this.withBackdrop) {
            return;
        }

        scrollLock(enable);
        backdrop.displayBackdropLayer(enable, this.id);
        tabIndexControl(enable, enable ? [...this.content.querySelectorAll(FOCUS_ELEMENTS), this.control] : [...this.content.querySelectorAll(FOCUS_ELEMENTS)]);
    }

    /**
    * open - 開く処理
    * @return {Boolean} - transitionの有無を返却
    */
    open() {
        const duration = window.getComputedStyle(this.content).getPropertyValue('transition-duration');

        // 背景レイヤーをの制御が必要 かつ 制御条件が一致する場合、背景レイヤーを有効化
        if (this.withBackdrop && (this.backdropOnlyScreen === '' || MQL.state === this.backdropOnlyScreen)) {
            this.backdropControl(true);
        }

        this.content.hidden = false;
        this.content.style.height = '0';
        this.content.style.height = `${Math.max(this.content.offsetHeight, this.content.scrollHeight)}px`;
        this.control.setAttribute('aria-expanded', 'true');
        this.control.focus();

        // transition-durationの有無を返却
        return !(duration === '' || parseFloat(duration) === 0);
    }

    /**
    * close - 閉じる処理
    * @return {Boolean} - transitionの有無を返却
    */
    close() {
        const duration = window.getComputedStyle(this.content).getPropertyValue('transition-duration');

        // 背景レイヤーをの制御が必要 かつ 制御条件が一致する場合、背景レイヤーを無効化
        if (this.withBackdrop && (this.backdropOnlyScreen === '' || MQL.state === this.backdropOnlyScreen)) {
            this.backdropControl(false);
        }

        this.content.style.height = `${this.content.clientHeight}px`;
        this.content.style.height = `${Math.min(this.content.offsetHeight, 0)}`;
        this.control.setAttribute('aria-expanded', 'false');
        this.control.focus();

        // transitionの有無を返却
        return !(duration === '' || parseFloat(duration) === 0);
    }

    /**
    * transitionAfter - トランジション後処理
    * @return {Boolean} - falseを返却
    */
    transitionAfter() {
        // 閉じる操作だった場合はコンテンツを非表示に
        if (parseInt(this.content.style.height, 10) === 0) {
            this.content.hidden = true;
        }

        this.content.style.height = '';

        return false;
    }
}
