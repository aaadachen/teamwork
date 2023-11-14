const app = getApp();
Page({
  data: {
    params1: [],
    params2: [],
    params3: []
  },

  onLoad: function(options) {
    // 获取传递过来的三个数组参数
    this.setData({
      params1: app.globalData.courseName,
      params2: app.globalData.classRoom,
      params3: app.globalData.time
    });
    console.log(this.data.params1)
  },


  resultlist: function(e) {
    var index = e.currentTarget.dataset.index;
    console.log("当前点击的项的索引为：" + index);
    //这边要把这个按钮包含的课程名，课程教室，课程时间传递给他所要跳转的页面
    const coursename = this.data.params1[index];
    const classroom = this.data.params2[index];
    const time = this.data.params3[index];
    //测试页面跳转功能
    let url = '';
    // 根据索引判断要跳转的页面路径
    if (index === 0) {
      url = '/pages/page1/page1';
    } else if (index === 1) {
      url = '/pages/page2/page2';
    } 
    wx.navigateTo({
      url: url
    });
  }
});
