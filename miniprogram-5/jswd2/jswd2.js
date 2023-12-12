// pages/jssy/jssy.js
const app=getApp()
Page({
    data: {
        classname:[],
        naturalclass:[],
        cid:[],//存储课程id
        admission_year:[]//存储年份  eg.2021
    },
    //页面一开始就要发送请求
    onLoad:function() {
      //先把所有数据清零
      this.setData({
        classname:[],
        building:[],
        classroom:[],
        classdate:[],
        classtime:[],
        cid:[],//存储课程id
      })
      var that = this;

wx.request({
  url: 'http://127.0.0.1:5000',
  data: {
    user_id: app.globalData.rid
  },
  method: "GET",
  success: function (res) {
    // 在这里使用保存的页面对象引用
    console.log(res.data)
    console.log(res)
    for (var i = 0; i < res.data.gradeData.length; i++) {
      that.setData({
        cid: that.data.cid.concat(res.data.gradeData[i].id),
        naturalclass: that.data.naturalclass.concat(res.data.gradeData[i].name),
        admission_year:that.data.admission_year.concat(res.data.gradeData[i].admission_year)
      })
    }
  }
})

    },

    //点击按钮会跳转到对应的缺勤记录页面
      resultlist: function(e) {
       var index = e.currentTarget.dataset.index;
      console.log("当前点击的项的索引为：" + index);
        //这边要把这个按钮包含的课程id，课程名，课程教室，课程时间传递后端，后端调取数据
        const naturalclass = this.data.naturalclass[index];
        const claid = this.data.cid[index];
        wx.redirectTo({
          url: '/pages/zjl2/zjl2?claid='+claid
        });
      },

gojssy:function(){
  wx.redirectTo({
    url: '/packA/pages/jssy/jssy',
  })
},
gojswd:function(){
  wx.redirectTo({
    url: '/packA/pages/jswd/jswd',
  })
},
gocjkc:function(){
  wx.redirectTo({
    url: '/packB/pages/cjkc/cjkc',
  })
}

})