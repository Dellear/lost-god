var path = require('path');
var util = require('./util');

var rootPath = process.env.JD_DIR;
// 京东到家日志文件夹
var jddjFruitLogDir = path.join(rootPath, 'log/jddj_fruit/');

// 获取京东到家互助码列表
function getJddjFruitCodes() {
  const lastLogPath = util.getLastModifyFilePath(jddjFruitLogDir);
  const lastLogContent = util.getFileContentByName(lastLogPath);
  const lastLogContentArr = lastLogContent.split('\n');
  const shareCodeLineArr = lastLogContentArr.filter(item => item.match(/好友互助码:/g));
  const shareCodeStr = shareCodeLineArr[shareCodeLineArr.length - 1];
  const shareCodeArr = shareCodeStr.replace(/好友互助码:/, '').split(',').filter(code => code.includes('JD_'));
  return shareCodeArr;
}

// 生成京东到家互助码文本
function createJddjFruitCodeTxt(page, size = 5) {
  const shareCodeArr = getJddjFruitCodes();
  if (shareCodeArr.length > size * (page -1)) {
    const filtered = shareCodeArr.filter((code, index) => index + 1 > size * (page - 1) && index + 1 <= size * page);
    return filtered.join(',');
  }
  return '';
}


module.exports = {
  createJddjFruitCodeTxt,
}