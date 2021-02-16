import {BODY_ELEMENT} from './global';

const eventName = 'click.backdrop';
let backdrop = null;

/**
 * レイヤーの生成
 * @return {HTMLElement}
 */
const createBackdropLayer = () => {
    backdrop = document.querySelector('.admin-backdrop');

    // 同じ要素が存在しなければ生成
    if (!backdrop) {
        backdrop = document.createElement('div');

        backdrop.classList.add('admin-backdrop');
        backdrop.hidden = true;

        // クリック時のイベント
        backdrop.addEventListener('click', (e) => {
            const crtlData = e.target.dataset.ctrl;
            const crtlTarget = document.getElementById(crtlData);

            if (!crtlTarget) {
                return;
            }

            crtlTarget.dispatchEvent(new Event(eventName));
        });

        // トランジションイベント
        backdrop.addEventListener('transitionend', (e) => {
            // 非表示にするの時transitionのみ検知。また、visibility以外のトランジションは検知しない
            if (!backdrop.hidden || e.propertyName !== 'visibility') {
                return;
            }

            backdrop.dataset.ctrl = '';
        });

        BODY_ELEMENT.insertAdjacentElement('beforeend', backdrop);
    }

    return backdrop;
};

/**
 * レイヤーの表示・非表示
 * @param  {Boolean} isHidden 非表示させるか否か
 * @param  {String}  idName   レイヤーの上に表示されている要素のid名
 * @return {Void}
 */
const displayBackdropLayer = (isHidden, idName) => {
    // 要素がない場合何もしない
    if (!backdrop) {
        return;
    }

    // 非表示にさせるとき
    if (!isHidden) {
        const duration = window.getComputedStyle(backdrop).getPropertyValue('transition-duration');

        backdrop.hidden = true;

        // transitionの設定がない場合
        if (duration === '' || parseFloat(duration) === 0) {
            backdrop.dataset.ctrl = '';
        }

        return;
    }

    backdrop.hidden = false;
    backdrop.dataset.ctrl = idName;
};

// エクスポート
export {backdrop, eventName, createBackdropLayer, displayBackdropLayer};
