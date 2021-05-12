/*
 * @Author: jasonjcwu
 * @Date: 2021-03-31 20:56:35
 * @LastEditors: jasonjcwu
 * @LastEditTime: 2021-05-12 15:23:29
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
    // let storageLogged = wx.getStorageSync('logged')
    // console.log(storageLogged)
    // if(storageLogged) {
    //   return userInfoStore.updateUser(wx.getStorageSync('userInfo'))
    // }
    // 登录
    let resUserData = await wx.cloud.callFunction({
      name: 'login',
      data: { action: 'login' },
    })
    if (resUserData.result.code === 200) {
      userInfoStore.updateUser(resUserData.result.userInfo)
    }
  },
  // onShow() {
  //   this.storeBindings = createStoreBindings(this, {
  //     store: userInfoStore,
  //     fields: ['getUserInfo'],
  //     actions: ['updateUser'],
  //   })
  // },
  
  onHide() {
    console.log(userInfoStore.userData)
    wx.setStorageSync('userInfo', userInfoStore.userData)
    wx.setStorageSync('logged', userInfoStore.logged)
  },
})
