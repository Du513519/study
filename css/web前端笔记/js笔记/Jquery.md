### 一、Jquery的使用

Jquery就是对DOM进行封装，给我们提供了更简洁的DOM操作方式。

搜索jquery关键字，去官网http://jquery.com。点击下载，下载的版本分为两种开发版和生产版。

生产版相对于开发版文件大小更小，加载更快，但是其中的代码全部写在了一行，不利于阅读。两者的执行效率没有任何区别。

生产版带min后缀，开发版不带min后缀。

将下载好的js文件放到项目js文件夹中，需要使用该框架的网页通过script标签引入该文件。

### 二、Jquery工厂函数

$是Jquery定义的一个函数，该函数根据传入的参数的不同能够实现不同的效果。

#### 1、传入一个函数

当我们向$函数中传入一个函数时，那么这个函数就绑定到了页面加载事件中。等同于window.onload。jquery的页面加载事件$(function)支持多个加载事件按照顺序执行。

```
$(function(){
})
```

#### 2、传入一个字符串（标签）

当我们向$函数中传入一个标签时，哪怕是一个拥有多个层级结构的复杂的标签都可以直接创建出该标签对象。jquery创建好标签以后会将标签封装到一个Jquery对象中，并存储在了该标签的0号属性下。如果要取出该标签对象应该使用创建好的Jquery对象[0]取出0属性的值。返回的Jquery对象中还包含了很多其他的函数，通过这些函数可以快捷的对该标签进行操作。

```javascript
  $(function(){
           var div=$("<div><div><ul><li>1</li><li>2</li></ul></div></div>");
  });
```

#### 3、传入一个字符串（选择器）

当我们向$函数中传入一个选择器时，其作用就变成了查找document标签对象。同样的道理查找到的标签对象也会封装在jquery对象中，按照从0开始的顺序依次保存在每一个属性之下。

| $("#id值")                   | 通过id查找标签                                               | var div=$("#div1");                 |
| ---------------------------- | ------------------------------------------------------------ | ----------------------------------- |
| **$("标签名称")**            | 通过标签名称查找标签                                         | var lis=$("li");                    |
| **$(".class值")**            | 通过标签的class值查找标签                                    | var lis=$(".red");                  |
| $("*")                       | 全局选择器                                                   | var es=$("*");;                     |
| **$("选择器1>选择器2")**     | **子选择器,和css相似选中的选择器1的标签内部满足选择器2的子标签** | **$("#ul1>li").css("color","red")** |
| **$("选择器1 选择器2")**     | 子选择器,和css相似选中的选择器1的标签内部满足选择器2的后代标签 | $("#ul1 li").css("color","red")     |
| $("选择器1,选择器2,选择器3") | 查找三种选择器选择的标签集合                                 |                                     |

| $("选择器:first")                    | 从前面选择器查找的标签中取出第一个标签                       | <ul id="ul1">    <li>1</li>    <li>2</li>    <li>3</li>    <li>4</li>  </ul>  <ul id="ul2">    <li>5</li>    <li>6</li>    <li>7</li>    <li>8</li>  </ul> $("ul li:first").css("color","red"); //只有1会被选中 |
| ------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| $("父选择器>标签选择器:first-child") | 从父选择器中选出每一个父标签中第一个子标签，父选择器后只能跟标签选择器 | <ul class="ul">    <li>1</li>    <li class="li">2</li>    <li class="li">3</li>    <li class="li">4</li>  </ul>  <ul class="ul">    <li>5</li>    <li>6</li>    <li class="li">7</li>    <li class="li">8</li>  </ul>  <script>    $(function(){     $(".ul>li:first-child").css("color","red");//1和5都会被选中    });  </script> |
| $("选择器:last")                     | 从前面选择器查找的标签中取出最后一个标签                     | <ul class="ul">    <li>1</li>    <li class="li">2</li>    <li class="li">3</li>    <li class="li">4</li>  </ul>  <ul class="ul">    <li>5</li>    <li>6</li>    <li class="li">7</li>    <li class="li">8</li>  </ul>  <script>    $(function(){     $(".ul>.li:last").css("color","red");//8被选中    });  </script> |
| $("父选择器 标签选择器:last-child")  | 从父选择器中选出每一个父标签中最后一个子标签，父选择器后只能跟标签选择器 | <ul class="ul">    <li>1</li>    <li class="li">2</li>    <li class="li">3</li>    <li class="li">4</li>  </ul>  <ul class="ul">    <li>5</li>    <li>6</li>    <li class="li">7</li>    <li class="li">8</li>  </ul>  <script>    $(function(){     $(".ul>li:last-child").css("color","red");    });  </script> |
| $("选择器:eq(index)")                | 从前面选择器选择出的标签中取出下标等于index的标签            | <ul class="ul">    <li>1</li>    <li class="li">2</li>    <li class="li">3</li>    <li class="li">4</li>  </ul>  <ul class="ul">    <li>5</li>    <li>6</li>    <li class="li">7</li>    <li class="li">8</li>  </ul>  <script>    $(function(){     var lis=$(".ul>li");     $(".ul>li:eq(2)").css("color","red");//3被选中    });  </script> |
| $("选择器:gt(index)")                | 从前面选择器选择出的标签中取出下标大于index的标签            | <ul class="ul" id="ul1">    <li>1</li>    <li class="li">2</li>    <li class="li">3</li>    <li class="li">4</li>  </ul>  <ul class="ul">    <li>5</li>    <li>6</li>    <li class="li">7</li>    <li class="li">8</li>  </ul>  <script>    $(function(){     $("#ul1>li:gt(0)").css("color","red");//2 3 4被选中    }); |
| $("选择器:lt(index)")                | 从前面选择器选择出的标签中取出下标小于index的标签            | <ul class="ul" id="ul1">    <li>1</li>    <li class="li">2</li>    <li class="li">3</li>    <li class="li">4</li>  </ul>  <ul class="ul">    <li>5</li>    <li>6</li>    <li class="li">7</li>    <li class="li">8</li>  </ul>  <script>    $(function(){     $("#ul1>li:lt(3)").css("color","red"); // 1 2 3被选中    }); |
| $("选择器:lt(index):gt(index)")      | 取出区间，注意两个选择器lt和gt是分步骤执行的，gt是在lt已经选择出的标签基础上在此取的范围 | <ul class="ul" id="ul1">    <li>1</li>    <li class="li">2</li>    <li class="li">3</li>    <li class="li">4</li>  </ul>  <ul class="ul">    <li>5</li>    <li>6</li>    <li class="li">7</li>    <li class="li">8</li>  </ul>  <script>    $(function(){     $("#ul1>li:gt(0):lt(2)").css("color","red"); // 2 3被选中    }); |
| $("选择器:odd")                      | 从前面选择器已经查找到的下标为奇数的标签，从序号上来说选择的是偶数 | <ul class="ul" id="ul1">    <li>1</li>    <li class="li">2</li>    <li class="li">3</li>    <li class="li">4</li>  </ul>  <ul class="ul">    <li>5</li>    <li>6</li>    <li class="li">7</li>    <li class="li">8</li>  </ul>  <script>    $(function(){     $("#ul1>li:odd").css("color","red");    });  </script> |
| $("选择器:even")                     | 从前面选择器已经查找到的下标为偶数的标签，从序号上来说选择的是奇数 | <ul class="ul" id="ul1">    <li>1</li>    <li class="li">2</li>    <li class="li">3</li>    <li class="li">4</li>  </ul>  <ul class="ul">    <li>5</li>    <li>6</li>    <li class="li">7</li>    <li class="li">8</li>  </ul>  <script>    $(function(){     $("#ul1>li:even").css("color","red");    });  </script> |

| $("选择器:has(选择器)")      | 从前面选择器选择出的标签中去查处其内部拥有后面选择器的标签   | <ul class="ul" id="ul1">    <li>1</li>    <li>2</li>    <li>3</li>    <li>4</li>  </ul>  <ul class="ul">    <a></a>    <li>5</li>    <li>33</li>    <li class="li">7</li>    <li class="li">8</li>  </ul>  <script>    $(function(){     $("ul:has(.li)").css("listStyle","none");//选择出的是第二个ul    });  </script> |
| ---------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| $("选择器:contains(字符串)") | 从前面选择器选择出的标签中去查处其内部包含某个文本的标签     | <ul class="ul" id="ul1">    <li>1</li>    <li>2</li>    <li>3</li>    <li>4</li>  </ul>  <ul class="ul">    <a></a>    <li>5</li>    <li>33</li>    <li class="li">7</li>    <li class="li">8</li>  </ul>  <script>    $(function(){     $("li:contains(3)").css("color","red");//选中的3 和 33    });  </script> |
| $("选择器:parent")           | 从前面选择器选择出的标签中查找拥有子内容的标签,标签或文本都算作子内容 |                                                              |
| $("选择器:empty")            | 从前面选择器选择出的标签中查找没有拥有子内容的标签,标签或文本都算作子内容 |                                                              |

| $("标签[属性名称]")     | 从前面选择器选择的标签中筛选出拥有某个属性的标签     |      |
| ----------------------- | ---------------------------------------------------- | ---- |
| $("标签[属性名称=值]")  | 从前面选择器选择的标签中筛选出属性等于某个值的标签   |      |
| $("标签[属性名称!=值]") | 从前面选择器选择的标签中筛选出属性不等于某个值的标签 |      |
| $("标签[属性名称*=值]") | 筛选出属性包含某个值                                 |      |
| $("标签[属性名称^=值]") | 筛选出属性以某个值开头                               |      |
| $("标签[属性名称$=值]") | 筛选出属性以某个值结尾                               |      |

 [:button](https://www.jquery123.com/button-selector/)

选择所有按钮元素和类型为按钮的元素。

[选择器](https://www.jquery123.com/category/selectors/) > [表单](https://www.jquery123.com/category/selectors/form-selectors/) | [选择器](https://www.jquery123.com/category/selectors/) > [jQuery 扩展](https://www.jquery123.com/category/selectors/jquery-selector-extensions/)

 [:checkbox](https://www.jquery123.com/checkbox-selector/)

选择所有类型为复选框的元素。

[选择器](https://www.jquery123.com/category/selectors/) > [表单](https://www.jquery123.com/category/selectors/form-selectors/)

[:checked](https://www.jquery123.com/checked-selector/)

匹配所有勾选的元素。

[选择器](https://www.jquery123.com/category/selectors/) > [表单](https://www.jquery123.com/category/selectors/form-selectors/)

[:disabled](https://www.jquery123.com/disabled-selector/)

选择所有被禁用的元素。

[选择器](https://www.jquery123.com/category/selectors/) > [表单](https://www.jquery123.com/category/selectors/form-selectors/)

[:enabled](https://www.jquery123.com/enabled-selector/)

选择所有可用的（注：未被禁用的元素）元素。

[选择器](https://www.jquery123.com/category/selectors/) > [表单](https://www.jquery123.com/category/selectors/form-selectors/) | [选择器](https://www.jquery123.com/category/selectors/) > [jQuery 扩展](https://www.jquery123.com/category/selectors/jquery-selector-extensions/)

[:file](https://www.jquery123.com/file-selector/)

选择所有类型为文件（file）的元素。

[选择器](https://www.jquery123.com/category/selectors/) > [基础过滤](https://www.jquery123.com/category/selectors/basic-filter-selectors/) | [选择器](https://www.jquery123.com/category/selectors/) > [表单](https://www.jquery123.com/category/selectors/form-selectors/)

[:focus ](https://www.jquery123.com/focus-selector/)

选择当前获取焦点的元素。

[选择器](https://www.jquery123.com/category/selectors/) > [表单](https://www.jquery123.com/category/selectors/form-selectors/) | [选择器](https://www.jquery123.com/category/selectors/) > [jQuery 扩展](https://www.jquery123.com/category/selectors/jquery-selector-extensions/)

[:image ](https://www.jquery123.com/image-selector/)

选择所有图像类型的元素。

[选择器](https://www.jquery123.com/category/selectors/) > [表单](https://www.jquery123.com/category/selectors/form-selectors/) | [选择器](https://www.jquery123.com/category/selectors/) > [jQuery 扩展](https://www.jquery123.com/category/selectors/jquery-selector-extensions/)

[:input ](https://www.jquery123.com/input-selector/)

选择所有 input, textarea, select 和 button 元素.

[选择器](https://www.jquery123.com/category/selectors/) > [表单](https://www.jquery123.com/category/selectors/form-selectors/) | [选择器](https://www.jquery123.com/category/selectors/) > [jQuery 扩展](https://www.jquery123.com/category/selectors/jquery-selector-extensions/)

[:password ](https://www.jquery123.com/password-selector/)

选择所有类型为密码的元素。

[选择器](https://www.jquery123.com/category/selectors/) > [表单](https://www.jquery123.com/category/selectors/form-selectors/) | [选择器](https://www.jquery123.com/category/selectors/) > [jQuery 扩展](https://www.jquery123.com/category/selectors/jquery-selector-extensions/)

[:radio ](https://www.jquery123.com/radio-selector/)

选择所有类型为单选框的元素。

[选择器](https://www.jquery123.com/category/selectors/) > [表单](https://www.jquery123.com/category/selectors/form-selectors/) | [选择器](https://www.jquery123.com/category/selectors/) > [jQuery 扩展](https://www.jquery123.com/category/selectors/jquery-selector-extensions/)

[:reset ](https://www.jquery123.com/reset-selector/)

选择所有类型为重置的元素。

[选择器](https://www.jquery123.com/category/selectors/) > [表单](https://www.jquery123.com/category/selectors/form-selectors/) | [选择器](https://www.jquery123.com/category/selectors/) > [jQuery 扩展](https://www.jquery123.com/category/selectors/jquery-selector-extensions/)

[:selected ](https://www.jquery123.com/selected-selector/)

获取 select 元素中所有被选中的元素。

[选择器](https://www.jquery123.com/category/selectors/) > [表单](https://www.jquery123.com/category/selectors/form-selectors/) | [选择器](https://www.jquery123.com/category/selectors/) > [jQuery 扩展](https://www.jquery123.com/category/selectors/jquery-selector-extensions/)

[:submit ](https://www.jquery123.com/submit-selector/)

选择所有类型为提交的元素。

[选择器](https://www.jquery123.com/category/selectors/) > [表单](https://www.jquery123.com/category/selectors/form-selectors/) | [选择器](https://www.jquery123.com/category/selectors/) > [jQuery 扩展](https://www.jquery123.com/category/selectors/jquery-selector-extensions/)

[:text ](https://www.jquery123.com/text-selector/)

选择所有类型为文本的元素。

### 三、Jquery 节点操作

原生的DOM对象和Jquery对象的相互转换：

Jquery对象转为DOM对象：通过[下标]取出内部存储的DOM元素

DOM对象转为Jquery对象：$(DOM标签对象)

#### 1、创建一个标签

$("标签")创建一个标签，标签对象被封装到jquery对象中。

#### 2、向父标签中追加子标签

父标签对象.**append**(DOM标签对象或者Jquery创建的标签对象或者标签字符串)     向父标签中追加子标签（最后一个）

父标签对象.**prepend**(同上)                                            											向父标签中前插子标签（第一个）



子标签对象.appendTo(父标签对象)   作用同append

子标签对象.prependTo(父标签对象)  作用同prepend

#### 3、添加兄弟元素

标签对象A.**after**(标签对象B)  在标签对象A的后面添加一个标签对象B

标签对象A.**before**(标签对象B) 在标签对象A的前面添加一个标签对象B



#### 4、删除元素

标签对象.**empty**()  清空标签对象内部的内容 

标签对象.**remove**()  删除标签（包括内部的内容一起）

#### 5、查找元素

标签对象.**parent**()  获取父标签

标签对象.**closest**() 获取祖先元素，根据传入的选择器查找满足的第一个祖先元素

标签对象.**children**() 无参时获取所有子标签，还可以筛选，需要对子标签进行筛选时传入一个选择器作为参数

标签对象.**find**(选择器) 查找后代元素,必须传入一个选择器作为参数

标签对象.**next**()找与自己同级的下一个元素

标签对象.**nextAll**()找与自己同级且处于自己之后的所有元素

标签对象.**prev**()找与自己同级的上一个元素

标签对象.**prevAll**()找与自己同级且处于自己之前的所有元素

### 四、属性操作

标签对象.**attr**("属性名称")            	取出该标签的属性的值

标签对象.attr("属性名称","值")       设置该标签的属性的值

标签对象.**prop**("属性名称")             取出标签对象中该属性的值 

标签对象.prop("属性名称","属性值")          设置标签对象中该属性的值

标签对象.removeAttr("属性名称")  删除属性

**attr和prop都是可以获取属性和设置属性的函数**

区别：

**标签中的自定义属性，在该标签的对象中并不存在与它对应的属性**

attr可以获取标签上的属性和设置标签上的属性，prop只能获取对象中的属性

attr设置标签的原生属性时会同时给标签和对象都进行属性设置，prop只会给对象设置属性

使用attr获取一个多选框的选中状态，如果没有添加checked属性，则取出来的是undefined，使用prop取出来的是false



标签对象.**val**() 取出表单控件的值

标签对象.val(值) 设置表单控件的+++++值

标签对象.**html**() 取出双标签之间的内容

标签对象.html(值) 设置双标签之间的内容

标签对象.text() 取出双标签之间的文本内容

标签对象.text(值) 设置双标签之间的文本内容



### 五、样式操作

**ES5对象的新的表达方式：JSON，JSON是一种JS提出的对象数据格式，这种格式结构清晰，层次分明非常适合在不同的程序间交互数据。**

**JSON格式的语法：**

{}表示一个对象

[]表示一个数组

```
var obj={
  name:"张三",
  age:18,
  pet:{
    name:"徐坤",
    age:3,
    brand:"金毛",
    hobby:["唱","跳","打篮球"]
  },
  parent:[
    {
      name:"张三丰",
      relation:"父子"
    },
    {
      name:"李冰冰",
      relation:"母子"
    }
  ]
};
console.log(obj.parent[1].name);
```

**在前后端交互时，前端无法直接传入JSON对象到后端。所以我们需要将JSON对象转为JSON字符串，然后在传输给后端。**

**JSON字符串语法很严谨：所有的属性和值都需要使用双引号。**

**var json字符串=JSON.stringify(JSON对象);**

**在前后端交互时，后端无法直接传入JSON对象到前端。所以后端传输给我们的也是一个JSON字符串。**

**var json对象=JSON.parse(json字符串);**

**
**

标签对象.css("css样式名称")  取出css的样式值

标签对象.css("css样式名称","样式的值") 设置标签样式

标签对象.css({

color:"red",

fontSize:"12px"

})          

同时设置多个样式

**标签对象.css("css样式名称")  取出css的样式值**

**标签对象.addClass(类选择器名称) 向class中添加一个样式**

**标签对象.removeClass(类选择器名称) 从class中删除一个样式**

**标签对象.hasClass(类选择器名称)判断标签中是否有某个样式**



### 六、Jquery事件绑定

**事件绑定的第一种方式：**

标签对象.事件函数(function(){})

例如：

$("#id").click(function(){



})

如果我们调用click函数时没有带参数,该函数的作用就是触发该标签上的点击事件。和click等效的还有 标签对象.trigger("click")

其余的各种事件函数同理，传函数作为参数时是绑定事件，不传参数就是触发事件。

其余函数有:mouseover()、mouseout()、focus()、blur()、change()

**备注：jquery可以同时给一个标签绑定多个相同事件**



**事件绑定的第二种方式：**

标签对象.on("事件名称",function(){})

例如:

$("#id").on("click",function(){



})



on函数除了可以直接用于给某标签绑定事件之外，**还可以进行事件委托**。

事件委托的作用是提前给未来会新增到网页中的标签绑定事件

语法：

**父标签对象.on("事件名称","子标签选择器"，function(){});**

**
**

取消事件绑定：

标签对象.unbind("事件名称");



### 七、Jquery动画

Jquery利用计时器提前预设了一些动画效果：

```
$("#div").hide(3000).show(3000); //hide隐藏  show显示
$("#div").slideUp(3000).slideDown(3000);//slideUp隐藏  slideDown显示
$("#div").fadeOut(3000).fadeIn(3000);//fadeOut 隐藏  fadeIn显示
```

更多的时候我们需要自定义动画

标签对象.animate({css样式},时间,function(){在动画执行结束执行该函数})   在规定时间内将一个标签的样式修改为目标样式

