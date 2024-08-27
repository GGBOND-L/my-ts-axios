import { parseHeaders } from './helpers/headers'
import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './types'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType } = config

    // 1.创建XMLHttpRequest异步对象
    const request = new XMLHttpRequest()
    // 2.配置请求参数
    request.open(method.toUpperCase(), url, true)

    //设置请求头
    Object.keys(headers).forEach(name => {
      //data为null并且name为Content-Type，则删除Content-Type请求头
      if (data === null && name.toLowerCase() === 'Content-Type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    // 3.发送请求
    request.send(data)

    // 4.注册事件，拿到响应信息
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) return

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText

      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      resolve(response)
    }
  })
}
