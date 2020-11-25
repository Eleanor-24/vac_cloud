// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID;
  let code=200;
  let msg=null;
  let _id = event._id;
  try{
    await db.collection('book').doc(_id).remove()
    return{
      code:code,
      msg:"删除成功"
    }
  }catch(e){
    console.error(e)
  }
}