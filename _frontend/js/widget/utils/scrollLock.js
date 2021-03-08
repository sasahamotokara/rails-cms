import {BODY_ELEMENT} from './global';

/**
 * スクロールの制御
 * @param  {Boolean} isLockScreen スクロールを無効化するか否か
 * @return {Void}
 */
export default (isLockScreen) => {
    let scrollLength = 0;

    // すでにロックされている場合、値の更新はしない
    if (isLockScreen && BODY_ELEMENT.classList.contains('is-fixed')) {
        return;
    }

    // 固定を解除する場合
    if (!isLockScreen) {
        BODY_ELEMENT.classList.remove('is-fixed');
        BODY_ELEMENT.style.top = '';

        window.scrollTo(0, BODY_ELEMENT.dataset.position);

        return;
    }

    // 固定する場合
    scrollLength = window.pageYOffset;

    BODY_ELEMENT.dataset.position = scrollLength;
    BODY_ELEMENT.classList.add('is-fixed');
    BODY_ELEMENT.style.top = `-${scrollLength}px`;
};
