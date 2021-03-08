export class MediaObserver {
    /**
     * markdown内で使われている画像の収集・input要素化
     *
     * @constructor
     * @param {HTMLElement} root - ルートとなる要素
     * @param {Object} options - 設定の変更をする際のオブジェクト
     */
    constructor(root, options) {
        const config = {
            name: 'post[media][]',
            selectId: 'post_option_thumbnail_image_id',
        };

        // ルートとなる要素が無い場合は実装しない
        if (!root) {
            return;
        }

        this.config = Object.assign(config, options);
        this.root = root;
        this.select = document.getElementById(this.config.selectId);

        if (!this.select) {
            return;
        }

        // 初期実行
        this.output();
    }

    getImageSources() {
        return [...this.select.children].map((element) => element.dataset.source);
    }

    getImageSyntaxes() {
        return (this.root.value.match(/!\[.*?\]\(.*?\)/mg) || []).map((match) => /!\[.*?\]\((.*?)\)/.exec(match)[1].split(' ')[0]);
    }

    createHiddenInputs(ids) {
        const inputs = [];

        for (const id of ids) {
            inputs.push(`<input type="hidden" name="${this.config.name}" value="${id}">`);
        }

        return inputs.join('');
    }

    output() {
        const imageSources = this.getImageSources();
        const imageSyntaxes = this.getImageSyntaxes();
        const usingImageIds = [];

        // 既存のinput[hidden]要素を削除
        this.root.parentNode.querySelectorAll(`input[type="hidden"][name="${this.config.name}"]`).forEach((element) => element.remove());

        if (!imageSources.length || !imageSyntaxes.length) {
            return;
        }

        for (const syntax of imageSyntaxes) {
            const optionIndex = imageSources.indexOf(syntax);

            if (optionIndex !== -1) {
                usingImageIds.push(this.select.children[optionIndex].value);
            }
        }

        if (!usingImageIds.length) {
            return;
        }

        this.root.parentNode.insertAdjacentHTML('beforeend', this.createHiddenInputs([...new Set(usingImageIds)]));
    }
}
