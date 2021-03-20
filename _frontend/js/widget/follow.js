/**
 * スクロール検知
 *
 * @param  {HTMLElement} root         ルートとなる要素
 * @param  {HTMLElement} followTarget 追従させる要素
 * @param  {Object}      options      interSectionObserverのオプション
 * @return {Void}
 */
const follow = (root, followTarget, options) => {
    const config = {
        className: {
            follow: 'is-follow',
        },
        observeDefaultOptions: {
            root: null,
            rootMargin: '0px',
            threshold: 0,
        },
    };
    const observeOptions = Object.assign(config.observeDefaultOptions, options);
    const target = followTarget || root;
    let observer = null;

    const method = {
        /**
         * init - 初期化
         * @return {Void}
         */
        init() {
            if (!root) {
                return;
            }

            // オブザーバーを定義
            observer = new window.IntersectionObserver(method.interSection, observeOptions);
            observer.observe(root);
        },

        /**
         * interSection - 可視領域に入り込む・出る時に実行する処理
         * @param  {[type]} entries [description]
         * @return {[type]}         [description]
         */
        interSection(entries) {
            if (!entries) {
                return;
            }

            for (const entry of entries) {
                target.classList[entry.isIntersecting ? 'remove' : 'add'](config.className.follow);
            }
        },
    };

    // 初期化を実行
    method.init();
};

/**
 * デフォルト実行処理
 * @return {Void}
 */
export default () => {
    const header = document.querySelector('.l-header');
    const toTopLink = document.querySelector('.l-footer-pageTop');

    if (!header || !toTopLink) {
        return;
    }

    // 追従ヘッダー
    follow(header, null);

    // ページトップリンク追従
    follow(header, toTopLink);
};
