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
        this.checkForElements = !this.checkFor ? [] : Array.from(document.querySelectorAll(`[name="${this.checkFor}"]`));

        if (!this.checkForElements.length) {
            return;
        }

        this.addEvent();
    }

    /**
     * addEvent - イベントバインド
     */
    addEvent() {
        this.root.addEventListener('change', this.check.bind(this));

        for (const element of this.checkForElements) {
            element.addEventListener('change', this.check.bind(this));
        }
    }

    check(event) {
        const {currentTarget} = event;

        if (currentTarget === this.root) {
            for (const element of this.checkForElements) {
                element.checked = currentTarget.checked;
            }

            return;
        }

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
