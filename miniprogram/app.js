//app.js
App({
  globalData: {},
  onLaunch: function () {
       // 查看是否授权
       const _this = this
       wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: (res) =>  {
                _this.globalData.userInfo = res.userInfo
              }
            })
          } else {
            wx.redirectTo({
              url: '/pages/login/index',
            })
          }
        }
      })
      if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力')
      } else {
        wx.cloud.init({
          // env 参数说明：
          //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
          //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
          //   如不填则使用默认环境（第一个创建的环境）
          env: 'release-3g7nvapt8741ebb5',
          traceUser: true,
        })
      }
    this.getList()
  },

  // 获取客户列表
  getList() {
    wx.cloud.callFunction({
      name: 'getCustomerList',
      success: res => {
        this.globalData.gustList = res.result.data || []
        // wx.showToast({
        //   title: '获取客户列表成功'
        // })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
})