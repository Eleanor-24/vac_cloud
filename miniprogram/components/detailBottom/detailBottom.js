// components/detailBottom/detailBottom.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickNext:function(){
      this.triggerEvent("clickNext");
    },
    clickLast:function(){
      this.triggerEvent("clickLast")
    },
    clickAdd:function(){
     this.triggerEvent("clickAdd")
    }
  }
})
