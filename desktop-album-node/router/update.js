const express = require('express')
const router = express.Router()

const {
  getMyselfInfo,
  modifyNickname,
  modifyPassword,
  uploadFile,
  updateAvatar,
  createAlbum,
  deleteAlbum,
  updateAlbumStatus,
  updateAlbumTitleDesc,
  saveAlbumPhoto,
  deletePhoto,
  updatePhotoStatus,
  updatePhotoDesc,
  getAlbumList,
  getAlbumPhotos,
} = require('../router_handler/update')

const expressJoi = require('@escook/express-joi')
const {
  modifyNickname_schema,
  modifyPassword_schema,
  updateAvatar_schema,
  createAlbum_schema,
  deleteAlbum_schema,
  updateAlbumStatus_schema,
  updateAlbumTitleDesc_schema,
  saveAlbumPhoto_schema,
  deletePhoto_schema,
  updatePhotoStatus_schema,
  updatePhotoDesc_schema,
  getAlbumPhotos_schema,
} = require('../schema/update')

// 上传文件的中间件
const { uploadImageFile } = require('../utils/middleware')

/**
 * 获取我自己个人的信息
 * */
router.get('/getMyselfInfo', getMyselfInfo)

/**
 * 修改昵称
 * @param nickname 新昵称值
 * */
router.put('/modifyNickname', expressJoi(modifyNickname_schema), modifyNickname)

/**
 * 修改密码
 * @param oldPassword 旧密码
 * @param newPassword 新密码
 * */
router.put('/modifyPassword', expressJoi(modifyPassword_schema), modifyPassword)

/**
 * 上传图片文件
 * 在请求的“Body”选项卡中，选择“form-data”。
 * 添加一个新的表单字段，使用“file”作为键，选择一个要上传的文件。
 * */
router.post('/uploadImage', uploadImageFile.single('file'), uploadFile)

/**
 * 上传更新用户头像
 * @param avatarPath 头像地址
 * */
router.post('/updateAvatar', expressJoi(updateAvatar_schema), updateAvatar)

/**
 * 新建一个相册
 * @param title 相册名称
 * */
router.post('/createAlbum', expressJoi(createAlbum_schema), createAlbum)

/**
 * 删除相册
 * @param albumId 相册id
 * */
router.delete('/deleteAlbum', expressJoi(deleteAlbum_schema), deleteAlbum)

/**
 * 更新相册状态 发布和下架
 * @param albumId 相册id
 * @param status 相册状态
 * */
router.post(
  '/updateAlbumStatus',
  expressJoi(updateAlbumStatus_schema),
  updateAlbumStatus
)

/**
 * 更新相册标题和描述
 * @param albumId 相册id
 * @param title 相册标题
 * @param description 相册描述
 * */
router.post(
  '/updateAlbumTitleDesc',
  expressJoi(updateAlbumTitleDesc_schema),
  updateAlbumTitleDesc
)

/**
 * 上传传入相册的照片地址信息
 * @param path 照片路径
 * @param albumId 相册id
 * */
router.post(
  '/saveAlbumPhoto',
  expressJoi(saveAlbumPhoto_schema),
  saveAlbumPhoto
)

/**
 * 删除照片
 * @param photoId 照片id
 * */
router.delete('/deletePhoto', expressJoi(deletePhoto_schema), deletePhoto)

/**
 * 更新照片状态 发布和下架
 * @param photoId 照片id
 * @param status 照片状态
 * */
router.post(
  '/updatePhotoStatus',
  expressJoi(updatePhotoStatus_schema),
  updatePhotoStatus
)

/**
 * 更新照片描述
 * @param photoId 照片id
 * @param description 照片描述
 * */
router.post(
  '/updatePhotoDesc',
  expressJoi(updatePhotoDesc_schema),
  updatePhotoDesc
)

/**
 * 获取相册列表
 * */
router.get('/getAlbumList', getAlbumList)

/**
 * 获取相册照片
 * @param albumId 相册id
 * @param pageNum 分页页码
 * @param pageSize 分页大小
 * */
router.get('/getAlbumPhotos', expressJoi(getAlbumPhotos_schema), getAlbumPhotos)

//
//
module.exports = router
