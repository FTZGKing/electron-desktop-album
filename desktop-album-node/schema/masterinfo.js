// 导入定义验证规则的包
const joi = require('joi')

const account = joi.string().alphanum().min(5).max(20).required()
const password = joi.string().min(6).max(20).required()
const secret_key = joi.string().min(5).max(20).required()
const verify = joi.string().alphanum().min(4).max(5).required()

//
//
// 定义注册账号的规则对象
exports.register_schema = {
  body: { account, password, secret_key },
}

// 定义验证登录的账号的规则对象
exports.verify_schema = {
  body: { account, secret_key },
}

// 定义账号登录的规则对象
exports.login_schema = {
  body: { account, password, verify },
}
