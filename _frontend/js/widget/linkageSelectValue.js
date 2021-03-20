class LinkageSelectValue {
    /**
     * フォームの選択肢の状態を連携
     *
     * @constructor
     * @param {HTMLElement} root    - ルートとなる要素
     * @param {Object}      options - 設定の変更をする際のオブジェクト
     */
    constructor(root, options) {
        const config = {
            linkageFormName: 'admin-media-select',
        };

        // ルート要素がない場合は何もしない
        if (!root) {
            return;
        }

        this.config = Object.assign(config, options);
        this.root = root;
        this.form = document.forms[this.config.linkageFormName];
        this.reset = this.form.querySelector('input[type="reset"]');
        this.imageWrap = this.root.parentElement.nextElementSibling;

        // 不足している要素がある場合は何もしない
        if (!this.form || !this.reset) {
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
        const [checkedRadio] = [...this.form.querySelectorAll('input[type="radio"]')].filter((element) => element.value === this.root.value);

        // ルート要素の選択肢と同じvalueを持つ要素がある場合、選択済みにする
        if (checkedRadio) {
            checkedRadio.checked = true;
        }

        // option要素を非表示にする
        for (const child of this.root.children) {
            child.hidden = true;
        }
    }

    /**
     * createOption - option要素の生成
     * @return {Void}
     */
    createOption() {
        const radios = [...this.form.querySelectorAll('input[type="radio"]')];
        const options = [...this.root.children].filter((element) => element.value !== ''); // valueが空の要素はカウントしない

        // ラジオボタンとoption要素の個数が一致している場合何もしない
        if (radios.length === options.length) {
            return;
        }

        const optionValues = options.map((element) => element.value);
        const option = [];

        for (const radio of radios) {
            // option要素のvalueと一致する場合は生成の必要がない
            if (optionValues.includes(radio.value)) {
                continue;
            }

            option.push(`<option value="${radio.value}" hidden>${radio.dataset.name}</option>`);
        }

        this.root.insertAdjacentHTML('beforeend', option.join(''));
    }

    /**
     * addEvent - イベントバインド
     * @return {Void}
     */
    addEvent() {
        this.root.addEventListener('click', this.createOption.bind(this));

        this.form.addEventListener('submit', (e) => {
            const [checkedRadio] = [...this.form.querySelectorAll('input[type="radio"]')].filter((element) => element.checked);
            const value = !checkedRadio ? '' : checkedRadio.value;

            e.preventDefault();
            this.root.value = value;
            this.previewImage(checkedRadio);
        });

        this.reset.addEventListener('click', () => {
            for (const radio of this.form.querySelectorAll('input[type="radio"]')) {
                radio.checked = false;
            }
        });
    }

    /**
     * previewImage - 画像のプレビュー
     * @param  {HTMLElement} checkedRadio - 選択済みのラジオボタン要素
     * @return {Void}
     */
    previewImage(checkedRadio) {
        const previewImage = this.imageWrap.firstElementChild;
        const checkedRadioImage = checkedRadio ? checkedRadio.parentElement.querySelector('img') : null;

        // ラジオボタンがない または valueが空の場合 画像を非表示
        if (!checkedRadio || checkedRadio.value === '') {
            this.imageWrap.hidden = true;

            return;
        }

        this.imageWrap.hidden = false;

        // imageWrap内にimg要素がない場合は、ラジオボタンないからコピー
        if (!previewImage) {
            const image = checkedRadioImage.cloneNode(true);

            image.className = '';
            this.imageWrap.insertAdjacentElement('beforeend', image);

        // 存在する場合、srcを書き換え
        } else {
            previewImage.src = checkedRadioImage.src;
        }
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
