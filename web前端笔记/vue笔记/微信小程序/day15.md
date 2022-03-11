# 移动端开发

~~~
1 H5开发
2 app 
3 小程序

~~~

# 移动端开发的方式

~~~
1 原生开发(Native app)
Android、ios、小程序等的原生开发的特点：性能高，功能齐全，开发成本也高,如果是游戏开发，就可能会使用原生开发

2 网页开发(web app) html+css+js

3 混合开发(原生开发的封装+网页开发)

4 跨平台移动端开发 (只需要写一套代码，就能够在多个平台跑起来) --uni-app(vue+微信原生)


~~~

# 微信小程序(mini program)

~~~
小程序简写是CXC，是一种无需下载安装，只需用户扫一扫或搜索即可使用的一个应用程序

小程序开发中，代码大小不能超过2M，最大也不能超过10M(可以利用分包)  ,只能放少量的图标

和app的区别:
app:你需要先下载、安装之后才能使用
小程序：
1 直接使用即可 
2 合作平台获利(拼多多等)...
	
~~~

# 百度两个地址：

~~~
百度  “微信公众平台”
百度  “api 小程序”
~~~

# 项目结构

~~~
pages目录 ：以后小程序的页面等都放在该位置
	一个页面由4个文件组成（分别是 *.js  *.json *.wxml  *.wxss）
	*.js:局部业务
	*.json: 局部配置
	*.wxml:页面布局
	*.wxss:页面的样式
utils目录，放工具js
app.js 全局业务
app.json 全局配置
app.wxss

~~~

# app.json(全局配置)

## 1 pages:

设置页面路由

语法:

~~~
{
  "pages":[
    "pages/logs/logs",
    "pages/index/index"
   
  ],
~~~

补充：新建页面直接在路由下写路径即可



## 2  window

~~~
    "window": {
        "backgroundTextStyle": "light",
        "navigationBarBackgroundColor": "#ccc",
        "navigationBarTitleText": "菜谱",
        "navigationBarTextStyle": "white"
    },
~~~

### 2.1 ：局部配置(在某个页面.json文件中配置)

不要window属性，直接写里面的属性即可

### 2.2：自定义导航栏

~~~
"navigationStyle":"custom"
~~~

## 2.3 TabBar

小程序提供的选项卡，可以切换页面

~~~
    "tabBar": {
      "list": [
        {
          "pagePath": "pages/index/index",
          "text": "首页",
          "iconPath":"/img/home.png",
          "selectedIconPath":"/img/select_home.png"
        },
        {
          "pagePath": "pages/logs/logs",
          "text": "日志"
        },
        {
          "pagePath": "pages/my/my",
          "text": "我的",
          "iconPath":"/img/my.png",
          "selectedIconPath":"/img/select_my.png"
        }
      ]
    },
~~~



