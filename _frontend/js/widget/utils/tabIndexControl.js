// import global variables.
import {FOCUS_ELEMENTS} from './global';

/**
 * tabIndex制御
 * @param  {Boolean}                     isSet          - tabindex="-1"をセットする(true)しない（false）
 * @param  {NodeList|Array<HTMLElement>} ignoreElements - tabIndexを変更する要素（省略可能、省略した場合すべてのフォーカス可能要素を対象とする）
 * @return {Void}
 */
export default (isSet, ignoreElements) => {
    const allFocusableElements = document.querySelectorAll(FOCUS_ELEMENTS);
    const ignore = ignoreElements || [];

    for (const element of allFocusableElements) {
        // ignoreする要素に含まれている場合はスキップ
        if ([].indexOf.call(ignore, element) !== -1) {
            continue;
        }

        // tabindex="-1" をセット
        if (isSet) {
            // element.tabIndex`だとフォーカス可能な要素から0が取得できてしまうので`getAttribute`を使う
            if (element.getAttribute('tabindex') !== null) {
                element.dataset.tabindex = element.tabIndex;
            }

            element.tabIndex = -1;

        // tabindex="-1" を解除
        } else {
            if (Object.prototype.hasOwnProperty.call(element.dataset, 'tabindex')) {
                element.tabIndex = element.dataset.tabindex;
                element.removeAttribute('data-tabindex');

                continue;
            }

            element.removeAttribute('tabindex');
        }
    }
};
