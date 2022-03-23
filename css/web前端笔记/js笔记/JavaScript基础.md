### JavaScript发展历程

1995年出现，由netscape公司研发，作者布兰登爱奇。

IE在javascript出现以后也在浏览器上添加了对于JS的支持，不过IE的标准和netscape的标准有所区别。为了统一，ECMA（欧洲计算机制造商协会）制定了一套标准ECMAScript-262。最新的标准版本是ECMAScript2018。

ES3：提供了JavaScript的所有基础语法

ES5：2009发布，对于JSON的支持是该版本的最大特点

ES6：2015发布，非常多的新特性，对于面向对象做了丰富的补充，完善JavaScript面向对象编程的体系。



### 一、JavaScript的使用

一、在浏览器中执行JavaScript代码

1.行内的JavaScript代码

直接将JavaScript代码写到HTML标签内，例如：

```
 <a href="javascript:" onclick="alert(123)">点我</a>
```

2.内嵌的JavaScript代码

将JavaScript代码写到网页的<script></script>，该标签有重要属性type，默认为text/javascript。如果要写type属性也一定要保证type="text/javascript"。

例如：

```
<body>
    <a href="javascript:" onclick="alert(123)">点我</a>
    <script>
        alert("hello world!")
    </script>
</body>
```

3.外部的JavaScript代码

将JavaScript代码写到后缀为.js的文件中，需要使用这段代码的网页，通过<script>标签引入这个js文件。

- 在项目中新建一个js文件夹，在该文件中新建一个以.js结尾的文件，将代码写到该文件中

![img](https://cdn.nlark.com/yuque/0/2021/png/12430968/1623813064255-6b251d1c-902e-4ffd-abee-43a417223d03.png)

- 在需要使用上述js代码的网页中，使用<script src="js文件的路径"></script>将外部js文件引入到当前网页中来执行。
  ![img](https://cdn.nlark.com/yuque/0/2021/png/12430968/1623813085024-d2f79450-be84-473f-b19b-4c8c44b9371e.png)

三种JS的使用方式是共存的。



### 二、在NodeJS中运行JavaScript代码

1、安装NodeJS

下载地址：https://nodejs.org/en/

下载完成一直点next完成安装

2、检验安装是否成功

Window+R->输入cmd->回车->在cmd控制台中输入node -v 如果出现了版本号说明nodejs安装成功

![img](https://cdn.nlark.com/yuque/0/2021/png/12430968/1623813686931-35bc76d4-028c-4722-9d1c-8d1d97e3103e.png)

3、在计算机的任意位置新建一个.js结尾的文件，在文件中编写以下代码



```
console.log("hello world")
```

4、在js文件所处位置打开控制台，按住Shift+鼠标右键

在控制台中输入指令执行js代码

node js文件的名称

![img](https://cdn.nlark.com/yuque/0/2021/png/12430968/1623813984609-d53b4c67-6de5-4397-aba9-5c9e5037195d.png)

### 三、JavaScript中的输入和输出

输出：将信息显示在浏览器上

方式一：

document.write("hello world");

上述代码的作用是将括号中的内容输出网页中

注意使用document.write()输出内容时如果输出的内容时一段标签，那么浏览器将会将该内容以标签的形式展示出来

```
  <script>
    document.write("<h1>hello world!</h1>")
  </script>
```

这种方式使用的场景不多。

方式二：

alert("hello world");

上述代码的作用是以弹窗的方式显示内容

```
<script>
   alert("hello wrold");
</script>
```

使用弹窗给予用户友好的提示，但是样式不可修改，所以在真正的项目中如果要弹窗，一般是用html+css+javascript自己来实现的。

方式三：

console.log("hello world");

上述代码的作用是将信息输出到控制台，浏览器的控制台在F12中。主要用于前端的代码调试。



输入：

prompt("输入框的提示内容")

上述代码的作用是弹出一个带输入框的窗口，用户可以在输入框中输入内容，内容输入完毕点击确定，可以将信息输入到程序中。我们还需要将这段内容保存起来。

var name=prompt("请输入你的姓名");

用户输入的内容就会保存到name中

使用console.log(name)就可以看到用户输入的信息

### 四、数据类型

Number：数字类型，在JavaScript中要表达一个数字类型，直接使用数字即可。

String：字符串，由任意个字符构成的数据，表达字符串数据时需要将数据使用单引号或者双引号引起来。值得注意的是如果你的字符串中包含了单引号，那么外面只能用双引号。字符串中包含了双引号，外面只能用单引号。

**数字类型进行加法运算会按照数学运算方式进行加法，但是如果在一个加法算式中有任何一个操作数是字符串，加法就会变成字符串拼接，其结果也是一个字符串**

Boolean：布尔类型，布尔类型的数据只有两个可选值，true和false。不用引号。true代表的含义是真，false代表的含义是假。

Object：对象类型，对象类型是一个引用数据类型，是一个复合数据类型。

null：代表引用数据类型的变量的值是空的。

undefined：未定义，当一个变量没有初始化时，它的值就是undefined。

**基本数据类型在栈中存放的是值，引用数据类型在栈区存放的是地址。**

### 五、变量

变量即可变的量。

变量在编程语言用于存储数据，存储数据以后能够在后续通过变量的名称继续使用这个变量所存储的数据。

定义变量的语法：

**关键字(无关键字、var、let、const) 变量名称;**

变量名称的命名是由程序员来做的，但是要遵循一定的规范：

变量首先要遵循见名知义的原则

变量名中可以包含数字、字母、下划线

数字不能开头

变量名采用单驼峰（除了第一个单词之外的其他单词的首字母全部大写）

不能使用关键字

变量如果只声明不赋值，那么它的值是undefined，在使用变量前需要先给变量赋值。

给变量赋值的语法：

**变量名 =值;**

声明和赋值合二为一：

**关键字 变量名=值；**

使用变量变量只有两种读和写。

读：使用变量当前的值来进行运算、输出等等，直接使用变量名放到合适的位置即可。

写：用新的值覆盖变量原本的值，用变量名=值;重新赋值。

### 六、注释

注释就是程序在运行时不会执行的内容，注释的目的是对一些关键代码进行说明（给程序员看的）

注释分为单行注释和多行注释

单行注释：

注释一行，使用两个斜杠进行注释,例如:

//这是一段代码，他的作用xxxxx

多行注释，使用/*开头 多行注释 */结尾

/*

吧啦啦啦

巴拉啦

*/

### 七、运算符

运算符用于书写各种表达式，一共有5种运算符：

算术运算符、赋值运算符、比较运算符、逻辑运算符、三元运算符

#### 1、算术运算符

算术运算符用于书写算术表达式，算术表达式的结果一定是一个数字。

算术运算符有：+ - * / %（取余数）、

%是取余数的运算符，例如：10%3结果为1,3%10结果为3。

算术运算符的两侧可以出现变量、数字类型的值。

算术运算符在运算时，遵循先乘除后加减，从左到右依次运算，有括号先算括号的内容。

补充：

算术运算符还有两个：++、--

++和--作用是自加和自减，例如var num1=10;num1++;

在使用变量的同时如果对变量进行++或者--操作有一点要注意：那就是执行顺序的问题

当++写在变量之前时，var num1=10;console.log(++num1)结果应该是11；先运算然后使用新值，console.log(num1++)结果是10，先使用原来的值，然后在运算。

--和++类似。

#### 2、赋值运算符

赋值运算符用于赋值

赋值运算符有：=、+=、 -=、*=、/=、%=

=：将等号右侧的值赋值给等号左侧的变量，如果等号右侧是一个表达式，一定先计算出表达式的结果然后将结果赋值给左侧变量。

+=：用法：变量+=值；

例如：var num=10;num+=2;

运算顺序：首选取出num当前的值10，使用10+2得到12，最后将12赋值给num，num最终结果为12。根据他的运算顺序，+=也可以写作，num=num+2;

-=：用法和+=一致

例如：var num=10;num-=-10;可以写作num=num--10；

*=：num*=5;换算num=num*5;

/=：num/=10;换算num=num/10;

%=：num%=5;换算num=num%5;



#### 3、比较运算符

比较运算符用于书写条件表达式，只要是条件表达式结果一定是Boolean。

比较运算符有：

== ：判断两个数据是否相等，双等于在判断时不区分类型，也就是说1=='1'结果成立（true），1.5=='1.5'结果成立(true)

===：判断两个数据是否相等，三等于在判断时区分类型，只有类型相同且值也相同才判定为相等。

!=(!==)：不等于

\>=：大于等于

\>：大于

<=：小于等于

<：小于



#### 4、逻辑运算符

逻辑运算符主要用于拼接多个条件表达式

逻辑运算符有：&&、|| 、！
&&：并且、使用&&连接的多个条件表达式如果要成立，里面的每一个条件都必须成立。例如：要判断一个数字是否在某个1-100这个区间，写法为：num>=1&&num<=100。

||：或者、使用||连接的多个条件表达式中只要有一个小条件成立，结果就成立。

!：在一个条件表达式的结果上取反



#### 5、三元运算符

语法：条件表达式?值1:值2

执行逻辑：当前面的条件表达式为true时，三元表达式的最终结果为值1，前面的条件为false时，最终结果为值2。

案例：在不使用求模的情况下计算余数

用到的新语法：parseInt(小数或者字符串)：将小数或者字符串转为整数，转换的方式是直接砍掉小数位

var num1=10;

var num2=3;

var yu=num1<num2?num1:num1-parseInt(num1/num2)*num2;

### 八、程序结构

三大程序结构：顺序执行结构、选择执行结构、循环执行结构

#### 顺序执行结构

顺序结构指程序会从上到下逐行执行

#### 选择执行结构

程序会根据不同的情况选择执行不同的代码块

在JavaScript中选择结构有两种：if选择结构和switch选择结构

##### if选择结构



**独立if结构：**

语法：

**if(条件表达式或布尔变量){**

​	**代码块**

**}**

执行逻辑：

![img](https://cdn.nlark.com/yuque/0/2021/jpeg/12430968/1623896764004-aad8471f-13a9-43c2-a0d1-e51cb8276b02.jpeg)

应用场景：有一段代码要么执行要么不执行的情况

```
console.log("出门");
var time=9.5;
if(time<9){
    console.log("吃早饭");
}
console.log("进教室");
```

**if-else结构：**

语法：

if(条件){

代码块

}else{

代码块

}

执行逻辑：

![img](https://cdn.nlark.com/yuque/0/2021/jpeg/12430968/1623897426140-9f9b41a5-9cdb-49f9-a8a5-9a9114bf9538.jpeg)



应用场景：需要在两段代码中选择其中一段来执行

```
console.log("出门");
var time=9.5;
if(time<9){
    console.log("吃小面");
}else{
    console.log("吃包子，边跑边吃");
}
console.log("进教室");
```

**多重分支的if结构：**

语法：

if(条件){

代码块

}else if(条件){

代码块

}else if(条件){

代码块

}......else if(条件){

代码块

}else{

代码块

}

执行逻辑：

![img](https://cdn.nlark.com/yuque/0/2021/jpeg/12430968/1623898138610-cdfe0be7-8b4d-4d3a-a016-a2f1019a90e6.jpeg)

```
console.log("出门");
var time=7.5;
if(time<9.5&&time>=9){
  console.log("吃包子");
}else if(time<9&&time>=8.5){
  console.log("吃小面");
}else if(time<8.5){
  console.log("吃拉面");
}else{
  console.log("吃板子");
}
```

总结：

一个完整的if结构必须包含if

一个完整的if结构可以有0-∞个else if

一个完整的if结构可以有0-1个else

多重分支的if结构会从上到下依次判断条件，只要有任何一个条件成立执行代码块之后，就结束整个if结构。如果所有的条件都不成立，有else执行else的代码块。

多个独立的if结构之间互不影响

**switch选择结构：**

```javascript
var week = 1;
        switch (week) {
            case 1:
                console.log("周考");
                break;
            case 2:
                console.log("学习");
                break;
            case 3:
                console.log("学习");
                break;
            case 4:
                console.log("学习");
                break;
            case 5:
                console.log("学习");
                break;
            case 6:
                console.log("周总结");
                break;
            case 7:
                console.log("上分");
                break;
            default:
                console.log("异常输入");
                break;
        }
        //默认今年是平年,输入一个月份,输出这一月有多少天
        var month=parseInt(prompt("请输入月份"));//字符串
        switch(month){
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                console.log(31);
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                console.log(30);
                break;
            case 2:
                console.log(28);
                break;
            default:
                console.log("异常输入");
        }
```



if嵌套：

在一个if选择结构的代码块中嵌套另外一个if选择结构，if嵌套用在需要进行多重判断的代码场景中

```
 //模拟登陆 如果用户名和密码都正确提示登陆成功，否则提示用户名和密码错误
var user="yanzu";
var password="123456";
//如果用户名错误则提示用户名不存在，在用户名存在的情况下才去判断密码，密码错误提示密码错误，正确提示登陆成功
if(user=="yanzu"){
  if(password=="666"){
    console.log("登陆成功");
  }else{
    console.log("密码错误");
  }
}else{
    console.log("用户名不存在");
}
```

#### 循环执行结构

循环结构指反复的执行同一段代码块

循环结构分为：for循环、while循环、do-while循环

for循环语法：for循环最基本的语法只需要保证括号中有两个分号即可，但是这种for循环是一个死循环，循环永远不会终止，在大多数情况下我们需要避免死循环的产生。

for(;;){

代码块

}

大多数情况下for循环的语法：

for(定义一个变量;循环条件;对变量的值进行修改){

代码块 

}

**循环一定包含的四大要素：**

**初始化变量：初始化变量的作用是可以通过该变量去写一个循环的条件**

**循环条件：循环条件决定了循环是否继续执行，当条件成立时循环才会继续执行**

**变量的迭代（修改变量的值）：控制循环在何时结束**

**代码块：循环反复去执行的代码**



在使用循环解决实际问题时，无外乎两种情况：

**固定次数的循环：**

**在固定次数的循环中，我们一定会定义一个数字类型的变量。使用该变量控制循环次数。要注意的时，定义变量时需要考虑该变量是否会参与到循环代码块中。**

**次数不固定的循环：**

**
**

while循环：

语法：

定义变量

while(循环条件){

代码块

变量迭代

}

do-while循环：

语法：

定义变量

do{

代码体

变量迭代

}while(循环条件);

**do-while循环和前面两种循环有一个区别是do-while循环会先执行一次代码体，然后在判断条件，如果条件成立执行下一次循环，如果不成立循环结束。**

#### 循环中的关键字

在循环的代码块中可以使用两个关键字，这两个关键字的作用是控制循环的执行流程。分别是：break和continue。

break：在循环体执行此代码，将会终止循环。在循环嵌套中，break只会终止它所在的这一个循环。

continue：在循环体执行此代码，本次循环将会结束，但是会继续执行下一次循环。

#### 循环嵌套

循环嵌套指在一个循环的循环体中，再写另外一个循环。三大循环结构之间可以随意嵌套。

循环嵌套的执行逻辑：外层循环执行一次，内层循环会完整的执行一遍。

例如:

for(var i=0;i<5;i++){

console.log("hello world");

for(var l=0;l<10;l++){

console.log("hello javascript");

}

}

### 九、数组

数据类型分为基本数据类型和引用数据类型。

数组是一种对象。一个数组类型的变量可以存储多个数据。

#### 1、数组的创建

语法：

- var 数组名称=new Array();创建一个初始长度为0的数组
- var 数组名称=new Array(长度);创建一个具备默认长度的数组
- var 数组名称=new Array(1,true,"张三");创建了一个长度为3的数组，而且每个空间中已经具备初始数据。
- var 数组名称=[1,true,张三];创建长度为3的数组，空间中已经具备初始数据，就是第三种的简化。

虽然创建数组的语法有三种。但是无论是哪种语法创建的数组，我们后续对数组进行的各种操作（取出数据、新增数据、插入数据、删除数据）是相同的。

#### 2、数组的操作

**取出数组中的数据：**

为了便于操作数组中的每一个数据，数组给每一个空间添加了一个序号，这个序号从0开始，向后依次递增。这个序号就是数组下标（索引）。我们可以通过数组下标访问数组中某一个空间。

由于下标是从0开始的，所以我们一个数组的下标就在0-（数组长度-1）这个区间范围内。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/12430968/1623997791796-e2198806-476f-4b6b-805f-0db9527e536f.png)

语法：

读取数组某个空间中的数据：数组名称[下标]，如果下标超出了数组的界限取出的数据时undefined。

修改数组某个空间中的数据：数组名称[下标]=数据；

**查找数组中的数据：**

要查找数组中的数据，必定要将数组中的每一个数据都取出来进行比对。那么就需要使用循环遍历数组的每一个数据。循环遍历数组的基本结构：

**顺序遍历：**

**for(var i=0;i<数组.length;i++){**

**数组[i]**

**}**

**倒序遍历：**

**for(var i=数组长度.length-1;i>=0;i--){**

**数组[i]**

**}**

```javascript
//有一个数组存储班上5名同学的姓名，现在输入一个学生姓名，从数组中查找是否包含了这个学生。
var students=new Array();
students.push("张三");
students.push("李四");
students.push("王五");
students.push("赵六");
students.push("陈七");
//输入想要查找的学生姓名
var name=prompt("请输入学生姓名");
//遍历数组 使用数组的长度作为循环条件 students.length
var b=false;//表示不存在
for(var i=0;i<students.length;i++){
  if(students[i]==name){
    b=true;//标记为存在
    break;
  }
}
if(b==true){
  console.log("找到了");
}else{
  console.log("未找到");
}
```

**向数组中添加一个数据：**

语法：数组名称.push(数据); 在数组的末尾添加一个数据。

| push        | 在数组的末尾添加一个或多个数据               | var a=[1,2,3];a.push(4);a.push(7,10,100);                    |
| ----------- | -------------------------------------------- | ------------------------------------------------------------ |
| **unshift** | **在数组的头部添加一个或多个数据**           | **var a=[1,2,3];a.unshift(4);a.unshift(7,10,100);**          |
| **pop**     | **从数组的末尾取出一个数据并从数组中删除它** | **var a=[1,2,3];var num=a.pop();//a数组中的最后一个数据被删除** |
| **shift**   | **从数组的头部取出一个数据并从数组中删除它** | **var a=[1,2,3];var num=a.shift();//a数组中的第一个数据被删除** |

**使用数组实现栈结构：**

栈数据结构：先进后出

已知push函数是将数据从末尾添加到数组中，换句话说先进的数据在数组的前面，后进的数据在数组后面。js提供了一个pop函数，该函数可以将数组的最后一个数据弹出并删除。

在存数据时使用push函数，在取数据时使用pop函数，就能实现一个栈的数据结构。



**使用数组实现队列结构：**

队列数据结构：先进先出

js提供了一个shift函数，该函数可以将数组的第一个数据弹出并删除。

在存数据时使用push函数，在取数据时使用shift函数，就能实现一个队列的数据结构



**删除数组中指定的数据：**

- 遍历数组中的数据，查找待删除的数据是否存在于数组中（将下标记录下来进行判断）
- 如果存在待删除的数据，从查找到的这个数据位置开始遍历到数组的倒数第二位，依次将后面一位的数据赋值给当前位。
- 使用pop弹出最后一位无效数据

```javascript
 //初始化一个数组
var students=new Array("张三","李四","王五","赵六","陈七","王八");
//1.输入待删除的数据
var name=prompt("请输入要删除的学生姓名");
//2.从数组中查找待删除的数据位置
var index=-1;
for(var i=0;i<students.length;i++){
  if(students[i]==name){
    index=i;
    break;
  }
}
//3.如果找到了数据，从待删除的数据位置开始，后面一位的数据赋值给前面一位
if(index!=-1){
  for(var i=index;i<students.length-1;i++){
    students[i]=students[i+1];
  }
  //4.弹出最后一位
  students.pop();
  console.log(students);
}else{
  console.log("未找到该数据");
}
```

**在指定的数据之前插入一个数据：**

**有一个数组存储了从小到大的一些数据，现在输入一个数字，将该数据插入到它应该存在的位置保持数组数据从小到大的顺序。**

- 首先遍历数组，找到要插入的数据应该存放的位置。如果数组从小到大的，那么就应该找到第一个大于输入数据的位置。
- 通过修改数组的长度使数组的空间+1；数组.length++;
- 从数组的最后一个位置遍历到要插入的位置，依次将前一位的数据赋值给当前位置
- 将输入的数据赋值给数组的需要插入数据的位置

```javascript
 //初始化一个从小到大排列的数组
var numbers=new Array(1,5,7,10,23);
//1.输入要插入的数据
var n=parseInt(prompt("请输入一个整数"));
//2.遍历数组找到该数据应该存放的位置
var index=-1;
for(var i=0;i<numbers.length;i++){
  if(numbers[i]>n){
    index=i;//记录下插入位置
    break;
  }
}
if(index==-1){
    numbers.push(n);
}else{
    //3.从数组的末尾遍历到指定位置，将前一个数据赋值给当前位置
    //数组长度+1
    numbers.length++;
    for(var i=numbers.length-1;i>index;i--){
      numbers[i]=numbers[i-1];
    }
    //4.新数据赋值给指定的位置
    numbers[index]=n;
}
console.log(numbers);
```

#### 3、数组排序

**冒泡排序：两个相邻元素之间依次对比，如果不满足排列要求则交换顺序**

```javascript
var numbers=new Array(10,2,99,3,7);
for(var i=0;i<numbers.length-1;i++){
  for(var l=0;l<numbers.length-1-i;l++){
    if(numbers[l]>numbers[l+1]){
      var temp=numbers[l];
      numbers[l]=numbers[l+1];
      numbers[l+1]=temp;
    }
  }
}
console.log(numbers);
```

**选择排序：同一个位置的元素依次和后面的元素进行对比，如果不满足排列要求则交换顺序**

```javascript
var numbers=new Array(10,2,99,3,7);
for(var i=0;i<numbers.length-1;i++){
  for(var l=i+1;l<numbers.length;l++){
    if(numbers[i]>numbers[l]){
      var temp=numbers[i];
      numbers[i]=numbers[l];
      numbers[l]=temp;
    }
  }
}
console.log(numbers);
```

#### 4、数组的函数

调用函数的通用语法：数组名称.函数名称(数据)

**join函数**：

将数组中的每一个数据使用一个分隔符连接起来组成一个字符串。

语法：数组.join("分隔符")

```javascript
var arr=new Array("023","66668888");
var str=arr.join("-");
console.log(str);
//输出结果 023-66668888
```

**slice函数：**

将数组中从开始位置到结束位置之间的数据取出并形成一个新数组，开始位置和结束位置可以自定义，新数组中包含了>=开始位置到<结束位置的数据。

语法：数组.slice(开始下标,结束下标)

```javascript
var students=new Array("ZHANG","LI","WANG","CHEN","HU");
var newStudents=students.slice(1,3);
console.log(students);
console.log(newStudents);
```

输出结果：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/12430968/1624071875220-688b7e97-bf1a-4274-99c5-315803a0c077.png)

**indexOf函数：**

从数组中查找某个数据，从前向后依次查找，找到则结束。如果没找到则结果为-1，如果找到则结果为该数据的下标

语法：数组.indexOf(数据)

**lastIndexOf函数：**

从数组中查找某个数据，从后向前依次查找，找到则结束。如果没找到则结果为-1，如果找到则结果为该数据的下标

语法：数组.lastIndexOf(数据)

**splice函数：**

splice函数具备多种功能：

**功能1：删除数组中的数据**

语法：数组.splice(删除的元素下标,连续删除的元素个数)

示例：

```
var students=new Array("ZHANG","LI","WANG","CHEN","HU");
students.splice(2,2);
console.log(students);
//输出结果 ["ZHANG", "LI", "HU"]
```

**功能2：在数组的指定位置插入数据**

语法：数组.splice(插入的位置,0,插入的数据)

示例：

```javascript
var students=new Array("ZHANG","LI","WANG","CHEN","HU");
students.splice(3,0,"彦祖");
console.log(students);
//输出结果  ["ZHANG", "LI", "WANG", "彦祖", "CHEN", "HU"]
```

**功能3：替换指定位置的数据**

语法：数组.splice(替换的数据位置,1,替换的数据)

示例：

```javascript
var students=new Array("ZHANG","LI","WANG","CHEN","HU");
students.splice(3,1,"彦祖");
console.log(students);
//输出结果  ["ZHANG", "LI", "WANG", "彦祖", "HU"]
```

**sort函数：**

将数组按照指定顺序排序，对英文字符串数组排序会按照英文字母的排列顺序来排序。如果是数字默认会按照数字开头的阿拉伯数字的先后顺序来排列，而不是它的大小。

如果要让数组中的数字按照大小来排列，就必须传入一个参数，而这个参数是一个函数。

语法：

从小到大排序:

```javascript
数组.sort(function(num1,num2){
    return num1-num2;
})
```

示例：

```javascript
var students=new Array(3,1,11,22);
students.sort(function(num1,num2){
  return num1-num2;
});
console.log(students);
//输出结果 1 3 11 22
```



从大到小排序:

```javascript
数组.sort(function(num1,num2){
    return num2-num1;
})
```

示例：

```javascript
var students=new Array(3,1,11,22);
students.sort(function(num1,num2){
  return num2-num1;
});
console.log(students);
//输出结果 22 11 3 1
```

#### 5、多维数组

多维数组指数组中的元素是数组组成的..。

创建二维数组的方式：

先创建外层数组：

var arr=new Array();

循环给外层数组中的每一个元素赋值为一个数组：

在这个步骤中，既可以使用循环依次给每一个元素赋值为一个数组（外围数组长度已经固定）,也可以使用push函数向数组中添加数组数据（外层数据没有声明长度）。

示例：

```javascript
//定义外层数组 长度为5
var students=new Array(5);
//循环5次录入学生信息
for(var i=0;i<students.length;i++){
  var name=prompt("请输入学生姓名");
  var sex=prompt("请输入学生性别");
  var age=prompt("请输入学生年龄");
  students[i]=new Array(name,sex,age);
}
console.log(students);
```

二维数组中的遍历：

示例：

```javascript
var students=new Array(5);
students[0]=new Array("张三","男",18);
students[1]=new Array("李四","女",16)
students[2]=new Array("王五","男",17)
students[3]=new Array("赵柳","女",16)
students[4]=new Array("陈七","男",19)
//遍历出内层数组中的每一个数据
for(var i=0;i<students.length;i++){
  for(var l=0;l<students[i].length;l++){
    console.log(students[i][l]);
  }
}
```

二维数组中的查找：

在学生信息的二维数组中找到王五：

```javascript
var students=new Array(5);
students[0]=new Array("张三","男",18);
students[1]=new Array("李四","女",16)
students[2]=new Array("王五","男",17)
students[3]=new Array("赵柳","女",16)
students[4]=new Array("陈七","男",19)
var index=-1;
for(var i=0;i<students.length;i++){
  if(students[i][0]=="王五"){
    index=i;
    break;
  }
}
if(index!=-1){
  console.log(index);
}else{
  console.log("未找到");
}
```

二维数组中的排序:

按照学生年龄对学生进行选择排序

示例：

```javascript
var students=new Array(5);
students[0]=new Array("张三","男",18);
students[1]=new Array("李四","女",16)
students[2]=new Array("王五","男",17)
students[3]=new Array("赵柳","女",16)
students[4]=new Array("陈七","男",19)
for(var i=0;i<students.length-1;i++){
  for(var l=i+1;l<students.length;l++){
    if(students[i][2]>students[l][2]){
      var temp=students[i];
      students[i]=students[l];
      students[l]=temp;
    }
  }
}
console.log(students);
```

使用sort函数来排序

示例：

```javascript
var students=new Array(5);
students[0]=new Array("张三","男",18);
students[1]=new Array("李四","女",16)
students[2]=new Array("王五","男",17)
students[3]=new Array("赵柳","女",16)
students[4]=new Array("陈七","男",19)
students.sort(function(a,b){
  return a[2]-b[2];//按照年龄升序升序
});
console.log(students);
```

### 十、函数

#### 1、定义函数和使用函数

函数是代码的容器，通过函数可以将一段代码保存下来，然后后续可以通过函数重复的使用这段代码。

系统函数和自定义函数

系统函数就是由JS默认就保存好了的函数，每一个函数具备特有的功能。

自定义函数就是根据自己的需求将部分代码存到一个函数中以便于后续的重复使用。

**定义函数的语法：**

**function 函数名称(参数列表){**

**函数封装的代码体**

**}**

**调用函数的语法：**

**函数名称(参数);**

**函数即可以在script的外层调用也可以在函数中调用另外一个函数**

参数：参数是函数在执行时所需要的数据，这些数据函数本身无法获取，需要从函数外部传入。

无参函数：无参函数指参数列表为空的函数

```
function fun(){
}
fun();
```

带参函数：函数的执行需要一些外部的数据，在定义函数时需要指定形参，调用函数时需要传入实参。

形参：在定义函数时写在函数括号中的变量

实参：在调用函数时写在函数括号中的数据

```
function print(text){
  console.log(text);
}
print("吴彦祖")
print("张学友");
```

带多个参数的函数：当一个函数运行需要多个参数时，在定义函数时指定多个形参，调用函数时可以传入多个参数

注意：一个函数定义了形参，但是在执行函数时可以不传入实参，不传入实参的这个形参的值是undefined。代码可以正常运行，但是执行结果可能异常。

```
//简单的计算器函数 计算2位数的简单的四则运算
function computer(num1,num2,type){
  //没有传type时默认为加法运算
  if(type==undefined){
    console.log(num1+num2);
  }else{
    if(type==1){
      console.log(num1+num2);
    }else if(type==2){
      console.log(num1-num2);
    }else if(type==3){
      console.log(num1*num2);
    }else if(type==4){
      console.log(num1/num2);
    }else{
      console.log("请传入正确的计算类型(1/2/3/4)");
    }
  }
}
computer(10,30,3);
```

**返回值：当函数执行结束，返回给外界的数据**

带返回值的函数：

```
function fun(num1,num2){
  return num1+num2;
}
var r=fun(20,30);
console.log(r);
```

**注意：一个函数执行完毕只能返回一个返回值**

return关键字的用法：

**return后不跟任何数据，表示结束函数的运行。**

**return后跟了一个数据，函数会结束的同时将后面的数据作为返回值返回到函数调用处。**

函数补充：

参数可以是任何类型包括Number、String、Array、Function

引用数据类型和基本数据类型在传参时的差异，由于引用数据类型存储的值是一个地址，当你将引用数据类型的数据赋值给另外一个变量时，其实是将地址赋值给了另外一个变量，此时，这两个变量指向了同一段内存空间，修改任何一个空间中的数据，两个变量保存的数据会同时改变。



匿名函数：

没有函数名称的函数就是匿名函数，例如function(num1,num2){return num1+num2};匿名函数主要用于为另外一个函数提供回调函数。所谓回调函数是在我们调用A函数时传入了一个B函数作为参数，在A函数的执行过程中会回过头来调用B函数。这就是回调函数。



#### 2、箭头函数

ES6中提出了箭头函数，箭头函数简化了定义函数的语法。

语法：

**var 函数名称=(参数)=>{代码体}**

```
 var p=(text)=>{
   console.log(text);
 }
 p("你好");
```

当代码只有一个表达式时，可以省略大括号，并且会默认返回表达式的值

```
var f=(num1,num2)=>num1+num2;
var r=f(1,2);
console.log(r);
```

### 十一、定义变量的四个关键字的区别

定义变量的四种关键字：无关键字、var、let、const

作用域：

无关键字，无论变量定义在哪个位置都是全局变量。很容易造成全局变量的污染，k

var关键字，该变量定义在什么位置，作用域就在这一对括号中（如果是写在script中，就是全局变量）。**比较特殊的情况var具备变量作用域提升的特点。也就是说无论你在函数的那个位置定义的该变量，都默认将该变量提升到函数的第一行来定义。**

let关键字，该变量定义在什么位置，作用域就在这一对括号中（如果是写在script中，就是全局变量）。不**具备变量提升的特点，要使用该变量必须先声明后使用。****let还有一个更加重要的特性，就是块级作用域的特性，在循环中的每一次代码块的执行，所使用的的变量都是自己私有的**。

例如：

```javasc
for(let i=0;i<5;i++){
	setInterval(()=>{
		console.log(i);
	},3000);
}
//输出结果 0 1 2 3 4
```

const关键字,作用域和let一致，但是使用const定义的变量是常量，常量的值不可更改。

**在工作中，对象常用const来定义，基本数据类型常用let来定义，循环变量使用let来定义。**



### 十二、JavaScript内置对象

**对象是一种复合的数据类型，同时也是一种引用数据类型，对象可以保存很多属性和函数。**

JavaScript内置了一些对象，这些对象中保存了一些数据和函数，我们通过这些对象就可以直接使用这个函数和数据。

#### 数组对象的函数

**concat函数：将2个或者更多的数组数据拼接在一起，形成一个新的数组，然后返回该新数组**

实例：

```
 var a=new Array(1,2,3);
var b=new Array(4,5,6);
var c=new Array(7,8,9);
var d=new Array(10,11,12);
var e=a.concat(b,c,d);
console.log(e);
```

**reverse函数：将数组中的数据颠倒（第一位和最后一位调换位置，第二位和倒数第二位调换位置，以此类推）**

**向数组中追加数据：push()、unshift()**

**从数组中弹出数据：pop()、shift()**

**栈结构：push()+pop()  unshift()+shift()**

**队列结构：push()+shift() unshift()+pop()**

**indexOf函数：在数组中查找指定数据，如果找到则返回该数据在数组中的下标，找不到则返回-1，从前向后查找**

**lastIndexOf函数：在数组中查找指定数据，如果找到则返回该数据在数组中的下标，找不到则返回-1，从后向前查找**

**forEach函数：遍历数组的函数**

**forEach函数的参数是一个匿名函数，该匿名函数会在forEach函数的内部调用，这种函数又被称为回调函数。传入的回调函数要求有3个形参，分别是一次循环的数组的数据、正在循环的下标、数组本身。**

示例：

```
 var a=new Array(1,2,3);
var b=new Array(4,5,6);
var c=new Array(7,8,9);
var d=new Array(10,11);
var e=a.concat(b,c,d);
e.forEach(function(v,i,arr){
     console.log(i+":"+v);
});
```

**every函数：判断数组中的数据是否全部满足某个条件，当所有数据都满足某个条件时，返回true，否则返回false**

**示例：**

```
//判断数组中的数据是否都大于5
var c=new Array(7,8,9);
var b=c.every((v,i,a)=>v>5);
```

**some函数：判断数组中的数据是否至少有一个满足某个条件，当有一个数据满足某个条件时，返回true，否则返回false**

**示例：**

```
//判断数组中的数据是否都大于5
var c=new Array(7,8,9);
var b=c.some((v,i,a)=>v>5);
```

**filter函数：将数组中满足条件的数据保存在一个新数组中并返回**

**示例：**

```
//判断数组中的数据是否都大于5
var c=new Array(7,8,9);
var b=c.filter((v,i,a)=>v>5);
//b是一个数组,保存了c数组中大于5的数据
```

#### Math对象提供的常用方法

| **Math.E**           | 返回数学意义上的自然数          |                                                              |
| -------------------- | ------------------------------- | ------------------------------------------------------------ |
| Math.PI              | 返回圆周率                      |                                                              |
| Math.abs(参数)       | 返回某个数字的绝对值            | var n=Math.abs(-10);//n为10                                  |
| **Math.floor(参数)** | 返回某个数字向下取整的结果      | var n=Math.floor(0.5);//n为0                                 |
| **Math.ceil(参数)**  | 返回某个数字向上取整的结果      | var n=Math.ceil(0.0001)//n为1                                |
| Math.round(参数)     | 返回某个数字四舍五入的结果      | var n=Math.round(0.56);//n为1 var m=Math.round(-0.56)//m为-1，负数计算原则是先+0.5，然后向下取整 |
| **Math.random()**    | 返回0-1之间的小数，包含0不包含1 | //随机0-100但是要包含100var ran=parseInt(Math.random()*101);//随机1-100即要包含1也要包含100var r= parseInt(Math.random()*100)+1;//随机30-50parseInt(Math.random()*21)+30;//如果要随机一个区间 parseInt(Math.random()*最大值和最小值之差)+最小值 |
| Math.pow(x,y)        | 返回x的y次方                    | Math.pow(2,3);//结果为8                                      |
| Math.sqrt(x)         | 返回x的平方根                   | Math.sqrt(9);//结果为3                                       |

#### **字符串对象提供的常用方法**

| **字符串.length**                        | **返回字符串中的字符个数**                                   | **var s="123abc.!@ $";console.log(s.length);//结果为11**     |
| ---------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **字符串.indexOf(字符串)**               | **在字符串中查找子串的位置，如果找到则返回下标，如果找不到则返回-1,从前向后查找** | **var s="abc123张三@#$张三李四";var index=s.indexOf("张三");console.log(index);//结果为6** |
| **字符串.lastIndexOf(字符串)**           | **在字符串中查找子串的位置，如果找到则返回下标，如果找不到则返回-1,从后向前查找** | **var s="abc123张三@#$张三李四";var index=s.indexOf("张三");console.log(index);//结果为11** |
| **字符串.charAt(index)**                 | **从字符串中取出index位置对应的字符**                        | **var s="abc123@#$张三李四";var t=s.charAt(3);console.log(t);//结果为1** |
| **字符串.charCodeAt(index)**             | **从字符串中取出index位置对应的字符的ASCII码**               | **var s="123abc";var code=s.charCodeAt(1);console.log(code);//结果为50** |
| **字符串.substr(index,numbers)**         | **返回字符串中从index为开始后面连续numbers个数的字符串，如果不传numbers默认截取到末尾** | **var s="abc123张三@#$张三李四";var b=s.substr(6,7);console.log(b);//结果张三@#$张三** |
| **字符串.substring(start, )**            | **返回字符串中从start开始到end位置结束中间的所有字符串，包前不包后，如果不传end，则截取到末尾** | **var s="abc123张三@#$张三李四"; var b=s.substring(6,7); console.log(b);//结果 张** |
| **字符串.split(分隔符)**                 | **根据字符串中的分隔符将字符串中的数据拆成一个数组，并返回** | **var s="1,3,5,7,12,135"; var arr=s.split(","); console.log(arr);//结果为 1 3 4 7 12 135的数组** |
| **字符串.replaceAll(原字符串,新字符串)** | **将字符串中的所有原字符串替换为新字符串，并返回**           | **var str="abc123dddabc";var newStr=str.replaceAll("abc","张学友");console.log(newStr);//结果为张学友123ddd张学友** |
| **字符串.toUpperCase()**                 | **将字符串中所有的小写英文字母转为大写并返回**               | **var str="abcAEDD";var s=str.toUpperCase();console.log(str);//结果：ABCAEDD** |
| **字符串.toLowerCase()**                 | **将字符串中所有的大写字母全部转为小写并返回**               | **var str="abcAEDD";var s=str.toLowerCase();console.log(str);//结果：abcaedd** |
| **字符串.trim()**                        | **删除字符串两侧的所有空白字符**                             | **var str="  Blanden Aich  "var newStr=str.trim();console.log(newStr);//结果 Blanden Aich** |

#### **日期对象的函数**

**如何获取日期对象**

**1、var time=new Date();//获取当前的系统时间**

**2、var time=new Date(1999,1,10);//获取1999年2月10号的日期对象**

**3、var time=new Date(1999,1,10,12,10,30);//获取1999年2月10号 12点10分30秒的日期对象**

**日期对象的重要函数：**

```
var time=new Date();//获取当前的系统时间
var year=time.getFullYear();//获取年份
console.log(year);
var month=time.getMonth();//获取月份 从0-11
console.log(month+1);
var date=time.getDate();//获取日期
console.log(date);
var day=time.getDay();//获取周几 0-6 星期天-星期六
console.log(day);
var hour=time.getHours();//获取小时数
console.log(hour);
var minute=time.getMinutes();//获取分钟数
console.log(minute);
var second=time.getSeconds();//获取秒数
console.log(second);
var milliSecond=time.getMilliseconds();//获取毫秒数
console.log(milliSecond);
var mmt=time.getTime();//获取从1970-1-1到time这个时间过去的毫秒数
console.log(mmt);
```

补充函数：

**setInterval(f,毫秒数);//每隔多少毫秒调用一次f函数**



