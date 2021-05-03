/*
 * @Author: jasonjcwu
 * @Date: 2021-04-18 15:57:45
 * @LastEditors: jasonjcwu
 * @LastEditTime: 2021-04-24 23:36:31
 * @Description:
 */
import { observable, action } from 'mobx-miniprogram'

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
    attend: [], // 参加的活动
    star: [] // 收藏
  },

  // 计算属性
  get getUserInfo() {
    return { userData: this.userData, logged: this.logged }
  },

  // actions
  updateUser: action(function (obj, logged = true) {
    console.log(obj,'action')
    this.userData = Object.assign(this.userData, obj);
    console.log(this.userData)
    this.logged = logged
    wx.setStorageSync('userInfo', this.userData)
    wx.setStorageSync('logged', true)
  }),
})

export const editorHtml = observable({
  // 数据字段
  actContentHtml: {}

  // actions
  // updateUser: action(function (obj, logged = true) {
  //   console.log(obj,'action')
  //   this.userData = Object.assign(this.userData, obj);
  //   console.log(this.userData)
  //   this.logged = logged
  //   wx.setStorageSync('userInfo', this.userData)
  //   wx.setStorageSync('logged', true)
  // }),
})