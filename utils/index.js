const fs = require("fs");
const Path = require("path");

/*
 *  description:
 *  param {type} dir         文件地址
 *  param {type} curArray    当前存储数组
 *  param {type} _deepIndex  当前文件深度
 *  return:
 */
const getDirMap = function (dir, curArray, _deepIndex) {
  // 同步拿到文件目录下的所有文件名
  const filesName = fs.readdirSync(dir);

  filesName.map(function (fileNameItem, index) {
    const curPath = Path.join(dir, fileNameItem), // 拼接为绝对路径
      stats = fs.statSync(curPath); // 文件状态

    // 设置过滤文件
    if (fileNameItem != ".git" && fileNameItem != "node_modules") {
      // 判断是否为文件夹类型
      if (stats.isDirectory()) {
        curArray[index] = {
          path: curPath,
          name: fileNameItem,
          type: "directory",
          children: [],
          deepIndex: _deepIndex + 1,
        };
        // 递归
        return getDirMap(
          curPath,
          curArray[index].children,
          curArray[index].deepIndex
        );
      } else {
        // 添加文件
        curArray[index] = {
          path: curPath,
          name: fileNameItem,
          type: "file",
          deepIndex: _deepIndex + 1,
        };
      }
    }
  });
};

module.exports = { getDirMap };
