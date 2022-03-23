# BFC和IFC

## 什么是FC？

FC（formating context）格式化上下文，是css2.1提出的一个概念

它是页面中的一块渲染区域，并且有一套渲染规则，它决定了子元素如何排列，以及和其他元素的相互关系和相互作用。

常见的FC分为：

**BFC**（block formating context）和**IFC**（ inline formating context），他是css提出的一种视觉渲染的概念。

## BFC

​	**通常称之为块级格式化上下文**

（指页面上的一个标签，但是不一定完全是块级元素。它有指定的满足条件，它有自己的渲染规则，决定了BFC的内部的HTML标签是如何进行定位以及不同的BFC之间如何进行定位。）

w3c对BFC介绍的原文：

![image-20210201114819290](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/zhangrui/20210201114826.png)

### 翻译原文

### 就是BFC区域的特点：

1. 内部的盒子会在垂直方向上，一个接着一个地放置 （标准文档流）
2. Box垂直方向的距离由margin决定，属于同一个BFC的两个相邻box的margin会产生重叠
    - 属于不同的BFC区域的两个相邻的box的margin就不会发生重叠
    - 解决方案：把其中一个box放到一个新BFC区域可以解决margin重叠的问题
3. 每个元素的左外边缘与包含块的左边相接触（从左到右的格式化，否则相反）。即使存在浮动也是如此。除非这个元素自己形成了一个新的BFC。（解决浮动元素与非浮动元素的重叠）
4. BFC的区域不会和浮动盒子重叠
5. 计算BFC区域的高度时，浮动元素也参与计算
    - 可以解决子元素浮动父元素高度塌陷的问题
6. BFC 就是页面中一个独立的容器，容器里面的子元素不会影响外面元素，反之也如此

### 如何变成BFC容器 或者说（如何升级为BFC）或者说（产生BFC的方法）

- 设置`overflow` 不为 `visible`      通常：overflow:hidden
- 设置`position`为`absolute`和`fixed`（脱离文档流）
- 设置`float`不为`none`（脱离文档流）
- 设置`display`为`inline-block`、`flex`
- html 根标签（html本身就是一个BFC容器）

### BFC应用场景（能解决什么问题）

#### 场景一：margin垂直方向重叠问题

- 将相邻的两个盒子中的一个盒子放在一个新的BFC区域里，就可以解决margin重叠的问题。

    ```css
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            .box1{
                width: 200px;
                height: 200px;
                background-color: tomato;
                margin-bottom: 20px;
            }
            .box2{
                width: 20die0px;
                height: 200px;
                background-color: pink;
                margin-top: 50px;
            }
            .container{
            /*创建BFC容器 解决margin重叠问题*/    
                overflow: hidden;
            }
        </style>
    </head>
    <body>
        <div class="box1"></div>
        <div class="container">
            <div class="box2"></div>
        </div>
        
    </body>
    </html>
    ```



#### 场景二：浮动元素与非浮动元素的重叠问题

每个元素的左外边缘与包含块的左边相接触（从左到右的格式化，否则相反）。即使存在浮动也是如此。除非这个元素自己形成了一个新的BFC。

```css
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .container{
            width: 1200px;
            height: 600px;
            border: 1px solid red;
        }
        .aside{
            width: 200px;
            height: 300px;
            background-color: pink;
            float: left;
        }
        .article{
            /* width: 800px; */
            height: 400px;
            background-color: tomato;
            /* 新的BFC区域不会和浮动元素重叠 */
            overflow: hidden;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="aside"></div>
        <div class="article"></div>
    </div>
</body>
</html>
```

#### 场景3：三栏布局  m.jd.com

对于两栏或三栏的自适应布局，包含块的特点，BFC区域不会和浮动元素重叠

方法：html代码结构中，居中盒子需要放在最后，左右两个盒子分别设置左浮动和左浮动，居中盒子设置成BFC容器

```html
<style>
        .wrapper .left {
            float: left;
            width: 200px;
            height: 100px;
            background-color: red;
        }

        .wrapper .center {
            background-color: gray;
            height: 200px;
            overflow: hidden;
        }

        .wrapper .right {
            float: right;
            width: 200px;
            height: 150px;
            background-color: orange;
        }
</style>
<div class="container">
	<!-- 前面两个盒子一个左浮动，一个右浮动，中间盒子放最后，设置成BFC容器 -->
    <div class="left">left</div>
    <div class="right">right</div>
    <div class="center">center</div>
</div>
```

#### 场景四：子元素浮动，父元素高度塌陷的问题

计算BFC区域的高度时，浮动元素也参与计算

子元素浮动，将父元素设置为BFC区域，父元素计算高度时，子元素也会计算进去

```
<style>
.all-children-float{
border: 1px saddlebrown solid;
   overflow: hidden;
}
.all-children-float .left {
float: left;
width: 200px;
height: 100px;
background-color:red;
}
.all-children-float .right {
float: right;
width: 200px;
height: 150px;
background-color:orange;
}
</style>
<div class="all-children-float">
	<div class="left"></div>
	<div class="right"></div>
</div>
```

### 面试题：

请具体描述你对BFC的理解？

- BFC概念：BFC是W3C提出一种元素排列规则，只要当前这个盒子是BFC盒子，那就要满足一些排列规范

- BFC容器创建了一个独立的空间，这个空间在页面上有一套自己的渲染规则，我们可以使用float、overflow、diplay:inline-block等等创建BFC容器

- 浮动元素和标准文档流的元素默认会重叠，但是给标准文档流的元素设置BFC，那浮动元素就会和BFC容器一行排列，

    同一容器中的margin会重叠，可以让两个重叠的元素在不同的BFC空间解决

    子元素浮动，父元素高度塌陷，使用BFC解决高度塌陷问题

## IFC

**<font color="red">行级</font>格式化上下文**（inline formating context ）

和块格式化上下文一样，它是页面进行CSS视觉渲染时的一个概念。

指的是一行区域的渲染规则，确定了一行中,行内元素如何进行排列以及对齐。

### 行盒 ——line box（重要概念）

这是一个显示区域，根据块级容器类，每一行的多个元素共同生成一个**行盒模型**。（指的是一行内容的整块显示区域）

**IFC负责的矩形区域就叫做行盒**

宽度：一行中放置的元素的宽度

高度：由子节点的最高点和子节点的最低点来决定。高度其实由font-size、font-family、line-height、height共同决定，决定行内元素的垂直对齐方式vertical-align

![image-20210201153521657](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/zhangrui/20210201153521.png)

绿色：顶线

蓝色：中线

红色：基线

紫色：底线

### 影响行盒高度的因素



#### font-size

不同的font-size值会影响行盒的高度

#### font-family

不同font-family也会影响行盒的高度，取最大值

原因：设计师在设计字体时，不同的字体默认的行高，字体默认的样式是不同，所以不同字体，影响行盒的高度不同。

#### line-height/height

设置行高会影响行盒的高度，最终显示效果会发生改变；设置元素(行内块级元素)的高度，也会影响行盒的高度

行高的取值范围：它其实是每行上边空白区域的位置，到下一行空白区域的位置。（不是顶线到下一行的顶线）

参考图片

![image-20210201155036086](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/zhangrui/20210201155036.png)

#### vertical-align：

设置行内元素的垂直方向的对齐方式，同时也会影响行盒的高度

​	文本之间及文本和图片之间垂直对齐方式：

- baseline：默认值，以基线对齐
- middle：中线对齐（重点）
- text-top：顶线对齐
- text-bottom：底线对齐
- top：顶部对齐
- bottom：底部对齐

![image-20210201161736792](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/zhangrui/20210201161736.png)

##### 文本之间

文字和文字之间排列方式，通过这个属性来设置参考位置

默认以基线进行对齐

##### 文本和图片

文字和图片之间，可以设置参考线

**文本和图片，默认图片的底部和文本的基线对齐**

- 给文本设置vertical-align，图片的底部参考文本vertical-align的值；
- 给图片设置vertical-align，文本的基线参考图片vertical-align的值；

##### 表格中文字的对齐

可以控制表格中单元格里面的内容在垂直方向上的对齐方式

top：顶部对齐

bottom：底部对齐

middle：居中对齐（默认值）

table表格中，单元格垂直方向上对齐——居中，相当于vertical-align：middle

### IFC区域的特点

1. 在IFC中，盒子水平放置，一个接着一个，从包含块的顶部开始。
2. 在盒子间margin、border和padding的水平方向的值是有效。
3. 这些盒子允许通过不同的方式进行对齐：他们的底部和顶部允许被对齐，或者通过文字的基线进行对齐。
4. 行盒的高度由line-height的计算结果决定。





















