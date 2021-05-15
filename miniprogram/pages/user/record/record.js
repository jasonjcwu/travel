/*
 * @Author: jasonjcwu
 * @Date: 2021-05-15 20:27:27
 * @LastEditors: jasonjcwu
 * @LastEditTime: 2021-05-15 22:06:12
 * @Description: 
 */
// miniprogram/pages/user/record/record.js
import { userInfoStore } from '../../../store/userinfo'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bare: false,
    actList: [],
  },
  pageSkip: 0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.db = wx.cloud.database()
    this.getActivity(options.type)
  },

  async getActivity(type) {
    const _ = this.db.command

    let whereArr = JSON.parse(userInfoStore.userData[type])

    const resActivity = await this.db
      .collection('article')
      .where({
          _id: _.in(whereArr),
      })
      .limit(10)
      .orderBy('_createTime', 'desc')
      .skip(this.pageSkip * 10)
      .field({
        title: true,
        date: true,
        selectTime: true,
        site: true,
      })
      .get()

    this.setData({
      actList: this.data.actList.concat(resActivity.data),
    })
    if (resActivity.data.length < 10) {
      this.setData({
        bare: true,
      })
    }
   return
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})