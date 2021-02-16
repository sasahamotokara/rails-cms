import {BODY_ELEMENT} from './global';

let toast = null;
let isToast = false;
let timer = 0;

/**
 * トーストの生成
 * @return {HTMLElement}
 */
const createToast = () => {
    toast = document.querySelector('.admin-toast');

    // 同じ要素が存在しなければ生成
    if (!toast) {
        toast = document.createElement('div');

        toast.classList.add('admin-toast');
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        toast.insertAdjacentHTML('beforeend', '<span class="admin-toast__text" hidden></span>');


        BODY_ELEMENT.insertAdjacentElement('beforeend', toast);
    }

    return toast;
};

/**
 * トーストの表示
 * @param  {String} text    非表示させるテキスト
 * @param  {Number} timeout 表示し続ける時間(ms)
 * @return {Void}
 */
const displayToast = (text, timeout) => {
    const innerElement = toast.firstElementChild;

    if (isToast && timer > 0) {
        window.clearTimeout(timer);
        innerElement.hidden = true;
    }

    // トーストをセット
    isToast = true;
    innerElement.textContent = text;
    innerElement.hidden = false;

    // 一定時間たったら非表示にする
    timer = window.setTimeout(() => {
        innerElement.hidden = true;
        isToast = false;
    }, parseInt(timeout, 10));
};

// エクスポート
export {toast, createToast, displayToast};
