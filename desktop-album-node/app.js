const express = require('express')
const app = express()
const joi = require('joi')

// 快速的对外提供静态资源
// 注意：Express在指定的静态目录中查找文件，并对外提供资源的访问路径，
// 因此存放静态文件的目录名不会出现在URL中。
app.use('/public', express.static('./public'))
// app.use(express.static('./uploads'))

// 导入并配置 cors 中间件
const cors = require('cors')
app.use(cors())
// 配置解析表单数据的中间件
// 注意这个中间件 只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))
// 使用 express.json() 中间件来解析 JSON 数据。
// 这个中间件会自动解析请求体中的 JSON 数据，并将其作为 JavaScript 对象绑定到 req.body 上。
app.use(express.json())

//
//
// 配置全局中间件
const { resCC, resDate } = require('./utils/middleware')
app.use(resCC)
app.use(resDate)

//
//
// 一定要在路由之前配置解析 Token 的中间件
const expressJWT = require('express-jwt')
const { jwtScretKey } = require('./config')
// 指定哪些路径需要进行验证
// app.use('/api/secret', expressJWT({ secret: jwtScretKey }));
// 指定哪些路径不需要进行验证
app.use(
  expressJWT({ secret: jwtScretKey }).unless({
    path: [/^\/api/, /^\/$/],
  })
)

//
//
// 根据波特的url响应不同的html内容
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

//
//
// 导入并使用路由模块
const masterinfoRouter = require('./router/masterinfo')
app.use('/api', masterinfoRouter)
const updateRouter = require('./router/update')
app.use('/user', updateRouter)

//
//
// 定义错误级别的中间件，错误级别中间件一定要写在路由之后
app.use((err, req, res, next) => {
  // 账号密码验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 身份认证失败后的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  // 未知的错误
  res.cc(err)
})

//
//
// 启动服务器
const port = 6011
app.listen(port, () => {
  console.log(`api server running at http://127.0.0.1:${port}`)
})
