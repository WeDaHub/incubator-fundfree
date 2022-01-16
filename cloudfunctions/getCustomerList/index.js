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
    public = false
  } = event
  const query = {
    openid: wxContext.OPENID,
  }
  if (public) {
    query.public = public
  }
  const data = db.collection('customer').where(query).get()
  return data
}