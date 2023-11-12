// 首先安装 xlsx 库
// npm install xlsx

// 在需要使用的页面中引入 xlsx 库
const XLSX = require('../../utils/xlsx.mini.min.js'); // 替换为 xlsx 库的实际引入路径

Page({
  importexcel:function(){
    let that= this;
    // 选择文件并保存到本地存储
    wx.chooseMessageFile({
      success(res) {
        const tempFilePath = res.tempFiles[0].path;
        const fileManager = wx.getFileSystemManager();

        // 读取文件内容（以二进制形式）
        fileManager.readFile({
          filePath: tempFilePath,
          success(data) {
            const fileData = data.data; // 以二进制形式获取文件数据

            // 将文件内容保存到本地存储（以二进制形式）
            wx.setStorageSync('fileData', fileData);
            console.log('文件内容已保存到本地存储');

            // 解析Excel文件
            const workbook = XLSX.read(fileData, {type: 'array'});

            // 将解析后的数据转换为JSON格式
            const result = {};
            workbook.SheetNames.forEach(function(sheetName) {
              const roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
              if(roa.length > 0){
                result[sheetName] = roa;
              }
            });
            const jsonData = JSON.stringify(result);

            // 将JSON格式的数据保存到本地存储
            wx.setStorageSync('jsonData', jsonData);
            //console.log('解析并转换后的JSON数据已保存到本地存储');

            // 从本地存储中读取JSON数据
            //const storedJsonData = wx.getStorageSync('jsonData');
           // console.log('从本地存储中读取的JSON数据：', storedJsonData);

            // 显示数据
            //wx.showModal({
              //title: 'Excel数据',
             // content: storedJsonData,
             // showCancel: false
            //});
          },
          fail(err) {
            console.error('读取文件内容失败', err);
          }
        });
      },
      fail(err) {
        console.error('选择文件失败', err);
      }
    })
  }
})
