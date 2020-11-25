// pages/test/test.js
const db = wx.cloud.database();
const cet4 = db.collection('cet4');
const studied = db.collection('studied');
const wrong = db.collection('wrong');
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      color1:'#e0e0e0',
      color2:'#e0e0e0',
      color3:'#e0e0e0',
      color4:'#e0e0e0'
  },
//查找已学|错词|cet4表
  search:function(openid,collection){
    return new Promise(function(resolve,reject){
      if(collection==studied){
          collection.where({
            _openid:openid
          }).get({
            success:function(res){
              var result = res.data;
              resolve(result)
            }
          })
      }
      if(collection==cet4){
        collection.get({
          success:res=>{
              var result = res.data;
              resolve(result)
          }
        })
      }
      if(collection==wrong){
        collection.where({
          openid:openid
        }).get({
          success:res=>{
            var result = res.data;
            resolve(result)
        }
        })
      }
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
      var collection;
      // console.log(app.globalData._options)

      if(app.globalData._options=='strengthen'){
        collection=studied;
      }
      if(app.globalData._options=='random'){
        collection=cet4
      }
      if(app.globalData._options=='wrong'){
        collection=wrong
      }
      
      this.search(app.globalData.openid,collection).then((result)=>{
        // console.log(result)
          var that = this;
          // console.log(result);
          // 将所有单词和意思分别存放到数组
          var arrEnMean=[
            {'word':'','definition':''}
          ];
          console.log(arrEnMean)
          var arrMean=[];
          for(var i=0;i<result.length;i++){
            arrEnMean[i].word = result[i].word
            arrEnMean[i].definition = result[i].definition
            arrMean[i] = result[i].definition
            // arrEnMean.push({'word':result[i].word,'definition':result[i].definition})
            // arrMean.push(result[i].definition)
            arrEnMean.push(arrEnMean[i])
            arrMean.push(arrMean[i])
          }
          console.log(arrEnMean)
          console.log(arrMean)
          //产生随机单词
          var length = arrEnMean.length;//
          var index=parseInt(Math.random()*(length-1));
          // console.log(app.globalData.indexs)
          var indexs = app.globalData.indexs
          //避免index重复
          while(indexs.includes(index)){
            index = parseInt(Math.random()*(length-1))
            console.log(index)
          }
          app.globalData.indexs.push(index)
          
          that.setData({
            word:arrEnMean[index].word
          })
         /**
          * 产生4个选项
          * 1.查找单词的正确意思,放入数组
          * 2.单词正确意思的前一个意思和后两个意思为其他选项，注意首尾，放入数组
          * 3.将4个选项打乱顺序放到4个容器中
          */
         
         // 单词正确意思的前一个意思和后两个意思为其他选项，放入数组
         var choices=[];
         if(index==0){
           choices.push(arrMean[length-1],arrMean[index],arrMean[index+1],arrMean[index+2]);
         }
         else if(index==length-3){
           choices.push(arrMean[index-1],arrMean[index],arrMean[index+1],arrMean[0]);
         }
         else if(index==length-2){
           choices.push(arrMean[index-1],arrMean[index],arrMean[0],arrMean[1]);
         }
         else{
           choices.push(arrMean[index-1],arrMean[index],arrMean[index+1],arrMean[index+2]);
         }
         
         var len = choices.length;
        //打乱choices数组
        for(var i=0;i<choices.length;i++){
          var key = parseInt(Math.random()*(len-1));
          var temp = choices[key];
          choices[key]= choices[len-i-1];
          choices[len-i-1]=temp;         
        }
        // console.log(choices)
        that.setData({
          definition1:choices[0],
          definition2:choices[1],
          definition3:choices[2],
          definition4:choices[3],
          trueMean:arrMean[index]
        })
       

      })
  },
  nextHandler:function(){
    var that = this;
    that.onLoad(app.globalData._options);
    that.setData({
      color1:'#e0e0e0',
      color2:'#e0e0e0',
      color3:'#e0e0e0',
      color4:'#e0e0e0',
    })
  },
  //判断正误
  Judge:function(index){
    console.log(index)
    var definitions = [this.data.definition1,this.data.definition2,this.data.definition3,this.data.definition4];
    var color=['#e0e0e0','#e0e0e0','#e0e0e0','#e0e0e0'];
    //选择正确
    if(definitions[index]==this.data.trueMean){
      color[index]='#00C274'
    }else{
      //选择错误
      color[index]='#E33E33';
      //显示正确的
      for(var i=0;i<definitions.length;i++){
        if(definitions[i]==this.data.trueMean){
          color[i]='#00c274'
        }
      }
    }
    return color
  },
  choiceClick:function(e){
    var index;
    // console.log(e.target.id)
    if(e.target.id=='choice1')
      index=0;
    if(e.target.id=='choice2')
      index=1;
      if(e.target.id=='choice3')
      index=2;
    if(e.target.id=='choice4')
      index=3;
    
    var color = this.Judge(index);
    // console.log(color)
    this.setData({
      color1:color[0],
      color2:color[1],
      color3:color[2],
      color4:color[3]
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

  }
})