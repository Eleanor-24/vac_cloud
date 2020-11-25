// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'vac-cloud-zjrdz'
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let openid=wxContext.OPENID
  //查询用户背了几个单词
  let user = await db.collection('user').where({
    openid:openid
  }).get()
  let sLength = user.data[0].studied.length
  let studied = user.data[0].studied
  //查询单词表
  let vacs = await db.collection('cet4').where({
   
  })
  .limit(20) //背20个单词
  .get()
  

 
  
  return {
    code:200,
    msg:"请求成功",
    data:{
      sLength:sLength,
      vacs:vacs.data,
      studied:studied

 
    }
  }
}