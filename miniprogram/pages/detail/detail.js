// pages/detail/detail.js

// import { promises } from "dns";

// import { promises } from "fs";

  //初始化
  wx.cloud.init({
    env: 'vaccloud'
})
// const db = wx.cloud.database();
// const cet4 = db.collection('cet4');
// const studied = db.collection('studied');
// const book = db.collection('book');
const app = getApp();
let index = 0;
let sLength=0;
let vacs = null;
let studied = null;
wx.cloud.callFunction({
  name:'detail_data',
  complete:res=>{
    vacs = res.result.data.vacs;
    index = res.result.data.sLength-1;
    studied = res.result.data.studied;
    sLength = res.result.data.sLength;
 
  }
})


Page({

  /**
   * 页面的初始数据
   */
  data: {
      btnShow:true,
      
      
  },
 

  clickNext:function(){
    //边界
    index++;
    
    if(index>19){
        this.clickNext=null;
        wx.showToast({
          title: '今日学习单词量已达到上限！',
          icon:'none',
          duration:1500,
          
        })
    }else{
      this.onLoad();
    }
   
    
  },
  clickLast:function(){
    index--;
    if(index<0){
      this.clickLast = null;
      wx.showToast({
        title: '这是第一个单词！',
        icon:'none',
        duration:1500,
        
      })
    }else{
      this.onLoad();
    }
    
  },
  clickAdd:function(){
    wx.cloud.callFunction({
      name:"add_book",
      data:{
        id:vacs[index]._id,
        definition:vacs[index].definition,
        word:vacs[index].word

      }
    }).then(res=>{
      console.log(res)
      if(res.result.code==202){
        wx.showToast({
          title: '您已收藏过该单词！',
          icon:'none',
          duration:1500
        })
      }else{
        wx.showToast({
          title: '收藏成功',
          icon:'success',
          duration:1500
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
       console.log(index)
        console.log(vacs);
        this.setData({
        word:vacs[index].word,
        definition:vacs[index].definition,
        pronun:vacs[index].symbol,
        sentence1:vacs[index].sentece1,
        sentence2:vacs[index].sentece2,
        mean1:vacs[index].mean1,
        mean2:vacs[index].mean2,
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
    // this.searchDetail();
      
      

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
    //将学习的单词加入user表中的studied
   console.log(index)
    let nStudied=null;
    // console.log(sLength)
    if(sLength-1<index){
       for(let i=sLength-1;i<index;i++){
         studied.push(vacs[i+1]._id);
       }
       nStudied = studied
      //  console.log(nStudied)
      wx.cloud.callFunction({
        name:'update_studied',
        data:{
          studied:nStudied
        }
      }).then((res)=>{
        console.log(res)
        sLength = nStudied.length;
        // index=nStudied.length-1;
       
      })
    }
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