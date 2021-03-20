// import utilities.
import fetchData from './utils/fetchData';
import * as toast from './utils/toast';

class TagCategoryHelper {
    /**
     * APIを使用して動的にタグ・カテゴリーを追加する
     *
     * @constructor
     * @param {HTMLElement} root - ルートとなる要素
     */
    constructor(root) {
        // ルートとなる要素が無い場合 または for要素でない場合は実装しない
        if (!root || root.tagName.toLowerCase() !== 'form') {
            return;
        }

        this.root = root;
        this.linkageTarget = document.getElementById(this.root.dataset.linkageId);
        this.action = this.root.action;
        this.toast = toast.createToast();

        // 必要な要素が揃わなかった場合は実装しない
        if (!this.linkageTarget) {
            return;
        }

        this.addEvent();
    }

    /**
     * addEvent - イベントバインド
     * @return {Void}
     */
    addEvent() {
        this.root.addEventListener('submit', this.linkage.bind(this));
    }

    /**
     * linkage - APIデータ連携
     * @param {submitEvent} event - サブミットイベントオブジェクト
     * @return {Void}
     */
    linkage(event) {
        const fetchOptions = {
            method: 'POST',
            body: new window.FormData(this.root),
        };

        event.preventDefault();

        fetchData(this.action, 'json', fetchOptions).then((response) => {
            // エラー時
            if (!response.status) {
                toast.displayToast(response.data.message.join('。'), 5000);

                return;
            }

            this.sync(response.data);
            this.reset();
            toast.displayToast('追加しました', 5000);
        });
    }

    /**
     * sync - APIから返却されたJSONをviewに同期
     * @param {Object} data - APIから返却されたJSONデータ
     * @return {Void}
     */
    sync(data) {
        const clone = this.linkageTarget.firstElementChild.cloneNode(true);
        const targetType = this.linkageTarget.tagName.toLowerCase();

        // 連携対象の要素がselect要素の場合
        if (targetType === 'select') {
            clone.value = data.id;
            clone.textContent = data.name;

        // 連携対象の要素がul要素の場合
        } else if (targetType === 'ul') {
            clone.querySelector('input').removeAttribute('checked');
            clone.querySelector('input').value = data.id;
            clone.querySelector('.admin-form-checkbox__label').textContent = data.name;
        }

        this.linkageTarget.insertAdjacentElement('beforeend', clone);
    }

    /**
     * reset - リセット処理
     * @return {Void}
     */
    reset() {
        [...this.root.elements].filter((element) => element.tagName.toLowerCase() === 'input').forEach((element) => {
            element.value = '';
        });
    }
}

/**
 * デフォルト実行処理
 * @return {Void}
 */
export default () => {
    // 汎用モーダル
    document.querySelectorAll('.js-form-helper').forEach((element) => new TagCategoryHelper(element));
};
