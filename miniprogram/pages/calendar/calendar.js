// pages/calendar/calendar.js
wx.cloud.init({
  env: 'vaccloud'
})
const db = wx.cloud.database();
const sign = db.collection('sign');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    objectId:'',
    days:[],
    signUp:[],
    cur_year:0,
    cur_month:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取当前年月  
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const day = date.getDate();
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    //查询当天签到情况
    this.searchData(app.globalData.openid,cur_year,cur_month,day).then((result)=>{
      // console.log(result)
      var that = this;
      if(result==false){
        //签到
        that.onJudgeSign();
         //签到信息加入数据库
        that.addData(cur_year,cur_month,day,app.globalData.openid);
        
      }
    })
   
    // 显示用户所有签到情况
    this.searchSign(app.globalData.openid).then((res)=>{
    
      if(res){
        var that = this;
        var daysArr = that.data.days;
        for(var i=0;i<res.length;i++){
          for(var j=0;j<daysArr.length;j++){
            if((daysArr[j].date==res[i].day)&&(cur_month==res[i].month)&&(cur_year==res[i].year))
              daysArr[j].isSign=true;
          }
        }
        that.setData({days:daysArr});
      }
      
      
    })
    
    
   
    this.setData({
      cur_year,
      cur_month,
      weeks_ch
    })
    
  },
  //查询该用户所有签到信息
  searchSign(openid){
  return new Promise(function(resolve,reject){
    sign.where({
      openid:openid
    }).get({
      success:(res)=>{
        resolve(res.data)
      }
    })
  })
    
  },
  //查询当日签到情况
  searchData(openid,year,month,day){
    return new Promise(function(resolve,reject){
      sign.where({
        openid:openid,
        year:year,
        month:month,
        day:day
      }).get({
        success:(res)=>{
          if(res.data[0]){
            var result=true;
            resolve(result);
          }else{
            var result=false;
            resolve(result);
          }
        }
      })
    })

  },
  //签到信息加入数据库
  addData:function(year,month,day,openid){
    return new Promise(function(resolve,reject){
      sign.add({
        data:{
          openid:openid,
          year:year,
          month:month,
          day:day

        }
      }).then({
        success:function(res){
          console.log("添加成功")
        }
      })
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
   // 获取当月共多少天
   getThisMonthDays:function(year, month){
    return new Date(year, month, 0).getDate()
},
  
// 获取当月第一天星期几
getFirstDayOfWeek:function(year, month) {
  return new Date(Date.UTC(year, month - 1, 1)).getDay();
},
// 计算当月1号前空了几个格子，把它填充在days数组的前面
calculateEmptyGrids:function(year, month) {
  var that = this;
  //计算每个月时要清零
  that.setData({days:[]});
  const firstDayOfWeek = this.getFirstDayOfWeek(year, month);    
  if (firstDayOfWeek > 0) {
    for (let i = 0; i < firstDayOfWeek; i++) {
      var obj  = {
        date:null,
        isSign:false
      }
      that.data.days.push(obj);
    }
    this.setData({
      days:that.data.days
    });
    //清空
  } else {
    this.setData({
      days: []
    });
  }
},
 // 绘制当月天数占的格子，并把它放到days数组中
 calculateDays:function(year, month) {
  var that = this;
  const thisMonthDays = this.getThisMonthDays(year, month);
  for (let i = 1; i <= thisMonthDays; i++) {
    var obj = {
      date: i,
      isSign: false
    }
    that.data.days.push(obj);
  }
  this.setData({
    days:that.data.days
  });
},
// 切换控制年月，上一个月，下一个月
handleCalendar:function(e) {
  const handle = e.currentTarget.dataset.handle;
  const cur_year = this.data.cur_year;
  const cur_month = this.data.cur_month;
  
  if (handle === 'prev') {
    let newMonth = cur_month - 1;
    let newYear = cur_year;
    if (newMonth < 1) {
      newYear = cur_year - 1;
      newMonth = 12;
    }
     // 显示用户所有签到情况
   this.searchSign(app.globalData.openid).then((res)=>{
    // console.log(res)
    if(res){
      var that = this;
      var daysArr = that.data.days;
      for(var i=0;i<res.length;i++){
        for(var j=0;j<daysArr.length;j++){
          if((daysArr[j].date==res[i].day)&&(newMonth==res[i].month)&&(newYear==res[i].year))
            daysArr[j].isSign=true;
        }
      }
      that.setData({days:daysArr});
    }
  })
    this.calculateEmptyGrids(newYear, newMonth);
    this.calculateDays(newYear, newMonth);
    this.setData({
      cur_year: newYear,
      cur_month: newMonth
    })
    
  } else {
    let newMonth = cur_month + 1;
    let newYear = cur_year;
    if (newMonth > 12) {
      newYear = cur_year + 1;
      newMonth = 1;
    }
     // 显示用户所有签到情况
   this.searchSign(app.globalData.openid).then((res)=>{
    // console.log(res)
    if(res){
      var that = this;
      var daysArr = that.data.days;
      for(var i=0;i<res.length;i++){
        for(var j=0;j<daysArr.length;j++){
          if((daysArr[j].date==res[i].day)&&(newMonth==res[i].month)&&(newYear==res[i].year))
            daysArr[j].isSign=true;
        }
      }
      that.setData({days:daysArr});
    }
    
    
  })
    this.calculateEmptyGrids(newYear, newMonth);
    this.calculateDays(newYear, newMonth);
     
    this.setData({
      cur_year: newYear,
      cur_month: newMonth
    })
    

  }
},
 //签到
 onJudgeSign:function(){
  var that = this;
  var daysArr = that.data.days;
  // console.log(daysArr);
  const date = new Date();
  const day = date.getDate();
  for(var i=0;i<daysArr.length;i++){
    if(daysArr[i].date==day)
      daysArr[i].isSign=true;
  }
  that.setData({days:daysArr});
},
})