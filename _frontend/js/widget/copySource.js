// import utilities.
import * as toast from './utils/toast';

class CopySource {
    /**
     * 画像リンクをMD挿入形でコピー
     *
     * @constructor
     * @param {HTMLElement} root    - ルートとなる要素
     * @param {Object}      options - 設定の変更をする際のオブジェクト
     */
    constructor(root, options) {
        const config = {
            className: {
                button: 'js-source-copy__button',
                altText: 'u-altText',
            },
        };

        // ルートとなる要素が無い場合は実装しない
        if (!root) {
            return;
        }

        this.config = Object.assign(config, options);
        this.root = root;
        this.hiddenInput = document.createElement('input');
        this.buttons = this.root.querySelectorAll(`.${this.config.className.button}`);
        this.toast = toast.createToast();

        // コントロールボタンがない場合は何もしない
        if (!this.buttons.length) {
            return;
        }

        this.init();
        this.addEvent();
    }

    /**
     * createCode - 画像表示のMD構文を生成
     * @param  {HTMLElement} - 表示する画像（img要素）
     * @return {String}      - 画像表示のMD構文 または 空文字
     */
    static createCode(imageElement) {
        // img要素がない場合は空文字を返却
        if (!imageElement) {
            return '';
        }

        // ![代替テキスト](画像パス "幅x高さ")
        return `![${imageElement.alt}](${imageElement.getAttribute('src')} "${imageElement.getAttribute('width')}x${imageElement.getAttribute('height')}")`;
    }

    /**
     * init - 初期化
     * @return {Void}
     */
    init() {
        this.hiddenInput.type = 'text';
        this.hiddenInput.classList.add(this.config.className.altText);
        this.root.insertAdjacentElement('beforeend', this.hiddenInput);

        for (const button of this.buttons) {
            button.dataset.code = CopySource.createCode(button.querySelector('img'));
        }
    }

    /**
     * addEvent - イベントバインド
     * @return {Void}
     */
    addEvent() {
        this.root.addEventListener('click', this.clickHandler.bind(this));
    }

    /**
     * clickHandler - クリック時のイベント
     * @param  {clickEvent} event - クリックイベントオブジェクト
     * @return {Void}
     */
    clickHandler(event) {
        const {target} = event;
        const targetButton = target.closest(`.${this.config.className.button}`);

        // ボタン要素が見つからない場合は何もしない
        if (!targetButton) {
            return;
        }

        // [data-code] が指定されていない場合は属性値を付与する
        if (!targetButton.dataset.code) {
            targetButton.dataset.code = CopySource.createCode(targetButton.querySelector('img'));
        }

        // コピーを実行
        this.copyToClipboard(targetButton.dataset.code);
        targetButton.focus();
    }

    /**
     * copyToClipboard - クリップボードにコピー
     * @param  {String} copyText - コピーする文字列
     * @return {Void}
     */
    copyToClipboard(copyText) {
        this.hiddenInput.value = copyText;

        // コピーを実行
        this.hiddenInput.select();
        document.execCommand('copy');

        toast.displayToast('コピーしました', 3000);
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
