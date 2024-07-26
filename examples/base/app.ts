import axios from '../../src/index'

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  },
  headers: {
    'content-type': 'application/json;'
  }
})

const arr = new Int32Array([21, 31])

axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
})
