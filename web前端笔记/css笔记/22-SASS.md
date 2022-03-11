# SASS

## 解决原生css的不便

1. 书写重复的选择器
2. css权重计算比较麻烦
3. 修改css属性不方便，每处都需要修改
4. css代码重复编写，比如ul三件套，居中对齐

## SASS

### 基本概念

- sass是一个css预处理器，可以为网站启用可定义、可管理和可重用的样式表。sass是一种动态样式表**语言**，扩展了css的功能
    - css预处理器是一种语言，可扩展css并将其编译为常规css语法，以便浏览读取，提供了很多特性，可以构建动态的css。
    - sass是对css的一个扩展，通过sass很多语法能够极大提高css的编写效率
    - sass本质上一个脚本语言，有自己的编写语法，编写的代码通过编译后能过转为被浏览器识别的css代码，即sass代码需要转化css代码才能使用。
- 优点：能够极大提高css代码编写效率
- 官网：https://www.sass.hk/
- less也是css预处理

## sass安装

### 通过命令来执行

`sass`基于`Ruby`语言开发而成，因此安装`sass`前需要[安装Ruby](http://rubyinstaller.org/downloads)

- 安装ruby
- 安装sass

### 使用vs code中的`easy sass`插件来使用

- 安装easy sass插件
- 新建以`.sass`或者`.scss`后缀名文件，在里面书写sass代码
    - `.sass`：是旧版本的sass文件格式
    - `.scss`：是新版本的sass文件格式（推荐）
    - easy sass 插件会自动将sass转为css文件，转化的css文件在统计目录下，在页面上引入转化编译之后的css文件即可。

### 手动指定转换的css文件保存路径

- 设置——打开easy sass `setting.json`

- 

- 将easy sass配置代码加入`setting.json`

- 指定css文件保存路径（注意：这个路径是从工作区出发）

    ```json
    // 设置sass转为什么格式的css文件
        "easysass.formats": [
            {
                "format": "expanded",
                "extension": ".css"
            },
            {
                "format": "compressed",
                "extension": ".min.css"
            }
        ],
        // 转化css文件保存路径，注意是从工作区出发
        "easysass.targetDir": "工作区/css/"
    ```

## 嵌套

- 概念：SASS支持选择器里面嵌套子选择器

- 作用：让css代码层级清晰明了，不会出现父子标签之间权重问题

- 语法:

    ```scss
    父选择器{
        css属性：属性值；//针对父选择器使用的css样式
        子选择器{
            子选择器使用的css代码
        }
    }
    .box{
            width: 200px;
            height: 200px;
            background-color: pink;
            .box1{
                width: 100px;
                height: 100px;
                background-color: yellowgreen;
            }
        }
    ```

- 在嵌套里面使用兄弟选择、子元素选择器、伪类和伪元素

    ```scss
    // .container .box{
    //     width: 200px;
    //     height: 200px;
    //     background-color: tomato;
    // }
    
    .container{
        .box{
            width: 200px;
            height: 200px;
            background-color: pink;
            .box1{
                width: 100px;
                height: 100px;
                background-color: yellowgreen;
            }
            // 兄弟选择器
            +.box2{
                background-color: yellowgreen;
            }
            ~div{
                background-color: red;
            }
            // 子元素选择器
            >div{
                background-color: rosybrown;
            }
            // 伪类或者伪元素
            // &代表当前的父选择器（清除选择器之间默认的空格），指代.box
            &:hover{
                background-color: royalblue;
            }
            &::before{
                content: "周二";
            }
        }
        
    }
    ```

## 变量

- 概念：变量可以看作可以保存一个数据的容器。可以在代码中重复去使用

- 语法：

    ```scss
    $变量名：数据；
    ```

    - 数据可以是任意css属性的属性值，比如，50px ，red，5%等等，还可以是复合属性的属性值，比如`1px solid red`
    - 变量名规范
        - 变量名可以是数字，字母，_ 和 -
        - 不能使用数字开头
        - 多个单词之间建议用-连接
        - 竟可能是有实际意义的单词

- 注意：
  
    - 变量需要先定义再使用，建议直接在sass文件的开头定义
- 应用：
  
    - 当页面中，有属性重复被使用的时候，就可以使用变量

## 静默注释

- sass提供注释方式，不会被编译到css文件中，也称为单行注释

- 语法：

    ```scss
    //注释文字
    ```



## 拓展知识

### 数学运算

- sass可以使用中数学中基本运算（加减乘除）
- 语法
    - 注意符合前后要有空格
    - 单位要统一，特别时%和px之类不能一起用
    - 复合属性里面的值进行计算时，建议提前使用变量存储计算的值
- 常用的快捷数学操作代码（数学函数）
    - `random()`:生成0~1之间的随机小数，不包括1 包括0
    - `round()`:四舍五入 round（12.4）  12    round（12.6）  13 
    - `ceil()`：向上取整， ceil(12.1)  13
    - `floor()`：向下取整， floor（12.9)  12
    - `max()`：取多个数之间的最大值
    - `min()`：取多个数之间的最小值

### 混合

- 混合是一段代码的容器，当页面中需要使用重复的代码块，直接引用该混合即可。混合可以重复使用，而无需重复编写。

- 好处：可以重复使用相同的代码，而不用每次编写。

- 语法：

    ```scss
    1.定义混合
    @mixin 混合名{
        包含的一段sass代码
    }
    2.使用混合
    @include 混合名；
    @include 混合名();
    ```

    - 使用混合的地方会自动将混合里面的代码放入到使用的位置，即使用一次混合里的scss代码
    - 注意：需要先定义再使用，不能再定义之前使用
    - 混合名规范
        - 见词达意，尽量混合名能够表达混合里面代码的作用

- 混合参数

    - 概念：指我们可以给混合提供数据，在混合中使用，这样可以达到定制混合的目的。混合的参数时指混合定义时圆括号里面的变量

    - 参数可以使用多个，每个需要在定义混合的时候，添加对应的变量（形式参数），在使用混合的时候，如果传入参数的值不够，一一对应后，不够的使用默认值。每个参数之间用逗号隔开

        ```scss
        1. 定义混合，添加参数（形式参数）
        @mixin  混合名($变量名：默认值){
            $变量的数据来源有两个，一个默认值，一个时调用混合传入的值，如果调用传入了值，则使用传入的值；如果没有传入，则使用默认值。
            $变量只能在混合中使用
        }
        2.使用混合，传入参数（实际参数）
        @include 混合名（数据）；//该数据会自动赋给混合的$变量
        ```

- 使用场景

    - 用于代码块重复使用的地方

### @import

- 能够将scss文件拆分成单独的文件，通过import引入某个scss文件到当前的文件里面，如果其他文件也要使用，直接通过import也可以使用。

- 语法：

    ```css
    @import "要引入的scss文件的相对路径"；
        
    ```

- 注意：建议在文件的开头引入

### 循环

- 概念：循环本身是指重复的做某件事。在程序中，循环指的是某些代码在重复的使用。
- 我们可以利用Sass所提供的for循环来帮助我们减少重复代码的编写。

```scss
$width:400px;
$height:400px;
$distance:40px;
div{
    margin: auto;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    position: absolute;
}

@for $i from 0 through 4 {
    .item-#{$i + 1}{
        width: $width - $distance * $i;
        height: $height - $distance * $i;
        background-color: rgb(ceil(random()*255),ceil(random()*255),ceil(random()*255));
    }
}

<div class="item-1"></div>
<div class="item-2"></div>
<div class="item-3"></div>
<div class="item-4"></div>
<div class="item-5"></div>
```

- 语法

    ```scss
    for循环的两种使用方式：
    第一种：
    @for  $变量  from  开始数字  to  结束数字 {
        //需要重复编写的代码
        在这里面，$变量每次循环的值不一样，每次自增1，第一次的值为开始数字，最后一次循环的数字是结束数字-1
    }
    
    例子：
    .item-1{
        width:20px;
    }
    .item-2{
        width:20px;
    }
    .item-3{
        width:20px;
    }
    //循环
    @for $i  from  1 to  4 {
        .item-#{$i} {
            width:20px;
        }
    }
    //代码流程
    1. $i 取值是从开始数字开始，
    2. 每次都会编写一次{}里的代码，编写后$i的数字自动自增1，
    3. 判断$i的数据是否大于或等于结束数字，如果满足条件，那么结束代码执行。如果不满足执行第2步。
    
    第二种：
    @for  $变量  from  开始数字  through  结束数字 {
        //需要重复编写的代码
        在这里面，$变量每次循环的值不一样，每次自增1，第一次的值为开始数字，最后一次循环的数字是结束数字
    }
    ```

    - `to`和 `through`的区别
        - to是不包含结束数字，而through是包含结束数字的。

### 条件判断

- 概念：Sass可以对某个数据进行判断，根据判断的结果不同可以使用不同的样式

- 语法：

    ```scss
    @if 判断条件{
        判断条件成立时会使用的样式
    }@else{
        判断条件不成立时会使用的样式
    }
    
    例子：
    $width:20px;
    @if $width > 20px{
        color : red ;
    }@else{
        color : pink ;
    }
    意思：针对当前标签，如果$width的数据大于20px，那么字体颜色为红色，否则为粉色
    
    @if完整语法：
     @if 判断条件1{
        判断条件1成立时会使用的样式
    }@else if 判断条件2{
        判断条件1不成立，同时判断条件2成立时会使用的样式
    }@else if 判断条件n{
        之前的条件都不成立，同时判断条件n成立时会使用的样式
    }@else {
        所以判断条件都不成立时会使用的样式
    }
    注意：无论有多少个else if ，最终if、else if、else只会执行其中一个。
    ```

- Sass中常用的判断符号（关系运算符）

    - `==`：判断是否等于某个数据。比如 `$theme=="black"`表示判断$theme变量的数据是否是 `"black"`;
    - `!=`：判断是否不等于某个数据
    - `>`：大于。比如 `$width>20px`，判断$width里的数据是否大于20px
    - `<`：小于。比如 `$width<20px`，判断$width里的数据是否小于20px
    - `>=`：大于或等于。比如 `$width>=20px`，判断$width里的数据是否大于或等于20px
    - `<=`：小于或等于。比如 `$width<=20px`，判断$width里的数据是否小于或等于20px

### 继承  @extend 

- 选择器继承是说一个选择器可以继承为另一个选择器定义的所有样式

```css
//通过选择器继承继承样式
.error {
  border: 1px solid red;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```

