/*
 * @Author: jasonjcwu
 * @Date: 2021-04-15 16:55:31
 * @LastEditors: jasonjcwu
 * @LastEditTime: 2021-05-15 17:19:51
 * @Description:
 */
// miniprogram/pages/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { title: '最新发布' },
      { title: '精选推荐' },
      { title: '附近活动' },
      { title: '收藏最多' },
    ],
    activeTab: 0,
    actList: [],
    bare: false,
    searchValue: '',
    showSearch: false,
  },
  pageSkip: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.db = wx.cloud.database()
    this.getActivity()
  },

  // 点击tab
  onTabClick(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index,
    })
  },

  // 取消搜索
  onCancel() {
    this.setData({
      searchValue: '',
    })
    this.getActivity()
  },
  // 搜索
  onSearch(e) {
    console.log(e)
    this.pageSkip = 0
    this.getActivity(e.detail)
  },
  async getActivity(search = '') {
    const _ = this.db.command
    let whereArr = [
      {
        publishPlaza: true,
      },
    ]
    if (search) {
      whereArr = whereArr.concat([
        {
          title: this.db.RegExp({
            regexp: search,
          }),
        }
      ])
    }
    const resActivity = await this.db
      .collection('article')
      .where(_.and(whereArr))
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
    if(JSON.stringify(resActivity.data) === JSON.stringify(this.data.actList)) {
      return
    }
    this.setData({
      actList: search ? resActivity.data : this.data.actList.concat(resActivity.data),
      // mpLoadingShow: false,
    })
    if (resActivity.data.length < 10) {
      this.setData({
        bare: true,
      })
    }
   return
  },
  // 页面触底时执行
  onReachBottom: function (e) {
    if (this.data.bare) {
      return wx.showToast({
        title: '已经到底了...',
        icon: 'none',
      })
    }
    this.pageSkip++
    //在调一次方法
    // this.setData({
    //   mpLoadingShow: true,
    // })
    this.getActivity()
  },

  navToShowAct(e) {
    if (e.currentTarget.dataset?.id) {
      wx.navigateTo({
        url: `/pages/showAct/showAct?id=${e.currentTarget.dataset.id}`,
      })
    }
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  async onPullDownRefresh() {
    await this.getActivity()
    wx.stopPullDownRefresh()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
