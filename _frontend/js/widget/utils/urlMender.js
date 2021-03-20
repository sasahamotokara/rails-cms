// import global variables.
import {LOCATION} from './global';

/**
 * URLの修正
 * @return {Void}
 */
(() => {
    const paths = LOCATION.pathname.split('/');

    // URLのパスにeditまたはnewが含まれている場合は何もしない
    if (paths.includes('edit') || paths.includes('new')) {
        return;
    }

    const targetIds = ['post_edit', 'post_create', 'category_edit', 'tag_edit', 'media_create', 'media_edit', 'user_edit', 'user_create'];
    const isGetElement = ((ids) => {
        for (const id of ids) {
            // targetIdsと同じidをもつ要素があるか検証
            if (!document.getElementById(id)) {
                continue;
            }

            return true;
        }

        return false;
    })(targetIds);

    // targetIdsと同じidをもつ要素がなければ終了
    if (!isGetElement) {
        return;
    }

    // URLを修正
    window.history.replaceState(null, null, document.referrer);
})();
