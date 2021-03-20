// import utilities.
import * as toast from './utils/toast';

class InputFilePreview {
    /**
     * input[type="file"]に登録されたファイルのプレビュー
     *
     * @constructor
     * @param {HTMLElement} root    - ルートとなる要素
     * @param {Object}      options - 設定の変更をする際のオブジェクト
     */
    constructor(root, options) {
        const config = {
            validExtensions: ['jpg', 'jpeg', 'png', 'gif'],
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
        this.toast = toast.createToast();
        this.defaultImage = this.image.src;

        // 不足している要素がある場合は何もしない
        if (!this.input || !this.image) {
            return;
        }

        this.addEvent();
    }

    /**
     * addEvent - イベントバインド
     * @returns {Void}
     */
    addEvent() {
        this.input.addEventListener('change', this.preview.bind(this));
    }

    /**
     * preview - プレビュー
     * @returns {Void}
     */
    preview() {
        const reader = new window.FileReader();
        const [file] = this.input.files;
        const extension = file.name.split('.').pop().toLowerCase();

        // 有効な拡張子でない場合
        if (!this.config.validExtensions.includes(extension)) {
            this.image.src = this.defaultImage;
            this.input.files = (new window.ClipboardEvent('').clipboardData || new window.DataTransfer()).files;

            toast.displayToast(`「${file.name}」は対応していないファイル形式です。`, 5000);

            return;
        }

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
