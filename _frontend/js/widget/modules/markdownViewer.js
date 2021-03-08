export class MarkdownViewer {
    /**
     * markdownプレビュー
     *
     * @constructor
     * @param {HTMLElement} root - ルートとなる要素
     * @param {Object} options - 設定の変更をする際のオブジェクト
     */
    constructor(root, options) {
        const config = {};

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

        this.init();
        this.addEvent();
        this.resizeObserver();
    }

    init() {
        this.previewArea.tabIndex = 0;
        this.previewArea.hidden = true;
        this.previewArea.classList.add('admin-form-content-textarea');
        this.textarea.insertAdjacentElement('afterend', this.previewArea);
    }

    addEvent() {
        this.textarea.addEventListener('input', () => {
            if (this.isChanged) {
                return;
            }

            this.isChanged = true;
        });
    }

    resizeObserver() {
        let isResizing = false;
        let timer = 0;
        const observer = new window.MutationObserver(() => {
            if (isResizing) {
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

    switch(event) {
        const {target} = event;

        if (!target.dataset.ctrl) {
            return;
        }

        if (this.isChanged) {
            const biggerHeight = Math.max(this.textarea.offsetHeight, this.previewArea.offsetHeight);

            this.textarea.style.height = `${biggerHeight}px`;
            this.previewArea.style.height = `${biggerHeight}px`;

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

    getParsedHTML(text) {
        const fetchData = async () => {
            const fetchOptions = {
                method: 'POST',
                headers: {
                    mode: 'cors',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: text,
            };

            try {
                const response = await window.fetch('/api/markdown-parser', fetchOptions);
                const responseData = await response.text();

                return responseData;
            } catch (e) {
                return '';
            }
        };

        this.previewArea.innerHTML = '読み込み中';

        fetchData().then((response) => {
            this.previewArea.innerHTML = response;
        });
    }
}
