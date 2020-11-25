const pub = {  
  url: '',  
  api: {     },  
  Init: function(op) {    
    // console.log(op)    
    // console.log('进入请求函数')    
    // var _this = this    
    wx.request({      
      url: op.url + op.api,      
      data: op.data,      
      method: 'POST',      
      success(res) {        
        // console.log(res)        
        if (res.statusCode == '200') {          
          op.cb(res.data)        
        } else {          
          wx.showToast({            
            title: '重新请求数据',            
            icon: 'none',            
            duration: 1000          
          })        
        }      
      },      
      fail(res) {        
        wx.showToast({          
          title: '数据异常',          
          icon: 'none',          
          duration: 1000,        
        })      
      }    
    })  
  },
}
//获取当前日期
const formatDate = date =>{
  const year = date.getFullYear()
  const month = date.getMonth()+1
  const day = date.getDate()
  return [year,month,day].map(formatNumber).join('-')
}
const formatNumber = n=>{
  n = n.toString()
  return n[1]?n:'0'+n
}
module.exports = {
  formatDate:formatDate,
  pub: pub
}
