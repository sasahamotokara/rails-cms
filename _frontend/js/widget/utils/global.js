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
export const MQL = (() => {
    const mql = window.matchMedia('(min-width: 769px)');
    const matchMedia = () => {
        mql.state = mql.matches ? 'PC' : 'SP';
        console.log(mql.eventName);
        window.dispatchEvent(new window.CustomEvent(mql.eventName));
    };

    mql.eventName = 'matchMedia';
    mql.state = mql.matches ? 'PC' : 'SP';

    try {
        mql.addEventListener('change', matchMedia);
    } catch (e) {
        mql.addListener(matchMedia);
    }

    return mql;
})();
