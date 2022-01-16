// miniprogram/pages/fundlist/list/index.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    customerId: null,
    customerList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      search: this.search.bind(this)
    })
    // this.setData({
    //   customerList: app.globalData.gustList || []
    // })
  },
  search: function (value) {
    return new Promise(async (resolve, reject) => {
      wx.cloud.callFunction({
        name: 'getCustomerList',
        data: {
          public: true
        },
        success: res => {
          resolve(res.result.data.map(el => ({text: `${el.name} - ${el.account}`, value: el.id, name: el.name})))

          // this.globalData.gustList = res.result.data || []
          // wx.showToast({
          //   title: '获取客户列表成功'
          // })
        },
        fail: err => {
          console.log(err)
        }
      })
      //  const customer =  (app.globalData.gustList|| []).filter(el => el.name.includes(value)) || []
      //     resolve(customer.map(el => ({text: `${el.name} - ${el.account}`, value: el.id, name: el.name})))
    })
  },
  selectResult: function (e) {
    this.setData({
      inputShowed: true,
      inputVal: e.detail.item.name
    })
    console.log(e.detail.item)
    const {
      value,
      name
    } = e.detail.item
    wx.navigateTo({
      url: `../list/index?customerName=${name}&customerId=${value}`,
    })
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