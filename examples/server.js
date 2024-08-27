const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
//app.use(express.json())：这个中间件用于解析 application/json 类型的请求体，并将解析后的内容挂载到 req.body 上。
//如果不使用这个中间件，req.body 会是 undefined，因为 Express 默认不会解析请求体。
app.use(express.json())

const compiler = webpack(WebpackConfig)

const router = express.Router()
router.get('/simple/get', (req, res) => {
  res.json({
    msg: 'hello world'
  })
})

router.get('/base/get', (req, res) => {
  res.json(req.query)
})

router.post('/base/post', (req, res) => {
  res.json(req.body)
})

router.post('/base/post', (req, res) => {
  let msg = []
  req.on('data', chunk => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})

router.post('/api/getResponse', function(req, res) {
  res.json(req.body)
})

// 响应正常情况，有50%几率响应成功，有50%几率响应失败，返回状态码500
router.get('/api/handleError', function(req, res) {
  if (Math.random() > 0.5) {
    res.json({
      msg: 'hello world'
    })
  } else {
    res.status(500).end()
  }
})

// 响应请求超时情况，这里我们设置3秒后响应，而发请求那里设置了超时时间为3秒，所以会发生请求超时异常
router.get('/api/handleError/timeout', function(req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello world`
    })
  }, 3000)
})

app.use(router)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false
    }
  })
)

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
