// components/detailCard/detailCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      word:String,
      pronun:String,
      definition:String
  },

  /**
   * 组件的初始数据
   */
  data: {
      
  },
  attached(){
    
    
    

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //发音
    clickIcon(){
      
      const innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.autoplay = true
      innerAudioContext.src = 'http://dict.youdao.com/dictvoice?audio='+this.properties.word
      innerAudioContext.onPlay(() => {})
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
    })
    }
  }
})
