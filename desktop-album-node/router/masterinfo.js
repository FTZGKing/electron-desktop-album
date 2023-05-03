const express = require('express')
const router = express.Router()

const {
  regUser,
  verifyAccount,
  userLogin,
} = require('../router_handler/masterinfo')

const expressJoi = require('@escook/express-joi')
const {
  register_schema,
  verify_schema,
  login_schema,
} = require('../schema/masterinfo')

//
//
/**
 * 注册账号
 * @param account  账号
 * @param password 密码
 * @param secret_key 密钥
 * */
router.post('/register', expressJoi(register_schema), regUser)

/**
 * 验证登录的账号
 * @param account  账号
 * @param secret_key 密钥
 * */
router.post('/verify', expressJoi(verify_schema), verifyAccount)

/**
 * 账号登录
 * @param account  账号
 * @param password 密码
 * @param verify 验证码
 * */
router.post('/login', expressJoi(login_schema), userLogin)

//
//
module.exports = router
