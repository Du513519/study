### WEB前端的核心部分

前端主要由三部分组成：HTML、CSS、JS（JavaScript）。

## 什么是HTML？

官方定义：HTML（Hyper Text Markup Language ）超文本标记语言

超：代表超链接

超文本：指的是通过一系列的超链接，将不同空间里面的资源链接在一起，形成一个网状的可相互连接的结构。可以传递文字、图片、视频、音频等等。浏览器发送一次请求，服务器就可以响应多个资源。

**标记**（也称为标签）：例如**<html></html>**  其中第一个标签是`开始标签`，第二个标签是`结束标签`

<font color="red" size="5">**通俗理解：在记事本当中，用标记写出来的一种计算机标记语言。**</font>

<font color="red" size="5">**注意**</font>：*HTML中所有的标记都是<font color="red">**W3C标准**</font>组织已经规范了，不能自己创建标签。并且每个版本都会有一些差异，HTML有很多版本。目前最新使用最多的版本是H5*

**什么是W3C标准？**

​	万维网联盟（外语缩写：W3C）创建于1994年，是Web技术领域**最具权威和影响力的国际中立性技术标准机构**。到目前为止，W3C已发布了200多项影响深远的Web技术标准及实施指南标准不是某一个标准，而是一系列标准的集合。

### HTML特点：

- 简单性：没有复杂的逻辑，你掌握这些标签的作用，合理搭配就可以设计出网页
- 可扩展：HTML标签有很多功能，新增一个标签就可以带来一个新的功能
- 跨平台：网页的运行环境是浏览器，只要保证你的系统有浏览器就可以运行。
- 通用性：页面写好了之后，可以相互的嵌套。一旦网页设计好了后，任何人都可以访问到你的页面。不管你使用什么浏览器都可以访问。

## HTML文档的结构

```html
<!--代表网页的文档类型，申明了浏览器解析时候的解析规则-->
<!DOCTYPE html>
<html>
	<head>
        <!--强制设置字符集，解决汉字乱码-->
		<meta charset="utf-8">
        <!--声明浏览器渲染方式-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
         <!--开启理想视口 如果不写该代码，移动端的默认值则为980px -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- 设置网页的关键字 -->
        <meta name="keywords" content="蜗牛学院">
        <!-- 网页描述 -->
        <meta name="description" content="设置网页的描述">
        <!-- 设置作者 -->
        <meta name="author" content="xiaowoniu">  
		<title>my first page</title>
	</head>
	<body>
		欢迎来到蜗牛学院
	</body>
</html>
```

- `<!DOCTYPE html>`:声明网页的文档类型，告诉浏览器解析的规则及html使用版本（目前使用的是H5版本）。
    - **注意：必须声明到文档的开头，不区分大小写**
- - html的版本：
        - HTML：1991年，设计出来并没有作为标准。
        - HTML+：1993年，非标准，这个版本已经在W3C的草案中。
        - HTML2.0：1995年发布，这个版本作为了标准。
        - HTML3.2：1997年发布      W3C 推荐标准
        - HTML4.0（HTML4.01）W3C 推荐标准，之前的 PC 端网页规范
        - **HTML5：2012年发布的，新增了很多的新特性。W3C 推荐标准，基于移动终端进行优化**
        - XHTML：存在一段时间，后来就放弃维护，转向H5，既有html规范，又有xml规范

#### DOCTYPE有什么用：

1. 使用了DOCTYPE可以正确声明文档的类型，有利于浏览器解析
2. 可以正确告诉浏览器，我们使用的HTML版本是哪一个。 浏览器根据不同版本对代码有不同解析 
3. 正确声明DOCTYPE有利于浏览器识别采用哪种模式来运行代码。

### 常用的 DOCTYPE 声明版本

```html
html5

<!DOCTYPE html>

HTML 4.01 Transitional
该 DTD 包含所有 HTML 元素和属性，但不包括展示性的和弃用的元素（比如 font）。不允许框架集（Framesets）。
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
HTML 4.01 Frameset
该 DTD 等同于 HTML 4.01 Transitional，但允许框架集内容。
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN"
"http://www.w3.org/TR/html4/frameset.dtd">

XHTML 1.0 Transitional
该 DTD 包含所有 HTML 元素和属性，包括展示性的和弃用的元素（比如 font）。不允许框架集
（Framesets）。必须以格式正确的 XML 来编写标记。 (了解)
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" " http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

浏览器两种解析模式：

1. 严格模式：又称标准模式，是指浏览器按照 W3C 标准解析代码（服务于标准规则）。

    混杂模式：又称怪异模式或兼容模式，是指浏览器用自己的方式解析代码（服务于旧式规则）。

    浏览器为什么有两种解析模式：

    ```
    浏览器在发展的最初没有标准化，老版本浏览器下面能运行的代码，现在放在新版本浏览器下面无法运行，新版本的浏览器采用W3c的标准。以前写的代码就会不兼容，浏览器为了解决这个问题，所以采用两种模式来解析代码
    ```

    **如何区分两种解析模式**：如果文档包含严格的 DOCTYPE ，那么它就是以严格模式呈现，否者为混杂模式。

- `<html></html>`:根标签，每个网页有且仅有一个根标签
- `<head></head>`:代表网页的头部,head主要写CSS代码和js代码。
    - `<title></title>`:代表网页的标题，显示在网页窗口栏，SEO优化有用
    - `<meta charset="utf-8">`:表示网页的编码集，浏览器在解析时会根据这个编码集去解析网页
- `<body></body>`:代表网页的内容区域，主要写网页的结构代码