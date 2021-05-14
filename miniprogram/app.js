/*
 * @Author: jasonjcwu
 * @Date: 2021-03-31 20:56:35
 * @LastEditors: jasonjcwu
 * @LastEditTime: 2021-05-14 02:04:01
 * @Description:
 */
//app.js
import { userInfoStore } from './store/userinfo'
App({
  globalData: {
    ...userInfoStore
  },
  // momouiRootPath: '/miniprogram_npm/momoui-miniprogram', 
  onLaunch() {
    // 云开发初始化
    wx.cloud.init({
      env: 'cloud-8gbsa6wyf9af0906',
      traceUser: true,
    })
    this.getLogin()
  },
  async getLogin() {
    let storageLogged = wx.getStorageSync('logged')
    if(storageLogged) {
      console.log(wx.getStorageSync('userInfo'),storageLogged)
      return userInfoStore.updateUser(wx.getStorageSync('userInfo'))
    }
    // 登录
    let resUserData = await wx.cloud.callFunction({
      name: 'login',
      data:
       { action: 'login' },
    })
    console.log(resUserData)
    if (resUserData?.result?.code === 200) {
      userInfoStore.updateUser({...resUserData.result.userInfo, openId: resUserData.result.openId})
    }
    //  else {
    //   wx.showToast({
    //     title: '登录失败请刷新重试',
    //     icon: 'error'
    //   })
    // }
  },
  
  onHide() {
    console.log(userInfoStore.userData)
    wx.setStorageSync('userInfo', userInfoStore.userData)
    wx.setStorageSync('logged', userInfoStore.logged)
  },
})
