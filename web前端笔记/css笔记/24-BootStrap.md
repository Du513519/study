# BootStrap

Bootstrap是美国`Twitter`公司设计基于HTML、CSS、JavaScript 开发的简洁、直观、强悍的前端开发框架，使得 Web 开发更加快捷。Bootstrap提供了优雅的HTML和CSS规范，它即是由动态CSS语言Less/SASS写成。Bootstrap一经推出后颇受欢迎，一直是GitHub上的热门**开源项目**，包括NASA的MSNBC（微软全国广播公司）的Breaking News都使用了该项目。 国内一些移动开发者较为熟悉的框架，如WeX5前端开源框架等，也是基于Bootstrap源码进行性能优化而来。

## 概念

- 背景

  - 对于响应式布局来说，比较繁琐。比如针对不同宽度范围的设备之前是使用了媒体查询写多套css代码。开发代码量很大。可以利用BootStrap来加快开发响应式网站的速度，即极大的提高了开发响应式网页的效率。

- 概念

  - BootStrap是一个前端开发框架。框架是指其他开发人员或公司为了简化某一开发领域的流程而设计出来的有序的代码，简称第三方开发工具。框架可以简化或优化开发流程。比如BootStrap可以加快页面的开发速度。
  - BootStrap内置了大量写好的页面组件，我们可以直接使用，而无需自己编写，比如表格、按钮、面板之类的，直接用现成的进行编写页面。同时也内置了常见的插件，比如轮播图、弹出的登录注册框之类的。

- 特点

  - BootStrap自定义了一套响应式规则，我们只需给盒子添加几个class，即可实现响应式布局。
  - BootStrap内置了大量页面的组件，我们直接可以使用
  - BootStrap内置了大量的JavaScript插件，比如用户可控制的轮播图、弹出框之类的。
  - 低版本的BootStrap不需要考虑兼容性

- 版本

  - BootStrap V3.4.1

  - BootStrap V4.6

  - 目前GitHub上已经有了BootStrap V5，不支持ie低版本

      

- BootStrap 3和BootStrap 4对比

  | BootStrap 3              | BootStrap 4                                      |
  | ------------------------ | ------------------------------------------------ |
  | less语言编写             | sass语言编写                                     |
  | 4种栅格类                | 5种栅格类                                        |
  | 使用px为单位             | 使用rem和em为单位（除部分margin和padding使用px） |
  | 使用push和pull向左右移动 | 偏移列通过offset-类设置                          |
  | 使用float的布局方式      | 选择弹性盒模型（flexbox）                        |

## BootStrap网址

https://www.bootcss.com

## 基本使用

- 基本使用步骤
  - 下载BootStrap的压缩包
  - 在页面上引入bootstrap.min.css
  - 可以直接使用BootStrap里的内容

- 额外使用BootStrap插件

  - 如果要使用BootStrap所提供的JavaScript插件，那么需要引入插件所需要的jQuery引入bootstrap.min.js

  ```html
   <!-- 引入Bootstrap的css文件 -->
  <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css">
  <!-- 引入Bootstrap的js文件，bootstrap基于jquery开发，所以需要引入jquery文件 -->
  <!-- 切记先导入jquery，再导入BootStrap的js插件-->
  <script src="../js/jQuery-2.2.2-min.js"></script>
  <script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
  ```

## BootStrap栅格系统（核心）

- 概念：BootStrap自定义的一套用于快速构建响应式布局的一系列规则。BootStrap也是预定义了很多跟布局相关的class，我们使用这些class来快速搭建响应式布局。

- 原理：
  - BootStrap利用行和列来对内容进行布局
  - BootStrap会根据屏幕宽度的不同，自动将一行的宽度自动分成12列并被内容消化。在不同宽度的屏幕下，每一列的宽度都是不一样的，以此来达到响应式布局的效果。
  
- 使用步骤：
  - 将装内容的最大的盒子设置 `.container` 或 `.container-fluid`，BootStrap会将设置了该class的盒子的宽度划分为12列，并作为一行的宽度。
  - 将 `.row` 盒子作为`.container`容器的直接子元素
  - 内容盒子是作为 `.row`的直接子元素
  
  - BootStrap的栅格系统的响应式原理是当设备宽度处于不同范围下，指定每个内容盒子所占的列数，以此来实现响应式
  - BootStrap会把class为 `.container` 或 `.container-fluid`的盒子宽度作为一行的宽度，并分为12列
  - 盒子的HTML嵌套关系： `.container` > `.row` >`内容盒子.col-`

## 布局容器

![image-20210607230314327](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/longzongfei/20210802093652.png)

## 栅格参数（选项）

​		通过下表可以详细查看 Bootstrap 的栅格系统是如何在多种屏幕设备上工作的。

V4.6版本

​	![image-20210607223903439](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/longzongfei/20210802093645.png)

V3.4.1版本

![image-20210607220723825](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/longzongfei/20210802093639.png)

使用单一的一组 .col-md-* 栅格类，就可以创建一个基本的栅格系统，在手机和平板设备上一开始是堆叠在一起的（超小屏幕到小屏幕这一范围），在桌面（中等）屏幕设备上变为水平排列。所有“列（column）必须放在 ” .row 内。

实战练习：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="css/bootstrap.css" type="text/css">
    <style type="text/css">
        .row>div{
            border: 1px solid orangered;
            text-align: center;
            line-height: 50px;
        }
    </style>
</head>
<body>
    /*创建栅格系统必备容器*/
    <div class="container">
        /*row 代表每一行*/
        <div class="row">
            <div class="col-md-6">col-md-6</div>
            <div class="col-md-6">col-md-6</div>
        </div>
        <div class="row">
            <div class="col-md-8">col-md-8</div>
            <div class="col-md-4">col-md-4</div>
        </div>
        <div class="row">
            <div class="col-md-3">col-md-3</div>
            <div class="col-md-3">col-md-3</div>
            <div class="col-md-3">col-md-3</div>
            <div class="col-md-3">col-md-3</div>
        </div> 
        <div class="row">
            <div class="col-md-6 col-md-offset-3">col-md-6</div>
        </div>
    </div>
</body>
</html>
```

运行效果为:

![](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/longzongfei/20210802093628.png)

## BootStrap组件使用

- 在官网或其他教程网站（菜鸟教程）找到对应的组件，比如按钮
- bootstrap菜鸟教程地址：https://www.runoob.com/bootstrap/bootstrap-tutorial.html
- 可以直接复制例子的代码进行操作，或拷贝所使用的class赋给HTML标签来进行操作
- 如果需要更改样式，建议添加class或ID来追加样式，以适配自己页面的布局。

bootstrap常用组件：

- 警告框
- 面包屑
- 按钮
- 卡片
- 轮播图
- 折叠
- 下拉菜单
- 表单
- 模态框
- 导航
- 导航条
- 进度条

扩展：highcharts.com.cn  图表框架官网