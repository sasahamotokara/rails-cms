// import utilities.
import fetchData from './utils/fetchData';
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
                errorList: 'admin-errors',
                errorListItem: 'admin-errors__item',
                preview: 'js-drop-uploader__preview',
                previewList: 'admin-layout-media__list',
                previewItem: 'admin-layout-media__item',
                previewImageWrap: 'admin-layout-media__media',
                previewImage: 'admin-layout-media__image',
                removeButton: 'js-drop-uploader__remove',
                drag: 'is-drag',
            },
        };

        // ルート要素がなければ実装しない
        if (!root) {
            return;
        }

        this.config = Object.assign(config, options);
        this.root = root;
        this.disableAjax = this.root.dataset.disableAjax === 'true';
        this.dropArea = this.root.querySelector(`.${this.config.className.dropArea}`);
        this.fileInput = this.root.querySelector('input[type="file"]');
        this.previewArea = this.root.querySelector(`.${this.config.className.preview}`);
        this.action = this.root.action;
        this.toast = toast.createToast();
        this.files = [];
        this.isError = false;
        this.isDrug = false;
        this.isUploading = false;

        // 不足している要素がある場合は何もしない
        if (!this.dropArea || !this.fileInput || !this.preview) {
            return;
        }

        this.init();
        this.addEvent();
    }

    /**
     * init - 初期化
     * @returns {Void}
     */
    init() {
        this.fileInput.required = false;
        this.fileInput.setAttribute('aria-invalid', 'false');
        this.fileInput.setAttribute('aria-required', 'true');
    }

    /**
     * createFileList - 初期化
     * @param  {Object} - input[type="file"]が持つFileListオブジェクト
     * @return {Object} 引数から無効なファイルを除いたFileListオブジェクト
     */
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

    /**
     * createErrorList - エラーメッセージリストの生成
     * @param  {Array<String>} - エラーメッセージが格納された配列
     * @return {String}
     */
    createErrorList(errors) {
        // エラーメッセージが空の場合は空文字を返す
        if (!errors.length) {
            return '';
        }

        const messages = [];

        for (const error of errors) {
            messages.push(`<p class="${this.config.className.errorListItem}">${error}</p>`);
        }

        return `<div class="${this.config.className.errorList}">${messages.join('')}</div>`;
    }

    /**
     * addEvent - イベントバインド
     * @return {Void}
     */
    addEvent() {
        this.dropArea.addEventListener('dragover', (e) => {
            e.preventDefault();

            // ドラッグ中は何もしない
            if (this.isDrug) {
                return;
            }

            this.isDrug = true;
            this.dropArea.classList.add(this.config.className.drag);
        });

        this.dropArea.addEventListener('dragleave', (e) => {
            e.preventDefault();

            // ドラッグ中でなければ何もしない
            if (!this.isDrug) {
                return;
            }

            this.isDrug = false;
            this.dropArea.classList.remove(this.config.className.drag);
        });

        this.dropArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.drop([...e.dataTransfer.files]);
        });

        this.previewArea.addEventListener('click', (e) => {
            const {target} = e;

            // 削除ボタンがクリックされていなければ何もしない
            if (!target.classList.contains(this.config.className.removeButton)) {
                return;
            }

            this.removePreview(target);
        });

        this.fileInput.addEventListener('change', () => {
            this.drop([...this.fileInput.files]);
        });

        this.root.addEventListener('submit', (e) => {
            // ファイルが指定されていない場合
            if (!this.fileInput.files.length) {
                e.preventDefault();
                toast.displayToast('画像を選択してください', 5000);
                this.fileInput.setAttribute('aria-invalid', 'true');

                return;
            }

            // Ajax送信が無効の場合
            if (this.disableAjax) {
                toast.displayToast('画像のアップロードを開始しました。この処理には時間がかかる場合があります。', 5000);

            // Ajax送信が有効の場合
            } else {
                e.preventDefault();
                this.submit();
            }
        });
    }

    /**
     * drop - ドロップイベント時の処理
     * @param {Object} files - input[type="file"]が持つFileListオブジェクト
     * @return {Void}
     */
    drop(files) {
        // オブジェクトが空の場合は何もしない
        if (!files.length) {
            return;
        }

        this.isDrug = false;
        this.files = this.files.concat(files.filter((file) => this.config.validExtensions.includes(file.name.split('.').pop().toLowerCase())));
        this.dropArea.classList.remove(this.config.className.drag);
        this.fileInput.files = this.createFileList(this.files);

        this.preview(files);
    }

    /**
     * preview - 受け取ったファイルのプレビュー
     * @param {Object} files - input[type="file"]が持つFileListオブジェクト
     * @return {Void}
     */
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

                // 最後のループだった場合
                if (i === (fileLength - 1)) {
                    // プレビューリストが存在しなければul要素ごとアペンド
                    if (!list) {
                        this.previewArea.insertAdjacentHTML('beforeend', `<ul class="${this.config.className.previewList}">${images.join('')}</ul>`);

                    // 存在する場合は子要素を追加
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

    /**
     * removePreview - プレビューの削除
     * @param {HTMLElement} element - 対象の要素
     * @return {Void}
     */
    removePreview(element) {
        const item = element.parentNode;
        const itemIndex = [...this.previewArea.querySelector(`.${this.config.className.previewList}`).children].indexOf(item);

        this.files.splice(itemIndex, 1);
        this.fileInput.files = this.createFileList(this.files);

        item.remove();
    }

    /**
     * sync - アップロードした画像情報をviewに同期
     * @param {Object} data - APIから返却されたJSONデータ
     * @return {Void}
     */
    sync(data) {
        const mediaLists = [...document.querySelectorAll(`.${this.config.className.previewList}`)].filter((element) => !element.parentNode.classList.contains(this.config.className.preview));

        for (const mediaList of mediaLists) {
            const cloneItem = mediaList.firstElementChild.cloneNode(true);
            const itemFirstChild = cloneItem.firstElementChild;

            // ボタン要素の場合、[data-code]を削除
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

                img.src = data[key].image.url;
                img.alt = '';

                mediaList.insertAdjacentElement('beforeend', clone);
            }
        }
    }

    /**
     * submit - 送信処理
     * @return {Void}
     */
    submit() {
        const fetchOptions = {
            method: 'POST',
            body: new window.FormData(this.root),
        };

        // アップロード実行中は再送信しない
        if (this.isUploading) {
            return;
        }

        this.isUploading = true;
        toast.displayToast('画像のアップロードを開始しました。この処理には時間がかかる場合があります', 5000);

        fetchData(this.action, 'json', fetchOptions).then((response) => {
            this.isUploading = false;

            // エラー時
            if (!response.status) {
                this.isError = true;
                toast.displayToast('アップロードに失敗しました', 5000);
                this.fileInput.insertAdjacentHTML('afterend', this.createErrorList(response.data.message));

                return;
            }

            // すでにエラー表示がされている場合
            if (this.isError) {
                const errorList = this.root.querySelector(`.${this.config.className.errorList}`);

                this.isError = false;

                // エラーリストがあれば削除
                if (errorList) {
                    errorList.remove();
                }
            }

            this.sync(response.data);
            this.reset();
        });
    }

    /**
     * reset - リセット処理
     * @return {Void}
     */
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
