// import global variables.
import {HTML_ELEMENT, SCROLL_ELEMENT, LOCATION} from './utils/global';

class SmoothScroll {
    constructor(root, options) {
        const config = {
            fixedElementSelector: '.l-header', // ページ上部で固定される要素をセレクターで指定
            adjust: 0, // 位置の調整、到着位置を上下に固定値（px）分ずらします
            speed: 400, // アニメーション速度の指定
        };

        // ルートとなる要素が無い場合は実装しない
        if (!root) {
            return;
        }

        this.config = Object.assign(config, options);
        this.root = root;
        this.hash = this.root.hash;
        this.fixedElement = this.config.fixedElementSelector !== '' ? document.querySelector(this.config.fixedElementSelector) : null;
        this.isScrollToTop = this.hash === '#top';
        this.target = this.isScrollToTop ? HTML_ELEMENT : document.getElementById(this.hash.slice(1));
        this.animationFrame = null;
        this.scrollStartTime = 0;
        this.scrollStartPosition = 0;
        this.scrollEndPosition = 0;
        this.scrollDistance = 0;
        this.isScrolling = false;

        this.addEvent();
    }

    /**
     * scrollEasingSwing - スクロールエフェクトの計算
     * @param  {Number} time     経過時間
     * @param  {Number} begin    スクロール開始位置
     * @param  {Number} change   現在のスクロール位置
     * @param  {Number} duration スクロールのスピード
     * @return {Number}
     */
    static scrollEasingSwing(time, begin, change, duration) {
        return (change * (0.5 - (Math.cos(time / duration * Math.PI) / 2))) + begin;
    }

    /**
     * addEvent - イベントバインド
     */
    addEvent() {
        // 読み込み後にスクロール位置を調整する（一度実行でOKなのでwindow.onloadを使用）
        if (LOCATION.hash !== '') {
            window.onload = this.scroll.bind(this);
        }

        this.root.addEventListener('click', this.scroll.bind(this));
    }

    /**
     * getPosition - スクロール位置（到達点）を取得
     * @param  {String} eventType イベントタイプ
     * @return {Number}
     */
    getPosition(eventType) {
        const targetElement = eventType === 'load' ? document.getElementById(LOCATION.hash.slice(1)) : this.target;
        const fixedElementHeight = !this.fixedElement ? 0 : this.fixedElement.offsetHeight;

        // ターゲットの要素が見つからない場合は0を返却
        if (targetElement === null) {
            return 0;
        }

        // ターゲット要素のページ最上部からの位置 - (ヘッダーの高さ + 調整)
        return Math.round((SCROLL_ELEMENT.scrollTop + targetElement.getBoundingClientRect().top) - (fixedElementHeight + this.config.adjust));
    }

    /**
     * scroll - スクロールを実行
     * @param  {loadEvent|clickEvent} event イベントオブジェクト
     * @return {Void}
     */
    scroll(event) {
        const {type} = event;

        // 不正なアンカーの場合またはスクロール中の場合
        if (!this.target || this.isScrolling) {
            return;
        }

        event.preventDefault();

        // クリックイベントの場合、履歴を追加
        if (type === 'click') {
            window.history.pushState(null, null, this.hash);
        }

        this.isScrolling = true;
        this.scrollStartTime = window.performance.now();
        this.scrollStartPosition = SCROLL_ELEMENT.scrollTop;
        this.scrollEndPosition = event.type !== 'load' && this.isScrollToTop ? 0 : this.getPosition(type);
        this.scrollDistance = this.scrollEndPosition - this.scrollStartPosition;

        // ロードイベントの場合、アニメーションなしで位置を調整
        if (type === 'load') {
            this.isScrolling = false;
            window.scrollTo(0, this.scrollEndPosition);

            return;
        }

        window.requestAnimationFrame(this.animationScroll.bind(this));
    }

    /**
     * animationScroll - アニメーションスクロールを実行
     * @return {Void}
     */
    animationScroll() {
        const currentTime = window.performance.now() - this.scrollStartTime;

        // animation終了時の処理
        if (currentTime > this.config.speed) {
            this.isScrolling = false;
            window.scrollTo(0, this.scrollEndPosition);
            window.cancelAnimationFrame(this.animationFrame);

            this.target.tabIndex = -1;
            this.target.focus({
                preventScroll: true,
            });

            this.target.removeAttribute('tabindex');

            return;
        }

        window.scrollTo(0, SmoothScroll.scrollEasingSwing(currentTime, this.scrollStartPosition, this.scrollDistance, this.config.speed));
        this.animationFrame = window.requestAnimationFrame(this.animationScroll.bind(this));
    }
}

/**
 * デフォルト実行処理
 * @return {Void}
 */
export default () => {
    document.querySelectorAll('.js-smooth-scroll').forEach((element) => new SmoothScroll(element));
};
