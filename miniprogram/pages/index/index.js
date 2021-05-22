/*
 * @Author: jasonjcwu
 * @Date: 2021-04-15 16:55:31
 * @LastEditors: jasonjcwu
 * @LastEditTime: 2021-05-18 09:57:38
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

  // 获取活动列表
  async getActivity(search = '',refresh = false) {
    const _ = this.db.command
    // 必须允许发布到广场的活动
    let whereArr = [
      {
        publishPlaza: true,
      },
    ]
    // 正则模糊搜索标题
    if (search) {
      whereArr = whereArr.concat([
        {
          title: this.db.RegExp({
            regexp: search,
          }),
        }
      ])
    }
    // 请求article集合，每次限制请求10条，field设置一些需要获取的字段，避免请求包过大
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
    // 如果response内容相同直接返回，避免重新渲染影响性能
    if(JSON.stringify(resActivity.data) === JSON.stringify(this.data.actList)) {
      return
    }
    // 如果是搜索或者是刷新则把渲染数组重新赋值，否则的话就是添加到列表末尾
    this.setData({
      actList: search || refresh ? resActivity.data : this.data.actList.concat(resActivity.data),
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
    await this.getActivity('',true)
    wx.stopPullDownRefresh()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
