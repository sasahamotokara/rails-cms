// import utilities.
import randomString from './utils/randomString';

class Tab {
    /**
     * タブ
     *
     * @constructor
     * @param {HTMLElement} root - ルートとなる要素
     * @param {Object} options - 設定の変更をする際のオブジェクト
     */
    constructor(root, options) {
        const config = {
            defaultCurrent: 0,
            className: {
                list: 'js-tab__list',
                listItem: 'js-tab__listItem',
                ctrl: 'js-tab__control',
                content: 'js-tab__content',
            },
            prefix: {
                id: 'tab',
            },
        };

        if (!root) {
            return;
        }

        this.config = Object.assign(config, options);
        this.root = root;
        this.list = this.root.querySelector(`.${this.config.className.list}`);
        this.items = this.list.querySelectorAll(`.${this.config.className.listItem}`);
        this.controls = Array.from(this.list.querySelectorAll(`.${this.config.className.ctrl}`));
        this.contents = this.controls.map((element) => document.getElementById(element.hash.slice(1)));
        this.currentIndex = parseInt(this.root.dataset.index, 10) || this.config.defaultCurrent;
        this.currentId = this.contents[this.currentIndex].id;

        this.init();
        this.addEvent();
    }

    /**
     * init - 初期化
     * @return {Void}
     */
    init() {
        this.list.setAttribute('role', 'tablist');
        this.list.setAttribute('aria-activedescendant', this.contents[this.currentIndex].id);

        for (const item of this.items) {
            item.setAttribute('role', 'presentation');
        }

        this.controls.forEach((ctrl, idx) => {
            const content = this.contents[idx];
            const ctrlId = randomString(this.config.prefix.id);
            const isCurrent = idx === this.currentIndex;

            ctrl.id = ctrlId;
            ctrl.tabIndex = isCurrent ? 0 : -1;
            ctrl.setAttribute('role', 'tab');
            ctrl.setAttribute('aria-controls', this.contents[idx].id);
            ctrl.setAttribute('aria-selected', `${isCurrent}`);

            content.hidden = !isCurrent;
            content.tabIndex = 0;
            content.setAttribute('aria-labelledby', ctrlId);
            content.setAttribute('role', 'tabpanel');
        });
    }

    /**
     * addEvent - イベントバインド
     */
    addEvent() {
        for (const ctrl of this.controls) {
            ctrl.addEventListener('click', (e) => {
                e.preventDefault();

                this.currentIndex = [].indexOf.call(this.controls, e.currentTarget);
                this.currentId = this.contents[this.currentIndex].id;

                this.setCurrent();
            });
        }

        this.list.addEventListener('keydown', this.keydown.bind(this));
    }

    /**
     * setCurrent - タブを更新
     */
    setCurrent() {
        this.contents.forEach((content, idx) => {
            const ctrl = this.controls[idx];
            const isMatchIndex = idx === this.currentIndex;

            content.hidden = !isMatchIndex;
            ctrl.setAttribute('aria-selected', `${isMatchIndex}`);
            ctrl.tabIndex = isMatchIndex ? 0 : -1;
        });

        this.list.setAttribute('aria-activedescendant', this.currentId);
    }

    /**
     * keydown - キーダウン時の処理
     * @param  {keydownEvent} event - イベントオブジェクト
     * @return {Void}
     */
    keydown(event) {
        const key = event.key.replace('Arrow', '').toLowerCase();

        // 左右矢印キー以外は何もしない
        if (key !== 'left' && key !== 'right') {
            return;
        }

        // カレントが一番初めのタブだった場合、最後のタブをカレントにする。それ以外はひとつ前をカレントに
        if (key === 'left') {
            this.currentIndex = this.currentIndex === 0 ? this.contents.length - 1 : this.currentIndex - 1;

        // カレントが一番最後のタブだった場合、最初のタブをカレントにする。それ以外はひとつ後をカレントに
        } else if (key === 'right') {
            this.currentIndex = this.currentIndex === (this.contents.length - 1) ? 0 : this.currentIndex + 1;
        }

        this.controls[this.currentIndex].focus();
        this.setCurrent();
    }
}

/**
 * デフォルト実行処理
 * @return {Void}
 */
export default () => {
    // 汎用タブ
    document.querySelectorAll('.js-tab').forEach((element) => new Tab(element));
};
