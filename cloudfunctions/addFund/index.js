// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
// 1. 获取数据库引用
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {
    fundCode = '',
    fundName = '',
    fundValue = '',
    customerId = '',
    share = '',
    buyMoney = '',
    fundManager = '',
    buyDate = '',
    rate = 0,
  } = event
  const res = await db.collection('fundList').add({
    data: {
      fundCode, // 基金代码
      fundName, // 基金名称
      fundValue, // 基金净值
      customerId, // 组合id
      share, // 份额
      buyMoney, // 购买金额
      fundManager, // 基金经理
      buyDate, //  购买日期
      rate, // 费率
      openid: wxContext.OPENID,
      creatDate: Date.now()
    }
  })
  return res
}