// miniprogram/pages/customer.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    colorList: ['63b2ee', '76da91', 'f8cb7f', 'f89588', '7cd6cf', '9192ab', '7898e1', 'efa666', 'eddd86', '9987ce', '63b2ee', '76da91']
  },

  /**
   * 生命周期函数,-监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      list: app.globalData.gustList || []
    })
    // this.getList()
  },
  handlerJump: function(e) {
   const {name, id} = e.currentTarget.dataset.fund
    wx.navigateTo({
      url: `../../fundlist/list/index?customerName=${name}&customerId=${id}`,
    })
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

  },
  //   getList() {
  //     wx.cloud.callFunction({
  //       name: 'getCustomerList',
  //       complete: res => {
  //         this.setData({list: res.result.data || []})
  //         wx.showToast({
  //             title: '获取列表成功'
  //         })
  //     },
  //   })
  // }
})