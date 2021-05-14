/*
 * @Author: jasonjcwu
 * @Date: 2021-05-12 16:40:01
 * @LastEditors: jasonjcwu
 * @LastEditTime: 2021-05-13 08:34:33
 * @Description:
 */
// miniprogram/pages/showAct/joinUser/JoinUser.js
import { userInfoStore } from '../../../store/userinfo'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    actUserList: [],
    isPublisher: false,
    isAttender: false,
    publisherPhone: '',
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.db = wx.cloud.database()
    this._ = this.db.command
    this.getActUser(options.id)
    this.setData({
      publisherPhone: options.phone
    })
  },
  async getActUser(id) {
    const { openId } = userInfoStore.userData
    let userListFiled = {
      nickName: true,
      avatarUrl: true,
      gender: true,
      _id: true,
    }

    const resActUserId = await this.db
      .collection('article')
      .doc(id)
      .field({ joinUser: true, _openid: true })
      .get()
    if (resActUserId?.data) {
      // 发布者权限
      if (resActUserId.data._openid === openId) {
        this.setData({
          isPublisher: true,
        })
        userListFiled.phone = true
      }
      // 参与者权限
      for (const attenderId of resActUserId.data.joinUser) {
        if (attenderId === userInfoStore.userData.openId) {
          this.setData({
            isAttender: true,
          })
          break
        }
      }
      console.log(userListFiled)
      const resActUserInfo = await this.db
        .collection('user')
        .where({
          openId: this._.in(resActUserId.data.joinUser),
        })
        .field(userListFiled)
        .get()
      console.log(resActUserId, resActUserInfo)
      if (resActUserInfo?.data) {
        this.setData({ actUserList: resActUserInfo.data,
          loading: false })
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
