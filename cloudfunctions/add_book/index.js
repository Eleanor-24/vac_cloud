// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid= wxContext.OPENID
  
  // let eResult=null;
  //查询单词是否已经存在
  let exist= await db.collection('book').where({
    _openid:openid,
    id:event.id
  }).get()
  let code=200;
  let result="收藏成功";
  if(exist.data.length==0){
    await db.collection('book').add({
      data:{
        _openid:openid,
        id:event.id,
        word:event.word,
        definition:event.definition
      }
    })
  }else{
      code=202;
      result="收藏失败";

  }
  return{
    code:code,
    result:result
  }

  
}