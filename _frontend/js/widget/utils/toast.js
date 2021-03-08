import {BODY_ELEMENT} from './global';

let toast = null;
let toastText = '';
let isToast = false;
let isSwap = false;
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
        toast.insertAdjacentHTML('beforeend', '<span class="admin-toast__text" aria-atomic="true" hidden></span>');
        toast.firstElementChild.insertAdjacentHTML('beforeend', '<span class="admin-toast__type">Info</span><span></span>');

        toast.firstElementChild.addEventListener('transitionend', () => {
            if (!isSwap) {
                return;
            }

            isSwap = false;
            displayToast(toastText, 3000);
        });

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

    toastText = text;

    if (isToast && timer > 0) {
        const duration = window.getComputedStyle(innerElement).getPropertyValue('transition-duration');

        window.clearTimeout(timer);
        innerElement.hidden = true;

        if (!(duration === '' || parseFloat(duration) === 0)) {
            isSwap = true;
            isToast = false;

            return;
        }
    }

    // トーストをセット
    isToast = true;
    innerElement.lastElementChild.textContent = text;
    innerElement.hidden = false;

    // 一定時間たったら非表示にする
    timer = window.setTimeout(() => {
        innerElement.hidden = true;
        isToast = false;
    }, parseInt(timeout, 10));
};

// エクスポート
export {createToast, displayToast};
