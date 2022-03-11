# 库和框架的区别

库：功能单一,比如jquery（节点操作）

框架：功能齐全,具有排他性,为程序提供了一整套的解决方案

一个项目只需要引入一个框架，而库可以引入多个库



# 前端三大框架

~~~
1 Angular 2009年  google 

2 React  2013年  FaceBook 

3 Vue   2014年  尤雨溪(负责人)

~~~

# 官网

~~~
https://cn.vuejs.org/

~~~

## 官方原话：

是一套用于构建用户界面的**渐进式框架**。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用

渐进式:类似于搭积木,我们可以**根据需求来引入项目的某些模块**



## vue版本

## 分为2.0和3.0

2.0(目前比较流行的版本)

3.0(以后的趋势,2019年9月份才出来的)



## vscode需要搭配的插件

~~~
1 vetur (识别vue的语法，有提示，有颜色)
2 AutoFileName(路径提示)
3 Vue 3 Snippets （语法提示）
~~~



## vue的使用

~~~
方式1：通过官网下载vue.js,把它引入到页面中
方式2：通过vue脚手架安装项目

我们一般使用vue多用于来写后台管理（而不是门户网站），因此为了性能，整个项目只有一个页面(单页面应用spa)，会采用
方式2来完成项目
~~~



## vue客户端和vue框架

vue客户端(vue-cli) --vue的脚手架(代码生成器,能够帮我们搭建好项目基本的环境,我们只需要在这个基础上开发业务即可)

vuecli的版本对应:



Vue cli 4.5以下----->vue2.0项目

Vue cli 4.5以及之上   ----->vue2.0和3.0项目



## Vue的核心

~~~
1 组件化（复用性）
2 数据驱动 (通过vue的响应式系统来完成的)

vue的响应式系统区别与bootstrap
bootstrap的响应式：根据屏幕大小来渲染成不同的页面---布局
vue的响应式:如果数据发生改变，则自动渲染 (程序员只需要关注数据，数据变，页面变)---》虚拟dom(性能高)

~~~

## 全局安装脚手架

~~~
npm i -g @vue/cli
如果报错无法识别则:
npm i -g '@vue/cli'

~~~

## 查看脚手架版本

~~~
vue -V或者vue --version

@vue/cli 4.5.13
~~~



# 通过脚手架创建vue项目

~~~
 vue create 项目名       --就会在当前路径下新建一个项目
  vue create D://...     -- 就会在指定路径下新建一个项目
  
注意：Babel插件：高级语法能够自动转为低级语法，vue里面的webpack才能够识别,因此，该插件必须安装

~~~

# 开服

~~~
npm run serve


注意:serve单词是依赖的package.json中的:
  "scripts": {
    "serve": "vue-cli-service serve",
  },
~~~



# vue项目结构

~~~
public：放唯一的页面

src:源码
	assets:放图片的
	components:放组件的(*.vue文件)  
	App.vue ：入口组件
	main.js: 入口js
	
~~~

​	       

注意：组件的取名规则:首字母大写+驼峰



# 单文件组件

在vue中提供了后缀为.vue的文件,我们称之为“单文件组件”,也就是说每一个vue文件就充当一个组件

vue组件的组成: 

~~~
<template>
   	<div>布局</div>
</template>

<script>
	用来写js业务逻辑

</script>

<style>
	用来写css样式的
</style>
~~~

注意:template下面必须只能有一个根节点



# 子组件的引入



vue的核心之一就是组件化，整个项目应该是有多个组件来构成的,因此，我们不推荐直接在App.vue中编码,而是通过子组件来引入

## 子组件的位置

所有的子组件应该放在src/components

## 1 引入子组件的步骤

在父组件中:

~~~

<script>
import 子组件对象 from './子组件地址'
export default {
    components:{
         自定义组件名:子组件对象
    }
}
</script>
~~~

## 2 渲染

在父组件中的template中可以把自定义组件名当成标签使用(全闭和/自闭和都可以)

~~~
<template>
    <div>
       	<自定义组件名/>
    </div>
</template>
~~~



# 练习:

~~~
1 app.vue中引入Demo1.vue和Demo2.vue
2 在Demo2.vue中引入Demo2_son.vue
~~~



# data数据的绑定和使用



我们需要把页面渲染的数据放在data函数中:

定义：

~~~
export default {
    data(){
        return {
            name:"张三",
            user:{username:"李四",password:"123"},
            arr:[1,2,3]
        }
    },
}
~~~

使用:通过{{变量}}渲染即可,注意只能放在标签体中，不能放在属性中

{{}}支持：

1 对象.

2 运算符

3  拼接

~~~
    data(){
        return {
            name:"张三",
            age:19
        }
    },
    
    <template>
    <div>
       <!-- <h1> {{user.username}}</h1> -->
       {{'我的名字是'+name}}
       {{`我的名字是${name}`}}
       {{age>=18?"成年":"未成年"}}
    </div>
</template>
~~~



## 面试题:为什么data要设计成函数而不是属性

由于data很特殊，一个vue就算分成多个组件，那么这写组件所使用的data指向同一个地址，如果一个组件改变可data的值，则会影响到其他组件;如果data设计成函数的话，则组件之间的data的作用域是互不影响

~~~

~~~

# 事件监听

vue提供了v-on的属性（指令），为元素设置事件的监听

## 语法:

~~~
<标签 v-on:事件="简单业务逻辑（赋值）"

~~~

## demo：点击按钮改变data中的name

~~~
<template>
    <div>
        {{name}}
        <button  v-on:click="name='李四'">改变</button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            name:"张三",
            age:19
        }
    }
}
</script>
~~~

## 面试题：虚拟dom （virtual dom）

~~~
简单点讲，在Vue的底层实现上，Vue将模板编译成虚拟DOM渲染函数。结合Vue自带的响应系统，在状态改变时(data数据改变时)，Vue能够智能地计算出重新渲染组件的最小代价并应到DOM操作上。(以打补丁的方式)

算法：patch
目的：性能优化
~~~



## 练习：简易计算

~~~
初始有两个数，值都为1
在页面中渲染成1+1=2
同时页面有两个按钮，分别是第一个数+1  和   第二个数+2
点击按钮时，页面会发生相应变化
~~~

~~~
<template>
    <div>
        {{n1}}+{{n2}}={{n1+n2}}
        <button  v-on:click="n1++">n1+1</button>
        <button  v-on:click="n2+=2">n2+2</button>
    </div>
</template>

<script>
export default {
    data(){
        return {
           n1:1,
           n2:1
        }
    }
}
</script>
~~~





## 练习：切换男女

~~~
<template>
    <div>
       {{gender}}
       <button v-on:click="gender=gender=='男'?'女':'男'">改变</button>
       <br>
       {{sex?'男':'女'}}
        <button v-on:click="sex=!sex">改变2</button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            gender:"男",//方式1
            sex:true//方式2
        }
    }
}
</script>

<style>
    span{
        color: red;
    }
</style>
~~~



# 指令

在vue中提供了大量的v-xx的指令用于不同的需求

位置：放在标签的属性中

比如事件：v-on



## v-text和v-html



v-html和v-text的作用：改变标签体中的内容

优先级:v-text/v-html优先级>{{}}

v-html和v-text区别：

v-html能够识别标签，而v-text不能

以后v-html、v-text、{{}}用哪个?

**推荐使用{{}},原因他很灵活**

使用:

~~~
 <span v-text="name"></span>
     data(){
        return {
            name:"张三",
        }
    }
~~~



## v-show

该指令的值必须是boolean,如果为true，则代表显示，反之代表隐藏

原理：元素本质是会渲染的，会通过display="none/block"来让其隐藏或显示

### demo:点击按钮隐藏或显示span标签

~~~
<template>
    <div>
       <span v-show="isb">中国</span>
       <button v-on:click="isb=!isb">切换</button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            isb:false
        }
    }
}
</script>

~~~

## v-bind

能够动态的描述标签的属性

语法:

~~~
<标签  v-bind:标签本身的属性="data中的变量"
简写:
<标签  :标签本身的属性="data中的变量"
~~~

~~~
<template>
    <div>
       <a v-bind:href="'http://www.baidu.com'">跳转</a>
       <a v-bind:href="url">跳转</a>
    </div>
</template>

<script>
export default {
    data(){
        return {
            url:"http://www.baidu.com"
        }
    }
}
</script>


~~~



# 本地图片的引入



如果是静态引入：和以前一样

如果是动态引入：必须用到require()语法

~~~
<template>
    <div>
       <img :src="src" alt="">
        <img :src="require('../assets/img/a2.jpeg')" alt="">
    </div>
</template>
<script>
export default {
    data(){
        return {
           src:require("../assets/img/a2.jpeg")
        }
    }
}
</script>

<style>

</style>
~~~

# CSS

分为全局样式和局部样式

## 1 全局样式

编写了样式后所有组件都有影响



### 1.1 外部引入css

~~~
1 在src下新建css
2 在vue文件中的<style>中通过@import ‘地址’  引入
<style>
    @import '../css/hello.css';
    @import '../css/hello2.css'
</style>
~~~

### 1.2 内部CSS

~~~
直接在<style>中编辑的样式也属于全局
~~~



## 2局部样式

只影响当前组件

### 2.1 内部CSS

**scoped**    可以使css样式仅应用于当前组件



~~~
<style scoped>
   xxxx
</style>
~~~



### 2.2 外部引入

注意：**用了外部引入之后内部的css会失效，必须重新开一个style标签**

~~~
<style scoped src="../css/hello.css">
   
</style>
<style scoped>
   	xxx
</style>

~~~

## 3 优先级

~~~
全局>局部
~~~



# 动态class和动态style



## 1 class

语法:

~~~
<标签  :class="{style中的类选择器:boolean类型,....}"
如果值是true，则代表该标签拥有该属性，反之没有
~~~

### demo:让标签具有两个样式

~~~
<template>
    <div>
        <span :class="{c,c2}">泰国</span>
    </div>
</template>
<script>

export default {
    data(){
        return {
            c:true,
            c2:false
        }
    }
}
</script>

<style>
    .c{
        color:red
    }
    .c2{
        font-size: 100px;
    }
</style>
~~~



## 2 style

语法

~~~
<标签  :style="{style中的属性:data中的数据,.........}"
~~~

~~~
<template>
    <div>
        <span :style="{color,fontSize}">泰国</span>
    </div>
</template>
<script>

export default {
    data(){
        return {
           color:"red",
            fontSize:"100px"
        }
    }
}
</script>
~~~



# 事件的处理

## 行内事件:

~~~
<标签  v-on:事件="简单赋值" 
~~~

## 定义函数事件:

~~~
<标签 v-on:事件="函数"

export default {
	methods:{
		函数(){}
	}
}

如果要在方法中使用data定义的数据则通过this.属性




<template>
    <div>
        <span>{{name}}</span>
        <button v-on:click="f1">改变</button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            name:"泰国"
        }
    },
    methods:{
        f1(){
         this.name="美国"
        },
    }

}
</script>

<style>
    
</style>



~~~

## 传参

~~~
 <button v-on:click="f1(1)">改变</button>
 
 
  methods:{
        f1(n){
            console.log(n);
         this.name="美国"
        },
    }
~~~



## event

1 如果没有传递实参，则形参中第一个参数就代表event

~~~
<template>
    <div>
       
        <button v-on:click="f1">改变</button>
    </div>
</template>
<script>
export default {
    data(){
        return {
           
        }
    },
    methods:{
        f1(e){
            console.log(e.target);
        },
    }

}
</script>




~~~



2 如果有实参，还想要用到event则需要传递$event关键词

~~~
<template>
    <div>
        <span>{{name}}</span>
        <button v-on:click="f1('a',$event)">改变</button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            name:"泰国"
        }
    },
    methods:{
        f1(a,e){
            console.log(a,e);
        },
    }

}
</script>

<style>
    
</style>


~~~

## 简写:

~~~
v-on:事件 可以简写为   @事件
~~~



总结目前简写学了2个：

~~~
1 动态属性 v-bind: ---> :
2 注册事件 v-on: ---> @
~~~













