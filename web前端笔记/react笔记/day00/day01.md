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

# 单位

~~~
在小程序中使用rpx，可以根据屏幕宽度进行自适应
如果以后设计稿是以iphone6作为参考，则量出来是多少px，则就写多少rpx

~~~

# 组件

## 1 view （类似于都div）

~~~
属性	类型	默认值	必填	说明	最低版本
hover-class	string	none	否	指定按下去的样式类。当 hover-class="none" 时，没有点击态效果	1.0.0
hover-stop-propagation	boolean	false	否	指定是否阻止本节点的祖先节点出现点击态	1.5.0
hover-start-time	number	50	否	按住后多久出现点击态，单位毫秒	1.0.0
hover-stay-time	number	400	否	手指松开后点击态保留时间，单位毫秒	1.0.0
~~~

## 2 text (类似于span)

~~~
user-select	boolean	false	否	文本是否可选，该属性会使文本节点显示为 inline-block	2.12.1
space	string		否	显示连续空格	1.4.0
    合法值	说明	最低版本
    ensp	中文字符空格一半大小	
    emsp	中文字符空格大小	
    nbsp	根据字体设置的空格大小	
decode	boolean	false	否	是否解码	1.4.0

~~~

## 3 rich-text (富文本)

识别标签:

~~~
 <rich-text nodes="html节点"> </rich-text>
~~~



## 4 image图片

model:缩放

~~~
mode="widthFix"    --->多用于宽大于高的图
mode="heightFix"   --->多用于高大于宽的图

~~~

## 5 navigator 超链接

使用：

~~~
 <navigator url="路由">跳转</navigator>
 
 注意： 默认跳转的路由不能包含tabBar,如果想要跳转tabBar，则需要添加该属性：open-type="switchTab"
 
 
~~~

## 6 scroll-view 滚动容器



### 横向滚动:

wxml:

~~~
<scroll-view scroll-x>
     <view class="v" style="display: flex;">
        <view></view>
        <view></view>
        <view></view>
        <view></view>
        <view></view>
    </view>
</scroll-view>
注意: scroll-view不支持设置弹性盒子

~~~

wxss:

~~~
.v view{
    width: 400rpx;
    height: 100rpx;
    border: 1rpx red solid;
    /*弹性因子  压缩因子  宽度(优先级高于本身)*/
    flex: 0 0 200rpx;
}
~~~

### 纵向滚动

wxxml:

~~~

<scroll-view class="v" scroll-y>
    
        <view></view>
        <view></view>
        <view></view>
        <view></view>
        <view></view>
  
</scroll-view>
~~~

wxss:

~~~
.v{
    height:300rpx ;
}

.v view{
    width: 400rpx;
    height: 100rpx;
    border: 1rpx red solid;
  
}
~~~

去掉滚动条:

~~~
scroll-view ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
}
~~~



## 7 swiper(轮播图)

~~~
<swiper 
indicator-dots 
indicator-color="#FF00FF"
autoplay
circular
interval="1000"
style="text-align: center;">
    <swiper-item>
        <image mode="widthFix" src="https://img0.baidu.com/it/u=3819721212,4191442613&fm=26&fmt=auto"></image>
    </swiper-item>
    <swiper-item>
        <image mode="widthFix" src="https://img0.baidu.com/it/u=3819721212,4191442613&fm=26&fmt=auto"></image>
    </swiper-item>
    <swiper-item>
        <image mode="widthFix" src="https://img0.baidu.com/it/u=3819721212,4191442613&fm=26&fmt=auto"></image>
    </swiper-item>
</swiper>
~~~



# 数据渲染

## 单个数据

js:

~~~
    data: {
        name:"张三"
    },
~~~



wxml:

~~~
{{name}}
~~~



## 列表渲染

### 语法:

~~~
wx:for
~~~



js:

~~~
    data: {
        stus:[
            {id:1,sname:"占山1",age:18},
            {id:2,sname:"占山2",age:28},
            {id:3,sname:"占山3",age:38},
        ]
    },
~~~



 wxml：

~~~
<view wx:for="{{stus}}" wx:key="id">
    {{index}}-{{item.sname}}
</view>
~~~

注意:

~~~
1 wx:key="id" 其实应该是 wx:key="{{item.id}}", 微信只能使用简写
2 默认送我们一个item和index，分别代表元素和下标
~~~

### 别名

~~~
使用 wx:for-item 可以指定数组当前元素的变量名，

使用 wx:for-index 可以指定数组当前下标的变量名：
~~~

~~~
<view wx:for="{{stus}}" wx:key="id" wx:for-item="s" wx:for-index="i">
    {{i}}-{{s.sname}}
</view>
~~~



# block（类似于vue中的template）





# 随堂练习:

~~~
动态渲染轮播图
~~~

