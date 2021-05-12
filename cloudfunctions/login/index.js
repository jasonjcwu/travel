/*
 * @Author: jasonjcwu
 * @Date: 2021-03-31 20:56:35
 * @LastEditors: jasonjcwu
 * @LastEditTime: 2021-05-12 01:18:35
 * @Description:
 */
// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
  // traceUser: true,
})
const db = cloud.database()
const _ = db.command
/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 *
 * event 参数包含小程序端调用传入的 data
 *
 */
exports.main = async (event, context) => {
  const { userInfo = {}, action } = event
  const { OPENID } = cloud.getWXContext()
  console.log(userInfo, action, 'register')
  switch (action) {
    case 'register': {
      return registerUser(OPENID, userInfo)
    }
    case 'login': {
      return loginUser(OPENID)
    }
    default: {
      return loginUser(OPENID)
    }
  }
}
const getUser = async (OPENID) => {
  return await db
    .collection('user')
    .where({
      openId: _.eq(OPENID),
    })
    .get()
}

// 用户登录
const loginUser = async function (OPENID) {
  try {
    const responseUser = await getUser(OPENID)
    console.log(responseUser)
    if (responseUser.data.length === 0) {
      return { code: 404, message: '请注册' }
    }
    return { code: 200, userInfo: responseUser.data[0] }
  } catch (error) {
    return { message: error.message, stack: error.stack }
  }
}

// 用户注册/更新
const registerUser = async function (OPENID, userInfo) {
  let addUserData = {
    nickName: userInfo.nickName,
    avatarUrl: userInfo.avatarUrl,
    gender: userInfo.gender,
    country: userInfo.country,
    province: userInfo.province,
    city: userInfo.city,
  }
  try {
    console.log(userInfo)
    const responseUser = await getUser()
    if (responseUser.data.length === 0) {
      addUserData.openId = OPENID
      addUserData._openid = OPENID
      addUserData.star = []
      addUserData.attend = []
      addUserData.publish = []
      addUserData.phone = ''
      let res = await db.collection('user').add({
        data: addUserData,
      })
      console.log(res)
      return { code: 200, openId: OPENID }
    }
    let res = await db
      .collection('usesr')
      .where({
        openId: OPENID,
      })
      .update({
        data: addUserData,
      })
    console.log(res)
    return { code: 200, openId: OPENID }
  } catch (error) {
    return { code: 500, message: error.message, stack: error.stack }
  }
}
