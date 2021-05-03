/*
 * @Author: jasonjcwu
 * @Date: 2021-03-31 20:56:35
 * @LastEditors: jasonjcwu
 * @LastEditTime: 2021-04-19 00:21:36
 * @Description:
 */
// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
  traceUser: true,
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
  switch (action) {
    case 'register': {
      return registerUser()
    }
    case 'login': {
      return loginUser()
    }
    default: {
      return loginUser()
    }
  }
  async function getUser() {
    return await db
      .collection('user')
      .where({
        openId: _.eq(OPENID),
      })
      .get()
  }
  // 用户登录
  async function loginUser() {
    try {
      const responseUser = await getUser()
      console.log(responseUser)
      if (responseUser.data.length === 0) {
        return { code: 404, message: '请注册' }
      }
      return {code: 200,userInfo: responseUser.data[0]}
    } catch (error) {
      return { message: error.message, stack: error.stack }
    }
  }

  // 用户注册
  async function registerUser() {
    let addUserData = {
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      gender: userInfo.gender,
      country: userInfo.country,
      province: userInfo.province,
      city: userInfo.city,
    }
    try {
      let res = await db
        .collection('user')
        .where({
          openId: OPENID,
        })
        .set({
          data: addUserData,
        })
      return res.data
      // const responseUser = await getUser()
      // if (responseUser.data.length === 0) {
      //   addUserData.openId = OPENID
      //   let res = await db.collection('user').add({
      //     data: addUserData,
      //   })
      //   return res.data
      // } else {
      //   let res = await db
      //     .collection('user')
      //     .where({
      //       openId: OPENID,
      //     })
      //     .update({
      //       data: addUserData,
      //     })
      //   return res.data
      // }
    } catch (error) {
      return { message: error.message, stack: error.stack }
    }
  }
}
