class AssociateHidden {
    /**
     * 特定の条件の時に要素を表示させる
     *
     * @constructor
     * @param {HTMLElement} root    - ルートとなる要素
     * @param {Object}      options - 設定の変更をする際のオブジェクト
     */
    constructor(root, options) {
        const config = {
            className: {
                hiddenElement: 'js-associate-hidden__element',
            },
        };

        // ルートとなる要素が無い場合は実装しない
        if (!root) {
            return;
        }

        this.config = Object.assign(config, options);
        this.root = root;
        this.hiddenElements = document.querySelectorAll(`.${this.config.className.hiddenElement}`);
        [this.hasVisibleValueElement] = [...this.hiddenElements].filter((element) => element.dataset.visibleValue);
        this.hiddenValue = this.hasVisibleValueElement.dataset.visibleValue;
        this.hiddenInsideFormElements = this.hasVisibleValueElement.querySelectorAll('input, textarea, select');

        // 要素が不足している場合 または 必要な属性値が不足している場合は実装しない
        if (!this.hiddenElements.length || !this.hasVisibleValueElement || !this.hiddenValue) {
            return;
        }

        this.addEvent();
        this.hidden();
    }

    /**
     * addEvent - イベントバインド
     * @returns {Void}
     */
    addEvent() {
        this.root.addEventListener('change', this.hidden.bind(this));
    }

    /**
     * hidden - 表示・非表示
     * @returns {Void}
     */
    hidden() {
        const isVisibleValue = this.root.value === this.hiddenValue;

        for (const element of this.hiddenElements) {
            element.hidden = isVisibleValue;
        }

        for (const element of this.hiddenInsideFormElements) {
            element.disabled = !isVisibleValue;
        }

        this.hasVisibleValueElement.hidden = !isVisibleValue;
    }
}

export default () => {
    document.querySelectorAll('.js-associate-hidden').forEach((element) => new AssociateHidden(element));
};
