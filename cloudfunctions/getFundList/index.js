// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
// 1. 获取数据库引用
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const {customerId } = event
  if (!customerId) return '用户不能为空'
  const wxContext = cloud.getWXContext()
  const data = db.collection('fundList').where({
    openid: wxContext.OPENID, // 填入当前用户 openid
    customerId
  }).get()
  return data
}