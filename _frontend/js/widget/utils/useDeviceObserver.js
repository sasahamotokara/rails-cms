// import global variables.
import {HTML_ELEMENT} from './global';

/**
 * キーボードとマウスどちらを使っているか判定
 * @return {Void}
 */
(() => {
    document.addEventListener('mousedown', () => {
        HTML_ELEMENT.dataset.useKeyboard = 'false';
    });

    document.addEventListener('keydown', (event) => {
        const {key} = event;

        if (key === 'Tab' || /^Arrow/u.test(key)) {
            HTML_ELEMENT.dataset.useKeyboard = 'true';
        }
    });
})();
