// import utilities.
import randomString from './utils/randomString';

class Tab {
    /**
     * タブ
     *
     * @constructor
     * @param {HTMLElement} root    - ルートとなる要素
     * @param {Object}      options - 設定の変更をする際のオブジェクト
     */
    constructor(root, options) {
        const config = {
            defaultCurrent: 0,
            className: {
                list: 'js-tab__list',
                listItem: 'js-tab__listItem',
                control: 'js-tab__control',
                content: 'js-tab__content',
            },
        };

        // ルート要素がない場合は何もしない
        if (!root) {
            return;
        }

        this.config = Object.assign(config, options);
        this.root = root;
        this.list = this.root.querySelector(`.${this.config.className.list}`);
        this.items = this.list.querySelectorAll(`.${this.config.className.listItem}`);
        this.controls = this.list.querySelectorAll(`.${this.config.className.control}`);
        this.contents = [...this.controls].map((element) => document.getElementById(element.hash.slice(1)));
        this.currentIndex = parseInt(this.root.dataset.index, 10) || this.config.defaultCurrent;

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

        this.controls.forEach((control, idx) => {
            const content = this.contents[idx];
            const controlId = randomString('tab');
            const isCurrent = idx === this.currentIndex;

            control.id = controlId;
            control.tabIndex = isCurrent ? 0 : -1;
            control.setAttribute('role', 'tab');
            control.setAttribute('aria-controls', content.id);
            control.setAttribute('aria-selected', `${isCurrent}`);

            content.hidden = !isCurrent;
            content.tabIndex = 0;
            content.setAttribute('aria-labelledby', controlId);
            content.setAttribute('role', 'tabpanel');
        });
    }

    /**
     * addEvent - イベントバインド
     * @return {Void}
     */
    addEvent() {
        for (const control of this.controls) {
            control.addEventListener('click', (e) => {
                this.currentIndex = [].indexOf.call(this.controls, e.currentTarget);

                e.preventDefault();
                this.setCurrent();
            });
        }

        this.list.addEventListener('keydown', this.keydown.bind(this));
    }

    /**
     * setCurrent - タブを更新
     * @return {Void}
     */
    setCurrent() {
        this.contents.forEach((content, idx) => {
            const control = this.controls[idx];
            const isMatchIndex = idx === this.currentIndex;

            content.hidden = !isMatchIndex;
            control.setAttribute('aria-selected', `${isMatchIndex}`);
            control.tabIndex = isMatchIndex ? 0 : -1;
        });

        this.list.setAttribute('aria-activedescendant', this.contents[this.currentIndex].id);
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
