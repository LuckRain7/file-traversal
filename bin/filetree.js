#!/usr/bin/env node

const { resolve } = require("path");
const { getDirMap } = require("../utils");

const argArr = process.argv; // 获取命令行参数
const ROOT = process.cwd();
const DIR_NAME = argArr[2];
const DIR_PATH = resolve(ROOT, DIR_NAME); // 目标文件夹路径
const CHAR = {
  root: "★ ",
  dir: "▼ ",
  enter: "\n",
  space: "├─ ",
  close_space: "└─ ",
  file: "",
  first: "│  ",
};
// 存储文件目录
let filesNameArr = {
  path: DIR_PATH, // 目标文件夹路径
  name: DIR_NAME, // 文件夹名称
  type: "directory", // 类型
  children: [], // 是否有下一级
  deepIndex: 0, // 深度
};

let deepIndex = 0;

getDirMap(DIR_PATH, filesNameArr.children, deepIndex); // 获取文件 Map

function createPrint(_content) {
  let printContent = "";
  let first = true;
  const print = function (_Map) {
    if (first) {
      // printContent += CHAR.first;
      printContent += CHAR.root + _Map.name + CHAR.enter;
      first = false;
    }

    _Map.children.forEach(function (item, index) {
      if (item.type == "directory") {
        printContent += CHAR.first; // 添加头部
        // 根据层级进行缩进
        for (let i = 0; i <= _Map.deepIndex; i++) {
          if (i == _Map.deepIndex) {
            printContent += CHAR.space;
          } else {
            printContent += CHAR.first;
          }
        }
        printContent += CHAR.dir + item.name + CHAR.enter;
        print(item); // 递归打印
      } else {
        printContent += CHAR.first;
        for (let i = 0; i <= _Map.deepIndex; i++) {
          if (i == _Map.deepIndex) {
            // 判断最后一个文件 进行闭合
            if (index === _Map.children.length - 1) {
              printContent += CHAR.close_space;
            } else {
              printContent += CHAR.space;
            }
          } else {
            printContent += CHAR.first;
          }
        }
        printContent += CHAR.file + item.name + CHAR.enter;
      }
    });
  };
  print(_content);
  return printContent;
}

let consoleLog = createPrint(filesNameArr);

console.log(consoleLog);
