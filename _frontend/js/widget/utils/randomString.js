/**
 * ランダム文字列生成
 * @param  {String} prefix ランダム文字列の接頭辞
 * @return {String}        接頭辞 ＋ ランダム文字列
 */
const randomString = (prefix) => {
    const str = `${prefix || 'id'}-${Math.random().toString(36).slice(-8)}`;

    // 重複するIDがHTML内に存在する場合、再生成
    if (document.getElementById(str)) {
        return randomString(prefix);
    }

    return str;
};

export default (prefix) => {
    return randomString(prefix);
};
