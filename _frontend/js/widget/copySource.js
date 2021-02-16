import * as toast from '../utils/toast';

class CopySource {
    /**
     * 画像リンクをMD挿入形でコピー
     *
     * @constructor
     * @param {HTMLElement} root - ルートとなる要素
     * @param {Object} options - 設定の変更をする際のオブジェクト
     */
    constructor(root, options) {
        const config = {};

        // ルートとなる要素が無い場合は実装しない
        if (!root) {
            return;
        }

        this.config = Object.assign(config, options);
        this.root = root;
        this.hiddenInput = document.createElement('input');
        this.buttons = this.root.querySelectorAll('.js-source-copy__button');
        this.toast = toast.createToast();

        // コントロールボタンがない場合は何もしない
        if (!this.buttons.length) {
            return;
        }

        this.init();
        this.addEvent();
    }

    static createCode(imageElement) {
        return `![${imageElement.alt}](${imageElement.getAttribute('src')} "${imageElement.getAttribute('width')}x${imageElement.getAttribute('height')}")`;
    }

    /**
     * init - 初期化
     * @return {Void}
     */
    init() {
        this.hiddenInput.type = 'text';
        this.hiddenInput.classList.add('u-altText');
        this.root.insertAdjacentElement('beforeend', this.hiddenInput);

        for (const button of this.buttons) {
            button.dataset.code = CopySource.createCode(button.querySelector('img'));
        }
    }

    /**
     * addEvent - イベントバインド
     */
    addEvent() {
        this.root.addEventListener('click', (e) => {
            const {target} = e;
            const targetButton = target.closest('.js-source-copy__button');

            if (!targetButton) {
                return;
            }

            if (!targetButton.dataset.code) {
                targetButton.dataset.code = CopySource.createCode(targetButton.querySelector('img'));
            }

            this.copyToClipboard(targetButton.dataset.code);
            targetButton.focus();
        });
    }

    copyToClipboard(copyText) {
        this.hiddenInput.value = copyText;

        // コピーを実行
        this.hiddenInput.select();
        document.execCommand('copy');

        toast.displayToast('コピーしました', 5000);
    }
}

/**
 * デフォルト実行処理
 * @return {Void}
 */
export default () => {
    // 汎用モーダル
    document.querySelectorAll('.js-source-copy').forEach((element) => new CopySource(element));
};
