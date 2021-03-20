// import modules.
import {Validate} from './modules/validate';

// import utilities.
import * as toast from './utils/toast';

class FormValidation {
    /**
     * フォームバリデーション
     *
     * @constructor
     * @param {HTMLElement} root    - ルートとなる要素
     * @param {Object}      options - 設定の変更をする際のオブジェクト
     */
    constructor(root, options) {
        const config = {};

        if (!root || root.tagName.toLowerCase() !== 'form') {
            return;
        }

        this.config = Object.assign(config, options);
        this.root = root;
        this.id = this.root.id;
        this.toast = toast.createToast();
        this.validateElements = [...this.root.querySelectorAll(`[required], [pattern], [data-validate-type], [form="${this.id}"]`)].filter((element) => /input|textarea|select/u.test(element.tagName.toLowerCase()));
        this.validate = [];

        this.init();
        this.addEvent();
    }

    /**
     * init - 初期化
     * @return {Void}
     */
    init() {
        this.validate = [...this.validateElements].map((element) => new Validate(element, this.root.elements[element.name], element.dataset.validateType, element.required));
    }

    /**
     * addEvent - イベント付与
     * @return {Void}
     */
    addEvent() {
        // バリデーション実行
        this.validateElements.forEach((element, index) => {
            const target = this.validate[index];

            // 吹き出し表示
            element.addEventListener('focus', target.showError.bind(target));

            // 吹き出し非表示・バリデーション実行
            for (const event of ['focusout', 'change']) {
                element.addEventListener(event, () => {
                    target[target.verify() ? 'showError' : 'hideError']();
                });
            }
        });

        // 送信
        this.root.addEventListener('submit', this.validateAll.bind(this));
    }

    /**
     * validateAll - すべての要素にバリデーションを実行
     * @param  {submitEvent} event - サブミットイベントオブジェクト
     * @return {Void}
     */
    validateAll(event) {
        const results = this.validate.map((validate) => validate.verify());

        // バリデーション結果にtrue（エラー）がある場合は処理を止め、アラートを表示
        if (results.includes(true)) {
            event.preventDefault();
            event.stopImmediatePropagation();
            toast.displayToast('入力項目にエラーがあります。内容を修正してください。', 5000);
        }
    }
}

/**
 * デフォルト実行処理
 * @return {Void}
 */
export default () => {
    // 汎用タブ
    document.querySelectorAll('.js-form-validate').forEach((element) => new FormValidation(element));
};
