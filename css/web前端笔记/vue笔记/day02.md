# 回顾

~~~
1 三大框架 angular  react   vue
2 vue特点 :渐进式 按需引入
	 核心 :1 组件化  2 数据驱动(利用vue的响应式系统达到数据变，则页面变的目的)
	 响应式系统:vue只要检测到数据发生改变,则会重新渲染
	 虚拟dom：把template中的代码编译到内存形成虚拟dom，只要检测到数据改变，则内部通过patch(补丁)算法,把修改的数据和虚拟dom进行对比，最终以最小的代价进行页面的渲染
3 vuecli 脚手架的安装，通过vue create 项目名 进行项目的创建 (Babel插件-->高级转低级)
4 单文件组件(*.vue),由tempate   js    style 组成
5 js中: 
  export default{
  	 components:{
  	 	引入子组件
  	 },
  	 data(){
  	 	return {
  	 		//数据
  	 	}
  	 },
  	 methods:{
  	 	
  	 }
 
  }
5.5 {{}}
 6 指令:
   v-on:事件=""  --->@事件=""
   v-bind:属性="" --->:属性=""
   v-text/v-html
   v-show=""
   :class="{类选择名:boolean,......}" 和   :style="{样式的属性:值，。。。。。}"
     
~~~



# 事件修饰符

用来简化之前的阻止冒泡和阻止默认

## 以前

js的阻止冒泡:event.stopPropagation

原生：

~~~
    <style>
        #d1{
            width: 300px;
            height: 300px;
            border: 1px red solid;
        }
        #d2{
            width: 100px;
            height: 100px;
            border: 1px green solid;
        }
    </style>
</head>
<body>
        <div id="d1" onclick="ff(this)">
            <div id="d2" onclick="ff(this)"></div>
        </div>
</body>
</html>
<script>
    function ff(o){
        console.log(o.id);
        event.stopPropagation();
    }
</script>
~~~

js的阻止默认: event.preventDefault();

~~~

<body>
        <a href="http://www.baidu.com" onclick="ff()">跳转</a>

        <script>
            function ff(){
                event.preventDefault();
            }
        </script>
</body>
</html>
~~~



## vue

语法: @事件.事件修饰符=""

阻止冒泡: @事件.stop=""

~~~
         <div id="d1" @click="ff">
            <div id="d2"  @click.stop="ff"></div>
        </div>
~~~

阻止默认：@事件.prevent=""



使事件只发生一次 :     @事件.once=""

~~~
<a href="http://www.baidu.com" @click.prevent="ff2">跳转</a>
~~~

# 按键修饰符

语法:

~~~
@事件.按键修饰符=""
按键修饰符:enter、tab、delete、esc、space、up、down、left、right
~~~

~~~
比如：在文本框中输入回车键才会触发事件ff：
 <input type="text" @keyup.enter="ff()">
~~~

# 系统修饰符

语法:

~~~
@事件.系统修饰符=""
系统修饰符：ctrl、shift、alt
~~~

~~~
比如：在文本框中输入ctrl+回车键才会触发事件ff：
~~~

# 条件渲染

判断如果条件为真，则渲染，否则不渲染

语法:

~~~
<标签  v-if="boolean类型"
~~~

## v-if和v-show的区别

~~~
v-if是通过是否渲染来隐藏、显示元素
v-show是通过控制样式(display)来隐藏、显示元素
如果隐藏、显示切换频率大，则使用v-show,反之用v-if，也就是说
用v-if可以减少首屏的加载时间
~~~



## v-else

该语法必须搭配v-if,并且和v-if所在标签同级别，代表取反

如果v-if为真，则不渲染v-else,反之渲染

~~~
        <font v-if="isb">中国</font>
        <font v-else>美国</font>
        <button @click="isb=!isb">切换</button>
~~~



## v-else-if

该语法必须搭配v-if,并且和v-if所在标签同级别，代表下一个条件



~~~
        <font v-if="isb">中国</font>
        <font v-else-if="isb2">美国</font>
        <font v-else>日</font>
~~~



## 练习

~~~
点击按钮让钱+1，党加到一定的挡位后显示对应的内容，默认钱为1
如果钱低于3,则不吃,超过3,则吃面，超过5则吃饭，超过7则吃火锅,

<template>
    <div id="demo2">
            <!-- 1 点击按钮让钱+1，党加到一定的挡位后显示对应的内容，默认钱为1
如果钱低于3,则不吃,超过3,则吃面，超过5则吃饭，超过7则吃火锅, -->
     {{m}}
     <span v-if="m>7">吃火锅</span>
     <span v-else-if="m>5">吃饭</span>
     <span v-else-if="m>3">吃面</span>
     <span v-else>不吃</span>
     <button @click="m++">钱+1</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            m:1
        }
    }
}
</script>

<style>

</style>
~~~



## template

该标签在编译后不会真实存在，我们可以通过该标签来达到不产生无意义标签的目的

~~~
 <template v-if="isb">
      <font>中国</font>
      <font>美国</font>
      <font>日本</font>
    </template>

~~~



# 列表渲染

语法:

< 标签    v-for="item,index in arr"    :key=""

arr：data定义的数组

item:自定义变量代表数组中的每一个元素

index:自定义变量代表元素下标



:key="值"

值应该具有唯一性，这是vue建议添加的属性，添加该属性后，vue就知道数组中每一个元素得唯一标记，以后如果要修改元素时，vue

会自动根据该标记修改值而不是重新渲染整个数组----->提高性能





~~~
    <table border="1">
        <tr>
            <td>学号</td>
            <td>姓名</td>
            <td>年龄</td>
            <td>性别</td>
        </tr>
        <tr v-for="item in arr" :key="item._id">
            <td>{{item._id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.age}}</td>
            <td>{{item.gender==0?"女":"男"}}</td>
        </tr>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
       arr:[
        {_id:1,name:"张飞",age:28,gender:0},
        {_id:2,name:"荀彧",age:38,gender:1},
        {_id:3,name:"华佗",age:48,gender:0},
        {_id:4,name:"黄月英",age:58,gender:1},
       ]
    };
  },
~~~



## 练习:只渲染年龄>=40的学生

注意:

​	1 v-for 尽量不要和v-if 写在一起

   2 :key不能用在template中，只能用在真实的标签中

~~~
 <tr v-for="item in arr" :key="item._id">
           <template v-if="item.age>=40" >
                <td>{{item._id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.age}}</td>
                <td>{{item.gender==0?"女":"男"}}</td>
           </template>
        </tr>
~~~



# 补充：style和class的使用场景

~~~
class:    :class="{选择器:boolean}"   -->关注点是有还是没有该样式
style:    :style="{样式属性:值}" ---->关注的是值
~~~



# vue中获取节点得方法（不推荐）

ref和$refs

ref：用来设置标记

$refs:用来获取标记  --->通过this.$refs



## demo1：获取节点

~~~
<template>
    <div>
        <font id="f" ref="xx">中国</font>
        <span ref="xx2"></span>
        <button @click="ff">获取节点</button>
    </div>
</template>

<script>
export default {
    methods:{
        ff(){
           let f=this.$refs.xx;
           let s=this.$refs.xx2
           console.log(f);
           console.log(s);
        }
    }
}
</script>

<style>

</style>
~~~



## demo2：获取文本框得内容

~~~
<template>
    <div>
        <input type="text" ref="t">
        <button @click="ff">获取节点</button>
    </div>
</template>

<script>
export default {
    methods:{
       ff(){
           console.log(this.$refs.t.value);
       }
    }
}
~~~

# key的额外作用

1 :key一般使用在v-for中的，代表给每一个元素一个唯一的标志，以后如果数据发生变化，则vue会自动根据标志部分修改而不是全部重新渲染----》性能提升



2 :key 也能用于v-if v-else中。vue底层为了性能提升，会以最小的代价来改变元素，而不是每次都重新渲染。就会导致一些数据的残留，我们可以使用:key强制让vue做重新渲染

## demo：点击按钮，切换文本框和密码框，不让数据残留

~~~
<template>
    <div>
        <template v-if="isb" >
            账号<input type="text" :key="1">
        </template>
       
        <template v-else>
            密码<input type="password" :key="2">
        </template>

        <button @click="isb=!isb">切换</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
           isb:true
        }
    },
    methods:{
       change(){
   
           
       }
    }
}
</script>

~~~





