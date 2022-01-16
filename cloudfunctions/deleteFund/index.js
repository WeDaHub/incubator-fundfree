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
  const {id} = event
  try {
    return await db.collection('fundList').where({
      _id: id,
      openid: wxContext.OPENID
    }).remove()
  } catch(e) {
    console.error(e)
  }
}