// miniprogram/pages/public-combination/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  getPublicList: function() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: 'getCustomerList',
      data: {
        public: true
      },
      success: res => {
        const list = res.result.data.map(el => ({
          title: el.name,
          subTitle: el.account,
          icon: el.name.substring(0, 1),
          ...el
        }))
        this.setData({list})
        wx.showToast({
          title: '获取公开列表成功'
        })
      },
      fail: err => {
        wx.hideLoading({
          success: (res) => {},
        })
        console.log(err)
      }
    })
  }, 
  // 跳转
  handlerJump: function(e) {
    const {name, id} = e.detail.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/fundlist/list/index?customerName=${name}&customerId=${id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPublicList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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