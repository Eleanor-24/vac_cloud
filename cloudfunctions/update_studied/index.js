// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let openid=wxContext.OPENID
  //获取索引
  let courtID=await db.collection('user').where({
    openid:openid
  }).get()
  courtID = courtID.data[0]._id
  //更新数据库
  await  db.collection('user').doc(courtID).update({
    data:{
      studied:event.studied
    }
   })
   return {
    code:200,
    msg:"添加成功",

  }
}