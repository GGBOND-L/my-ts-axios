import { AxiosRequestConfig } from './types'
import { bulidURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'
import { AxiosResponse } from './types'
import xhr from './xhr'

function axios(config: AxiosRequestConfig) {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  // 先处理请求头，再处理data
  config.headers = transformHeaders(config)
  config.data = transeformRequestData(config)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return bulidURL(url, params)
}
function transeformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
export default axios
