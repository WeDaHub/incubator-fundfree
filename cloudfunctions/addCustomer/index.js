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
    name = '', account = '', id = '', public = false
  } = event
  const data = await db.collection('customer').add({
    data: {
      id,
      name,
      account,
      public,
      openid: wxContext.OPENID,
      creatDate: Date.now()
    }
  })
  return data
}