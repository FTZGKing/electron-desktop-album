//
//
// 一定要在路由之前，封装 res.cc 函数，处理错误的函数
exports.resCC = (req, res, next) => {
  // status 默认值为 500，表示失败的情况
  // err 的值，可能为一个错误对象，也可能是一个错误的描述字符串
  res.cc = function (err, status = 500) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
}

//
//
// 获取当前时间中间件
exports.resDate = (req, res, next) => {
  // 获取到当前时间值，并进行格式化
  res.nowDate = function () {
    const now = new Date()
    const formattedDate = now.toLocaleString()
    return formattedDate
  }
  next()
}

//
//
// 上传文件的中间件
// 导入一些函数
const { nowDate } = require('./func')
const multer = require('multer')

// 定义文件上传类型的过滤器
const fileFilter = (type) => {
  return function (req, file, cb) {
    if (file.mimetype.startsWith(`${type}/`)) {
      cb(null, true)
    } else {
      cb(new Error(`Only ${type} are allowed`))
    }
  }
}

// 上传文件的中间件
const fileStorage = (savePath) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, savePath) // 上传文件的存储路径
    },
    filename: function (req, file, cb) {
      const now = nowDate()
      const arr = file.originalname.split('.')
      const filename = now + '.' + arr[arr.length - 1]
      cb(null, filename)
    },
  })
}

// 上传图片
exports.uploadImageFile = multer({
  storage: fileStorage('public/image'),
  fileFilter: fileFilter('image'),
})

// 上传音乐音频文件
exports.uploadAudioFile = multer({
  storage: fileStorage('public/audio'),
  fileFilter: fileFilter('audio'),
})

// 上传音乐歌词文件
exports.uploadLyricsFile = multer({
  storage: fileStorage('public/audio'),
  fileFilter: fileFilter('text'),
})
