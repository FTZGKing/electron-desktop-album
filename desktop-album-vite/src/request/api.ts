import { instance as request } from './request'

//
// 注册
export const registerApi = (
  account: string,
  password: string,
  secret_key: string
): PromiseRes => {
  return request.post(`/api/register`, {
    account,
    password,
    secret_key,
  })
}

//
// 验证账号
export const verifyApi = (account: string, secret_key: string): PromiseRes => {
  return request.post(`/api/verify`, {
    account,
    secret_key,
  })
}

//
// 账号密码登录
export const loginApi = (
  account: string,
  password: string,
  verify: string
): PromiseRes => {
  return request.post(`/api/login`, {
    account,
    password,
    verify,
  })
}

//
//
// 以下为权限接口
//
//

//
// 获取自身的一些信息
export const getMyselfInfoApi = (): PromiseRes<getMyselfInfoItf> => {
  return request.get(`/user/getMyselfInfo`)
}

//
// 修改昵称
export const modifyNicknameApi = (nickname: string): PromiseRes => {
  return request.put(`/user/modifyNickname`, {
    nickname,
  })
}

//
// 上传图片文件
export const uploadImageApi = (formdata: File): PromiseRes => {
  return request.post('/user/uploadImage', formdata, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

//
// 上传更新用户头像
export const updateAvatarApi = (avatarPath: string): PromiseRes => {
  return request.post(`/user/updateAvatar`, {
    avatarPath,
  })
}

//
// 新建一个相册
export const createAlbumApi = (title: string): PromiseRes => {
  return request.post(`/user/createAlbum`, {
    title,
  })
}

//
// 删除相册
export const deleteAlbumApi = (albumId: string): PromiseRes => {
  return request.delete(`/user/deleteAlbum?albumId=${albumId}`)
}

//
// 更新相册状态 发布和下架
export const updateAlbumStatusApi = (
  albumId: string,
  status: number
): PromiseRes => {
  return request.post(`/user/updateAlbumStatus`, {
    albumId,
    status,
  })
}

//
// 更新相册标题和描述
export const updateAlbumTitleDescApi = (
  albumId: string,
  title: string,
  description: string
): PromiseRes => {
  return request.post(`/user/updateAlbumTitleDesc`, {
    albumId,
    title,
    description,
  })
}

//
// 上传传入相册的照片地址信息
export const saveAlbumPhotoApi = (
  albumId: string,
  path: string
): PromiseRes => {
  return request.post(`/user/saveAlbumPhoto`, {
    albumId,
    path,
  })
}

//
// 删除照片
export const deletePhoto = (photoId: string): PromiseRes => {
  return request.delete(`/user/deletePhoto?photoId=${photoId}`)
}

//
//  更新照片状态 发布和下架
export const updatePhotoStatusApi = (
  photoId: string,
  status: number
): PromiseRes => {
  return request.post(`/user/updatePhotoStatus`, {
    photoId,
    status,
  })
}

//
//  更新照片描述
export const updatePhotoDescApi = (
  photoId: string,
  description: string
): PromiseRes => {
  return request.post(`/user/updatePhotoDesc`, {
    photoId,
    description,
  })
}

//
//  获取相册列表
export const getAlbumListApi = (): PromiseRes => {
  return request.get(`/user/getAlbumList`)
}

//
//  分页获取相册照片
export const getAlbumPhotosApi = (
  albumId: string,
  pageNum: number,
  pageSize: number
): PromiseRes => {
  return request.post(`/user/getAlbumPhotos`, {
    albumId,
    pageNum,
    pageSize,
  })
}
