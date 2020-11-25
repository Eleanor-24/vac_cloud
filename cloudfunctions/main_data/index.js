// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'vac-cloud-zjrdz'
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  // collection 上的 get 方法会返回一个 Promise，因此云函数会在数据库异步取完数据后返回结果
  const openid = cloud.getWXContext().OPENID
  //查询用户是否存在
  let searchUser = await db.collection('user').where({
    openid:openid
  }).get()
  
  if(searchUser.data.length==0){
   
     //添加用户到数据库
    await db.collection('user').add({
      data:{
        openid:openid,
        studied:[],

      }
    })
    
  }else{
    //查询用户的词汇量 
    let totalVal = await db.collection('user').where({
      openid:openid
    }).get()

    //查询单词总数
    let allVal = await db.collection('cet4').count()
    return {
      code: 200,
      msg: '数据请求成功',
      data: {
        totalVal:totalVal.data[0].studied.length,
        allVal:allVal.total,
        openid:openid
      }
    }
  }
   
  
    
  

  
 
  
  
}