import { AxiosRequestConfig } from './types'
export default function xhr(config: AxiosRequestConfig) {
  const { data = null, url, method = 'get', headers } = config
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)

  //设置请求头
  Object.keys(headers).forEach(name=>{
    //data为null并且name为Content-Type，则删除Content-Type请求头
    if(data === null && name.toLowerCase() === 'Content-Type'){
      delete headers[name]
    }else{
      request.setRequestHeader(name, headers[name])
    }
  })

  request.send(data)
}
