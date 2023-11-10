// index.js
Page({
  data: {
    excelData: []  // 用于存储导入的Excel数据
  },
  importExcel: function() {
    wx.chooseMessageFile({
      type: 'file',
      success: res => {
        const filePath = res.tempFiles[0].path;
        this.parseExcel(filePath);
      }
    });
  },
  parseExcel: function(filePath) {
    wx.getFileSystemManager().readFile({
      filePath: filePath,
      encoding: 'binary',
      success: res => {
        const XLSX = require('../../utils/xlsx.mini.min.js');
        const data = this.binaryStringToArrayBuffer(res.data);
        const workbook = XLSX.read(data, {type: 'array'});
        const sheetName = workbook.SheetNames[0];
        const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        this.setData({
          excelData: excelData
        });
      }
    });
  },
  binaryStringToArrayBuffer: function(s) {
    const buffer = new ArrayBuffer(s.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buffer;
  }
});
