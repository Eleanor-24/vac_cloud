// components/mainMain/mainMain.js
const app = getApp()

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
      rest:100,
      pro:0,
      studied:0
  },
  created(){
    
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showData(){
      // console.log("hhh")
      let that = this
      wx.cloud.callFunction({
        name:'main_data',
        complete:res=>{
          // console.log(res)
          let allVal= res.result.data.allVal
          let totalVal=res.result.data.totalVal
          let pro = totalVal/allVal*100
          // console.log(pro)
          that.setData({
            rest:allVal-totalVal,
            pro:pro,
            studied:totalVal

          })
        }
      })
    },
    jumpTo(){
      
      this.triggerEvent('jumpTo')
    }
    
    
  }
})
