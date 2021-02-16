class LinkageSelectValue {
    /**
     * タブ
     *
     * @constructor
     * @param {HTMLElement} root - ルートとなる要素
     * @param {Object} options - 設定の変更をする際のオブジェクト
     */
    constructor(root, options) {
        const config = {
            linkageFormName: 'admin-media-select',
            radioButtonName: 'thumbnail',
            submitButtonId: 'admin-media-submit',
        };

        if (!root) {
            return;
        }

        this.config = Object.assign(config, options);
        this.root = root;
        this.form = document.forms[this.config.linkageFormName];
        this.reset = this.form.querySelector('input[type="reset"]');
        this.submit = document.getElementById(this.config.submitButtonId);
        this.imageWrap = this.root.parentElement.nextElementSibling;

        if (!this.form || !this.submit) {
            return;
        }

        this.init();
        this.addEvent();
    }

    /**
     * init - 初期化
     * @return {Void}
     */
    init() {
        const [checkedRadio] = Array.from(this.form.querySelectorAll('input[type="radio"]')).filter((element) => element.value === this.root.value);

        if (checkedRadio) {
            checkedRadio.checked = true;
        }

        for (const child of this.root.children) {
            child.hidden = true;
        }
    }

    createOption() {
        const radios = Array.from(this.form.querySelectorAll('input[type="radio"]'));
        const options = Array.from(this.root.children);

        if ((radios.length + 1) === options.length) {
            return;
        }

        const optionValues = options.map((element) => element.value);
        const option = [];

        for (const radio of radios) {
            if (optionValues.includes(radio.value)) {
                continue;
            }

            option.push(`<option value="${radio.value}" hidden>${radio.dataset.name}</option>`);
        }

        this.root.insertAdjacentHTML('beforeend', option.join(''));
    }

    /**
     * addEvent - イベントバインド
     */
    addEvent() {
        this.root.addEventListener('click', this.createOption.bind(this));

        this.submit.addEventListener('click', (e) => {
            const [checkedRadio] = Array.from(this.form.querySelectorAll('input[type="radio"]')).filter((element) => element.checked);
            const value = !checkedRadio ? '' : checkedRadio.value;

            e.preventDefault();
            this.root.value = value;
            this.previewImage(checkedRadio, value);
        });

        this.reset.addEventListener('click', () => {
            this.form.querySelectorAll('input[type="radio"]').forEach((element) => {
                element.checked = false;
            });
        });
    }

    previewImage(checkedRadio, value) {
        this.imageWrap.innerHTML = '';

        if (value === '') {
            this.imageWrap.hidden = true;

            return;
        }

        const image = checkedRadio.parentElement.querySelector('img').cloneNode(true);

        image.className = '';
        this.imageWrap.hidden = false;
        this.imageWrap.insertAdjacentElement('beforeend', image);
    }
}

/**
 * デフォルト実行処理
 * @return {Void}
 */
export default () => {
    // 汎用タブ
    document.querySelectorAll('.js-linkage-select').forEach((element) => new LinkageSelectValue(element));
};
