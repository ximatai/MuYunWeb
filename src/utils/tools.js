/**
 * 判断是否为完整的URL
 */
export function isCompleteUrl(url) {
    return _.startsWith(url, 'http://') || _.startsWith(url, 'https://')
}