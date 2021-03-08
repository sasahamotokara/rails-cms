/**
 * 各種カスタムイベントの登録
 * @return {Void}
 */
(() => {
    const RESIZE_START_EVENT = 'resizeStart';
    const RESIZE_END_EVENT = 'resizeEnd';
    let isResizing = false;
    let timer = 0;

    window.addEventListener('resize', () => {
        if (isResizing) {
            return;
        }

        isResizing = true;
        window.clearTimeout(timer);
        window.dispatchEvent(new window.CustomEvent(RESIZE_START_EVENT));

        // リサイズ後、横幅を再取得
        timer = window.setTimeout(() => {
            isResizing = false;
            window.dispatchEvent(new window.CustomEvent(RESIZE_END_EVENT));
        }, 500);
    });
})();
