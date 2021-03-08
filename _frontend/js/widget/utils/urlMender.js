/**
 * URLの修正
 * @return {Void}
 */

import {LOCATION} from './global';

(() => {
    const paths = LOCATION.pathname.split('/');

    if (paths.includes('edit') || paths.includes('new')) {
        return;
    }

    const targetIds = ['post_edit', 'post_create', 'category_edit', 'tag_edit', 'media_create', 'media_edit', 'user_edit', 'user_create'];
    const isGetElement = ((ids) => {
        for (const id of ids) {
            if (!document.getElementById(id)) {
                continue;
            }

            return true;
        }

        return false;
    })(targetIds);

    if (!isGetElement) {
        return;
    }

    window.history.replaceState(null, null, document.referrer);
})();
