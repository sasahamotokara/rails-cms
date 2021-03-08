/**
 * フラッシュメッセージ表示
 * @return {Void}
 */
(() => {
    const flashMessage = document.querySelector('.js-flash-message');

    if (!flashMessage) {
        return;
    }

    const message = flashMessage.firstElementChild;
    let isDisplay = false;
    let timer = 0;

    message.dataset.initialize = 'true';

    if (isDisplay && timer > 0) {
        window.clearTimeout(timer);
        message.hidden = true;
    }

    // トーストをセット
    isDisplay = true;
    message.hidden = false;

    // 一定時間たったら非表示にする
    timer = window.setTimeout(() => {
        message.hidden = true;
        isDisplay = false;
    }, 3000);
})();
