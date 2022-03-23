# 回顾

~~~
1 bus :用于兄弟组件之间的通信
2 slot: 匿名、具名、后备、作用域 :父子组件的通信
3 axios的封装
  src:
    http
    	modules
    		user.js
    		stu.js
    	api.js  整合(挂载全局)
    	const.js  路径常量
     components
     views
     router/index.js (配置路由)
     store/index.js  (配置状态机)
4 路由: 
	前端：url和组件的映射
	后端：url和后端js的函数的映射

5 配置路由的步骤:
	5.1 配置路由文件router/index.js
		{
			path:"/地址",
			component:引入的组件对象
		}
	5.2 配置路由出口 <router-view/>
	
	我们以后组件就分为两种：路由组件、非路由组件
	路由组件:通过路由映射的组件
	非路由组件:直接通过import+components引入的组件
6 spa: 单页面应用
	好处：请求个数减少，减少服务器负荷 ，通过不同的组件来组合，组件是有复用性的，减少代码量
	坏处：不利于SEO(搜索引擎)优化
	
~~~

# 路由

## 1 重定向

  配置后，能够重新定向到一个新的地址

~~~
const routes = [
   {
    path:"/",  
    redirect:"/home"
   },
~~~

## 2 路由懒加载（懒加载的是组件s）

### 默认情况是立即加载,

特点：预览首页时，会把所有的组件加载到内存

优点：以后再通过路由跳转时，速度很快

缺点：占内存



### 懒加载

特点：预览首页时，不会加载所有组件，只有当路由跳转到对应的组件时，才会加载

优点：节约内存，减少首页加载时间

缺点：当跳转到懒加载的组件时，速度比较慢



## 场景

~~~
懒加载主要用于客户不常访问的页面
~~~

## 语法

~~~
   {
    path:"/stu",  
    component:()=>import('../components/day01/Stu.vue')
  }
~~~

## 3 路由模式

分为了hash和history

hash：(后端不用额外配置)

~~~
http://localhost:8080/#/home
~~~

history (后端用额外配置)

~~~
http://localhost:8080/home
~~~

可以通过配置来改变路由模式

在src/router/index.js:

~~~
//new一个路由的实例
const router = new VueRouter({
  //配置路由模式
  mode:"history/hash",
  //注入
  routes,
  
})
~~~



## 4 路由的别名

可以为该路由设置额外的路径

~~~
   {
    path:"/stu",  
    alias:"/stu2",
    component:Stu
  
  }
~~~

## 5 通用路由

~~~
  {
    path:"*",
    component:Home
  },
~~~

## 推荐结构:

~~~
const routes = [
   //第一个写默认路由
   {
    path:"/",  
    redirect:"/home"
   },
   //中间写组件对应路由
   {
     path:"/home",  
     component:Home
   },
   {
    path:"/stu",  
    alias:"/stu2",
    component:Stu
  },
   //最后一个写通用路由
  {
    path:"*",
    component:Home
  },
  
]
~~~

## 练习：如果进入404则倒计时跳转到home

~~~
<template>
    <div>
        <h1>404</h1>
        <h2>{{n}}</h2>
    </div>
</template>

<script>
export default {
    data(){
        return{
            n:5
        }
    },
    mounted(){
        let timer=setInterval(() => {
            console.log("ok");
            this.n--
            if(this.n==0){
                clearInterval(timer);
                this.$router.push("/home")
            }
        }, 1000);
    }
}
</script>
~~~

## 6 子路由(路由的嵌套)

vue在路由中提供了children属性用来描述子路由

如果在/stu路由下可以跳转两个子路由，分别是/stu/stuList,/stu/stuAdd

### 步骤1：  /stu路由中配置children:

~~~
 {
    path:"/stu",  
    component:Stu, 
    children:[
      {
        path:"/stu/stuList",  
        component:StuList
      },
      {
        path:"stuAdd",  
        component:StuAdd
      },
    ]
  },
~~~

### 步骤2： 在/stu路由对应的组件中配置路由出口

~~~
<router-view/>
~~~



### 结论：在哪个路由下配置子路由就一定要在那个路由对应的组件中配置路由出口



# 动态路由

跳转路由时可以传递参数

## 步骤1 ：配置router/index.js

~~~
      {
        path:"stuList/:id/:name",  
        component:StuList,
      },
~~~

## 步骤2：页面传参

~~~
<router-link :to="`/stu/stuList/${id}/${name}`">学生列表</router-link>

 data(){
        return{
            name:"张三",
            id:99
        }
    },
~~~

## 步骤3：接受参数

语法：this.$route.params

~~~
export default {
    created(){
        console.log(this.$route.params);
    }
}
~~~

## 如果想要传递对象，则需要先通过JSON.stringify转成字符串即可

~~~


~~~

## 关于接受参数的第二种方法

### 步骤1：router/index.js

~~~
      {
        path:"stuList/:id",  
        component:StuList,
        props:true
      },
~~~

### 步骤2：传参........

### 步骤3:

~~~
export default {

  	props:["id"]


~~~

## 补充：

路由文件中如果设置了参数，比如path:"stuList/:id",则以后跳转必须要带参数，否则无法匹配到路由，但是我们可以在最末尾添加？来解决,一旦添加了?，无论是否有参数都能正确的匹配到路由

~~~
path:"stuList/:id?"
~~~





# 动态路由之传参和接受参数的另一种方式

## 1 前置：路由文件无需做额外的设置

~~~
      {
        path:"stuList",  
        component:StuList,
      },
~~~

## 2 传参：通过？传参

~~~
 <router-link :to="`/stu/stuList?id=${id}`">学生列表</router-link>
~~~

或者

~~~
<router-link :to="{path:'/stu/stuList',query:{id:11,name:'张三'}}">学生列表</router-link>
~~~

或者

~~~
            // this.$router.push("/stu/stuList?id="+this.id+"&name="+this.name)
            // this.$router.push(`/stu/stuList?id=${this.id}&name=${this.name}`)
             this.$router.push({
                 path:"/stu/stuList",
                 query:{
                     id:this.id,
                     name:this.name
                 }
             })
~~~



## 3 接受

~~~
this.$route.query
~~~



# 路由的扩展（router-link标签的属性）

## 1 active-class

被激活的路由就会拥有某个样式，反之不会拥有(提高客户体验)

~~~
<router-link active-class="active"
~~~

## 2 tag （了解）

router-link默认是渲染成a标签，tag能够渲染成其他标签

~~~
<router-link  tag="button" 
~~~



## 3 replace（了解）

不会让浏览器记录当前的路由历史

~~~
 <router-link replace 
~~~



# 路由元信息（meta）

可以在路由文件中配置meta属性，来保存一些想要的信息，之后可以在该路由对应组件中获取保存的信息

## 保存数据（src/router/index.js）

~~~
        path:"stuAdd",  
        component:StuAdd,
        meta:{
          name:"李四"
        }
~~~

## 获取数据(对应组件中)

~~~'
this.$route.meta
~~~



## 使用场景

我们可以为某个路由通过meat上标记，然后在组件中做某些业务,比如权限



## 练习：

实现切换子路由时,stuList不缓存数据,stuAdd缓存数据

步骤1 ：设置路由文件:

~~~
children:[
      {
        path:"stuList",  
        component:StuList,
        meta:{
           isb:false
        }
       
      },
      {
        path:"stuAdd",  
        component:StuAdd,
        meta:{
          isb:true
       }
      },
    ]
~~~

步骤2：在Stu.vue中实现业务逻辑

~~~
<keep-alive >
       <router-view v-if="$route.meta.isb"/>
</keep-alive>
        <router-view v-if="!$route.meta.isb" />
~~~



# 面试题

$router和$route的区别

~~~
$router是全局路由对象，$route是当前路由对象
$router的方法:路由的跳转:
	.push
	.go(n) 
	.replace(不记录跳转历史)
$route:
	.params
	.query
	.meta
	
~~~





