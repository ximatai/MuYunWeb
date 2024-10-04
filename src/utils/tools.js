import { v4 as uuidv4 } from 'uuid'
/**
 * 判断是否为完整的URL
 */
export function isCompleteUrl(url) {
  return _.startsWith(url, 'http://') || _.startsWith(url, 'https://')
}

export function uuid() {
  return uuidv4()
}
