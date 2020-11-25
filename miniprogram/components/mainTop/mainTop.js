// components/mainTop/mainTop.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    avatarUrl:'../../images/peiqi.jpeg',
    nickname:'',
    totalVal:0


    
  },
  

  /**
   * 组件的方法列表
   */
  methods:{
    
    bindGetUserInfo(){
     
     
     this.getUserInfo();
     
 
     //查询用户是否存在

     this.getTotalVal()
     
   
    
      // this.triggerEvent('bindGetUserInfo')
    },
    //获取词汇量
  getTotalVal(){
    let that = this
    
    wx.cloud.callFunction({
      name:'main_data',
      
      complete:res=>{
        // console.log(res)
        const app = getApp()
        app.globalData.openid=res.result.data.openid
        app.globalData.status=true
        that.setData({
          totalVal:res.result.data.totalVal
        })
        
        
      }
    })
  },
  
 
     //获取头像昵称
     getUserInfo(){
      let that = this
      wx.getUserInfo({
        success: (res) => {
         //  console.log(res)
         that.setData({
           avatarUrl:res.userInfo.avatarUrl,
           nickname:res.userInfo.nickName,
         })
        },
      })
    }
  },
  
   
  
    
  
  
})

