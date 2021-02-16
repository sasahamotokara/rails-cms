class InputFilePreview {
    /**
     * すべてのチェックボックスを選択・非選択にする
     *
     * @constructor
     * @param {HTMLElement} root - ルートとなる要素
     * @param {Object} options - 設定の変更をする際のオブジェクト
     */
    constructor(root, options) {
        const config = {
            className: {
                image: 'js-input-file-preview__image',
            },
        };
        // ルートとなる要素が無い場合は実装しない
        if (!root) {
            return;
        }

        this.config = Object.assign(config, options);
        this.root = root;
        this.input = this.root.querySelector('input[type="file"]');
        this.image = this.root.querySelector(`.${this.config.className.image}`);

        if (!this.input || !this.image) {
            return;
        }

        this.addEvent();
    }

    /**
     * addEvent - イベントバインド
     */
    addEvent() {
        this.input.addEventListener('change', this.preview.bind(this));
    }

    preview() {
        const reader = new FileReader();
        const [file] = this.input.files;

        reader.onload = (e) => {
            this.image.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
}

/**
 * デフォルト実行処理
 * @return {Void}
 */
export default () => {
    // 汎用モーダル
    document.querySelectorAll('.js-input-file-preview').forEach((element) => new InputFilePreview(element));
};
