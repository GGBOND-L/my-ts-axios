import { AxiosRequestConfig } from './types'
import { bulidURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'
import xhr from './xhr'

function axios(config: AxiosRequestConfig) {
  processConfig(config)
  xhr(config)
}


function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transeformRequestData(config)
  config.headers = transformHeaders(config)
  console.log(config)
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
