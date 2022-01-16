export const cloudFunction = function (name = '', data = {}, cb, showLoading = true) {
  showLoading && wx.showLoading({
    title: '加载中...',
    mask: true
  })
  wx.cloud.callFunction({
    name,
    data,
  }).then(res => {
    showLoading && wx.hideLoading()
    cb(res)
  }).catch(e => {
    showLoading && wx.hideLoading()
    wx.showToast({
      title: `调用云函数${name}出错,${e.message}`,
      duration: 2000
    })
  })
}