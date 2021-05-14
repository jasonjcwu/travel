/*
 * @Author: jasonjcwu
 * @Date: 2021-04-18 15:57:45
 * @LastEditors: jasonjcwu
 * @LastEditTime: 2021-05-14 02:08:45
 * @Description:
 */
import { observable, action } from 'mobx-miniprogram'

// 用户信息store
export const userInfoStore = observable({
  // 数据字段
  logged: false,
  userData: {
    nickName: '-',
    avatarUrl: '/images/user-unlogin.png',
    phone:'',
    gender: 0,
    country: '中国',
    province: '',
    city: '',
    openId: '',
    publish: '[]', // 发布
    attend: '[]', // 参加的活动
    star: '[]', // 收藏
  },

  // 计算属性
  get getUserInfo() {
    return {
      userData: this.userData,
      logged: this.logged,
    }
  },

  // actions
  updateUser: action(function (obj) {
    let logged = this.userData.openId || obj.openId ? true : false
    Object.keys(this.userData).forEach((key) => {
      this.userData[key] =
        (Array.isArray(obj[key]) ? JSON.stringify(obj[key]) : obj[key]) || this.userData[key]
    })
    this.userData = JSON.parse(JSON.stringify(this.userData))
    this.logged = logged
    console.log(obj, this.getUserInfo, 'acion后')
    wx.setStorageSync('userInfo', this.userData)
    wx.setStorageSync('logged', logged)
  }),
})

// 编辑器草稿
export const editorHtml = observable({
  // 数据字段
  actContentHtml: '',

  // actions
  updateActContent: action(function (obj) {
    console.log(obj, 'action')
    this.actContentHtml = obj
    console.log(this.actContentHtml)
    wx.setStorageSync('actContentHtml', this.actContentHtml)
  }),
})
