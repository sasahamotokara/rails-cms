// import modules.
import {MarkdownViewer} from './modules/markdownViewer';
import {MediaObserver} from './modules/mediaObserver';

class EditorTool {
    /**
     * 記事エディター補助機能
     *
     * @constructor
     * @param {HTMLElement} root - ルートとなる要素
     * @param {Object} options - 設定の変更をする際のオブジェクト
     */
    constructor(root, options) {
        const config = {
            className: {
                toolbar: 'admin-editor-toolbar',
                textarea: 'admin-form-content-textarea',
                buttonList: 'admin-button-list',
                buttonListItem: 'admin-button-list__item',
                mediaButton: 'admin-button-media',
                switchButton: 'admin-button-switch',
            },
        };

        // ルートとなる要素が無い場合は実装しない
        if (!root) {
            return;
        }

        this.config = Object.assign(config, options);
        this.root = root;
        this.textarea = this.root.querySelector(`.${this.config.className.textarea}`);
        this.toolbar = document.createElement('div');
        this.switchButtonList = document.createElement('ul');
        this.mediaButton = `<button type="button" class="${this.config.className.mediaButton}" data-href="#modal-media-uploader-01">メディアを追加</button>`;
        this.markdownViewer = null;
        this.mediaObserver = null;

        this.init();
        this.addEvent();
    }

    init() {
        this.toolbar.classList.add(this.config.className.toolbar);
        this.switchButtonList.classList.add(this.config.className.buttonList);

        this.switchButtonList.insertAdjacentHTML('beforeend', this.createSwitchButton());
        this.toolbar.insertAdjacentHTML('beforeend', this.mediaButton);
        this.toolbar.insertAdjacentElement('beforeend', this.switchButtonList);
        this.root.insertAdjacentElement('afterbegin', this.toolbar);

        this.markdownViewer = new MarkdownViewer(this.switchButtonList);
        this.mediaObserver = new MediaObserver(this.textarea);
    }

    addEvent() {
        this.switchButtonList.addEventListener('click', this.markdownViewer.switch.bind(this.markdownViewer));
        this.textarea.addEventListener('focusout', this.mediaObserver.output.bind(this.mediaObserver));
    }

    /**
     * 切り替えボタンの生成
     */
    createSwitchButton() {
        let items = '';

        for (const type of ['markdown', 'html']) {
            items += `<li class="${this.config.className.buttonListItem}"><button type="button" class="${this.config.className.switchButton}" data-ctrl="${type}"${type === 'markdown' ? ' disabled' : ''}>${type}</button></li>`;
        }

        return items;
    }
}

export default () => {
    document.querySelectorAll('.js-editor-tool').forEach((element) => new EditorTool(element));
};
