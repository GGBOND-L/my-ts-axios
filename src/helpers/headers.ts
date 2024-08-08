import { isPlainObject } from './util'

/**
 * 将头部名称转换为大写，并删除已存在的同名头部。
 *
 * @param {any} headers - The headers object to normalize.
 * @param {string} normalizedName - The normalized name to use.
 * @return {void} This function does not return anything.
 */
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

/**
 * 处理头部信息，如果数据是一个普通对象，并且 'Content-Type' 头没有设置，则将 'Content-Type' 头设置为 'application/json;charset=utf-8'。
 *
 * @param {any} headers - The headers object to be processed.
 * @param {any} data - The data to be processed.
 * @return {any} The processed headers object.
 */
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
