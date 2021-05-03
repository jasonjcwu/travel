/*
 * @Author: jasonjcwu
 * @Date: 2021-04-18 17:10:59
 * @LastEditors: jasonjcwu
 * @LastEditTime: 2021-04-18 21:42:38
 * @Description:
 */

export const getLogin = async () => {
  let resUserData = await wx.cloud.callFunction({
    name: 'login',
    data: { action: 'login' },
  })
  if(resUserData.code === 200){
    wx.setStorage('userInfo', userInfo)
    return resUserData.data
  }
}
