# 脑图 / MindMap

一个基于react与redux的简单web脑图应用。

A simple mindmap web application based on react and redux.

在线demo地址 / Online demo：[mindmap](http://www.morsecoding.win:3000/)

运行方式 / the way to start it：

```
npm i
npm run build
npm start
```
然后在任意一款现代浏览器上打开[localhost:3000](http://localhost:3000/)

then open [localhost:3000](http://localhost:3000/) in your favorite modern browser.

## 技术栈 / Tech Stacks

* [TypeScript](https://github.com/Microsoft/TypeScript)
* [React](https://github.com/facebook/react)
* [dva.js](https://github.com/dvajs/dva)

## 已实现功能列表 ／ Available Function List

### Topic结构编辑 / Edit Topic Structure
* 添加子Topic / Add Child Topic 
* 同列向前插入Topic / Insert Topic Before 
* 同列向后插入Topic ／ Insert Topic After 
* 插入父Topic / Insert Parent Topic
* 删除Topic / Delete Topic 

### Topic内容与内容样式编辑 / Edit Topic Content
* 编辑Topic文本 / Edit Topic Content Text 
* 改变文本尺寸 / Change Text Font Size
* 改变文本颜色 / Change Text Color
* 文本加粗 / Set Bold
* 文本斜体 / Set Italic
* 文本删除线 / Set Line Through


### Topic样式编辑 ／ Edit Topic Style
* 改变Topic形状 / Edit Topic Shape
* 改变填充颜色 ／ Edit Fill Color
* 改变边框宽度 / Edit Border Width
* 改变边框颜色 ／ Edit Border Color

### 连接线样式编辑 / Edit Connection Line Style
* 改变连接线类型 / Edit Line Class
* 改变连接线宽度 / Edit Line Width
* 改变连接线颜色 / Edit Line Color

### 多人协同编辑 / Collaborative Editing
* 同步操作 / Sync Operation

### 其它 / Others
* Undo and Redo 
* SVG 缩放 / Scaling SVG Map

## 即将实现的功能 / Future Funtion List
### 用户名系统 / User Name System
* 默认随机用户名 / Random username as default
* 支持修改用户名 / Support edit username

### 多人协同编辑 / Collaborative Editing
* 同步操作锁 / Operation lock

## 协议 / License
MIT

