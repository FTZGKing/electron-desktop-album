# electron-desktop-album

## 介绍

前端使用 vue3，ts，后端使用 node.js ，打包使用 electron，搭建的一个桌面相册应用

> 安装使用的 electron 版本为 <b>最新的 24 版本</b>.

> 安装包内包含此项目的后台，前台，以及数据库文件，是一个完整的项目，下载下来后可以直接使用

> 此项目只是将 electron 套壳到一个 vue 项目中，只完成了一些主要在开发时会涉及到的部分内容。

## 应用图片

1. 项目整体预览图片如下
   ![项目整体预览图片如下](./imageDemo//%E9%A1%B9%E7%9B%AE%E6%95%B4%E4%BD%93%E5%9B%BE%E7%89%87.png)

2. 项目缩小到托盘图片如下
   ![项目缩小到托盘图片如下](./imageDemo/%E7%BC%A9%E5%B0%8F%E5%90%8E%E7%9A%84%E6%89%98%E7%9B%98%E5%9B%BE%E6%A0%87.png)

## 安装教程

1.  <b>desktop-album-node</b> 此文件夹为后台项目

    > 在安装依赖之前，先将 album.sql 转为自己本地数据库中的表，然后 按照 desktop-album-node/db/index.js 文件中的配置配置一下自己的数据库，使得后台项目可以访问本地数据库

    > 在此终端中输入 npm install ,安装所需依赖。

    > 在终端中输入 node app.js 启动后台服务，这种启动无法热更新后台

    > 我个人在本地开发时，全局安装了 nodemon ，使用 nodemon app.js 命令启动项目可以进行热更新

2.  <b>desktop-album-vite</b> 此文件夹为前台项目，使用了 electron 对项目进行了套壳

    > 在此文件夹终端中输入 npm install ,安装所需依赖，但是 npm 安装 electron 不是那么顺利，改用 cnpm install 就行了

    > 安装 nodemon，建议全局安装，在终端中输入 npm run dev 启动前台服务

    > "dev": "concurrently \"vite --host\" \"nodemon --exec electron .\"", npm run dev 命令同时启动 electron 和 前台 vue 项目。通过依赖 concurrently 实现两个命令同时启动的

    > nodemon --exec electron . 命令热更新 electron 应用 ,并且通过 nodemon.json 文件的配置，配置哪些文件更改可进行热更新

## 这个项目做了哪些东西

1.  创建一个 electron 应用，并且实现了自己设定的 最小化，全屏，关闭程序功能。
2.  进行了 主进程和渲染进程的一些通信，以及在应用程序中创建一个新的窗口

    ```javascript
    // main.cjs 文件

    // 确认关闭程序窗口
    let confirmCloseWindow = null
    // 确认是否关闭程序窗口
    ipcMain.on('close-window', () => {
        // 将这两行注释掉，在关闭应用程序，就可以体验到了
        mainWin.close()
        return

        ***
        //其他代码
    }
    ```

3.  实现了一个托盘，就和其他桌面应用关闭之后，会在任务栏有应用 icon 图标，右键点击会出现菜单栏
4.  在提一下关于 electron 应用不能点击或者拖动的问题，其实这个只要用 css 属性 -webkit-app-region 就可以解决了

    ```css
    .space {
      -webkit-app-region: drag;
    }
    .btn {
      -webkit-app-region: no-drag;
    }
    ```

    > 要注意的点就是，应用可以点击或者说需要点击的部分使用 no-drag，想要拖动的部分使用 drag . 当然，可以点击就意味着不能够进行拖动，反之亦然。

## 最后

当时是想做一个完整的桌面应用的，但发现 electron 也就是一个壳子，代码逻辑其实没有涉及到什么，此项目涉及到的 electron API 已经可以支持个人完成一个简单且完备功能的桌面应用了，当然前提是项目实践能力不错的。此项目也就只完成了桌面应用的一些基本要用的的功能，算是夭折啦。
