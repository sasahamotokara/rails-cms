// import utilities.
import * as toast from './utils/toast';

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
            validExtensions: ['jpg', 'jpeg', 'png', 'gif'],
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
        this.action = this.root.action;
        this.files = [];
        this.disableAjax = this.root.dataset.disableAjax === 'true';
        this.toast = toast.createToast();
        this.isError = false;
        this.isDrug = false;
        this.isUploading = false;

        if (!this.dropArea || !this.fileInput || !this.preview) {
            return;
        }

        this.init();
        this.addEvent();
    }

    init() {
        this.fileInput.required = false;
        this.fileInput.setAttribute('aria-invalid', 'false');
        this.fileInput.setAttribute('aria-required', 'true');
    }

    createFileList(files) {
        const data = new window.ClipboardEvent('').clipboardData || new window.DataTransfer();

        for (const file of files) {
            const extension = file.name.split('.').pop().toLowerCase();

            // 有効な拡張子の場合のみ追加
            if (this.config.validExtensions.includes(extension)) {
                data.items.add(file);
            }
        }

        return data.files;
    }

    createErrorList(errors) {
        if (!errors.length) {
            return '';
        }

        const messages = [];

        for (const error of errors) {
            messages.push(`<p class="admin-errors__item">${error}</p>`);
        }

        return `<div class="admin-errors">${messages.join('')}</div>`;
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

                if (!this.fileInput.files.length) {
                    toast.displayToast('画像を選択してください', 5000);
                    this.fileInput.setAttribute('aria-invalid', 'true');

                    return;
                }

                this.submit();
            });
        } else {
            this.root.addEventListener('submit', (e) => {
                if (!this.fileInput.files.length) {
                    e.preventDefault();
                    toast.displayToast('画像を選択してください', 5000);
                    this.fileInput.setAttribute('aria-invalid', 'true');

                    return;
                }

                toast.displayToast('画像のアップロードを開始しました。この処理には時間がかかる場合があります。', 5000);
            });
        }
    }

    drop(files) {
        if (!files.length) {
            return;
        }

        this.isDrug = false;
        this.files = this.files.concat(files.filter((file) => this.config.validExtensions.includes(file.name.split('.').pop().toLowerCase())));
        this.dropArea.classList.remove(this.config.className.drag);
        this.fileInput.files = this.createFileList(this.files);

        this.preview(files);
    }

    preview(files) {
        const list = this.previewArea.querySelector(`.${this.config.className.previewList}`);
        const fileLength = files.length;
        const images = [];
        const invalidFiles = [];

        for (let i = 0; i < fileLength; i++) {
            const file = files[i];
            const extension = file.name.split('.').pop().toLowerCase();

            // 有効な拡張子でない場合
            if (!this.config.validExtensions.includes(extension)) {
                invalidFiles.push(`「${file.name}」`);
                continue;
            }

            const reader = new window.FileReader();

            reader.onload = (e) => {
                images.push(`<li class="${this.config.className.previewItem}"><div class="${this.config.className.previewImageWrap}"><img src="${e.target.result}" alt="" class="${this.config.className.previewImage}"></div><button type="button" class="admin-button-media-remove ${this.config.className.removeButton}"><span class="u-altText">削除</span></button></li>`);

                if (i === (fileLength - 1)) {
                    if (!list) {
                        this.previewArea.insertAdjacentHTML('beforeend', `<ul class="${this.config.className.previewList}">${images.join('')}</ul>`);
                    } else {
                        list.insertAdjacentHTML('beforeend', images.join(''));
                    }
                }
            };

            reader.readAsDataURL(file);
        }

        this.fileInput.setAttribute('aria-invalid', `${!this.fileInput.files.length}`);
        toast.displayToast(invalidFiles.length ? `${invalidFiles.join('、')}は対応していないファイル形式です。` : '解析が完了しました', 5000);
    }

    removePreview(element) {
        const item = element.parentNode;
        const itemIndex = Array.from(this.previewArea.querySelector(`.${this.config.className.previewList}`).children).indexOf(item);

        this.files.splice(itemIndex, 1);
        this.fileInput.files = this.createFileList(this.files);

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

        if (this.isUploading) {
            return;
        }

        this.isUploading = true;
        toast.displayToast('画像のアップロードを開始しました。この処理には時間がかかる場合があります。', 5000);

        fetchData().then((response) => {
            console.log(response);
            this.isUploading = false;
            // エラー時
            if (!response.status) {
                this.isError = true;
                toast.displayToast('アップロードに失敗しました', 5000);
                this.fileInput.insertAdjacentHTML('afterend', this.createErrorList(response.json.message));

                return;
            }

            if (this.isError) {
                this.isError = false;
                this.fileInput.nextElementSibling.remove();
            }

            this.sync(response.json);
            this.reset();
        });
    }

    reset() {
        this.previewArea.firstElementChild.remove();
        this.files.length = 0;
        this.fileInput.files = this.createFileList(this.files);

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
