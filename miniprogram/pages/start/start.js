/*
 * @Author: jasonjcwu
 * @Date: 2021-04-15 21:53:39
 * @LastEditors: jasonjcwu
 * @LastEditTime: 2021-04-20 17:57:13
 * @Description:
 */
// miniprogram/pages/start/start.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.flag) {
      wx.switchTab({
        url: '../index/index',
      })
    } else {
      wx.navigateTo({ url: '/pages/startForm/startForm' })
    }
    this.setData({
      flag: !this.data.flag
    })
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
