## DOM核心编程

### 前置重要知识

**对象**：对象是一种可以保存多个数据的数据类型，和数组的区别是对象存储数据是通过属性的名称来标识。数组是通过下标来标识。

对象的创建方式：

方式一：let 变量名=new Object();

方式二：let 变量名={}

方式三：let 变量名={属性名1:值1,属性名2:值2}

**属性**：对象中用于存储数据的标识符就是属性

属性的操作方式：

方式一：使用**对象名称.属性名称**访问对象的属性

方式二：使用**对象名称[属性名称]**访问对象的属性

两种方式的区别：

- 常规情况下使用第一种访问对象属性。

-  当属性名称是用一个变量来表示时，必须使用第二种方式，对象名.[变量]=>访问时变量的值对应的属性。

  

**伪数组**：

由于对象有[]访问属性这种语法，当我们故意将属性名从0开始递增的时候，在给对象添加一个length属性，此时我们可以使用操作数组的方式去操作对象，此时的对象就好像一个数组一样，这就是伪数组，但是区别是对象是不具备数组特有的函数的。



**数据之间的嵌套**:

数组与对象之间可以随意进行数据嵌套，通过这种方式可以组织出结构清晰数据量庞大的一组数据。这是以后前后端交互时的主要数据结构。

**JSON**:

JSON是一种轻量级的数据交换格式。

JSON的格式中规定了，对象使用{}来表达，数组使用[]来表达。

在前后端的交互中都是使用JSON这种格式在进行数据交互，但是数据交互并不能直接将对象数据进行传输。前后端数据交互只能是字符串，怎么将一个对象以字符串的形式传给后端。这就需要对对象数据进行转换。

将js对象转为JSON字符串：

**let text=JSON.stringify(对象)**

将JSON字符串转为js对象：（字符串必须是JSON格式）

**let obj=JSON.parse(text);**



### 一、BOM

BOM（Browser Object Model）浏览器对象模型。指JavaScript抽象出了和浏览器相关的一系列对象，并按照这些对象的关系组织成为一个树状的对象模型。

JavaScript抽象出的和浏览器相关的对象有：

![img](https://cdn.nlark.com/yuque/0/2021/jpeg/12430968/1624342481552-e384b01c-0a90-4d75-8274-06f946a5fda5.jpeg)

#### 1、window对象

window对象指浏览器窗口对象，该对象中保存了一些和窗口相关的数据以及对窗口的各种操作。

**使用window对象下的属性和函数，可以省略window关键字直接使用属性名和函数名。**

| window.innerHeight                                        | 获取窗口文档区域的可见高度                                   | var wh=window.innerHeight;                                   |
| --------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| window.innerWidth                                         | 获取窗口文档区域的可见宽度                                   | var ww=window.innerWidth;                                    |
| window.outerHeight                                        | 获取窗口整个的高度                                           | 如上                                                         |
| window.outerWidth                                         | 获取窗口整个的宽度                                           | 如上                                                         |
| window.screenX\|\|window.screenLeft                       | 获取浏览器左上角到屏幕左上角之间的间距，screenX和screenLeft不同的浏览器兼容性不一致，screenY和screenTop也是如此。 | ![image.png](https://cdn.nlark.com/yuque/0/2021/png/12430968/1624327864304-709014bd-1af3-4404-bd12-dd33449de32c.png) |
| **window.screenY****window.screenTop**                    |                                                              |                                                              |
| **window.scrollX**                                        | 获取横向滚动条的滚动距离                                     |                                                              |
| **window.scrollY**                                        | 获取竖向滚动条的滚动                                         |                                                              |
| window.open("新窗口中的网页地址","窗口名称","窗口的风格") | 新打开一个窗口，可以设置新窗口的大小、位置等等               |                                                              |
| window.alert("文本")                                      | 弹出一段提示框                                               |                                                              |
| window.prompt("文本")                                     | 弹出一个带输入框的提示框                                     |                                                              |
| window.confirm("文本")                                    | 弹出一个带2个按钮的提示框，当用户点击确定按钮时该函数返回true，当用户点击取消时，该函数返回false | var b=confirm("确定删除该条购物车信息吗?");console.log(b);   |
| **window.parseInt("数据")**                               | 将数据转换为整数并返回该整数                                 |                                                              |
| **window.parseFloat("数据")**                             | 将数据转换为小数并返回该数据                                 |                                                              |
| **window.setTimeout(函数,毫秒数)**                        | 在指定的毫秒数以后执行一次函数，该函数返回一个计时器对象，该计时器对象就是当前这个计时函数。通过这个计时器对象我们可以停止该计时器 | var t=setTimeout(()=>{   console.log(1);},2000);//在2000之后输出1 |
| **window.clearTimeout(计时器对象)**                       | 清除计时器                                                   | setTimeout(()=>{    console.log(1);    clearTimeout(t2);//在1s的时候清除了t2计时器  },1000)  var t2=setTimeout(()=>{//创建一个计时器对象，2秒后执行    console.log(2)  },2000);//在1秒后输出1 不会输出2 |
| **window.setInterval(函数,毫秒数)**                       | 每隔指定的毫秒数执行一次函数                                 | window.setInterval(()=>{ console.log("1"); },2000);//没1秒 输出1次1 |
| **window.clearInterval(计时器对象)**                      | 清除计时器                                                   |                                                              |

#### 2、location对象

location对象代表浏览器的地址栏对象。

location对象中有几个重要的属性：

一个网页的地址由以下部分组成：

**协议://主机地址:端口/资源名称？查询参数**

例如：

百度的地址：

https://www.baidu.com/index.html

协议是https

主机地址是www.baidu.com

端口是80，http协议默认的访问端口就是80，所以如果端口是80则可以省略

资源地址是index.html

| **location.href**   | 获取或者设置当前地址栏的地址，当修改href属性以后，网页会跳转到修改的网页地址 | location.href="index.html";location.href="http://www.baidu.com"; |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| location.host       | 获取网页所在的ip和端口                                       |                                                              |
| location.hostname   | 获取网页所在的ip                                             |                                                              |
| location.pathname   | 获取网页的名称                                               |                                                              |
| location.port       | 获取当前网页所在的端口                                       |                                                              |
| location.protocol   | 获取当前的协议                                               |                                                              |
| **location.search** | 获取网页上的查询参数，获取网页地址中?后面所有的内容，网页中传递参数时，就是在网页地址后添加问号，问号后面就是参数，格式是参数名称=值，如果多个参数，多个参数之间是&分隔 | 例如：网页地址http://localhost:5500/item.html?id=10010&userid=16现在要取出10010和16var p=location.search.substr(1);var params=p.split("&");for(var i=0;i<params.length;i++){  console.log(params[i].split("=")[1]);} |

#### 3、history对象

history对象代表浏览器的历史记录对象

| **history.back()** | 后退一个网页                                       | <a href="javascript:" onclick="b()">返回</a><script>    var b=()=>{      history.back();    }  </script> |
| ------------------ | -------------------------------------------------- | ------------------------------------------------------------ |
| history.forward()  | 前进一个网页                                       |                                                              |
| history.go(n)      | 前进或者后退n个网页,传入负数则是后退，传入整数前进 |                                                              |
| history.length     | 历史记录的网页数量                                 |                                                              |

#### 4、screen对象

| **screen.height** | 获取屏幕分辨率的高度 |      |
| ----------------- | -------------------- | ---- |
| **screen.width**  | 获取屏幕分辨率的宽度 |      |

### 二、DOM

DOM（Document Object Model）文档对象模型，JavaScript将一个document（一个html中的所有内容）中的所有标签都抽象为对象（标签对象、元素、节点），按照标签之间的层级结构组织成为一个模型。

通过该模型中的某个标签对象，我们可以去修改这个对象对应的标签。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/12430968/1624350250585-a3cb12e4-cc30-4a6b-8e32-3c65fe843caa.png)



#### 1、查找标签对象

通过document提供的函数所查找的标签对象

**通过各种函数所查找的标签对象中包含了该标签的所有属性。该对象还包含了这个标签对象之下的所有子标签。**

| document.documentElement                             | 取出html标签对象                                          |                                                              |
| ---------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------ |
| document.head                                        | 取出head标签对象                                          |                                                              |
| document.body                                        | 取出body标签对象                                          |                                                              |
| **document.getElementById("标签的id属性")**          | 在整个文档中查找id属性相对应的标签对象                    | <body>   <div id="d"></div>   <script>      var div=document.getElementById("d");      //div就是id=d的这个div标签对象   </script></body> |
| document.getElementsByTagName("标签名称")            | 在整个文档对象中查找对应的所有标签对象                    | <body>  <div id="div1">    <div id="d1"></div>  </div>  <div id="div2">    <div></div>  </div>    <script>    var divs=document.getElementsByTagName("div");    console.log(divs);    console.log(divs[0]);    console.log(divs[1]);  </script></body> |
| document.getElementsByName("name属性的值")           | 在整个文档对象中根据name属性的值查找多个标签              | <body>  <span name="t">111</span>  <span name="t">111</span>  <span name="t">111</span>  <span name="t">111</span>  <h1 name="t">222</h1>  <script>  var els=document.getElementsByName("t");  console.log(els);  </script></body> |
| **document.getElementsByClassName("class属性的值")** | 在整个文档对象中根据class属性的值查找多个标签             | body>  <span name="t" class="s">111</span>  <span name="t" class="s">111</span>  <span name="t" class="s">111</span>  <span name="t" class="s">111</span>  <script>   var els=document.getElementsByClassName("s");  console.log(els);  </script></body></html> |
| **document.querySelector("css的选择器")**            | 在整个文档对象中根据css选择器来查找1个标签                | <div id="div1">    <span class="span">1</span>  </div>  <div id="div2">    <span class="span">2</span>  </div>  <script>   console.log(document.querySelector("#div1"));  console.log(document.querySelector("#div2>.span"));  </script> |
| **document.querySelectorAll("css的选择器")**         | 在整个文档对象中根据css选择器来查找满足条件的所有标签对象 | <body>  <div id="div1">    <span class="span">1</span>  </div>  <div id="div2">    <span class="span">2</span>  </div>  <script>    console.log(document.querySelectorAll(".span"));  </script></body> |

#### 2、节点操作

在DOM的标准中，一个标签是一个节点、一个属性是一个节点、一个文本还是一个节点。

**在一个标签对象中查找和它相关的其他标签对象的方式**

| 标签对象.childNodes                 | 获取某个标签对象下面的所有子节点，取出的节点中包括空白的文本节点和子标签节点，空白文本节点是无意义的，取出的节点有一个属性名为nodeType表示了该节点的类型。当该值为1时表示是标签节点。 | <div id="div1">    <img id="img">    <div>      <a></a>    </div>  </div>  <script>    var div=document.getElementById("div1");    var child=div.childNodes;    console.log(child);    console.log(child[0].nodeType);    console.log(child[1].nodeType);  </script> |
| ----------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **标签对象.children**               | 获取标签对象中的所有子标签对象，不包含空白的文本节点         |                                                              |
| **标签对象.parentNode**             | 获取一个标签对象的父节点，这个父节点一定是一个标签           |                                                              |
| **标签对象.parentElement**          | 获取一个标签对象的父标签                                     |                                                              |
| **标签对象.previousElementSibling** | 获取标签对象同级的前一个标签                                 |                                                              |
| **标签对象.nextElementSibling**     | 获取标签对象同级的后一个标签                                 |                                                              |

####  

| **document.createElement("标签名称")** | 创建一个标签对象，该标签对象并不存在于文档模型中，所有在网页上并不会出现该标签 |      |
| -------------------------------------- | ------------------------------------------------------------ | ---- |
| **父标签对象.appendChild(子标签对象)** | 将一个子标签对象追加父标签内                                 |      |
| **父标签对象.removeChild(子标签对象)** | 通过父标签对象将自己的一个子标签删除                         |      |

#### 3、属性操作

属性操作指动态的设置标签的属性值。如果你设置的标签属性会使标签产生变化，那么我们修改了该属性就会同时引起标签的改变。

**通用的属性操作：**

| **标签对象.getAttribute("属性名称")**      | 获取标签对象某个属性的值 | <img src="img/meinv.jpg" id="img">  <script>    var img=document.getElementById("img");    console.log(img.getAttribute("src"));  </script> |
| ------------------------------------------ | ------------------------ | ------------------------------------------------------------ |
| **标签对象.setAttribute("属性名称","值")** | 设置某个标签某个属性的值 | <img id="img">  <script>    var img=document.getElementById("img");    img.setAttribute("src","img/meinv.jpg");    img.setAttribute("width","500");  </script> |
| **标签对象.removeAttribute("属性名")**     | 删除标签的属性           |                                                              |

#### 不同标签不同属性：

| **a标签对象.href**         | 获取或者设置超链接的地址 | a.href设置超链接地址,如果要屏蔽超链接的连接功能就将href属性设置为javascript: |
| -------------------------- | ------------------------ | ------------------------------------------------------------ |
| **img标签对象.src**        | 获取或者设置图片的地址   |                                                              |
| **输入框的对象.value**     | 获取或者设置输入框的值   | 文本框和密码框，value属性设置的就是文本框和密码框中的内容,按钮的value属性设置的是按钮的显示文本,单选框和多选框，value属性设置的是单选框所代表的的数据，该value值在提交表单时会提交到服务器,下拉框的value属性用于设置默认的下拉选项，当我们的option没有value值时我们通过option标签之间的文本来设置选中，如果option存在value属性则需要通过将下拉框的value值设置为option的value值来达到选中的效果。同时下拉框的value属性代表了提交到服务器的数据。 |
| **单选框和多选框.checked** | 设置单选框或者多选框选中 | 要使单选框或多选框选中，设置单选框或多选框的checked属性值为checked，checked的属性值为""、null、undefined就设置未选中 |
| **双标签对象.innerHTML**   | 设置双标签之间的html内容 | 既可以设置标签之间的文本，也可以设置标签的子标签             |
| **双标签对象.innerText**   | 设置双标签之间的文本内容 | 只能设置文本                                                 |

#### 4、样式操作

| 标签对象.style                    | 该属性返回一个CSS对象,该对象中存储了一个标签所有的行内样式，该对象的值可以读写。 | <head>  <style>    #div{      font-family: "楷体";    }  </style></head><body>  <div id="div" style="font-size: 16px;color: seagreen;">你好 地球</div></form>  <script>    var div=document.getElementById("div");    div.style.fontSize="36px";    console.log(div.style.fontFamily);    console.log(getComputedStyle(div).fontFamily);</script></body> |
| --------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| window.getComputerStyle(标签对象) | 该方法返回一个CSS对象，该对象中存储的是一个标签经过计算之后的最终样式，最终样式中包含了写在内部样式和外部样式中的内容，但是该CSS对象的样式是只读的，也就是我们无法通过该对象来修改样式 |                                                              |
| 标签对象.className                | 获取或设置一个标签对象的class属性值                          | var div=document.getElementById("div");div.className="div div1"; |
| 标签对象.classList                | 获取一个标签对象的所有class值，保存在一个对象中，提供了一个函数add，可以向class属性中添加一个值 | var div=document.getElementById("div");div.classList.add("div4"); |

### 5、事件

用户与网页交互的各种动作被称为事件。当与网页交互的动作发生时，可以执行某个具体的函数。

一个标签的同一个事件只能绑定一个函数，后绑定的函数会覆盖之前绑定的函数。

两种事件绑定方式的区别：

通过标签属性的方式绑定事件，如果要获取标签对象本身，需要在执行函数时传入this关键字作为参数。

通过标签对象.事件=function(){}这样的方式来绑定事件，在函数中直接使用this关键字则表示当前的标签对象。

常用事件列表：

| **load事件**   | 网页加载事件，在网页第一次加载完毕时，会触发该事件。如果有一部分代码在网页加载完毕之后采能去执行，那么这一段代码需要写到onload事件绑定的函数中 | 使用方式一：在body标签中通过onload属性绑定一个函数，例如<body onload="函数名称()"></body>使用方式二：通过window对象绑定网页加载事件 window.onload=()=>{      console.log("网页加载成功"); }; |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| resize事件     | 当网页窗口大小发生改变时，触发该事件。                       | 使用方式一：在body标签中通过onresize属性绑定函数，例如<body onresize="console.log(1);">使用方式二：通过window对象绑定页面大小改变事件window.onresize=()=>{      console.log("窗口在发生变化");} |
| **click事件**  | 鼠标左键单击事件，当你的鼠标在某个标签上进行点击动作，就会触发该事件 | 使用方式一：在想要添加事件的标签上，通过onclick属性绑定函数 <div id="div" onclick="fun1()">hahah</div> <script>    var fun1=()=>{      console.log("发生点击")    } </script>使用方式二：先找到想要添加事件的标签对象，通过该对象的onclick属性来添加事件 document.getElementById("div").onclick=function(){      console.log("1"); }上述两种方式的区别：在开发过程中，推荐大家使用第二种，更利于维护通过第二种方式也可以更方便的给新创建出的标签添加事件第一种方式如果要获取标签对象本身，需要在绑定函数时传入this实参。第二种方式通过对象绑定的事件，在函数中可以直接使用this关键字，表示的就是标签对象自己。第一种方式在函数中的this表示的window对象，第二种方式如果通过箭头函数来绑定的this也代表window。 |
| dblclick       | 鼠标左键双击事件，当你的鼠标在某个标签上快速进行连续两次点击动作，就会触发该事件 | 使用方式一：在想要添加事件的标签上，通过onclick属性绑定函数 <div id="div" ondblclick="fun1()">hahah</div> <script>    var fun1=()=>{      console.log("发生点击")    } </script>使用方式二：通过标签对象绑定事件document.getElementById("div").ondblclick=function(){      console.log(1); } |
| mousedown      | 鼠标按键按下事件，当按下任意一个鼠标按键时，会触发该事件     | 使用方式一：在标签上通过onmousedown属性来添加事件<div id="div" onmousedown="fun1()">hahah</div>使用方式二：通过标签对象来添加事件 document.getElementById("div").onmousedown=function(){      console.log(1); } |
| mouseup        | 鼠标按键弹起事件，当鼠标按键在按下以后再弹起会触发该事件     | 使用方式一：在标签上通过onmouseup属性来添加事件<div id="div" onmouseup="fun1()">hahah</div>使用方式二：通过标签对象来添加事件 document.getElementById("div").onmouseup=function(){      console.log(1); } |
| mousemove      | 当鼠标在标签上移动时，触发该事件                             | 使用方式一：在标签上通过onmousemove属性来添加事件<div id="div" onmousemove="fun1()">hahah</div>使用方式二：通过标签对象来添加事件 document.getElementById("div").onmousemove=function(){      console.log(1); } |
| **mouseover**  | 鼠标指向事件，当鼠标第一次移动到这个标签上时触发该事件，而且当我们从该标签内部移动到这个标签的子标签之上时，依然会触发这个事件。 | 使用方式一：在标签上通过onmouseover属性来添加事件<div id="div" onmouseover="fun1()">hahah</div>使用方式二：通过标签对象来添加事件 document.getElementById("div").onmouseover=function(){      console.log(1); } |
| **mouseout**   | 鼠标移出事件，当鼠标从某个标签上离开时触发该事件，而且如果我们从该标签进入自己的子标签区域也会触发该事件，从标签区域离开也会触发该事件 | 使用方式一：在标签上通过onmouseout属性来添加事件<div id="div" onmouseout="fun1()">hahah</div>使用方式二：通过标签对象来添加事件 document.getElementById("div").onmouseoout=function(){      console.log(1); } |
| **mouseenter** | 鼠标指向事件，当鼠标第一次移动到这个标签上时触发该事件，而且当我们从该标签内部移动到这个标签的子标签之上时，不会触发该事件 | 使用方式一：在标签上通过onmouseenter属性来添加事件<div id="div" onmouseenter="fun1()">hahah</div>使用方式二：通过标签对象来添加事件 document.getElementById("div").onmouseenter=function(){      console.log(1); } |
| **mouseleave** | 鼠标移出事件，当鼠标从某个标签上离开时触发该事件，如果我们从该标签进入自己的子标签区域不会触发该事件，从子标签区域离开也不会触发该事件 | 使用方式一：在标签上通过onmouseleave属性来添加事件<div id="div" onmouseleave="fun1()">hahah</div>使用方式二：通过标签对象来添加事件 document.getElementById("div").onmouseleave=function(){      console.log(1); } |
| **onscroll**   | 滚动条滚动事件，当网页滚动条发生滚动时，触发该事件           | 使用方式一：<body onscroll="fun1()">使用方式二：window.onscroll=function(){      console.log(1) } |
| **onfocus**    | 获取焦点事件，当输入框获得焦点时触发                         | 使用方式一： <input onfocus="fun1()" id="inp">使用方式二：document.getElementById("inp").onfocus=function(){} |
| **onblur**     | 失焦事件，当输入框失去焦点以后，触发该事件                   | 使用方式一： <input onblur="fun1()" id="inp">使用方式二：document.getElementById("inp").onblur=function(){} |
| onsubmit       | 表单提交事件，当提交表单时会首先触发该事件，然后根据该事件绑定的函数中的布尔返回值来决定是否真正的提交该表单 |                                                              |
| **onchange**   | 域改变事件，输入框的值发生改变时，触发该事件，重要用于下拉框级联改变。onchange也可以作用于普通的输入框，但是必须在输入框输入的额内容发生改变且失去焦点以后才能触发该事件 |                                                              |
| **oninput**    | 当文本框的内容发生改变时，触发该事件                         |                                                              |
| onkeydown      | 键盘按下事件，当键盘按键任意按下一个都会触发该事件，如果按住不放一直触发 | window.onkeydown=function(){      console.log(1);    } window.onkeyup=function(){      console.log(3); } window.onkeypress=function(){      console.log(2); } |
| onkeyup        | 键盘弹起事件，当键盘的任意一个按键按下并弹起后触发该事件     |                                                              |
| onkeypress     | 按住键盘的任意一个键，都会触发该事件                         |                                                              |



### 6、事件流

事件流是指事件朝某个方向流动性的进行触发。基本的事件流就是冒泡。

冒泡的过程：

1、某个标签的A事件触发以后（无论这个标签本身是否定义了该事件都可以触发），首先会判断当前的标签是否给该事件绑定了函数，如果绑定了函数则执行该函数（事件执行）

2、会依次向上查找这个标签的父标签，判断父标签上是否给该事件绑定了函数，如果绑定则执行该函数

3、一直找到body标签为止。

DOM0级事件就是在第5个知识点讲到的事件绑定方式，这种方式事件流只支持冒泡。

DOM2级事件是另外一种事件绑定方式，它的事件流同时涵盖了两个方向，冒泡和捕获。

DOM2级事件绑定方式：

**标签对象.addEventListener("事件名称",function(){},布尔值);**

**事件名称就是DOM0级事件去掉on**

**第二个参数时一个函数，代表了该事件绑定的函数**

**第三个参数是一个布尔值，它的作用是决定函数到底是在捕获阶段执行还是在冒泡阶段执行**

冒泡是从触发事件的标签开始向上流动到body标签，捕获从body标签向下流动到触发事件的标签。

DOM2级事件先捕获后冒泡，默认在冒泡阶段执行，如果在定义事件时第三个参数传入true，则会在捕获阶段执行函数。

### 7、事件源

当事件触发时，将与事件本身相关的一系列信息存储在了一个对象中，这个对象就是事件源对象。

事件源对象的获取:

```javascript
document.getElementById("a").onclick=function(e){
            //在一个事件的函数中使用事件源对象
            if(!e){
                e=event;
            }
            console.log(e);
        }
```



事件源对象的重要属性：

| e.keyCode       | 键盘事件触发时，按下的键盘按键编号                           | 主要用于回车登陆   |
| --------------- | ------------------------------------------------------------ | ------------------ |
| e.button        | 鼠标点击事件触发时，点击的鼠标按键编号，左键：0，中键：1，右键：2 | 用于自定义右键菜单 |
| e.clientX       | 获取鼠标事件触发时，相对于网页左上角的x坐标                  |                    |
| e.clientY       | 获取鼠标事件触发时相对于网页左上角的y坐标                    |                    |
| e.target        | 触发事件的标签对象，触发这个事件的源头对象                   |                    |
| e.currentTarget | 在事件流中正在处理的这个标签对象                             |                    |
| this            | 绑定事件的这个标签                                           |                    |