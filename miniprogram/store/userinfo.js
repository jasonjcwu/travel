/*
 * @Author: jasonjcwu
 * @Date: 2021-04-18 15:57:45
 * @LastEditors: jasonjcwu
 * @LastEditTime: 2021-05-12 14:19:59
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
    gender: 0,
    country: '中国',
    province: '',
    city: '',
    openId: '',
    publish: '', // 发布
    attend: '', // 参加的活动
    star: '', // 收藏
  },
  // publish: [], // 发布
  // attend: [], // 参加的活动
  // star: [], // 收藏

  // 计算属性
  get getUserInfo() {
    return {
      userData: this.userData,
      logged: this.logged,
      // publish: this.publish,
      // attend: this.attend,
      // star: this.star,
    }
  },

  // actions
  updateUser: action(function (obj, logged = true) {

    Object.keys(this.userData).map((key) => {
      this.userData[key] =
        (Array.isArray(obj[key]) ? JSON.stringify(obj[key]) : obj[key]) || this.userData[key]
    })

    console.log(this.getUserInfo, '后')

    // console.log(obj,this.userData, 'action')

    this.logged = logged
    wx.setStorageSync('userInfo', this.userData)
    wx.setStorageSync('logged', true)
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
