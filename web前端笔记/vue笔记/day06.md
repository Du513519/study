# 回顾

~~~
1 父传子 ：props  <子组件  :属性="data中的属性"
2 子传父 ：$emit  <子组件  @方法="methods中的方法"

axios:基于了promise对ajax的封装
get:
	1 axios({
		url:"",
		methods:"get",
		params:{}
	})
	
	2 axios.get("地址",{params:{}})
	
post:
	1 axios({
		url:"",
		methods:"post",
		data:{}
	})
	
	2 axios.post("地址",{})
~~~

#  事件总线（eventbus）

## 作用：

~~~
用于同级组件之间的传参

~~~

# 步骤

### 1 单独new一个vue实例,并且暴露

 bus.js

~~~
import Vue from 'vue'
const bus=new Vue();
export default bus;
~~~

### 2  在被调用方法的vue中注册监听,一般会用到mounted钩子

~~~
<script>
import bus from './bus.js'
export default {
    mounted(){
        //data就是传递过来的参数
        bus.$on('自定义方法名',function(data){

        })
    }
}
</script>
~~~

### 3 在调用方法的vue中触发监听

~~~
<script>
import bus from './bus.js'
export default {
    methods:{
        test(){
            bus.$emit("add",{name:"张三",age:18})
        }
    }
}
</script>
~~~

## 注意：关于this的指向

使用 bus.$on后，里面的this指向的已经不是当前组件而是bus对象，因此需要在使用bus.$on之前用一个变量来接受this，一般我们喜欢用let that=this;

~~~
<template>
    <div>
        Demo1内容
    </div>
</template>

<script>
import bus from './bus.js'
import axios from 'axios'
export default {
    data(){
        return{
            arr:[]
        }
    },
    mounted(){
        let that=this;
        //data就是传递过来的参数
        bus.$on('add',async function(data){
            console.log(data);
            //发送ajax
            let res=await axios.get("http://www.....");
            that.arr=res.data.result
        })
    }
}
</script>

<style>

</style>
~~~







# 插槽(slot)

## 概念

~~~
在vue中，引入的子组件标签中默认是不能放内容,为了解决这个问题，vue引入了插槽
更重要的原因是插槽可以减少组件的个数

~~~

## 做法

~~~
在子组件中通过<slot></slot>标签开槽，以后父组件引入子组件的过程中，就可以通过槽来传递数据
~~~

## 1 匿名插槽

父组件：

~~~
<Son><h1>我爱你</h1></Son>
~~~

子组件：

~~~
<template>
    <div>
        Son内容:
          <slot></slot>
    </div>
</template>
~~~



## 2 具名插槽

父组件:

~~~
<template>
    <div>
        <Son>
            <template v-slot:s1>
                <h1>我爱你1</h1>
            </template>
        </Son>
       <Son>
            <template v-slot:s2>
                <h2>我爱你2</h2>
            </template>
        </Son>
    </div>
</template>

简写:
v-slot:s1   ---->  #s1



<template>
    <div>
        <Son>
            <template #s1>
                <h1>我爱你1</h1>
            </template>
        </Son>
       <Son>
            <template #s2>
                <h2>我爱你2</h2>
            </template>
        </Son>
    </div>
</template>
~~~

子组件:

~~~
          <slot name="s1"></slot>
          <slot name="s2"></slot>
~~~



## 3 后备插槽(默认)

~~~
 <slot name="s1">默认值</slot>
 
~~~

## 4 作用域插槽

~~~
数据在子组件中，但是元素节点布局在父组件，我们就需要用到作用域插槽把子组件的内容传递给父组件，父组件拿到内容后通过业务逻辑融入到标签中最后一块插入到子组件

~~~

 子组件：（匿名）

~~~
  <slot :stu="stu" :stus="stus"></slot>
~~~

 子组件：（具名）

~~~
  <slot name="s1" :stu="stu" :stus="stus"></slot>
~~~



父组件：

~~~
        <Son>
           <template v-slot="xx">
               {{xx.stu}}
               {{xx.stus}}
               <span v-for="item in xx.stus" :key="item.id">{{item.name}}</span>
           </template>
        </Son>
~~~

父组件(具名)

~~~
        <Son>
           <template  v-slot:s1="xx">
               {{xx.stu}}
               {{xx.stus}}
               <span v-for="item in xx.stus" :key="item.id">{{item.name}}</span>
           </template>
        </Son>
~~~



## 面试题

1插槽的分类

~~~
匿名、具名、后备、作用域
~~~

2在vue中组件之间能够传递参数的手段:

~~~
props、自定义事件、bus、插槽

~~~

# 动态组件

组件之间可以切换(类似于tab选项卡)

vue提供了<component>标签来切换组件

## 步骤

~~~
<template>
    <div>
        <button @click="current='Son1'">son1</button>
        <button @click="current='Son2'">son2</button>
        <button @click="current='Son3'">son3</button>

        <component :is="current"></component>
    </div>
</template>

<script>
import Son1 from './Son1.vue'
import Son2 from './Son2.vue'
import Son3 from './Son3.vue'
export default {
    components:{
        Son1,
        Son2,
        Son3
    },
     data(){
       return{
            //对应components中的属性，并且用字符数据类型
            current:'Son2'
       }
    },
}
</script>

<style>

</style>
~~~



## keep-alive

默认情况下，组件一旦切换则会销毁，导致组件内部所填写的内容都清空了，如果想要缓存这些内容，需要用到

<keep-alive>标签容器  ---原理就是可以阻止组件执行destoryed



使用：用keep-alive标签包裹动态组件即可

~~~
        <keep-alive include="Son1,Son2">
            <component :is="current"></component>
        </keep-alive>
~~~

属性：

~~~
1 include="components定义的组件属性1，。。。。。。"  ---代表这些子组件可以被缓存
2 exclude="components定义的组件属性1，。。。。。。"  ---代表这些子组件无法被缓存
~~~

请注意：由于用到了keep-alive容器，导致组件被切换后无法执行destroyed(无法被销毁),以后再次切回该组件，也不再执行

created、mounted钩子函数(我们可能会在该钩子中发送ajax请求获取数据)

解决：换钩子:使用以下钩子每次切换组件都会执行

~~~
 activated(){
        console.log('进入该组件');
    },
    deactivated(){
        console.log('离开该组件');
  }
~~~



# 预检

当通过post方式跨域提交时，浏览的network会有两次请求：

~~~
第一次是 OPTIONS (预请求:浏览器用来检测服务器是否正常,不会返回任何数据)
第二次是 post (真正的请求)
~~~





# axios的封装1

axios提供了一个create的方法，能够返回自身(axios),我们能够在里面配置一个参数

~~~
import axios from 'axios'
let my_axios=axios.create({
    //提取公共的url
    baseURL:"http://localhost:3000",
    //超时报错毫秒
    timeout: 3000 
});
export default {
    data(){
        return{
            user:{}
        }
    },
    methods:{
        async register(){
            try{
                let res=await my_axios.post("/users/register",this.user);
                console.log(res.data);
            }catch(e){
                alert("服务器异常")
            }
        }
    }
}
</script>
~~~



# axios的封装2

步骤1：src/新建http目录,在该目录下新建axios.js

~~~
import axios from 'axios'
export default axios.create({
    //提取公共的url
    baseURL:"http://localhost:3000",
    //超时报错毫秒
    timeout: 3000
});

~~~

步骤2：挂载到全局(vue的原型)

main.js中:

~~~
//引入自己的axios.js
import axios from './http/axios.js'
Vue.prototype.$axios=axios;
~~~



步骤3：以后在任意组件中通过this来获取

~~~
 methods:{
        async register(){
            try{
                let res=await this.$axios.post("/users/register",this.user);
                console.log(res.data);
            }catch(e){
                alert("服务器异常")
            }
        }
    }
~~~



# axios的封装3

## 拦截响应

更改axios.js:

~~~
import axios from 'axios'
//创建axios对象，顺便配置url、超时
let myaxios=axios.create({
    //提取公共的url
    baseURL:"http://localhost:3000",
    //超时报错毫秒
    timeout: 3000
});

//拦截响应
myaxios.interceptors.response.use(config=>{
    console.log(config);
    return config.data
})
export default myaxios

~~~

# axios的封装4

http/modules目录：用来分模块

​	modules装各种模块.js(user.js,stu.js)

​    这些js：用来封装所有的请求方法

http/const.js:用来封装常量(地址)

http/api.js:合并modules模块的



相关代码：

## http/modules/user.js:

~~~
import axios from  '../axios.js'
import {USERS} from '../const.js'

//注册
function register(data){
   return axios({
       url:USERS+"/register",
       method:"post",
       data
   })
} 
//登录
function login(params){
    return axios({
        url:`${USERS}/login`,
        method:"get",
        params
    })
 } 

export default {register,login}




~~~

## http/api.js

~~~
import users from './modules/user.js'
export default {
    users,
}
~~~



## http/const.js

~~~
export const USERS="users";
~~~



## main.js (把api挂载到全局)

~~~
import api from './http/api.js'
Vue.prototype.api=api;
~~~



## vue

~~~
    methods:{
        async register(){
            try{
                let res=await this.api.users.register(this.user);
                console.log(res);
            }catch(e){
                alert("服务器异常")
            }
        }
    }
~~~





# 回顾：前端的暴露和引入问题

~~~
如果前端暴露使用标准的方式:
export let a=1
export const b="中国"
则引入必须用{}解构
import {a,b} from '地址'


如果前端暴露使用default的方式:
let a=1;
const b="中国"
export default {
	a,b
}
则引入不能使用解构，只能用对象接受
import obj from '地址'


~~~

# 前端处理跨域问题



在项目根目录下新建vue.config.js

~~~
module.exports={
    //处理跨域
    devServer:{
        //proxy代理
        proxy:"http://localhost:3000"
    }
}
~~~

# 创建vue全家桶项目

（在之前的基础添加了route和vuex）



路由分为2和模式:

~~~
1 history(后端需要额外做配置)
 http://localhost:8080/home
2 hash(后端不用做额外配置)
 http://localhost:8080/#/home
~~~



# 全家桶项目结构

~~~
src
	assets:静态图片
	components: 组件 (带有功能--动态组件)
	router:配置路由
	store:配置vuex
	views:组件 (无功能，只用于展示--静态组件)
	
~~~

# Scss

<style lang="scss">

~~~
<style lang="scss">
    span{
      color: red;
      font{
        font-size: 100px;
      }
    }
</style>
~~~

# 路由

 后端: 跳转url和后端js的映射  --->/users/login 最终跳转到后端js中的函数并且执行

 前端:跳转url和组件的映射   --->/users/login 最终是跳转到vue中的某一个组件并且渲染该组件



## SPA（single page application）

vue就是一个单页面应用(只有一个html文件)



好处:整个页面渲染·的内容都是通过组件来构成的，而组件可以复用，因此，减少了代码的重复性

页面少，就意味请求个数少，减轻服务器的压力



坏处:不利于搜索引擎额优化(SEO)



目的： 实现组件的切换



## 路由和动态的组件的区别



~~~
1 如果是路由，则刷新页面后，会停留在最近的位置,反之动态组件会归零
2 路由会改变地址，而动态组件不会
~~~



## 路由的配置

src/router/index.js中:

~~~
import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

//该数组就是用来配置url和组件的映射关系
const routes = [
 	
]

//new一个路由的实例
const router = new VueRouter({
  //注入了
  routes
})
//暴露
export default router
~~~



## 单独安装路由

~~~
vue add router
~~~



## 路由基本使用

### 步骤1：配置路由 :src/router/index.js

~~~

import Vue from 'vue'
import VueRouter from 'vue-router'

//引入组件
import Home from '../views/Home.vue'
import Stu from '../components/day01/Stu.vue'
Vue.use(VueRouter)

//该数组就是用来配置url和组件的映射关系
const routes = [
   {
     path:"/home",  
     component:Home
   },
   {
    path:"/stu",  
    component:Stu
  }
]

//new一个路由的实例
const router = new VueRouter({
  //注入了
  routes
})
//暴露
export default router

~~~

### 步骤2：配置路由出口

在组件中通过 <router-view/>来设置出口

~~~
<router-view/>
~~~

如果像以上这么来配置，则

访问localhost:8080/home就能渲染home组件

访问localhost:8080/stu就能渲染stu组件



## 路由跳转

### 方式1：使用标签

~~~
<router-link to="/stu">跳转stu</router-link>
~~~

### 方式2：使用js

~~~
 this.$router.push("/stu")
~~~

搞清楚：通过components引入组件和通过router-view引入组件的区别

