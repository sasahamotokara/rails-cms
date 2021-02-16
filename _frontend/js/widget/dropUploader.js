import * as toast from '../utils/toast';

class DropUploader {
    /**
     * ドラッグ＆ドロップ 画像アップロード
     *
     * @constructor
     * @param {HTMLElement} root - ルートとなる要素
     * @param {Object} options - 設定の変更をする際のオブジェクト
     */
    constructor(root, options) {
        const config = {
            className: {
                dropArea: 'js-drop-uploader__dropArea',
                preview: 'js-drop-uploader__preview',
                previewList: 'admin-layout-media__list',
                previewItem: 'admin-layout-media__item',
                previewImageWrap: 'admin-layout-media__media',
                previewImage: 'admin-layout-media__image',
                removeButton: 'js-drop-uploader__remove',
                drag: 'is-drag',
            },
        };

        if (!root) {
            return;
        }

        this.config = Object.assign(config, options);
        this.root = root;
        this.dropArea = this.root.querySelector(`.${this.config.className.dropArea}`);
        this.fileInput = this.root.querySelector('input[type="file"]');
        this.previewArea = this.root.querySelector(`.${this.config.className.preview}`);
        this.files = [];
        this.disableAjax = this.root.dataset.disableAjax === 'true';
        this.toast = toast.createToast();
        this.isDrug = false;

        if (!this.dropArea || !this.fileInput || !this.preview) {
            return;
        }

        this.addEvent();
    }

    static createFileList(files) {
        const data = new ClipboardEvent('').clipboardData || new DataTransfer();

        for (const file of files) {
            data.items.add(file);
        }

        return data.files;
    }

    /**
     * addEvent - イベントバインド
     */
    addEvent() {
        this.dropArea.addEventListener('dragover', (e) => {
            e.preventDefault();

            if (this.isDrug) {
                return;
            }

            this.isDrug = true;
            this.dropArea.classList.add(this.config.className.drag);
        });

        this.dropArea.addEventListener('dragleave', (e) => {
            e.preventDefault();

            if (!this.isDrug) {
                return;
            }

            this.isDrug = false;
            this.dropArea.classList.remove(this.config.className.drag);
        });

        this.dropArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.drop(Array.from(e.dataTransfer.files));
        });

        this.previewArea.addEventListener('click', (e) => {
            const {target} = e;

            if (!target.classList.contains(this.config.className.removeButton)) {
                return;
            }

            this.removePreview(target);
        });

        this.fileInput.addEventListener('change', () => {
            this.drop(Array.from(this.fileInput.files));
        });

        if (!this.disableAjax) {
            this.root.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submit();
            });
        }
    }

    drop(files) {
        if (!files.length) {
            return;
        }

        this.isDrug = false;
        this.files = this.files.concat(files);
        this.dropArea.classList.remove(this.config.className.drag);
        this.fileInput.files = DropUploader.createFileList(this.files);

        this.preview(files);
    }

    preview(files) {
        const list = this.previewArea.querySelector(`.${this.config.className.previewList}`);
        const fileLength = files.length;
        const images = [];

        for (let i = 0; i < fileLength; i++) {
            const reader = new FileReader();

            reader.onload = (e) => {
                images.push(`<li class="${this.config.className.previewItem}"><div class="${this.config.className.previewImageWrap}"><img src="${e.target.result}" alt="" class="${this.config.className.previewImage}"></div><button class="admin-button-media-remove ${this.config.className.removeButton}"><span class="u-altText">削除</span></button></li>`);

                if (i === (fileLength - 1)) {
                    if (!list) {
                        this.previewArea.insertAdjacentHTML('beforeend', `<ul class="${this.config.className.previewList}">${images.join('')}</ul>`);
                    } else {
                        list.insertAdjacentHTML('beforeend', images.join(''));
                    }
                }
            };

            reader.readAsDataURL(files[i]);
        }
    }

    removePreview(element) {
        const item = element.parentNode;
        const itemIndex = Array.from(this.previewArea.querySelector(`.${this.config.className.previewList}`).children).indexOf(item);

        this.files.splice(itemIndex, 1);
        this.fileInput.files = DropUploader.createFileList(this.files);

        if (!this.files.length) {
            this.previewArea.firstElementChild.remove();
        }

        item.remove();
    }

    sync(data) {
        const mediaLists = Array.from(document.querySelectorAll(`.${this.config.className.previewList}`)).filter((element) => !element.parentNode.classList.contains(this.config.className.preview));

        for (const mediaList of mediaLists) {
            const cloneItem = mediaList.firstElementChild.cloneNode(true);
            const itemFirstChild = cloneItem.firstElementChild;

            if (itemFirstChild.tagName.toLowerCase() === 'button') {
                itemFirstChild.removeAttribute('data-code');
            }

            for (const key of Object.keys(data)) {
                const clone = cloneItem.cloneNode(true);
                const img = clone.querySelector('img');

                if (itemFirstChild.tagName.toLowerCase() === 'label') {
                    const input = clone.querySelector('input');

                    input.value = data[key].id;
                    input.checked = false;
                }

                img.src = data[key].url;
                img.alt = '';

                mediaList.insertAdjacentElement('beforeend', clone);
            }
        }
    }

    submit() {
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
                const response = await fetch(this.root.action, fetchOptions);
                const responseData = await response.json();

                return responseData;
            } catch (e) {
                return {};
            }
        };

        fetchData().then((response) => {
            this.sync(response);
            this.reset();
        });
    }

    reset() {
        this.previewArea.firstElementChild.remove();
        this.files.length = 0;
        this.fileInput.files = DropUploader.createFileList(this.files);

        toast.displayToast('画像を追加しました', 5000);
    }
}

/**
 * デフォルト実行処理
 * @return {Void}
 */
export default () => {
    // 汎用タブ
    document.querySelectorAll('.js-drop-uploader').forEach((element) => new DropUploader(element));
};
