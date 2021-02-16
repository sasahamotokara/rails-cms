import * as toast from '../utils/toast';

class TagCategoryHelper {
    /**
     * 画像リンクをMD挿入形でコピー
     *
     * @constructor
     * @param {HTMLElement} root - ルートとなる要素
     * @param {Object} options - 設定の変更をする際のオブジェクト
     */
    constructor(root, options) {
        const config = {
            maxCount: 10,
            className: {
                cloneRoot: 'js-form-helper__cloneRoot',
                addButton: 'js-form-helper__addButton',
            },
        };

        // ルートとなる要素が無い場合は実装しない
        if (!root) {
            return;
        }

        this.config = Object.assign(config, options);
        this.root = root;
        this.clone = null;
        this.cloneRoot = this.root.querySelector(`.${this.config.className.cloneRoot}`);
        this.addButton = this.root.querySelector(`.${this.config.className.addButton}`);
        this.submit = this.root.querySelector('button[type="submit"]');
        this.linkageTarget = document.getElementById(this.root.dataset.linkageId);
        this.action = this.root.action;
        this.count = 1;
        this.isLimited = false;
        this.toast = toast.createToast();

        // 必要な要素が揃わなかった場合は実装しない
        if (!this.cloneRoot || !this.addButton || !this.submit || !this.linkageTarget) {
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
        const legend = this.cloneRoot.querySelector('legend');

        this.clone = this.cloneRoot.cloneNode(true);
        this.clone.querySelectorAll('input').forEach((element) => {
            element.value = '';
        });

        legend.insertAdjacentText('beforeend', this.count++);
    }

    /**
     * addEvent - イベントバインド
     */
    addEvent() {
        this.root.addEventListener('submit', (e) => {
            e.preventDefault();

            this.linkage();
            this.reset();
            toast.displayToast('追加しました', 5000);
        });

        this.addButton.addEventListener('click', () => {
            if (this.isLimited) {
                return;
            }

            this.addButton.parentNode.insertAdjacentElement('beforebegin', this.getCloneNode());
        });
    }

    getCloneNode() {
        const clone = this.clone.cloneNode(true);
        const legend = clone.querySelector('legend');

        clone.querySelectorAll('input').forEach((element) => {
            const {name} = element;

            element.name = name.replace('0', (this.count - 1));
        });

        legend.insertAdjacentText('beforeend', this.count++);

        if (this.count > this.config.maxCount) {
            this.isLimited = true;
        }

        return clone;
    }

    linkage() {
        const formData = new FormData(this.root);
        const fetchData = async () => {
            const fetchOptions = {
                method: 'POST',
                headers: {
                    mode: 'cors',
                },
                body: formData,
            };

            try {
                const response = await fetch(this.action, fetchOptions);
                const responseData = await response.json();

                return responseData;
            } catch (e) {
                return {};
            }
        };

        fetchData().then((response) => this.sync(response));
    }

    sync(data) {
        const clone = this.linkageTarget.firstElementChild.cloneNode(true);
        const targetType = this.linkageTarget.tagName.toLowerCase();
        const items = [];

        for (const key of Object.keys(data)) {
            if (targetType === 'select') {
                clone.value = data[key].id;
                clone.textContent = data[key].name;
            } else if (targetType === 'ul') {
                clone.querySelector('input').removeAttribute('checked');
                clone.querySelector('input').value = data[key].id;
                clone.querySelector('.admin-form-checkbox__label').textContent = data[key].name;
            }

            items.push(clone.outerHTML);
        }

        this.linkageTarget.insertAdjacentHTML('beforeend', items.join(''));
    }

    reset() {
        const children = Array.from(this.root.children);
        const removedChildren = children.splice(1, children.length >= 2 ? children.length - 2 : 0);

        this.isLimited = false;
        this.count = 2;

        this.cloneRoot.querySelectorAll('input').forEach((element) => {
            element.value = '';
        });

        if (!children.length) {
            return;
        }

        for (const child of removedChildren) {
            child.remove();
        }
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
