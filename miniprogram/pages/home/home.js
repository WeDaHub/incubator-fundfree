// miniprogram/pages/home.js
import {version} from '../../utils/version'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    version,
  },
  handlerNavigate(e) {
    console.log(e.currentTarget.dataset)
    const {
      navigate = ''
    } = e.currentTarget.dataset
    switch (navigate) {
      case 'customList':
        wx.navigateTo({
          url: '../customer/list/customer'
        })
        break
      case 'fundList':
        wx.navigateTo({
          url: '/pages/public-combination/index'
        })
        break
      case 'addCustomer':
        wx.navigateTo({
          url: '../customer/add/index'
        })
        break
      case 'addFund':
        wx.navigateTo({
          url: '../fundlist/add/index'
        })
        break
      case 'interest':
        wx.navigateTo({
          url: '../interest/index'
        })
        break
      case 'communication':
        wx.navigateTo({
          url: '../communication/index'
        })
        break
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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