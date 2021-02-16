class AssociateHidden {
    /**
     * 特定の条件の時に表示させる
     *
     * @constructor
     * @param {HTMLElement} root - ルートとなる要素
     * @param {Object} options - 設定の変更をする際のオブジェクト
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
        [this.hasVisibleValueElement] = Array.from(this.hiddenElements).filter((element) => element.dataset.visibleValue);
        this.hiddenValue = this.hasVisibleValueElement.dataset.visibleValue;
        this.hiddenInsideFormElements = this.hasVisibleValueElement.querySelectorAll('input, textarea, select');

        this.addEvent();
        this.hidden();
    }

    addEvent() {
        this.root.addEventListener('change', this.hidden.bind(this));
    }

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
