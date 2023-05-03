// 导入定义验证规则的包
const joi = require('joi')

const title = joi.string().max(100).required()

const avatarPath = joi.string().max(100).required()

const nickname = joi.string().max(20).required()

const password = joi.string().min(4).max(20).required()

const pageNum = joi.number().integer().required()

const pageSize = joi.number().integer().required()

const path = joi.string().required()

const albumId = joi.string().required()

const photoId = joi.string().required()

const description = joi.string().max(100).required()

const status = joi.number().integer().required()

//
//
// 定义修改昵称的规则对象
exports.modifyNickname_schema = {
  body: { nickname },
}

//
//
// 定义修改密码的规则对象
exports.modifyPassword_schema = {
  body: { oldPassword: password, newPassword: password },
}

//
//
// 定义上传更新用户头像的规则对象
exports.updateAvatar_schema = {
  body: { avatarPath },
}

//
//
// 定义新建相册的规则对象
exports.createAlbum_schema = {
  body: { title },
}

//
//
// 定义删除相册的规则对象
exports.deleteAlbum_schema = {
  query: { albumId },
}

//
//
// 定义更新相册状态的规则对象
exports.updateAlbumStatus_schema = {
  body: { albumId, status },
}

//
//
// 更新相册标题和描述
exports.updateAlbumTitleDesc_schema = {
  body: { albumId, title, description },
}

//
//
// 定义上传传入相册的图片地址信息的规则对象
exports.saveAlbumPhoto_schema = {
  body: { path, albumId },
}

//
//
// 定义删除图片的规则对象
exports.deletePhoto_schema = {
  query: { photoId },
}

//
//
// 定义更改图片状态的规则对象
exports.updatePhotoStatus_schema = {
  body: { photoId, status },
}

//
//
// 更新照片描述
exports.updatePhotoDesc_schema = {
  body: { photoId, description },
}

//
//
// 定义获取相册图片的规则对象
exports.getAlbumPhotos_schema = {
  query: { albumId, pageNum, pageSize },
}
