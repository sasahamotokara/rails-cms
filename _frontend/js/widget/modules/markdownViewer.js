// import utilities.
import fetchData from '../utils/fetchData';

export class MarkdownViewer {
    /**
     * markdownプレビュー
     *
     * @constructor
     * @param {HTMLElement} root    - ルートとなる要素
     * @param {Object}      options - 設定の変更をする際のオブジェクト
     */
    constructor(root, options) {
        const config = {
            className: {
                previewArea: 'admin-form-content-textarea',
            },
        };

        // ルートとなる要素が無い場合は実装しない
        if (!root) {
            return;
        }

        this.config = Object.assign(config, options);
        this.root = root;
        this.buttons = this.root.querySelectorAll('button[data-ctrl]');
        this.textarea = this.root.parentNode.nextElementSibling;
        this.previewArea = document.createElement('div');
        this.isPreview = false;
        this.isChanged = true;

        // 不足している要素がある場合は何もしない
        if (!this.buttons.length || !this.textarea) {
            return;
        }

        this.init();
        this.addEvent();
        this.resizeObserver();
    }

    /**
     * init - 初期化
     * @return {Void}
     */
    init() {
        this.previewArea.tabIndex = 0;
        this.previewArea.hidden = true;
        this.previewArea.classList.add(this.config.className.previewArea);
        this.textarea.insertAdjacentElement('afterend', this.previewArea);
    }

    /**
     * addEvent - イベントバインド
     * @return {Void}
     */
    addEvent() {
        this.textarea.addEventListener('input', () => {
            // 内容に変更がない場合は実行しない
            if (this.isChanged) {
                return;
            }

            this.isChanged = true;
        });
    }

    /**
     * resizeObserver - 要素のサイズ変更（リサイズ）を監視
     * @return {Void}
     */
    resizeObserver() {
        let isResizing = false;
        let timer = 0;
        const observer = new window.MutationObserver(() => {
            // リサイズ中 または チェンジフラグが立っている場合は実行しない
            if (isResizing || this.isChanged) {
                return;
            }

            isResizing = true;
            this.isChanged = true;
            clearTimeout(timer);

            // リサイズ後、横幅を再取得
            timer = window.setTimeout(() => {
                isResizing = false;
            }, 500);
        });

        for (const target of [this.textarea, this.previewArea]) {
            observer.observe(target, {
                attributes: true,
                attributeFilter: ['style'],
            });
        }
    }

    /**
     * switch - 要素のサイズ変更（リサイズ）を監視
     * @param  {clickEvent} event - クリックイベントオブジェクト
     * @return {Void}
     */
    switch(event) {
        const {target} = event;

        // [data-ctrl]が設定されていなければ何もしない
        if (!target.dataset.ctrl) {
            return;
        }

        // チェンジフラグが立っている場合、高さの同期を実行
        if (this.isChanged) {
            const biggerHeight = Math.max(this.textarea.offsetHeight, this.previewArea.offsetHeight);

            this.textarea.style.height = `${biggerHeight}px`;
            this.previewArea.style.height = `${biggerHeight}px`;

            // [data-ctrl="html"]の要素がクリックされた場合はAPI経由でHTMLを取得
            if (target.dataset.ctrl === 'html') {
                this.getParsedHTML(this.textarea.value);
            }
        }

        for (const button of this.buttons) {
            button.disabled = button === target;
        }

        this.isChanged = false;
        this.isPreview = target.dataset.ctrl === 'html';
        this.textarea.hidden = this.isPreview;
        this.previewArea.hidden = !this.isPreview;
    }

    /**
     * getParsedHTML - APIにmdを送信、HTMLにパースされた文字列を取得
     * @param  {String} text - textareaに入力されたmd形式の文字列
     * @return {Void}
     */
    getParsedHTML(text) {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: text,
        };

        this.previewArea.innerHTML = '読み込み中';

        fetchData('/api/markdown-parser', 'text', fetchOptions).then((response) => {
            this.previewArea.innerHTML = response.data;
        });
    }
}
