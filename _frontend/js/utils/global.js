/**
 * 共通定数
 *
 * @summary よく使う変数たち
 */

export const HTML_ELEMENT = document.documentElement;
export const BODY_ELEMENT = document.body;
export const SCROLL_ELEMENT = document.scrollingElement || HTML_ELEMENT;
export const LOCATION = window.location;
export const FOCUS_ELEMENTS = 'a[href], area[href], [tabindex], button, input, select, textarea, iframe, object, audio, video, embed, summary';
export const MQL = window.matchMedia('(min-width: 769px)');
export const HEADER_HEIGHT = 55;

/**
 * ランダム文字列生成
 * @param  {String} prefix ランダム文字列の接頭辞
 * @return {String}        接頭辞 ＋ ランダム文字列
 */
export const randomString = (prefix) => {
    const str = `${prefix || 'id'}${Math.random().toString(36).slice(-8)}`;

    // 重複するIDがHTML内に存在する場合、再生成
    if (document.getElementById(str)) {
        return randomString(prefix);
    }

    return str;
};

/**
 * tabIndex制御
 * @param  {Boolean} isSet - tabindex="-1"をセットする(true)しない（false）
 * @param  {NodeList | Array<HTMLElement>} ignoreElements - tabIndexを変更する要素（省略可能、省略した場合すべてのフォーカス可能要素を対象とする）
 * @return {Void}
 */
export const tabIndexControl = (isSet, ignoreElements) => {
    const allFocusableElements = document.querySelectorAll(FOCUS_ELEMENTS);
    const ignore = ignoreElements || [];

    if (isSet) {
        for (const element of allFocusableElements) {
            if ([].indexOf.call(ignore, element) !== -1) {
                continue;
            }

            if (element.tabIndex !== undefined) {
                element.dataset.tabindex = element.tabIndex;
            }

            element.tabIndex = -1;
        }
    } else {
        for (const element of allFocusableElements) {
            if ([].indexOf.call(ignore, element) !== -1) {
                continue;
            }

            if (Object.prototype.hasOwnProperty.call(element.dataset, 'tabindex')) {
                element.tabIndex = element.dataset.tabindex;
                element.removeAttribute('data-tabindex');

                continue;
            }

            element.removeAttribute('tabindex');
        }
    }
};

/**
 * 各種カスタムイベントの登録
 * @return {Void}
 */
export const setCustomEvents = () => {
    const MATCH_MEDIA_EVENT = 'matchMedia';
    const RESIZE_START_EVENT = 'resizeStart';
    const RESIZE_END_EVENT = 'resizeEnd';
    let isResizing = false;
    let timer = 0;

    /**
     * isMatchMedia - ブレークポイントを跨いだ時、PC・SPどちらの画面サイズであるかを検証
     * @return {Void}
     */
    const isMatchMedia = () => {
        MQL.state = MQL.matches ? 'PC' : 'SP';
        window.dispatchEvent(new Event(MATCH_MEDIA_EVENT));
    };

    MQL.event = MATCH_MEDIA_EVENT;
    MQL.addListener(isMatchMedia);
    isMatchMedia(); // 初期実行

    window.addEventListener('resize', () => {
        if (isResizing) {
            return;
        }

        isResizing = true;
        clearTimeout(timer);
        window.dispatchEvent(new Event(RESIZE_START_EVENT));

        // リサイズ後、横幅を再取得
        timer = window.setTimeout(() => {
            isResizing = false;
            window.dispatchEvent(new Event(RESIZE_END_EVENT));
        }, 500);
    });
};

/**
 * キーボードとマウスどちらを使っているか判定
 * @return {Void}
 */
export const useDeviceObserver = () => {
    document.addEventListener('mousedown', () => {
        HTML_ELEMENT.dataset.useKeyboard = 'false';
    });

    document.addEventListener('keydown', (event) => {
        const {key} = event;

        if (key === 'Tab' || /^Arrow/.test(key)) {
            HTML_ELEMENT.dataset.useKeyboard = 'true';
        }
    });
};

