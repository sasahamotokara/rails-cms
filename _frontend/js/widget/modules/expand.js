import {FOCUS_ELEMENTS, tabIndexControl, randomString} from '../../utils/global';
import scrollLock from '../../utils/scrollLock';

export class Expand {
    /**
     * トグル
     *
     * @constructor
     * @param {HTMLElement} control      - トグルボタンとして機能する要素
     * @param {HTMLElement} content      - 開閉するコンテンツ部分
     * @param {Boolean}     isOpen       - 初期表示を開く状態にする（true）かしない(false)か
     * @param {Boolean}     isLockScreen - 初期表示を開く状態にする（true）かしない(false)か
     */
    constructor(control, content, isOpen, isLockScreen) {
        // ルートとなる要素が無い場合は実装しない
        if (!control || !content) {
            return;
        }

        this.control = control;
        this.content = content;
        this.id = this.content.id || randomString('toggle-');
        this.isOpen = isOpen;
        this.isLockScreen = isLockScreen;

        this.init();
    }

    init() {
        if (!this.content.id) {
            this.content.id = this.id;
        }

        this.content.hidden = !this.isOpen;
        this.control.setAttribute('aria-expanded', `${this.isOpen}`);
        this.control.setAttribute('aria-controls', this.id);
    }

    open() {
        const duration = window.getComputedStyle(this.content).getPropertyValue('transition-duration');

        // 背景レイヤーをの制御が必要 かつ 背景レイヤーが存在する場合
        if (this.isLockScreen) {
            scrollLock(true);
            tabIndexControl(true, [...this.content.querySelectorAll(FOCUS_ELEMENTS), this.control]);
        }

        this.control.setAttribute('aria-expanded', 'true');
        this.content.hidden = false;
        this.content.style.height = '0';
        this.content.style.height = `${Math.max(this.content.offsetHeight, this.content.scrollHeight)}px`;
        this.content.focus();

        // transition-durationの有無を返却
        return !(duration === '' || parseFloat(duration) === 0);
    }

    close() {
        const duration = window.getComputedStyle(this.content).getPropertyValue('transition-duration');

        // 背景レイヤーをの制御が必要 かつ 背景レイヤーが存在する場合
        if (this.isLockScreen) {
            scrollLock(false);
            tabIndexControl(false, [...this.content.querySelectorAll(FOCUS_ELEMENTS)]);
        }

        this.content.style.height = `${this.content.clientHeight}px`;
        this.content.style.height = `${Math.min(this.content.offsetHeight, 0)}`;
        this.control.setAttribute('aria-expanded', 'false');
        this.control.focus();

        // transitionの有無を返却
        return !(duration === '' || parseFloat(duration) === 0);
    }

    transitionAfter() {
        // 閉じる操作だった場合
        if (parseInt(this.content.style.height, 10) === 0) {
            this.content.hidden = true;
        }

        this.content.style.height = '';

        return false;
    }
}
