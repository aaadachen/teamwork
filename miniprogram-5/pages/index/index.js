// index.js

const { default: Atlas } = require("XrFrame/assets/Atlas");

// 获取应用实例
const app = getApp()

Page({
  data:{
    phone :'',
    inputcode:'',
    recode:'',
    mismatchTip: '', // 提示信息
  },
  onShow() {//每次回到这个页面信息自动清零
    this.setData({
      mismatchTip: '',
      phone :'',
      inputcode:'',
      recode:'',
    });
  },
  inputphone: function(e) {
    this.setData({
      phone: e.detail.value
    });
  },
  inputpassword: function(e) {
    this.setData({
      inputcode: e.detail.value
    });
  },
  reinput: function(e) {
    this.setData({
      recode: e.detail.value
    });
    this.comparePasswords();
  },
  comparePasswords() {
    const inputcode = this.data.inputcode;
    const recode = this.data.recode;
    if (inputcode !== recode) {
      this.setData({
        mismatchTip: '密码不一致',
      });
    } else {
      this.setData({
        mismatchTip: '',
      });
    }
  },
  login:function(){
    console.log(this.data.phone,this.data.inputcode);
    //将手机号和密码发送给后端
    wx.request({
      url: 'url',
      data: {
        phone:this.data.phone,
        code:this.data.inputcode,
      },
      method: "POST",
      success: function(res) {
        if(res.data.status){
          //初始化用户信息
          //app.initUserInfo(res.data.data);

          //登录成功，跳转页面
          //处理登录状态
          //讲手机号放到所有页面公用的位置
          //1.调用公用的alobalData
          app.globalData.phone=res.data.data.phone;
          //2.在本地'cookie"中赋值，方便保存登录信息，不需要每次进入都登录
          wx.setStorageSync('phone', res.data.data.phone);
          wx.navigateTo({
            url: 'url',//要跳转的页面
          })
        }
        else{
          wx.showToast({
            title: '登录失败',
            icon:'none'
          })
        }
      },
    })
  }
})
