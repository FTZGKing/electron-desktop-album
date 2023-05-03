// 导入数据库操作模块
const db = require('../db/index')
// uuid
const uuid = require('uuid')
// 文件名编码方式为 7bit，导入模块还原 文件中文名称
const Buffer = require('buffer').Buffer
const fs = require('fs')
const path = require('path')
// 导入处理密码的模块
const bcrypt = require('bcryptjs')
const { basePath } = require('../config')
const { pagingQuery } = require('../utils/func')

//
//
// 获取我自己的信息
exports.getMyselfInfo = (req, res) => {
  const { id } = req.user

  const sql = `select id, nickname, avatar, home_picture from master where id=?`
  db.query(sql, id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取博客主人基本信息失败！')

    res.send({
      status: 200,
      message: '获取博客主人基本信息成功！',
      data: results[0],
    })
  })
}

//
//
// 修改昵称
exports.modifyNickname = (req, res) => {
  const { id } = req.user
  const { nickname } = req.body

  const sql = `update master set nickname=? where id=? `
  db.query(sql, [nickname, id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('修改昵称失败！')

    res.cc('修改昵称成功！', 200)
  })
}

//
//
// 修改密码
exports.modifyPassword = (req, res) => {
  const { id } = req.user
  const { oldPassword, newPassword } = req.body

  const sql = `select * from master where id=?`
  db.query(sql, id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('查询用户信息失败！')

    const comparaRes = bcrypt.compareSync(oldPassword, results[0].password)
    if (!comparaRes) return res.cc('原始密码错误！')

    const newPwd = bcrypt.hashSync(newPassword, 10)
    const sql = `update master set password=? where id=?`
    db.query(sql, [newPwd, id], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('更新密码失败！')

      res.cc('更新密码成功！', 200)
    })
  })
}

//
//
// 上传文件，包括图片、音频、
exports.uploadFile = (req, res) => {
  const { id: userId } = req.user
  const { originalname, filename, path: path_, size, mimetype } = req.file
  const originalFilename = Buffer.from(originalname, 'binary').toString()
  // console.log(req.file)

  const fixedUrl = (basePath + path_).replace(/\\/g, '/')
  const obj = {
    id: uuid.v1(),
    filename,
    originalname: originalFilename,
    master_id: userId,
    path: fixedUrl,
    upload_time: new Date(),
    size,
    type: mimetype,
  }

  const sql = `select * from uploads where originalname=? and master_id=? and size=? and type=?`
  db.query(
    sql,
    [obj.originalname, obj.master_id, obj.size, obj.type],
    (err, results) => {
      if (err) return res.cc(err)

      if (results.length === 1) {
        const filePath = path.join(__dirname, `../${path_}`)
        fs.unlink(filePath, (err) => {
          if (err) return res.cc(err)
        })
        res.send({
          status: 201,
          message: '用户上传了相同文件！',
          data: { ...results[0] },
        })
        return
      }

      const sql = `insert into uploads set ?`
      db.query(sql, obj, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('上传文件失败！')

        res.send({
          status: 200,
          message: '上传文件成功！',
          data: { ...obj },
        })
      })
    }
  )
}

//
//
// 更新上传的用户头像地址
exports.updateAvatar = (req, res) => {
  const { id } = req.user
  const { avatarPath } = req.body

  const sql = `update master set avatar=? where id=?`
  db.query(sql, [avatarPath, id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('更新用户头像地址失败！')

    res.cc('更新用户头像地址成功！', 200)
  })
}

//
//
// 创建一个相册
exports.createAlbum = (req, res) => {
  const { id } = req.user
  const { title } = req.body

  const obj = {
    id: uuid.v1(),
    title,
    description: '该相册暂无描述',
    master_id: id,
    create_time: new Date(),
  }

  const sql = `insert into album set ?`
  db.query(sql, obj, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('创建一个新的相册失败！')

    res.cc('创建一个新的相册成功！', 200)
  })
}

//
//
// 删除相册
exports.deleteAlbum = (req, res) => {
  const { id } = req.user
  const { albumId } = req.query

  const sql = `update album set is_delete=1 where id=? and master_id=?`
  db.query(sql, [albumId, id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除相册失败！')

    res.cc('删除相册成功！', 200)
  })
}

//
//
// 更新相册状态 发布和下架
exports.updateAlbumStatus = (req, res) => {
  const { id } = req.user
  const { albumId, status } = req.body

  const sql = `update album set publish=? where id=? and master_id=? and is_delete=0`
  db.query(sql, [status, albumId, id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('更新相册状态失败')

    res.cc('更新相册状态成功', 200)
  })
}
//
//
// 更新相册标题和描述
exports.updateAlbumTitleDesc = (req, res) => {
  const { id } = req.user
  const { albumId, title, description } = req.body

  const sql = `update album set title=?, description=? where id=? and master_id=? and is_delete=0`
  db.query(sql, [title, description, albumId, id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('更新相册信息失败！')

    res.cc('更新相册信息成功！', 200)
  })
}

//
//
// 上传传入相册的图片地址信息
exports.saveAlbumPhoto = (req, res) => {
  const { id } = req.user
  const { path, albumId } = req.body

  const obj = {
    id: uuid.v1(),
    path,
    album_id: albumId,
    master_id: id,
    upload_time: new Date(),
  }

  const sql = `insert into photo set ?`
  db.query(sql, obj, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('写入图片地址失败！')

    const sql = `update album set cover=? where id=? and master_id=? and is_delete=0`
    db.query(sql, [path, albumId, id], (err, results) => {
      if (err) return console.log('此次上传图片，更新相册封面失败！')
    })

    res.cc('写入图片地址成功！', 200)
  })
}

//
//
// 删除照片
exports.deletePhoto = (req, res) => {
  const { id } = req.user
  const { photoId } = req.query

  const sql = `update photo set is_delete=1 where id=? and master_id=? and is_delete=0`
  db.query(sql, [photoId, id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('发布照片失败！')

    res.cc('发布照片成功！', 200)
  })
}

//
//
// 更新照片状态 发布和下架
exports.updatePhotoStatus = (req, res) => {
  const { id } = req.user
  const { photoId, status } = req.body

  const sql = `update photo set publish=? where id=? and master_id=? and is_delete=0`
  db.query(sql, [status, photoId, id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('更改照片状态失败')

    res.cc('更改照片状态成功', 200)
  })
}

//
//
// 更新照片描述
exports.updatePhotoDesc = (req, res) => {
  const { id } = req.user
  const { photoId, description } = req.body

  const sql = `update photo set description=? where id=? and master_id=? and is_delete=0`
  db.query(sql, [description, photoId, id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('更新照片描述失败！')

    res.cc('更新照片描述成功！', 200)
  })
}

//
//
// 获取相册列表
exports.getAlbumList = (req, res) => {
  const { id } = req.user
  const sql = `select * from album where master_id=? and is_delete=0 order by create_time DESC`
  db.query(sql, id, (err, results) => {
    if (err) return res.cc(err)

    let temp = [...results]
    let count = 0 // 定义计数器，初始值为 0

    for (const key in temp) {
      const sql = `select id from photo where album_id=? and master_id=? and is_delete=0`
      db.query(sql, [temp[key].id, id], (err, results2) => {
        if (err) return console.log(temp[key].id + '获取此相册照片数量失败！')
        temp[key].photoCount = results2.length
        count++ // 每次异步查询完成后将计数器加 1

        if (count === temp.length) {
          // 当计数器的值等于数组长度时，表示所有异步查询都完成了
          res.send({
            status: 200,
            message: '获取相册列表成功',
            data: temp,
          })
        }
      })
    }
  })
}

//
//
// 获取相册图片
exports.getAlbumPhotos = (req, res) => {
  const { id } = req.user
  const { albumId, pageNum, pageSize } = req.query

  const sql = `select * from album where id=? and master_id=? and is_delete=0`
  db.query(sql, [albumId, id], (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取该相册图片失败！')

    const sql = `select * from photo where album_id=? and master_id=? and is_delete=0 
    order by upload_time DESC`
    db.query(sql, [albumId, id], (err, results) => {
      if (err) return res.cc(err)

      const queryList = pagingQuery(pageNum, pageSize, results)
      res.send({
        status: 200,
        message: '获取相册图片成功！',
        data: {
          queryList,
          total: results.length,
        },
      })
    })
  })
}
