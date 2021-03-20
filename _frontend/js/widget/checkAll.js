class CheckAll {
    /**
     * すべてのチェックボックスを選択・非選択にする
     *
     * @constructor
     * @param {HTMLElement} root - ルートとなる要素
     */
    constructor(root) {
        // ルートとなる要素が無い場合は実装しない
        if (!root) {
            return;
        }

        this.root = root;
        this.checkFor = this.root.dataset.checkFor;
        this.checkForElements = !this.checkFor ? [] : [...document.querySelectorAll(`[name="${this.checkFor}"]`)];

        // 不足している要素がない場合は実装しない
        if (!this.checkForElements.length) {
            return;
        }

        this.addEvent();
    }

    /**
     * addEvent - イベントバインド
     * @returns {Void}
     */
    addEvent() {
        this.root.addEventListener('change', this.check.bind(this));

        for (const element of this.checkForElements) {
            element.addEventListener('change', this.check.bind(this));
        }
    }

    /**
     * check - チェンジ時のイベント
     * @param {changeEvent} - チェンジイベントオブジェクト
     * @returns {Void}
     */
    check(event) {
        const {currentTarget} = event;

        // ルート要素がチェックされた場合、ルート要素の状態をほかの要素に反映
        if (currentTarget === this.root) {
            for (const element of this.checkForElements) {
                element.checked = currentTarget.checked;
            }

            return;
        }

        // チェックされていない要素が一つでもあればルート要素のチェックを外す
        this.root.checked = !this.checkForElements.filter((element) => !element.checked).length;
    }
}

/**
 * デフォルト実行処理
 * @return {Void}
 */
export default () => {
    // 汎用モーダル
    document.querySelectorAll('.js-check-all').forEach((element) => new CheckAll(element));
};
