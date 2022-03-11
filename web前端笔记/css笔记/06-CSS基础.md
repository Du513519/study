# CSS基础

## 什么是CSS？

CSS（Cascading Style Sheets)）**层叠样式表。**主要用来控制网页上的样式显示。一般来说CSS代码不能单独使用，它作用在HTML标签上，控制标签的显示样式。

**层叠**：多种形式设置在多个地方，然后按照css规则去重重复，最后形成叠加样式。

**样式表**：指的是css样式代码，这些代码综合起来我们就称为样式表。

**<font color="red">通俗理解：多个内容及多种修饰形式叠加起来达到统一修饰的目的。</font>**

<font color="blue">注意：不同的浏览器默认会给一些标签加上默认样式，标签本身是没有样式的</font>。

<font color="blue">例如：h标签、a标签、p标签等等在浏览器显示有样式，这些样式都是浏览器默认给的样式，不同浏览器默认样式不一样</font>。

```
<!--以下标签浏览器会设置默认样式-->
<h1>这是标题1</h1>
    <h2>这是标题2</h2>
    <a href="http://www.baidu.com">百度一下</a>
    <p>CSS（Cascading Style Sheets）层叠样式表，主要用来控制网页上的样式显示，一般来说css代码不能单独使用，它作用在HTML标签上，来控制标签的样式</p>
```

## CSS样式的分类，怎么自定义CSS样式？

### 	内联样式（也称之为内嵌样式或者属性样式）

- 直接在标签的开始标签里面添加style属性，在这个属性里面设置css样式代码，浏览器会读取这个style属性里面的样式代码，作用到标签上

- 注意：每个html标签都有style属性，style控制的是当前这个标签的样式

- 语法：

    ```html
    例如：
    <p style="css属性 : 属性值; css属性 : 属性值; "></p>
    ```
    
- 优点：哪儿需要就写在对应的标签里面

- 缺点：多个元素有相同样式需要重复写

    ### 内部样式

- 必须在head标签里加入`<style type="text/css"></style>`，我们可以在style标签里面写CSS代码。就不用嵌套在HTML标签里面，HTML代码和CSS代码分离开。以后方便维护代码，内部样式可以控制页面上多个元素。

- 语法：

    ```html
    <head>
        <style>
            选择器{
                css属性1：属性值；
                css属性2：属性值；
            }
        </style>
    </head>
    ```

- 优点：

    1. 结构和样式分离
    2. 结构清晰，利于代码维护
    3. 可以批量设置选中的元素样式

- 缺点：

    1. 代码和结构没有完全分离，目前还在一个文件中
    2. 选择器必须要精确，不然容易出现样式错乱的情况
    3. 权重值需要计算

### 外部样式（也称之为外联样式或者引入样式）

我们在html页面中要引入css样式，有两种方式可以选择，第一种就是使用link标签、第二种使用import来引入。

**第一种外联样式：使用link标签（推荐，开发项目当中会大量使用到）**

- 自己创建有一个后缀名为`.css`的文件，通过`<link>`标签在head标签里引入到代码中，在外部的css文件里书写对应的选择器和样式代码

- 语法：

    ```html
    <link rel="stylesheet" href="连接外部的css文件">
    ```

- 优点：

    - 样式和结构完全分离
    - 一处改处处改
    - 一次性编写无限次使用
    - 方便后期维护，结构更加清晰，样式独立开
    - 以后我们可以将css文件进行压缩，减小文件体积，优化网页
    
- 缺点：

    - 选择器必须要精确，不然容易出现样式错乱的情况
    - 权重值需要计算

    #### 注意：

    针对一个元素在多个地方设置了CSS样式，最终重复的会去重（权重问题），如果不一样的CSS代码会层叠为一（最终生成要作用的样式）。

**第二种外联样式： @import引入方式-比如淘宝页面经常使用import来引入css样式（不推荐，作为了解，面试题）**

语法：

```
<style>
    @import url("引入的样式");
</style>
```

例如：

```
<style>
    @import url("http://www.taobao.com/home/css/global/v2.0.css?t=20070518.css"); 
    @import url("css/style.css");
</style>
```

## link和@import

- 都可以在html中引入css文件

- 本质上，link是服务于整个网页，而@import是服务于css

- 区别：

    1. link是一个标签，@import是一种语法

    2. link不只可以引入css文件，还可以引入其他文件格式，@import只能引入css文件

    3. 加载时间：link加载css文件，随着页面的加载而加载，@import等待页面加载完成之后再加载css文件

    4. 兼容性：link兼容比@import要好一些

    5. JavaScript可以操作link引入样式，@import不能被操作。

## 基本选择器的使用

### 标签选择器

​	权重值：1

- 根据标签名来选中页面中元素，没有指定范围，默认选中整个文档对应标签。

    语法：

    ```
    </style>
    	标签名称{
    		属性名称:属性值;
    		属性名称:属性值;
    		....
    	}
    </style>
    ```

### ID选择器

​	权重值：100

- ID是标签上面定义的属性，id选择器就是选中这个属性。

- 精准定位，页面上ID必须是唯一的，不能重复。每次只能选中一个元素。相当于每个元素身份证

- ID值命名规则

    - 可以是字母、数字、_和-
    - 不能是纯数学，也不能是数字开始，也不能包含特殊符号

    ID选择器慎用。以后JS会操作这个标签。新增赋值删除标签。不是特殊情况一般不用，ID选择权重很大

- 语法：

    ```css
     /* id属性的值 必须是唯一的 id选择器不能是纯数字，也不能是数字开始 
          spanElement:通常是驼峰命名  小驼峰
          大驼峰：SpanElement
    */
    #id名{
        css样式代码
    }
    ```

    

### 类选择器

​	权重值：10

- 类选择可以重复的，多个标签可以共享一个class值。一般用来提取公共样式。**class的值可以多个，用空格隔开**。多个值所对应的样式层叠。

- 语法：

    ```css
    .class名{
        css样式代码
    }
    ```

- 注意：如果遇到多个类选择器组合起来，中间没有空格，表示多个条件并且的意思

    ```css
    .op.bg{
        color:red;
    }
    标签上同时有class名为op和bg
    ```




### 权重

- 相同选择器，后面的会覆盖前面的样式
- 不同选择器，权重大小：id选择器100>类选择器10>标签选择器1
- 权重相同情况下：内联>（内部=外部）这两个取决于浏览器执行的先后顺序

## CSS基础属性

### 宽高

- width：设置宽度，默认为auto自适应

- height：设置高度，靠内容撑开，如果没有内容，那么为0

### 背景属性

1. `background-color` :red;             设置背景色  

    - 单词
    - 十六进制，#
    - rgb（红绿蓝）

2. `background-image`:url("图片路径及名称");                设置背景图片

    ```css
    background-image:url("图片路径");
    background-image:url("../image/123.jpg");
    ```

3. `background-repeat`:no-repeat;             设置是否及如何重复背景图像，默认水平和垂直方向都平铺

    - `no-repeat`：不重复
    - `repeat-x`：沿着X轴平铺
    - `repeat-Y`：沿着Y轴平铺  

4. `background-position`：center center;              设置当前背景图片的位置

    - 关键字

        left | right | top | bottom | center

    - 自定义值：

        1. 百分比   50% 50%相当于center center  以当前容器宽高作为参考

5. `background-size` :cover;                  规定背景图片的尺寸（CSS3）      

    -   像素
    - 百分比：以当前盒子宽高为参考
    - `cover`：把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。超出部分隐藏。
    - `contain`：把背景图像扩展至最大尺寸，以使其宽度或高度完全适应内容区域。 */

​	6.`background-attachment `:fixed;                       是否固定背景在容器内（CSS3）

- `scroll` 默认值

- `fixed`：将背景固定在屏幕上

    案例：


```
<style>
        body{
            background-image: url(img/fisrtbg.jpg);
            /* no-repeat设置图片平铺不能重复显示 repeat-x x轴可以重复  repeat-y y轴可以重复*/
            background-repeat: no-repeat;
        
            /* 背景是否固定  fixed固定 scroll随着滚动条滚动，默认值*/
            background-attachment: fixed;

        }
        .bg{
            height: 300px;
            background-color: white;
        }
    </style>
</head>
<body>
    <h1>h1</h1>
    <h1>h1</h1>
    <h1>h1</h1>
    <h1>h1</h1>
    <h1>h1</h1>
    <h1>h1</h1>
    <h1>h1</h1>
    <h1>h1</h1>
    <h1>h1</h1>
    <h1>h1</h1>
    <h1>h1</h1>
    <h1 class="bg">h1</h1>
    <h1>h1</h1>
    <h1>h1</h1>
    <h1>h1</h1>
    <h1>h1</h1>
    <h1>h1</h1>
    <h1>h1</h1>
    <h1>h1</h1>
    <h1>h1</h1>
    <h1>h1</h1>
</body>
```



7.复合属性：background

```html
<style>
    .box{
        width: 100px;
        height: 100px;
        border: 1px solid red;
        /* 称为复合属性，只写一个background 后面可以接多个值 */
        /* background: red; */
        /* background-image: url("img/icon_2.png");
        background-repeat: no-repeat;
        background-position: center center; */
        
        /* 顺序没有固定，但是值一定正确 */
        background: url("img/icon_2.png") no-repeat center center;
        
        /*
        background-position和background-size同时写进复合属性怎么写？
        用/分隔开，前面是定位，后面是大小
        */
        /*1.png这个透明小图覆盖2.png这个大图（目的是让两张图叠加）*/
          background: url("img/1.png"),url("img/2.png") no-repeat  20px 40px/200px 200px;
    }
</style>

<div class="box"></div>

```

#### 雪碧图（CSS sprite）

​	**什么是雪碧图**

雪碧图是根据CSS sprite（雪碧）音译过来的，就是将很多很多的小图标放在一张图片上，就称之为雪碧图。

**为什么使用雪碧图**

使用雪碧图的目的：有时为了美观，我们会使用一张图片来代替一些小图标，但是一个网页可能有很多很多的小图标，浏览器在显示页面的时候，就需要像服务器发送很多次访问请求，这样一来，一是造成资源浪费，二是会导致访问速度变慢。这时候，把很多小图片（需要使用的小图标）放在一张图片上，按照一定的距离隔开，就解决了上述的两个问题。

**总结：雪碧图是通过减少访问服务器的次数来优化网页**

 **案列：**

比如我们登录携程网的时候，看到的登录界面如下：

![image-20210617173206870](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/longzongfei/20210628145211.png)

上方看到的这些小图标都不是一个一个的图标，而是放在一张大图上。如下图：

<font color="red">图片素材的爬取：</font>

方式一：

​	打开火狐浏览器-》点击地址栏右边的锁图标-》点击安全连接-》点击更多信息-》点击媒体-》全选-》另存为-》选择存储的文件夹即可

方式二：

​	安装图片助手插件

​		打开火狐浏览器-》扩展和主题（ctrl+shift+A）->搜索栏目输入 图片助手-->点击图片助手-->点击安装即可



## **怎么实现雪碧图，使用条件**

1、需要一个设置好宽和高的容器

2、需要设置background-position的值（默认为（0，0），第一个0为X轴的偏移量，第二个为Y轴的偏移量），即移动图片到自己想要的图标位置。



实现案例：

我们使用一个div容器，设置背景为以上图片，然后调整图片的位置，直到被选择的图像是上面容器中显示的图片对象为止。

```html
  .box1{
        
            float: left;
       }
       .box1:hover{
            background-image: url(img/un_login_third.png);
            width: 35px;
            height: 35px;
		/*background-position: X轴 Y轴;*/
            background-position: 0px -35px;
         
       }
       .box2{
         
            background-position: -35px 0px;
            float: left;
       }
       .box3{
         
         background-position: -70px 0px;
         float: left;
    }
       .box2:hover{
            background-image: url(img/un_login_third.png);
            width: 35px;
            height: 35px;
            background-position: -35px -35px;
         
       }
       .box3:hover{
            background-image: url(img/un_login_third.png);
            width: 35px;
            height: 35px;
            background-position: -70px -35px;
         
       }
      .icon,.box{
              width: 35px;
            height: 35px;
            border: 1px solid red;
            background-image: url(img/un_login_third.png);
      }
      .box{
        width: 245px;
            height: 70px;
      }
    </style>
</head>
<body>
    <div class="box"></div>
    <div class="box1 icon"></div>
    <div class="box2 icon"></div>
    <div class="box3 icon"></div>
   
</body>
</html>
```

#### 

## 扩展：对网页优化的方案是什么？

1. 合理使用图片格式可以优化网页
2. 将css样式独立出来，可以将其压缩，减少文件体积，从而优化网页
3. 通过减少图片体积，优化网页
4. 实现雪碧图效果通过减少访问服务器的次数来优化网页

## 文本属性 

​	

1. `color`： red;          				  a标签颜色是浏览器默认的，无法从父元素继承颜色。

2. `direction`: rtl ;                   设置文本方向

    - `ltr`  默认。文本方向从左到右。
    - `rtl` 文本方向从右到左。

    ```
    <div style="direction:rtl;">1 2 3 蜗 牛 学 院</div>
    ```

3. `text-align`：center;         针对块级元素,行内快级元素有效果，因为他有空间来控制内容移动，行级元素无法移动

4. `line-height`：与高度值相等;     设置行高（针对于单行有效），设置文本的高度，行级标签的高度由内容来撑开，文本的大小决定了整个文本高度。

5. `word-spacing`：30px;       单词之间的间距（以空格来区分是否是一个单词，注意：每个汉字之间加空格会被认为是一个单词。）

6. `letter-spacing`：20px;  汉字之间的间距（设置字符与字符之间的间隔，每个中文都会被识别为一个字符）

7. `text-decoration`：none；   用来装饰文本

- `underline` 下划线

- `line-through` 删除线
    - `overline `上划线
    - `none`    无

8. `text-transform`：uppercase; 控制英文大小写
    - `none`
    - `uppercase`  全大写
    - `lowercase`  全小写
    - `capitalize `每个单词的首字母大写
9. `text-indent`：50px;   首行缩进距离





### 字体属性

字体样式是开发中比较常用的样式，只要设计到文字排列，一般都会有字体属性使用

#### font-family：宋体;

​	每种系统默认自带的 字体不一致，有的多有的少。

```css
.op{
    font-family:"宋体";
}
```

​	程序中的”宋体“在浏览器加载的时候，默认去操作系统里面找字体，如果有这个字体就会加载，如果没有这个字体就使用浏览器默认的字体，一般是微软雅黑。

> ​	为了保证网页在各种不同的系统里面运行差异性很小，我们会使用font-family来多设置几个字体，但是这些字体要风格差不多。

```css
 font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
```

Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;这些字体是vscode默认已经给编排好的字体，风格是相似的，<font color="blue">**如果你的浏览器无法加载第一种字体，就加载第二种字，直到加载到serif。serif代表设置通用字体。**</font>

#### 自定义字体

CSS3提供的一个技术，你可以把当前这个项目要用到的字体下载到本地，在代码中引入你本地的字体，以后项目部署到服务器，将字题也一起补上，浏览器加载的时候，用你提供好的字体。

```css
/* 
	一个font-face只能有一种字体
        但是，你可以是一个字体 多种格式。  一张图片 png jpg
        浏览器对字体兼容性不一样。
*/
@font-face {
    /*myfont ：自定义的名字*/
    font-family: myfont;
    src: 
        /*选择自己下载的字体及路径*/
        url("files/徐静蕾字体.fon"),
        url("files//徐静蕾字体.woff")
}
.op{
    /*使用自定义的字体，通过名字调用*/
    font-family: myfont;
}
```

> 为了考虑各个浏览器对字体的支持，我们可以将一个字体转化为多个格式并且在代码中引入，如果浏览器不识别第一种格式，换成连接第二种格式

**字体要改格式，不能直接改后缀名。**

字体转换网站：http://www.fontke.com/tool/convfont

#### font-size：30px;                 设置字体大小

#### font-weight:bold；           设置字体粗细

​	不能设置px像素，值为100-900 值越大，加粗效果越好，其中400相当于normal，normal正常； bold加粗

#### font-style 设置字体风格

- italic：斜体
- oblique：倾斜  

#### 字体图标 fontawesome    图标演示网址：http://www.jq22.com

图标引入官方网址：https://fontawesome.dashgame.com/

操作步骤：参考官网中的头部导航部分 <font color="red" size="5">起步</font> 选项

1. 打开官网https://fontawesome.dashgame.com/ 在首页点击   立即下载    解压下载包  把解压后文件中的css和font文件夹复制到自己的项目文件中；![image-20210319113709934](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/longzongfei/20210628145226.png)

2. 引入css图标文件：![image-20210319113637888](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/longzongfei/20210628145233.png)

3. 打开图标官网，![image-20210319113827449](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/longzongfei/20210628145239.png)

4. 选择需要用的图标![image-20210319113915097](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/longzongfei/20210628145246.png)

5. 写入引用图标代码：只需要使用CSS前缀 `fa`-3x是把图标放大3倍，再加上图标名称。

    ```图标调用
    <span class="fa fa-hand-lizard-o fa-3x"></span>
    ```

    

练习：jq22.com 导航部分

### 超链接样式

```css
       /* 链接被访问过的样式  */
        a:visited{
            color: green;
           
        }
        /* 鼠标移入超链接时的效果 hover需要放在active之前 放在visited之后*/
        a:hover{
            color: blue;
        }
        /* 链接被点击时的样式  active放在visited之后*/
        a:active{
            color: pink;
            text-decoration: underline;
        }
```

#### 示例：导航栏hover效果



## 列表

1. 列表默认样式：上/下外边距各16px,       左内边距40px。

    margin-top：16px  margin-bottom：16px；padding: left 40px;

```html
<style>
    /* 
    1. ul ol元素 默认占一行 块元素 span标签称为行元素  
    块元素：div、h、p、table、ul、ol
    行元素：span、label、a、img、em 、strong
    2. 默认有margin-top：16px  margin-bottom：16px
    3. 默认有padding: left 40px;的内边距——盒子内部的填充空间。
    */
    ul{
        border: 1px solid red;
        /* 设置当前盒子离前面盒子的距离 ——离父盒子 */
        margin-left: 0px;
        margin-top: 0px;
        margin-bottom: 0px;
        padding-left: 0px;
    }
</style>

<ul>
    <li>星期一</li>
    <li>星期二</li>
    <li>星期三</li>
</ul>
<ol>
    <li>孵化园</li>
    <li>火车南站</li>
</ol>

<span>span</span>

<table border="1">
    <tr>
        <td>1233</td>
    </tr>
</table>
<table border="2">
    <tr>
        <td>1233</td>
    </tr>
</table>
```

- list-style-type 设置列表标志类型

- 

    - | 值                   | 描述                                                        |
        | :------------------- | :---------------------------------------------------------- |
        | none                 | 无标记。                                                    |
        | disc                 | 默认。标记是实心圆。                                        |
        | circle               | 标记是空心圆。                                              |
        | square               | 标记是实心方块。                                            |
        | decimal              | 标记是数字。                                                |
        | decimal-leading-zero | 0开头的数字标记。(01, 02, 03, 等。)                         |
        | lower-roman          | 小写罗马数字(i, ii, iii, iv, v, 等。)                       |
        | upper-roman          | 大写罗马数字(I, II, III, IV, V, 等。)                       |
        | lower-alpha          | 小写英文字母The marker is lower-alpha (a, b, c, d, e, 等。) |
        | upper-alpha          | 大写英文字母The marker is upper-alpha (A, B, C, D, E, 等。) |
        | lower-greek          | 小写希腊字母(alpha, beta, gamma, 等。)                      |
        | lower-latin          | 小写拉丁字母(a, b, c, d, e, 等。)                           |
        | upper-latin          | 大写拉丁字母(A, B, C, D, E, 等。)                           |

- list-style-image: url(img/mark.gif);         设置列表项图像（注意图像不能设置大小）

- list-style-position：inside ; 设置默认的小圆点显示位置

    1. inside ：显示在li内容区域内
    2. outside ：在li内容外面。默认值

### 表格

- border-collapse: collapse;   设置是否将表格边框折叠为单一边框
- text-align:center;        设置表格中文本的对齐方式。
- vertical-align: top/middle/bottom;  设置垂直对齐方式。

## 扩展知识：

outline: none; 绘制于元素周围的一条线

语法：

```css
  outline:大小  类型  颜色；
input:foucs{
	outline:5px solid red;
	outline:none;  没有样式 
}

例如：
账号<input type="text" placeholder="请输入账号.." style=" outline: none;border:0px;">

```



## 面试题：网页的优化方案

2. 使用雪碧图技术来完成页面的优化
3. html代码和css代码分开写，后续可以对css代码进行压缩和混淆
4. 尽量使用link标签来引入样式，不使用import来引入
5. 使用字体图标

