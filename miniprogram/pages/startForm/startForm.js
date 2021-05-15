/*
 * @Author: jasonjcwu
 * @Date: 2021-04-20 17:06:28
 * @LastEditors: jasonjcwu
 * @LastEditTime: 2021-05-14 16:42:03
 * @Description:
 */
// miniprogram/pages/start_form/startForm.js

const key = '6KIBZ-6S5EU-UUCVJ-4MASL-DMLYO-QZBKA' //使用在腾讯位置服务申请的key
const referer = '撮合周边游' //调用插件的app的名称
const category = '美食,娱乐休闲,旅游景点'
const chooseLocation = requirePlugin('chooseLocation')
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { editorHtml, userInfoStore } from '../../store/userinfo'

Page({
  db: null,
  editorCtx: {},
  /**
   * 页面的初始数据
   */
  data: {
    // 联系方式
    contactWay: ['电话', '微信', 'QQ'],
    contactIndex: 0,
    // 时间
    timePickershow: false,
    selectTime: '12:00',
    haveTime: false,
    filter(type, options) {
      if (type === 'minute') {
        return options.filter((option) => option % 5 === 0)
      }
      return options
    },
    // 日历
    minDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    calendarShow: false,
    date: '',
    // 地点
    locationName: '',
    location: {},
    error: '',
    dialogShow: false,
    // 参加人数限制
    limitPeople: 0,
    // 发布到广场
    publishPlaza: true,
    // 参与者联系方式
    participatorContact: true,
    // 活动内容
    // isEditor: false,
    maxWords: 1500,
    currentWords: 0,
    actContent: '',
    actFormats: {}, // 样式
    // 提交表单内容
    formData: {
      activityTheme: '', // 活动主题
      contactValue: '', // 联系方式值
    },
    rules: [
      {
        name: 'activityTheme',
        rules: { required: true, message: '活动主题是必填项' },
      },
      {
        name: 'contactValue',
        rules: { required: true, message: '发布者联系方式必填项' },
      },
    ],
  },

  onLoad() {
    this.db = wx.cloud.database()
    this.storeBindings = createStoreBindings(this, {
      store: editorHtml,
      fields: ['actContentHtml'],
    })
    this.storeBindings = createStoreBindings(this, {
      store: userInfoStore,
      fields: { userInfo: 'userData', hasUserInfo: 'logged' },
    })
  },
  onReady() {},
  onShow() {
    // console.log(chooseLocation.getLocation())
    const location = chooseLocation.getLocation() || ''
    if (location) {
      this.setData({
        location: location,
        locationName: location.name,
      })
    }
    // console.log(location)
  },
  // themeValueChange() {
  //   this.setData({
  //     activityTheme:
  //   })
  // },
  // 选择联系方式
  bindContactChange(e) {
    this.setData({
      contactIndex: e.detail.value,
    })
  },

  // 时间选择
  showPopup() {
    this.setData({ timePickershow: true })
  },
  onTimePickerClose() {
    this.setData({ timePickershow: false })
  },
  onTimePickerInput(event) {
    console.log(event)
    this.setData({
      selectTime: event.detail,
      timePickershow: false,
      haveTime: true,
    })
  },

  // 日期选择：日历组件function
  onCalendarDisplay() {
    this.setData({ calendarShow: true })
  },
  onCalendarClose() {
    this.setData({ calendarShow: false })
  },
  // 日期确定
  onCalendarConfirm(event) {
    console.log(event.detail)
    const [start, end = ''] = event.detail
    const fstart = this.formatDate(start)
    const fend = this.formatDate(end)
    let dateShow
    if (fstart === fend) {
      dateShow = `${fstart}`
    } else {
      dateShow = `${fstart} - ${fend}`
    }
    this.setData({
      calendarShow: false,
      date: dateShow,
    })
  },
  formatDate(date) {
    if (!date) return ''
    date = new Date(date)
    return `${date.getMonth() + 1}.${date.getDate()}`
  },
  navToTencentMap() {
    let that = this
    wx.getLocation({
      type: 'wgs84',
      // 如果开启GPS用腾讯地图插件，功能更全，有三列智能推荐
      success(res) {
        let locationGPS = JSON.stringify({
          latitude: res.latitude || 22.5405026,
          longitude: res.longitude || 113.934528362,
        })
        // that.setData({
        //   location: locationGPS,
        // })
        wx.navigateTo({
          url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&location=${locationGPS}&category=${category}`,
        })
      },
      // 如果未开GPS用原生地图选点，提示更友好
      fail(err) {
        wx.chooseLocation({
          success: (res) => {
            console.log(res)
            that.setData({
              location: res,
              locationName: res.name,
            })
          },
        })
      },
    })
  },
  async getLocation(e) {
    let that = this
    try {
      let { authSetting } = await wx.getSetting()
      console.log(authSetting, 'await')
      if (authSetting['scope.userLocation']) {
        this.navToTencentMap()
      } else {
        console.log('授权')
        wx.authorize({
          scope: 'scope.userLocation',
          success() {
            that.navToTencentMap()
          },
          fail() {
            console.log('拒绝授权')
            that.setData({
              dialogShow: true,
            })
          },
        })
        // this.navToTencentMap()
      }
    } catch (err) {
      this.navToTencentMap()
    }
  },
  // 打开用户设置，位置权限
  openSetting(e) {
    let that = this
    this.setData({
      dialogShow: false,
    })
    if (e.detail.index !== 0) {
      wx.openSetting({
        success(res) {
          console.log(res.authSetting)
          if (!res.authSetting['scope.userLocation']) {
            that.setData({
              dialogShow: true,
            })
          }
        },
      })
    }
  },
  // 活动内容输入
  // 初始化编辑器
  // onEditorReady() {
  //   wx.createSelectorQuery().select('#editor').context(function(res) {
  //     this.editorCtx = res.context

  //     if (wx.getStorageSync("content")) { // 设置~历史值
  //       this.editorCtx.insertText(wx.getStorageSync("content")) // 注意：插入的是对象
  //     }

  //   }).exec()
  // },
  // onNoFocus(e){
  //   console.log(e,'失去焦点')
  //   this.editorCtx.getContents({
  //     success: function(res) {
  //       console.log(res.html,'html')
  //       wx.setStorageSync("content", res.html); // 缓存本地
  //       // < p > 备注说明：</p > <p>1、评分规则</p> <p>2、注意事项</p> <p>3、哈哈呵呵</p> <p><br></p><p><br></p>
  //     }
  //   })
  // },
  // 返回选区已设置的样式
  onStatusChange(e) {
    // console.log(e.detail)
    this.setData({
      actFormats: e.detail,
    })
  },

  // bindWordsInput(e) {
  //   let value = e.detail.value
  //   console.log(value)
  //   let len = parseInt(value.length)
  // },
  formInputChange(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value,
    })
  },
  submitActForm() {
    wx.showLoading({ title: '发布活动中', mask: true })

    let that = this
    this.selectComponent('#form').validate(async (valid, errors) => {
      console.log(valid, errors)
      if (valid) {
        await that.addActivity()
        wx.hideLoading()
        wx.showToast({
          title: '发布成功',
        })
      } else {
        wx.hideLoading()
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message,
          })
        }
      }
    })
  },
  async addActivity() {
    const Article = this.db.collection('article')
    const User = this.db.collection('user')

    const _ = this.db.command

    const { activityTheme, contactValue } = this.data.formData
    const {
      contactWay,
      contactIndex,
      date,
      selectTime,
      haveTime,
      location,
      limitPeople,
      publishPlaza,
      actContentHtml,
      participatorContact,
      userInfo,
    } = this.data
    const resArticle = await Article.add({
      data: {
        title: activityTheme,
        contact: `${contactWay[contactIndex]}:${contactValue}`,
        date: date,
        selectTime: haveTime ? selectTime : '',
        site: location,
        limit: limitPeople,
        publishPlaza: publishPlaza,
        actContent: actContentHtml,
        participatorContact: participatorContact,
        joinUser: [userInfo.openId],
        _createTime: Date.now(),
        _updateTime: Date.now()
      },
    })

    const resPublishUser = await User.where({
      openId: userInfo.openId,
    }).update({
      data: {
        attend: _.push(userInfo.openId),
        publish: _.push(userInfo.openId),  
        _updateTime: Date.now()
      }
    })
    console.log(resArticle, resPublishUser)
    if (resArticle?._id) {
      wx.navigateTo({
        url: `/pages/showAct/showAct?id=${resArticle?._id}`,
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  emptyWaring() {
    // 消除微信双向绑定告警
    return
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings()
  }
  // onUnload () {
  //   // 页面卸载时设置插件选点数据为null，防止再次进入页面，geLocation返回的是上次选点结果
  //       chooseLocation.setLocation(null);
  //   }
})
