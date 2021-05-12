/*
 * @Author: jasonjcwu
 * @Date: 2021-05-10 17:10:35
 * @LastEditors: jasonjcwu
 * @LastEditTime: 2021-05-10 21:01:48
 * @Description: 
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
  traceUser: true,
})
const db = cloud.database()
const _ = db.command


// 云函数入口函数
exports.main = async (event, context) => {
  const { action } = event
  const { OPENID } = cloud.getWXContext()
  switch (action) {
    case 'star': {
      return activityStar()
    }
    // case 'login': {
    //   return loginUser()
    // }
    // default: {
    //   return loginUser()
    // }
  }

}
const activityStar = async ()=> {
  const resStared = await this.db
  .collection('user')
  .where({
    openId: userInfoStore.userData.openId,
  })
  .update({
    data: {
      star: _.push(this.optionsId),
    },
  })
}
