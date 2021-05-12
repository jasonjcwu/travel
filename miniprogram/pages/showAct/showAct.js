/*
 * @Author: jasonjcwu
 * @Date: 2021-05-05 13:21:12
 * @LastEditors: jasonjcwu
 * @LastEditTime: 2021-05-12 15:33:41
 * @Description:
 */
// miniprogram/pages/showAct/showAct.js
import { userInfoStore } from '../../store/userinfo'
import { createStoreBindings } from 'mobx-miniprogram-bindings'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    activity: {},
    avatarArr: [],
    isStart: false, // 活动是否收藏
    locationImg: '',
    joinText: '参加活动',
    markers: [
      {
        id: 1,
        latitude: 23.099994,
        longitude: 113.32452,
      },
    ],
    dialogShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.db = wx.cloud.database()
    this.optionsId = options.id
    // this.storeBindings = createStoreBindings(this, {
    //   store: userInfoStore,
    //   fields: { userInfo: 'userData', hasUserInfo: 'logged' },
    // })
    await this.getActivity(options)
    this.getActStatus(options)
  },

  // 获取活动内容
  async getActivity(options) {
    wx.showLoading({ title: '加载中...' })
    const _ = this.db.command
    const resActivity = await this.db
      .collection('article')
      .where({
        _id: options?.id,
      })
      .get()
    console.log(resActivity)
    // 参加人的头像
    const resJoinAvatar = await this.db
      .collection('user')
      .where({
        openId: _.all(resActivity.data[0].joinUser),
      })
      .field({
        avatarUrl: true,
      })
      .limit(2)
      .get()
    wx.hideLoading()
    this.setData({
      activity: resActivity.data[0],
      avatarArr: resJoinAvatar.data,
      markers: [
        {
          id: 1,
          latitude: resActivity.data[0].site.latitude,
          longitude: resActivity.data[0].site.longitude,
        },
      ],
    })
  },
  // 判断是否为发布者，是否已参加，是否收藏
  getActStatus(options) {
    let { openId, star, attend } = userInfoStore.userData
    star = Array.isArray(star) ? JSON.parse(star) : star
    attend = Array.isArray(attend) ? JSON.parse(attend) : attend
    const actOpenid = this.data.activity._openid
    console.log(actOpenid, openId)
    if (actOpenid === openId) {
      this.setData({
        joinText: '下架活动',
      })
    } else if (attend) {
      for (const attendItem of attend) {
        if (actOpenid === attendItem) {
          this.setData({
            joinText: '取消参加',
          })
          break
        }
      }
    }
    for (const startItem of star) {
      if (options?.id === startItem) {
        this.setData({
          isStart: true,
        })
        break
      }
    }
  },

  openMap(e) {
    wx.openLocation({
      latitude: e.detail.latitude,
      longitude: e.detail.longitude,
      name: this.data.activity.site.name,
      address: this.data.activity.site.address,
    })
  },
  // 点击收藏
  async startAct() {
    const _ = this.db.command
    wx.showLoading({
      title: this.data.isStart ? '取消收藏中...' : '收藏中...',
    })
    const resStared = await this.db
      .collection('user')
      .where({
        openId: userInfoStore.userData.openId,
      })
      .update({
        data: {
          star: this.data.isStart ? _.pull(this.optionsId) : _.push(this.optionsId),
        },
      })
    console.log(resStared)
    if (resStared?.stats?.updated > 0) {
      this.setData({
        isStart: !this.data.isStart,
      })
    }
    wx.hideLoading()
    wx.showToast({
      title: this.data.isStart ? '收藏成功' :'取消成功' ,
    })
  },
  tapDialogButton(e) {
    this.setData({
      dialogShow: false,
    })
    if (e.detail.index !== 0) {
      wx.showToast({
        title: '功能正在加紧完善中...',
        icon: 'none',
        duration: 2000,
      })
    }
  },
  async joinAct() {
    const _ = this.db.command
    const joinText = this.data.joinText
    const _openId = userInfoStore.userData.openId
    switch (joinText) {
      case '下架活动':
        this.setData({
          dialogShow: true,
        })
        break
      case '取消参加':
        wx.showToast({
          title: '功能正在加紧完善中...',
          icon: 'none',
          duration: 2000,
        })
        break
      default:
        console.log(this.optionsId)
        const resActJoin = await this.db
          .collection('article')
          .where({
            _id: this.optionsId,
          })
          .update({
            data: {
              joinUser: _.push(_openId),
            },
          })
        const resAttendUser = await this.db
          .collection('user')
          .where({
            openId: _openId,
          })
          .update({
            data: {
              attend: _.push(this.optionsId),
            },
          })
        console.log(resActJoin, resAttendUser)
        break
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: `${this.data.activity.title}，活动就差你了`,
    }
  },
})
