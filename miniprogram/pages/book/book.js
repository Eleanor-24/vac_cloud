// pages/book/book.js
const app= getApp();
wx.cloud.init({
  env: 'vaccloud'
});
let array=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  
 
  delItem:function(e){
    // console.log(e.target.id);
    let that =this
    wx.cloud.callFunction({
      name:"remove_book",
      data:{
        _id:e.target.id
      },
      complete:res=>{
        // console.log(res)
        wx.showModal({
          content:"确定将这个单词从单词本移除吗？",
          success:res=>{
            if(res.confirm){
              that.onLoad()
            }
          }
        })
        
      }
    })
    
    // var that = this;
    // wx.showModal({
    //   title: '提示',
    //   content: '确定将这个单词移除？',
    //   success:function(res){
    //     if (res.confirm) {
    //       that.onRemove(that.data._id).then((res)=>{
    //         that.onLoad();
    //         console.log("删除成功")
    //       })
    //     } 
    //   }
    // })
    
    
  
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.cloud.callFunction({
      name:'book_data',
      complete:res=>{
        // console.log(res)
        array=res.result.showData
        console.log(array)
        that.setData({
          array:array
        })
      }
    })

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

  },
  /**
   * 导航标签选择1）
   */
  swichNav: function (e) {
    console.log(e);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
    
    
  },
  /**
  * 导航页面显示2）
  */
  swiperChange: function (e) {
    console.log(e);
    this.setData({
      currentTab: e.detail.current,
    })
  }
})