// miniprogram/pages/fundlist/add/index.js

const app = getApp();
import {jsonp} from '../../../utils/request'
import {calc, fmtDate} from 'lonts'
const {
  add,
  sub,
  mul,
  div
} = calc
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [], // 组合列表
    accountIndex: null,
    formData: {
      fundCode: "",
      fundName: '',
      fundValue: '',
      buyMoney: '',
      rate: '',
      fundManager: '',
      buyDate: fmtDate(new Date(), 'yyyy-MM-dd')
    },
    rules: [{
      name: 'fundCode',
      rules: {
        required: true,
        message: '请输入基金代码'
      }
    }, {
      name: 'fundName',
      rules: {
        required: true,
        message: '请输入基金名称'
      }
    }, {
      name: 'fundValue',
      rules: {
        required: true,
        message: '请输入基金净值'
      }
    }, {
      name: 'buyMoney',
      rules: {
        required: true,
        message: '请输入购买金额'
      }
    }, {
      name: 'rate',
      rules: {
        required: true,
        message: '请输入手续费'
      }
    }]
  },
  // 表单绑定
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      formData: {
        ...this.data.formData,
        [field]: e.detail.value
      }
    })
  },
  // 查询基金净值
  formFundCodeChange: function (e) {
    const fundCode = e.detail.value
    if (!fundCode || fundCode.length < 6) return
    this.setData({
      formData: {
        ...this.data.formData,
        fundCode
      }
    })
    wx.showLoading({
      title: '加载中...'
    })
    jsonp('https://fundsuggest.eastmoney.com/FundSearch/api/FundSearchAPI.ashx', {
      callback: `jQuery_${fundCode}_${Date.now()}`,
      m: 1,
      key: fundCode,
      _: Date.now(),
    }).then(data => {
      wx.hideLoading()
      const resData = data.Datas[0].FundBaseInfo
      this.setData({
        formData: {
          ...this.data.formData,
          fundName: resData.SHORTNAME,
          fundValue: resData.DWJZ,
          fundManager: resData.JJJL,
        }
      })
    }).catch(e => {
      wx.hideLoading()
    })
  },
  // 提交保存
  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
      if (this.data.accountIndex === null) {
        return this.setData({
          error: "请选择组合"
        })
      }
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
        return
      }

      const {
        list,
        accountIndex,
        formData: {
          buyMoney,
          rate,
          fundValue
        }
      } = this.data
      // 计算份额
      console.log("开始调用fundList云函数0", buyMoney)
      const share = div(div(buyMoney, add(1, div(rate, 100))), fundValue, 2)
      console.log("开始调用fundList云函数1", share)
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      try {
        wx.cloud.callFunction({
          name: 'addFund',
          data: {
            ...this.data.formData,
            share: share,
            customerId: list[accountIndex].id
          },
          // 成功回调
          complete: function (e) {
            wx.hideLoading()
            if (e.errMsg === 'cloud.callFunction:ok') {
              wx.showToast({
                title: '添加成功',
                duration: 1500,
                mask: true
              })
              setTimeout(() => {
                wx.navigateBack({
                  delta: 0,
                })
              }, 1600);
            }
            console.log(e)
          },
        })
      } catch (e) {
        wx.hideLoading()
        console.log(e)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      list: app.globalData.gustList || []
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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

  bindAccountChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndex: e.detail.value
    })
  },
})