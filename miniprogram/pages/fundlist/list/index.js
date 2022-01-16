// miniprogram/pages/fundlist/list/index.js
import {
  Get
} from '../../../utils/request'
import {
  cloudFunction
} from '../../../utils/cloud'
import {
  calc
} from 'lonts'
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
    customerName: '',
    possessList: [],
    customerId: '',
    customerName: '',
    totalMoney: 0, // 账户总金额
    userTotalIncome: 0, // 账户总收益
    userDayIncome: 0, // 日总收益
    dayRate: 0, // 日收益率
    totalRate: 0, // 总收益率
    slideButtons: [{
      type: 'warn',
      text: '删除',
      extClass: 'wrap-side-view-btn',
      data: '_id'
      // src: 'weui-miniprogram/cell/icon_del.svg', // icon的路径
    }],
    triggered: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      customerId,
      customerName
    } = options
    this.setData({
      customerId,
      customerName
    })
    wx.setNavigationBarTitle({
      title: `${customerName}`
    })
    this.queryFundList(customerId)
  },
  // 下拉刷新
  onRefresh() {
    if (this._freshing) return
    this._freshing = true
    this.queryFundList(this.data.customerId)
  },
  binddragging: function(res) {
    console.log(res)
  },
  // 删除
  slideButtonTap(e) {
    wx.showModal({
      showCancel: true,
      title: '删除',
      content: '确定删除吗？',
      success: (res) => {
        if (res.confirm) {
          const id = e.currentTarget.dataset.id
          cloudFunction('deleteFund', {
            id
          }, res => {
            wx.showToast({
              title: '删除成功'
            })
            const {
              possessList
            } = this.data
            this.setData({
              possessList: possessList.filter(el => el._id !== id)
            })
          })
        }
      }
    })

  },
  // 获取自选列表
  queryFundList: function (customerId) {
    cloudFunction('getFundList', {
      customerId
    }, res => {
      if (res.result.data.length) {
        this.setData({
          possessList: res.result.data || []
        })
        const codeList = [...new Set((res.result.data || []).map(el => el.fundCode))]
        this.queryValForMyFund(codeList)
      } else {
        wx.showToast({
          title: '暂无持仓',
          duration: 2000,
          icon: 'none'
        })
      }
    })
  },
  // 获取自选基金的净值
  queryValForMyFund: async function (codeList = []) {
    const jsonStr = await Get('https://fund.eastmoney.com/Data/FundCompare_Interface.aspx', {
      bzdm: codeList.join(','),
      v: Date.now()
    })
    if (jsonStr) {
      this.calcFundVal(jsonStr)
      wx.showToast({
        title: '获取列表成功'
      })
    }
  },
  // 计算函数
  calcFundVal: function (jsonStr) {
    let str = jsonStr.replace('var fundinfo =', '').replace(';', '')
    let resData = JSON.parse(str)
    const fundObj = {}
    // 获取远程数据
    resData.forEach(el => {
      let item = el.split(',')
      fundObj[item[0]] = {
        _fundCode: item[0], // 基金代码
        _fundName: item[1], // 基金名称
        _fundEnName: item[2], // 首字母英文名称
        _fundType: item[3], // 基金类型 - 混合型
        _estimateValue: item[4], // 基金盘中估值
        _estimateIncrease: item[5], // 估值涨幅
        _lastValue: item[6], // 最新净值
        _lastDate: item[7], // 最新净值 日期 2012-01-21
        _lastIncrease: item[9], // 最新净值增长率
        _manager: item[12], // 基金经理
      }
    })
    let {
      possessList
    } = this.data
    let userTotalMoney = 0
    let userTotalIncome = 0
    let userInitMoney = 0
    let userDayIncome = 0
    let allCommision = 0 // 所有手续费
    const list = possessList.map(element => {
      const fullData = {
        ...element,
        ...fundObj[element.fundCode],
      }
      // 计算收益 =  (当日净值 - （当日净值 / (1+当日增长率) ）) * 份额
      const {
        _estimateValue,
        _lastValue,
        _estimateIncrease,
        _lastIncrease,
        share,
        rate,
        buyMoney
      } = fullData
      //  盘中收益
      let dayIncome = mul(sub(_estimateValue, div(_estimateValue, add(1, div(_estimateIncrease, 100)))), share, 2)
      // 昨日收益
      let lastDayIncome = mul(sub(_lastValue, div(_lastValue, add(1, div(_lastIncrease, 100)))), share, 2)
      // 基金总金额
      let totalMoney = mul(_lastValue, share, 2)
      // 持仓收益
      let totalIncome = sub(totalMoney, buyMoney, 2)
      // 持仓收益率
      let incomeIncrease = mul(div(totalIncome, buyMoney, 4), 100, 2)
      // 手续费
      let commission = sub(buyMoney, div(buyMoney, add(1, div(rate, 100)), 4), 4)
      // 账户总金额
      userTotalMoney = add(userTotalMoney, totalMoney, 2)
      // 账户总收益
      userTotalIncome = add(userTotalIncome, totalIncome, 4)
      // 日总收益
      userDayIncome = add(userDayIncome, lastDayIncome, 4)
      // 账户总成本
      userInitMoney = add(userInitMoney, buyMoney, 4)
      // 手续费
      allCommision = add(allCommision, commission, 4)
      return {
        dayIncome,
        lastDayIncome,
        ...fullData,
        totalIncome,
        totalMoney,
        incomeIncrease
      }
    })
    this.setData({
      possessList: list,
      userTotalMoney,
      userTotalIncome,
      userDayIncome,
      // 日收益率 = 日收益 / (总金额 - 日收益)
      dayRate: mul(div(userDayIncome, sub(userTotalMoney, userDayIncome, 4), 4), 100),
      // 总收益率 = 总收益 / 总本金
      totalRate: mul(div(userTotalIncome, userInitMoney, 4), 100, 2),
      triggered: false,
    })
    this._freshing = false
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.queryValForMyFund()
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