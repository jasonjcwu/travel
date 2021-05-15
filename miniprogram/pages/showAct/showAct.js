/*
 * @Author: jasonjcwu
 * @Date: 2021-05-05 13:21:12
 * @LastEditors: jasonjcwu
 * @LastEditTime: 2021-05-14 16:42:43
 * @Description:
 */
// miniprogram/pages/showAct/showAct.js
import { userInfoStore } from '../../store/userinfo'
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { saveUserInfo } from '../../utils/getLogin'

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
    optionsId: '',
    loading: true,
    phonePop: false,
    phoneValue: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.db = wx.cloud.database()
    this.setData({
      optionsId: options.id,
    })
    this.storeBindings = createStoreBindings(this, {
      store: userInfoStore,
      fields: { userInfo: 'userData', hasUserInfo: 'logged' },
      actions: ['updateUser'],
    })
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
        openId: _.in(resActivity.data[0].joinUser),
      })
      .field({
        avatarUrl: true,
      })
      .limit(2)
      .get()
    wx.hideLoading()
    this.setData({
      loading: false,
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
    let { openId, star, attend } = this.data.userInfo
    star = Array.isArray(JSON.parse(star)) ? JSON.parse(star) : star
    attend = Array.isArray(JSON.parse(attend)) ? JSON.parse(attend) : attend
    const actOpenid = this.data.activity._openid
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

  // 点击收藏
  async startAct() {
    if (!this.data.hasUserInfo) {
      return this.getUserProfile()
    }

    const _ = this.db.command
    const { optionsId, isStart } = this.data
    let { star } = this.data.userInfo
    star = Array.isArray(JSON.parse(star)) ? JSON.parse(star) : []
    wx.showLoading({
      title: isStart ? '取消收藏中...' : '收藏中...',
    })
    const resStared = await this.db
      .collection('user')
      .where({
        openId: userInfoStore.userData.openId,
      })
      .update({
        data: {
          star: isStart ? _.pull(optionsId) : _.push(optionsId),
        },
      })
    wx.hideLoading()
    if (resStared?.stats?.updated > 0) {
      wx.showToast({
        title: isStart ? '取消成功' : '收藏成功',
      })
      console.log(isStart, star, optionsId)
      isStart ? star.pop() : star.push(optionsId)
      console.log(star)
      this.updateUser({ star: star })
      this.setData({
        isStart: !isStart,
      })
    }
  },

  // 下架活动
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

  // 保存联系方式
  async userPhoneSubmit(e) {
    this.setData({
      phonePop: false,
    })
    if (e.detail.index === 0) {
      return this.setData({
        phoneValue: '',
      })
    }
    if (e.detail.index === 1) {
      if (!this.data.phoneValue) {
        return wx.showToast({
          title: '不能为空',
          icon: 'error',
        })
      }
      wx.showLoading({
        title: '保存中...',
      })
      const resAddPhone = await this.db
        .collection('user')
        .where({
          openId: this.data.userInfo.openId,
        })
        .update({
          data: {
            phone: this.data.phoneValue,
            _updateTime: Date.now()
          },
        })
      wx.hideLoading()
      if (resAddPhone.stats.updated > 0) {
        wx.showToast({
          title: '保存号码成功',
        })
        this.updateUser({ phone: this.data.phoneValue })
        this.joinAct(true)
      }
    }
  },

  // 参加活动
  async joinAct(savePhone = false) {
    console.log(this.data.hasUserInfo, this.data.userInfo)
    if (!this.data.hasUserInfo && !savePhone) {
      return this.getUserProfile()
    }
    if (!this.data.userInfo.phone) {
      return this.setData({
        phonePop: true,
      })
    }
    const _ = this.db.command
    const joinText = this.data.joinText
    const optionsId = this.data.optionsId
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
        wx.showLoading({
          title: '参加活动中...',
        })
        const resActJoin = await this.db
          .collection('article')
          .where({
            _id: optionsId,
          })
          .update({
            data: {
              joinUser: _.push(_openId),
              _updateTime: Date.now()
            },
          })
        const resAttendUser = await this.db
          .collection('user')
          .where({
            openId: _openId,
          })
          .update({
            data: {
              attend: _.push(optionsId),
              _updateTime: Date.now()

            },
          })
        wx.hideLoading()
        console.log(resActJoin, resAttendUser)
        if (resActJoin.stats.updated > 0 && resAttendUser.stats.updated > 0) {
          wx.showToast({
            title: '已加入活动',
          })
        }
        break
    }
  },

  // 用户登录
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: async (res) => {
        const resSave = await saveUserInfo(res.userInfo)
        this.storeBindings.updateStoreBindings()
      },
    })
  },

  phonePopClose() {
    this.setData({
      phonePop: false,
    })
  },

  // 打开地图
  openMap(e) {
    wx.openLocation({
      latitude: e.detail.latitude,
      longitude: e.detail.longitude,
      name: this.data.activity.site.name,
      address: this.data.activity.site.address,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: `${this.data.activity.title}，活动就差你了`,
    }
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings()
  },
})
