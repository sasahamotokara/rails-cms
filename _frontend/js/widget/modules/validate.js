// import utilities.
import randomString from '../utils/randomString';

export class Validate {
    /**
     * 開閉機能
     *
     * @constructor
     * @param {String}         idPrefix     - id名の接頭辞
     * @param {HTMLElement}    control      - 開閉ボタンとして機能する要素
     * @param {HTMLElement}    content      - 開閉するコンテンツ部分
     * @param {Boolean}        isOpen       - 初期表示を開く状態にする（true）かしない(false)か
     * @param {Boolean|String} withBackdrop - 開閉時に背景レイヤーの表示・非表示をする（true）かしない(false)か、または特定の画面サイズ（SP|PC）のみ表示するか
     */
    constructor(element, sameNameElements, validateType, isRequired, options) {
        const config = {
            className: {
                tooltip: 'admin-form-tooltip',
                tooltipText: 'admin-form-tooltip__text',
            },
        };

        // ボタンまたはコンテンツとなる要素が無い場合は実装しない
        if (!element) {
            return;
        }

        this.config = Object.assign(config, options);
        this.id = randomString('validate');
        this.element = element;
        this.sameNameElements = sameNameElements;
        this.tooltip = this.createErrorTooltip();
        this.validateType = !validateType ? {} : this.createValidateData(validateType.split(','));
        this.elementType = this.element.tagName.toLowerCase() === 'input' && this.element.type !== 'text' ? this.element.type : this.element.tagName.toLowerCase();
        this.message = this.getErrorMessage();
        this.labelName = this.getLabelName();
        this.errorMessage = '';
        this.value = '';
        this.isRequired = isRequired;
        this.isError = false;

        this.init();
    }

    /**
    * init - 初期化
    * @return {Void}
    */
    init() {
        this.element.setAttribute('aria-invalid', 'false');
        this.element.setAttribute('aria-describedby', this.id);

        // デフォルトのエラーが表示されてしまうのでrequired属性を削除、aria-requiredで代替
        if (this.isRequired) {
            this.element.removeAttribute('required');
            this.element.setAttribute('aria-required', 'true');
        }

        if (this.element.closest('label')) {
            this.element.closest('label').insertAdjacentElement('afterend', this.tooltip);
        } else {
            this.element.insertAdjacentElement('afterend', this.tooltip);
        }
    }

    getLabelName() {
        let labelName = '';

        // title属性が指定されている場合
        if (this.element.title) {
            labelName += this.element.title;

        // 入力要素のidに関連するlabel要素が存在する場合
        } else if (document.querySelector(`label[for="${this.element.id}"]`)) {
            labelName += document.querySelector(`label[for="${this.element.id}"]`).textContent;

        // その他ラベルが判別できない場合
        } else {
            labelName += 'このエリア';
        }

        return labelName;
    }

    /**
     * getErrorMessage - エラーメッセージ設定
     * @return {String} message - エラー時に表示されるメッセージ
     */
    getErrorMessage() {
        const validateKeys = Object.keys(this.validateType);
        let message = '';

        // 入力形式に関係するバリデーション設定がある場合
        if (validateKeys.includes('type')) {
            message += {
                doubleByteChar: '全角',
                doubleByteKana: '全角カタカナ',
                alphanumeric: '半角英数字',
                number: '半角数字',
                mail: '半角',
                password: '半角英数字及び記号',
                url: 'URL形式（https://google.com/）',
                alphaWithDelimiter: '半角英数字及びハイフン・アンダースコア',
            }[this.validateType.type];

        // 文字入力系の要素には「全角」の指定をデフォルトでつける
        } else if (this.elementType === 'input') {
            message += '全角';
        }

        // maxとminが同時に指定されていた場合
        if (validateKeys.includes('max') && validateKeys.includes('min')) {
            message += `${this.validateType.min}文字以上${this.validateType.max}文字以内`;

        // maxのみ指定
        } else if (validateKeys.includes('max')) {
            message += `${this.validateType.max}文字以内`;

        // minのみ指定
        } else if (validateKeys.includes('min')) {
            message += `${this.validateType.min}文字以上`;

        // matchのみ指定
        } else if (validateKeys.includes('match')) {
            message += `${this.validateType.match}文字`;
        }

        // mailが選択されている場合
        if (this.validateType.type === 'mail') {
            message += 'で正しく';
            // 文字入力の要素の場合
        } else if (this.elementType === 'input') {
            message += 'で';
        }

        // 入力の指示（入力してください or 選択してください）
        message += /select|checkbox|radio/.test(this.elementType) ? '選択してください' : '入力してください';

        return message;
    }

    /**
     * createValidateData - バリデーションデータ作成
     *
     * @param {array} validateType - data-validate-type属性を','区切りで配列化した配列
     * @return {Object} data :
     *   data.type => バリデーションのタイプ（全角・半角など）
     *   data.max => 入力文字制限（最大桁数）
     *   data.min => 入力文字制限（最小桁数）
     *   data.match => 入力文字制限（桁数一致）
     *
     */
    createValidateData(validateType) {
        const data = {};

        for (const type of validateType) {
            if (type.includes(':')) {
                data[type.split(':')[0].replace(/ /g, '')] = parseInt(type.split(':')[1], 10);
            } else {
                data.type = type;
            }
        }

        return data;
    }

    /**
     * createErrorTooltip - エラー表示（ツールチップ）の生成
     * @return {HTMLElement} tooltip
     */
    createErrorTooltip() {
        const tooltip = document.createElement('div');

        tooltip.classList.add(this.config.className.tooltip);
        tooltip.setAttribute('aria-live', 'off');
        tooltip.tabIndex = -1;
        tooltip.insertAdjacentHTML('beforeend', `<span id="${this.id}" class="${this.config.className.tooltipText}" hidden></span>`);
        tooltip.addEventListener('focusout', this.hideError.bind(this));

        return tooltip;
    }

    showError() {
        if (!this.isError) {
            return;
        }

        this.tooltip.setAttribute('role', 'alert');
        this.tooltip.setAttribute('aria-live', 'assertive');
        this.tooltip.firstElementChild.textContent = this.errorMessage;
        this.tooltip.firstElementChild.hidden = false;
        this.tooltip.firstElementChild.style.bottom = `${this.element.clientHeight + 8}px`;
    }

    hideError() {
        this.tooltip.removeAttribute('role');
        this.tooltip.setAttribute('aria-live', 'off');
        this.tooltip.firstElementChild.textContent = '';
        this.tooltip.firstElementChild.hidden = true;
    }

    /**
     * verify - 検証
     * @return {Boolean}
     */
    verify() {
        const validateKeys = Object.keys(this.validateType);
        let isError = false;

        this.value = this.element.value;

        // 必須入力チェック
        if (this.isRequired) {
            // input[type="radio"] または input[type="checkbox"]の場合
            if ('checkbox' === this.elementType || 'radio' === this.elementType) {
                // チェックされていなければエラー
                isError = ![...this.sameNameElements].filter((element) => element.checked).length;

            // 未入力・未選択はエラー
            } else if (this.value === '') {
                isError = true;
            }

            if (isError) {
                this.errorMessage = `${this.labelName}は${/select|checkbox|radio/.test(this.elementType) ? '選択' : '入力'}必須です`;
            }
        }

        // 入力必須エラーでない かつ 未入力でない場合、入力内容のエラーチェック
        if (!isError && this.value !== '') {
            for (const key of validateKeys) {
                // 入力形式に関してのバリデーション
                if (key === 'type') {
                    if (!this.validate()[this.validateType.type](this.value)) {
                        isError = true;
                        break;
                    }

                    continue;

                // 文字長についてのバリデーション
                } else if (!this.validate()[`${key}Length`](this.value, this.validateType[key])) {
                    isError = true;
                    break;
                }
            }

            if (isError) {
                this.errorMessage = `${this.labelName}は${this.message}`;
            }
        }

        // 非エラー ⇒ エラーになった場合
        if (!this.isError && isError) {
            this.tooltip.focus();
        }

        this.isError = isError;
        this.element.setAttribute('aria-invalid', `${this.isError}`);

        return this.isError;
    }

    /**
     * validate - 検証メソッド
     */
    validate() {
        return {
            doubleByteChar(str) {
                return /^[ぁ-んァ-ヶー一-龠々 　\t]+$/.test(str); // eslint-disable-line
            },
            doubleByteKana(str) {
                return /^[\u30a0-\u30ff 　]+$/.test(str); // eslint-disable-line
            },
            alphanumeric(str) {
                return /^[0-9a-zA-Z]+$/.test(str);
            },
            alphaWithDelimiter(str) {
                return /^[0-9a-zA-Z_-]+$/.test(str);
            },
            number(num) {
                return !isNaN(parseInt(num, 10)) && !isNaN(Number(num));
            },
            mail(str) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(str);
            },
            password(str) {
                return /^[a-zA-Z0-9.!:;@?<>#$%&'*+/\\=?^_`{|}[\]~-]+$/.test(str);
            },
            url(str) {
                return /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w\-./?%&=]*)+$/.test(str);
            },
            maxLength(str, length) {
                return Array.from(str).length <= length;
            },
            minLength(str, length) {
                return Array.from(str).length >= length;
            },
            matchLength(str, length) {
                return Array.from(str).length === length;
            },
        };
    }
}
