/*
 * @Author: jasonjcwu
 * @Date: 2021-04-18 17:10:59
 * @LastEditors: jasonjcwu
 * @LastEditTime: 2021-05-11 23:19:41
 * @Description:
 */
import { userInfoStore } from '../store/userinfo'
export const getLogin = async () => {
  let resUserData = await wx.cloud.callFunction({
    name: 'login',
    data: { action: 'login' },
  })
  if(resUserData.code === 200){
    // userInfoStore.updateUser({...userInfo, openId: resLogin.result.openid})
    // wx.setStorage('userInfo', userInfo)
    return resUserData.data
  }
}

export const saveUserInfo = async (userInfo)=> {
  wx.showLoading({
    title: '授权中',
  })
  let resLogin = await wx.cloud.callFunction({
    name: 'login',
    data: { userInfo, action: 'register' },
  })
  console.log(resLogin)
  wx.hideLoading()
  if(resLogin.result.code === 200) {
    userInfoStore.updateUser({...userInfo, openId: resLogin.result.openId})
    wx.showToast({
      title: '授权成功',
    })
    return true
  } else {
    wx.showToast({
      title: '授权失败请重试',
    })
    return false
  }

}