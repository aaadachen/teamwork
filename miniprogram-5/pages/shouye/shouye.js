var app = getApp();
Page({
  data:{
    //userInfo:null
    phone:null
  },
  onshow:function(){//每次到该页面都会调用
    //从本地获取值
    //var phone = wx.getStorageSync('phone');
    this.setData({
      phone:app.globalData.phone
    })
  }
})