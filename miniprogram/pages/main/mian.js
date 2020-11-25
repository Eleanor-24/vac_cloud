// pages/main/mian.js
const app = getApp();
wx.cloud.init({
  env: 'vaccloud'
})
const db = wx.cloud.database();
const cet4 = db.collection('cet4');

Page({
  data: {
    mainHide:true,
    btnHide:true,
    
    studied:0,
    rest:0,
    allStudied:0,
    pro:0,
    todayRest:20,
    clock:0,
    res_day:0
  },
 
  jumpTo(){
    if(app.globalData.status==true){
      wx.navigateTo({
        url: '../detail/detail',
      })
    }else{
      wx.showToast({
        title: '请先登录',
        icon:'none',
        duration:1500
      })
    }
  },
 

  turnToCal:function(){
    if(app.globalData.status==true){
      wx.navigateTo({
        url: '../calendar/calendar',
      })
    }else{
      wx.showToast({
        title: '请先登录',
        icon:'none',
        duration:2000
      })
    }
      
  },
  watch:{
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //监听gloablData.status的变化
    let that = this
   getApp().watch(that.watchBack)
    


},
watchBack:function(status){
  // console.log(status)
  if(status==true){
    this.selectComponent('#mainData').showData()
    this.selectComponent('#mainTop').getTotalVal()
  }
},
    
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})