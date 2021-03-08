// import utilities.
import * as toast from './utils/toast';

class TagCategoryHelper {
    /**
     * 画像リンクをMD挿入形でコピー
     *
     * @constructor
     * @param {HTMLElement} root - ルートとなる要素
     */
    constructor(root) {
        // ルートとなる要素が無い場合は実装しない
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
     */
    addEvent() {
        this.root.addEventListener('submit', (e) => {
            e.preventDefault();
            this.linkage();
        });
    }

    linkage() {
        const formData = new window.FormData(this.root);
        const fetchData = async () => {
            const fetchOptions = {
                method: 'POST',
                headers: {
                    mode: 'cors',
                },
                body: formData,
            };

            try {
                const response = await window.fetch(this.action, fetchOptions);
                const json = await response.json();

                return {json, status: response.ok};
            } catch (e) {
                return {};
            }
        };

        fetchData().then((response) => {
            // エラー時
            if (!response.status) {
                toast.displayToast(response.json.message.join('。'), 5000);

                return;
            }

            this.sync(response.json);
            this.reset();
            toast.displayToast('追加しました', 5000);
        });
    }

    sync(data) {
        const clone = this.linkageTarget.firstElementChild.cloneNode(true);
        const targetType = this.linkageTarget.tagName.toLowerCase();

        if (targetType === 'select') {
            clone.value = data.id;
            clone.textContent = data.name;
        } else if (targetType === 'ul') {
            clone.querySelector('input').removeAttribute('checked');
            clone.querySelector('input').value = data.id;
            clone.querySelector('.admin-form-checkbox__label').textContent = data.name;
        }

        this.linkageTarget.insertAdjacentHTML('beforeend', clone.outerHTML);
    }

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
