// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID;
  let code = 200;
  let msg="查询成功";
  let showData=await db.collection('book').where({
    _openid:openid
  }).get()
  return {
    showData:showData.data
  }
  // if(showData.data.length==0){
  //     return{
  //       code:202,
  //       msg:"查询失败"

  //     }
  // }else{
  //   return {
  //     code:200,
  //     msg:"查询成功",
  //     showData:showData.data

  //   }
  // }
 
}