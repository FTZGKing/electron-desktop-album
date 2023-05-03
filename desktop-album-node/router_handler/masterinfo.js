// 导入数据库操作模块
const db = require('../db/index')
// uuid
const uuid = require('uuid')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
// 导入生成 Token 的包
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const { jwtScretKey, expiresIn } = require('../config')
const { debounce } = require('../utils/func')

//
//
// 注册新用户
exports.regUser = (req, res) => {
  const { account, password, secret_key } = req.body

  const sql = `select * from master where account=?`
  db.query(sql, account, (err, results) => {
    if (err) return res.cc(err)
    if (results.length > 0) return res.cc('用户账号被占用，请更换账号注册！')

    const id = uuid.v1()
    const ac = account
    const pwd = bcrypt.hashSync(password, 10)
    const skey = bcrypt.hashSync(secret_key, 5)
    const obj = {
      id,
      account: ac,
      password: pwd,
      secret_key: skey,
      key_update_time: new Date(),
    }

    const sql = `insert into master set ?`
    db.query(sql, obj, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('注册失败！')
      res.cc('注册成功！', 200)
    })
  })
}

//
//
// 验证账号
exports.verifyAccount = (req, res) => {
  const { account, secret_key } = req.body

  const sql = `select * from master where account=?`
  db.query(sql, account, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('验证账号失败！')

    const compareRes = bcrypt.compareSync(secret_key, results[0].secret_key)
    if (!compareRes) return res.cc('验证账号失败！')

    // 随机生成长度为4的字符串
    const verify = Math.random().toString(36).substring(2, 6)
    const skey = bcrypt.hashSync(verify, 12)
    const sql = `update master set allow=? where account=?`
    db.query(sql, [skey, account], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('验证账号失败！')

      // 一分钟后重置验证码
      debounceReset(account)

      res.send({
        status: 200,
        message: '验证账号成功！',
        verify,
      })
    })
  })
}

//
// 定义重置验证码的函数
const resetVerify = (account) => {
  const sql = `update master set allow=1 where account=?`
  db.query(sql, account, (err, results) => {
    if (err) return console.log(err)
    if (results.affectedRows !== 1) return console.log('重置验证码失败！')
    return console.log('验证码已重置！')
  })
}
// 定义重置验证码的防抖函数
const debounceReset = debounce((account) => resetVerify(account), 60000)

//
//
// 登录
exports.userLogin = (req, res) => {
  const { account, password, verify } = req.body

  const sql = `select * from master where account=?`
  db.query(sql, account, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('登录失败！')

    const compareVerify = bcrypt.compareSync(verify, results[0].allow)
    if (!compareVerify) return res.cc('非法登录！！！？？？')

    const compareRes = bcrypt.compareSync(password, results[0].password)
    if (!compareRes) return res.cc('登录失败！')

    // 在服务器端生成 Token 的字符串
    const user = {
      id: results[0].id,
      nickname: results[0].nickname,
      avatar: results[0].avatar,
    }
    // 对用户的信息进行加密，生成 Token 字符串
    const tokenStr = jwt.sign(user, jwtScretKey, { expiresIn: expiresIn })

    res.send({
      status: 200,
      message: '登录成功！',
      token: 'Bearer ' + tokenStr,
    })
  })
}
