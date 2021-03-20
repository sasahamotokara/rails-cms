export class MediaObserver {
    /**
     * markdown内で使われている画像の収集・input要素化
     *
     * @constructor
     * @param {HTMLElement} root    - ルートとなる要素
     * @param {Object}      options - 設定の変更をする際のオブジェクト
     */
    constructor(root, options) {
        const config = {
            name: 'post[media][]',
            selectId: 'post_thumbnail_id',
        };

        // ルートとなる要素が無い場合は実装しない
        if (!root) {
            return;
        }

        this.config = Object.assign(config, options);
        this.root = root;
        this.select = document.getElementById(this.config.selectId);

        // 不足している要素がある場合は何もしない
        if (!this.select) {
            return;
        }

        // 初期実行
        this.output();
    }

    /**
     * getImageSources - [data-source]の値を取得
     * @return {Array<String>}
     */
    getImageSources() {
        return [...this.select.children].map((element) => element.dataset.source);
    }

    /**
     * getImageSyntaxes - mdの画像表示構文から画像パスを取得
     * @return {Array<String>}
     */
    getImageSyntaxes() {
        return (this.root.value.match(/!\[.*?\]\(.*?\)/mg) || []).map((match) => /!\[.*?\]\((.*?)\)/.exec(match)[1].split(' ')[0]);
    }

    /**
     * createHiddenInputs - input[type="hidden"]を生成
     * @param  {Array<String>} ids - 対象のidの配列
     * @return {String}
     */
    createHiddenInputs(ids) {
        const inputs = [];

        for (const id of ids) {
            inputs.push(`<input type="hidden" name="${this.config.name}" value="${id}">`);
        }

        return inputs.join('');
    }

    /**
     * output - 記事内に使われている画像を取得、フォームに情報を追加
     * @return {Void}
     */
    output() {
        const imageSources = this.getImageSources();
        const imageSyntaxes = this.getImageSyntaxes();
        const usingImageIds = [];

        // 既存のinput[hidden]要素を削除
        this.root.parentNode.querySelectorAll(`input[type="hidden"][name="${this.config.name}"]`).forEach((element) => element.remove());

        // [data-source] または md構文が取得できなかった場合は何もしない
        if (!imageSources.length || !imageSyntaxes.length) {
            return;
        }

        for (const syntax of imageSyntaxes) {
            const optionIndex = imageSources.indexOf(syntax);

            // option要素から画像のidを取得・配列に追加
            if (optionIndex !== -1) {
                usingImageIds.push(this.select.children[optionIndex].value);
            }
        }

        // 配列が空の場合は何もしない
        if (!usingImageIds.length) {
            return;
        }

        this.root.parentNode.insertAdjacentHTML('beforeend', this.createHiddenInputs([...new Set(usingImageIds)]));
    }
}
