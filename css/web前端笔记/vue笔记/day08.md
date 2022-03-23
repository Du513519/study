# 回顾

~~~
1 src/router/index.js--配置路由
{
	path:"/xxx"
	component:组件对象
}
2 重定向:
{
	path:"/"
	redirect:"/xxx"
}
3 别名:
{
	path:"/xx1",
	alias:"/xx2"
	component:组件对象
}
3 懒加载(使用时才会加载组件)--vue的优化问题
{
	path:"/xxx"
	component:()=>import('地址')
}
4 路由模式:
new VueRouter({
	model:"history/hash"
	数组,
})
5 子路由  （还得写一个新的router-view）
{
	path:"/xxx"
	component:组件对象,
	children:[
	{}
	]
}
6 动态路由 

方式1：
	1 配置文件:  path:"/stu/stuList/:参数1/:参数2"
	2 传参: <router-link to=/stu/stuList/1/abc
    3 接受: this.$route.params.参数1/参数2
    
方式2：
	1 配置文件:  path:"/stu/stuList/:参数1/:参数2"
	            props:true
	2 传参: <router-link to=/stu/stuList/1/abc
	3 接受: props:['参数1','参数2']
	
方式3： 1 配置文件:path:"/stu/stuList
       2.1 传参: <router-link to='/stu/stuList?参数1=xx&参数2=xx'
       2.2 传参: <router-link :to='{path:"/stu/stuList",query:{参数1:xx,参数2:xx}}'
       2.3 this.$router.push/replace("/stu/stuList?参数1=xx&参数2=xx")
       2.4 this.$router.push/replace({path:"/stu/stuList",query:{参数1:xx,参数2:xx}})
       3 接受: this.$route.query.参数1/参数2
       
7 router-link的额外属性：
	to:
	active-class:激活时可以拥有该样式
	replace:没有历史记录
	tag:包装成其他标签
8 路由的元信息(meta),能够在路由中设置meta:{} 用来保存数据当作标记，以供以后在对应的组件中通过this.$route.meta使用
9 $route和$router的区别
  1 $router是全局路由对象，$route是当前路由对象
  2 $router: push/go/replace
  3 $route:params/query/meta
 
~~~

# 导航守卫

## 概念

当路由发生跳转时，会触发守卫(函数)的拦截，我们能够在该函数中写自己的业务逻辑以及决定是否放行



## 使用场景

~~~
1 身份、权限认证
2 跳转日志..
~~~

## 分类

~~~
1 全局守卫（前置，解析，后置）  

2 路由独享守卫

3 组件内守卫
~~~



## 1全局前置守卫(beforeEach)

一旦设置好后，只要有路由的跳转，都会拦截

位置:router/index.js

~~~
//全局前置守卫
router.beforeEach((to, from, next) => {
    console.log(to); //目标路由
    console.log(from);//源路由
    next();//放行
})

练习：检测本地存储是否有token，如果有则放行，如果没有怎跳转到/home

//全局前置守卫
router.beforeEach((to, from, next) => {
    if(to.path.includes("/home")){
       next()
    }else{
      if(localStorage.token){
          next()
      }else{
        // this.$router.push();
        alert("请登录")
        router.push("/home")
      }
    }
})

~~~



## 2 路由独享守卫(beforeEnter)

为某个路由设置，只有跳转到该路由，才会触发守卫的拦截

位置：写在某个路由中

~~~
 {
        path:"stuList",  
        component:StuList,
        beforeEnter: (to, from, next) => {
            console.log(to);
            console.log(from);
            next();
        }
~~~





~~~
练习：针对stuList而言,检测本地存储是否有token，如果有则放行，如果没有怎跳转到/home
{
        path: "stuList",
        component: StuList,
        meta: {
          isb: false
        },
        beforeEnter: (to, from, next) => {
          if (localStorage.token) {
            next()
          } else {
            // this.$router.push();
            alert("请登录")
            router.push("/home")
          }
        }

      },
~~~



## 3 组件内的守卫  （beforeRouteLeave）

- beforeRouteEnter`
- `beforeRouteUpdate` (2.2 新增)
-  beforeRouteLeave (离开组件)



beforeRouteLeave ：当离开该组件时触发

位置：和data并列，属于钩子函数

~~~
    beforeRouteLeave(to, from, next) {
       console.log(to);
       console.log(from);
  }
~~~

练习:如果离开组件是，检测到文本框有内容，则提醒确认离开吗

~~~
    beforeRouteLeave(to, from, next) {
        if(this.t){
            let isleave=confirm("还有数据确认离开吗");
            if(isleave){
                next()
            }
        }else{
            next();
        }
    }
~~~



## 以上三个执行顺序

~~~
beforeRouteLeave（组件内）----》beforeEach(全局前置)----》beforeEnter(路由独享)
~~~





# 身份认证

~~~
1 是否登录
2 登录是否过期

~~~

回忆写的？

1 下载插件：

express-jwt   --拦截和验证

jsonwebtoken --生成和解码token

2 写jwtAuth.js:

~~~
const expressJwt=require('express-jwt')
const {KEY}=require('./const')
const jwtAuth=expressJwt({
    //密钥
    secret:KEY,
    //采用HS256算法进行加密
    algorithms:['HS256'],
    //如果未登录也要进行拦截
    credentialsRequired:true
}).unless({
    //白名单
    path:['/users/login','/users/register','/banners/getBanners']
})

module.exports=jwtAuth;

~~~

3  生成token

~~~
//登录
async function login (req,res){
    const result= await usersModel.findOne(req.query);  
    if(result._id){
         //登录成功，产生token
         const token=jwt.sign(
               {user:result},//保存的数据，一般是user对象
               KEY,//密钥
               {expiresIn:60*30}//设置过期时间 s
         )
         res.send({
            result,
            token:"Bearer "+token
         })
    }else{
      res.send({
         code:202
      })
    }
}
~~~

4 前端保存token

~~~
localStorage.token=res.token...

~~~

5 设置token到请求头

~~~
$.ajax({
	headers:{
		'Authorization':localStorage.token
	}
})
~~~



## vue中的身份认证做法:

axios.js

~~~
import axios from 'axios'
import router from '../router'
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
},err=>{
    console.log(err.response.status);
    if(err.response.status==401){
        alert("请登录");
        router.push("/login")
    }
})
//拦截请求
myaxios.interceptors.request.use(config=>{
    config.headers.Authorization=localStorage.token
    return config;
})

export default myaxios
~~~

以上的做法会有问题：只有当客户向后台发请求，后端才会判断身份是否有效，从而给予回馈。

现在的需求改变了：如果身份不合法，则连/stu都不让你进，又怎么做----》路由独享守卫

~~~
{
    path: "/stu",
    component: Stu, 
      beforeEnter:async  (to, from, next) => {
          if (localStorage.token) {
            let res=await api.users.getUserInfo();
            if(res.code==200){
                next();
            }else{
              alert("请登录")
              router.push("/login")
            }
          } else {
            alert("请登录")
            router.push("/login")
          }
        },
~~~



# 文件上传



## 后端：

~~~
1 npm i multer
2 工具js handleFiles.js
3 controller:
	
	//临时上传
async function upload_temp (req,res){
   //获取请求头保存的信息
   let imageUpload=uploadFiles();
   imageUpload(req,res,err=>{
      if(err){
         console.log("异常");
         res.send({code:202})
      }else{
         console.log(req.files[0]);
         res.send({head:req.files[0]})
      }
   })
}
//确认上传

async function upload_sure (req,res){
   const {filename}=req.query;
   let fromPath="./public/temp";
   let toPath="./public/img";
   let obj={ fromPath, toPath, filename } 
   //移动
   moveFiles(obj)
   //删除临时目录temp
   deleteFiles("./public/temp")
   //修改数据库
   

}
	
~~~

## 前端：

<input type="file" 

通过change事件：

let files=this.files[0];

let fd=new FormData();

fd.append("file",files)



$.ajax({

​		url:"",

​	    type:"post",

​        data:fd,

​		processData:false,

​		contentType:false

})



## vue

​	注册+头像上传

~~~
<template>
    <div>
        <p>
            账号  <input type="text" v-model="user.username">
        </p>
        <p>
            密码  <input type="password" v-model="user.password">
        </p>
        <p>
            <input type="file" @change="upload_temp">
            <img width="50px" height="50px" :src="src" > 
        </p>
        <p>
              <button @click="register">注册</button>
        </p>
    </div>
</template>



export default {
    data(){
        return{
            user:{
                head:""
            },
            src:"https://img2.baidu.com/it/u=3626475345,3078425090&fm=26&fmt=auto"
        }
    },
    methods:{
        async upload_temp(e){
            let files=e.target.files[0];
            let fd=new FormData();
            fd.append("file",files)
            let res=await this.api.users.upload_temp(fd);
            console.log(res);
            this.src=`http://localhost:3000/temp/${res.head.filename}`
            this.user.head=res.head.filename;
        },
        async register(){
             let res=await this.api.users.register(this.user);
             console.log(res);
        }
    }
}
</script>
~~~



# Vuex（状态机）

## 概念

状态指的就是vue的数据,vuex就是vue中的数据的中心仓库，我们可以把公共数据存储在这里，方便在组件中获取,

总结：vuex就是用来存储公共数据、函数的仓库



## 单独安装

~~~
vue add vuex
~~~



##  结构

### 1 store/index.js:

~~~


import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

~~~

### 2 main.js:

~~~
import Vue from 'vue'
import store from './store'


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

~~~



## 5大核心属性

~~~
export default new Vuex.Store({
  state: {
  
  },
  getters:{
    
  },
  mutations: {
  },
  actions: {
  
  },
  modules: {
  }
})
~~~

### 补充：

在组件中可以通过this.$store获取仓库对象

### 5.1 state  （用来存储数据）

类似于组件中的data

index.js:

~~~
export default new Vuex.Store({
  state: {
    name:"张三"
  },
~~~



组件获取：

~~~
this.$store.state.name
~~~

特点：一旦vuex中数据发生变化，则组件中获取的数据也会同步改变，为了实时更新数据，一般在组件中使用计算属性来获取vuex中的数据

~~~
 computed:{
        name(){
            return this.$store.state.name
        }
    }
~~~

### 5.2 getters(计算属性)



index.js:

~~~
export default new Vuex.Store({
  state: {
    n1:1,
    n2:2
  },
  getters:{ 
    //参数就是state对象
    sum(state){
      return state.n1+state.n2
    }
  },
~~~



vue组件:

~~~
 {{$store.getters.sum}}
~~~



### 5.3 mutations (改变state数据的唯一手段)

该属性中装方法，都是用来改变state数据的,方法名一般喜欢用全大写

index.js:

~~~
export default new Vuex.Store({
  state: {
    name:"张三",
  },
  mutations: {
     //参数1:state对象
     //参数2：接受外界的值
      CHANGE_NAME(state,data){
            state.name=data
      }
  },
~~~

vue组件:

~~~
    methods:{
        change(){
        	//参数1：mutations中定义的方法名
        	//参数2：要传递的值
            this.$store.commit("CHANGE_NAME",this.myname)
        }
    },
~~~

### 5.4 actions

里面一般存储公共的异步请求的方法

actions中定义的方法也有两个参数：

参数1：代表整个仓库对象(context)

​	作用1 ：调用mutations中的方法

​    context.commit("mutations中的方法名",参数)

   作用2：调用actions本身的方法

​	 context.dispatch("actions中的方法名",参数)

参数2：代表外界传递过来的数据



总结：无论是vuex内部还是vue组件，都是通过

仓库对象.commit调用mutations中的方法

仓库对象.dispatch调用actions中的方法



#### 练习：在仓库中通过请求初始化stus，并且渲染到demo组件中

index.js:

~~~
import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../http/axios.js'
import {STUS} from '../http/const.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stus:[]
  },
  mutations: {
     //参数1:state对象
     //参数2：接受外界的值
      CHANGE_STUS(state,data){
        state.stus=data
      }
  },
  actions: {
     //参数1：代表整个仓库对象，类似于 this.$store
     //参数2：接受外界的值
     //获取所有学生
     async getStus(context){
         let res= await  axios({
             url:STUS+"/getStus",
             method:"get",
         })
        
         context.commit("CHANGE_STUS", res.result)
      } ,
  },
 
})

~~~

vue组件

~~~
<template>
    <div>
      

      <span v-for="item in stus" :key="item._id">
          {{item.sname}} <br>
      </span>
    </div>
</template>

<script>
export default {
    
    computed:{
        stus(){
            return this.$store.state.stus
        }
    },
    async created(){
        //参数1：actions中的方法名
        //参数2：传递的值
        let res=await this.$store.dispatch("getStus")
        // console.log(res.result);
        // this.$store.commit("CHANGE_STUS",res.result)
    }
}
</script>
~~~

# 作业

​	把路由版学生CRUD所有方法和stus数组都移植到vuex



