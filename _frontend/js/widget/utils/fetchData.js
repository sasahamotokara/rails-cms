
/**
 * fetchData - APIからデータを取得
 * @param  {String} url          - APIへリクエストするURL
 * @param  {String} responseType - 受け取るデータの種類
 * @param  {Object} fetchOptions - POSTする値
 * @return {Object}
 */
export default async (url, responseType, fetchOptions) => {
    try {
        const response = await window.fetch(url, fetchOptions);
        const responseData = await response[responseType]();

        return {data: responseData, status: response.ok};
    } catch (e) {
        return {data: '', status: false};
    }
};
