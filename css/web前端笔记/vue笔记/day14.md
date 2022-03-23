# Vue打包



## 前置

~~~
在项目的根目录创建vue.config.js文件

~~~

## 核心配置

编辑vue.config.js:

~~~
module.exports={
    //配置打包后的路径
     publicPath:"./"
     
}
~~~

默认会生成map文件，作用：如果报错，可以通过map文件找到打包前得到代码的行数

设置去掉map文件

~~~
module.exports={
    //配置打包后的路径
     publicPath:"./",
    //去掉map文件
     productionSourceMap:false
}
~~~

## 其他配置

###  1 别名

~~~
module.exports={
    //配置打包后的路径
     publicPath:"./",
    //去掉map文件
     productionSourceMap:false,
     //路径别名
     configureWebpack:{
        resolve:{
            alias:{
                //  "别名":"路径"
                "HTTP":"@/http"
            }
        }
     }
}
~~~

### 2 懒加载的分组打包

默认每有一个懒加载，会单独打包成一个js文件，为了提升性能，减少js个数则可以使用分组来处理:

方法:

~~~
 {
        path: "stuAdd",
        component: () => import(/*webpackChunkName:'group-stu'*/'../components/stu/StuAdd.vue'),
~~~



# Vue3.0

~~~
2018年尤雨溪就已经在计划了，直到2019年9月才发布,取名"one piece"
~~~

##  区别与2.0

~~~
1 性能提升（按需引入）
2 支持TS（TypeScript）
3 功能更多，体积更小
4 bug更多


~~~

## vite(webpack替换)



### 创建vue3.0项目:

#### 方式1：

~~~
npm init vite@latest

~~~

#### 方式2：

~~~
npm init vite@latest 项目名 --template vue
~~~

### 开服：

~~~
npm run dev 
~~~



# 非路由引入子组件

~~~
注意：以后的vue中的script都需要添加属性:setup
~~~



~~~
<script setup>

import HelloWorld from './components/HelloWorld.vue'

</script>

<template>
 
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<style>

</style>

~~~

# 引入状态机

1 下载安装

~~~
npm i vuex@next
~~~

2 src下新建store目录，该目录下新建index.js:

3 编辑index.js:

~~~
import { createStore } from "vuex";
export default createStore({
    state:{},
    getters:{},
    mutations:{},
    actions:{},
    modules:{}
})
~~~

4  编辑main.js

~~~
import { createApp } from 'vue'
import App from './App.vue'
//引入状态机
import store from './store'

const app=createApp(App);
app.use(store)
app.mount('#app')

~~~





# 引入路由

1 安装

~~~
npm i vue-router@next
~~~



2 src下新建router目录，该目录下新建index.js



3 编辑index.js

~~~
import {createRouter,createWebHistory} from "vue-router";

const routes =[];
export default createRouter({
     routes,
    //路由配置hash模式
     history:createWebHistory(),
     
})
~~~

4  编辑main.js

~~~
import { createApp } from 'vue'

import App from './App.vue'

//引入状态机

import store from './store'

//引入路由

import router from './router'



const app=createApp(App);

app.use(store)

app.use(router);

app.mount('#app')
~~~

# 补充：

~~~
vue3.0的组件中的template里可以写多个节点
~~~



# 基本语法

## 1 数据 (reactive)

#### 语法：

~~~
import {reactive} from 'vue';
const 变量=reactive({
       	属性:...
    })
~~~



~~~
<template>
    {{data.name}}
    {{data.age}}
    {{data2.name}}
</template>

<script setup>
    import {reactive} from 'vue';
    const data=reactive({
        name:"张飞",
        age:18,
    })
     const data2=reactive({
        name:"张飞2",
        age:182,
    })
</script>
~~~





## 2 事件

~~~
<template>
    {{data.name}}
    <button @click="ff(1)">改变</button>
</template>

<script setup>
    import {reactive} from 'vue';
    const data=reactive({
        name:"张飞",
        age:18,
    })
   const ff=(n)=>{
       data.name='刘备'
   }
</script>
~~~



## 3 计算属性

####  语法

~~~
  import {computed} from 'vue';
  const 变量 =computed(()=>{
  	return .....
  })
~~~



~~~
<script setup>
    import {reactive,computed} from 'vue';
    const data=reactive({
        n1:1,
        n2:2
    })
    const sum=computed(()=>{
        return data.n1+data.n2
    })
~~~



## 4 监听

#### 语法:

~~~
import {watch } from "vue";
watch(回调函数1，回调函数2，可选参数)
回调函数1:监听的对象
回调函数2：自己的业务逻辑
可选参数：深度/立即侦听
~~~



~~~
watch(()=>{return data.n1},(newVal)=>{console.log("改变成"+newVal);},{deep:true})
watch(()=> data.n1,(newVal)=>{console.log("改变成"+newVal);},{deep:true})
~~~



## 4.5 高级监听

无需指明监听对象，里面涉及到属性都会自动被监听

#### 语法 

~~~
import {watchEffect } from "vue";
watchEffect(()=>{
    
})
~~~



~~~
watchEffect(()=>{
    console.log(data);
})
~~~



## 5 生命周期钩子函数

#### 语法

~~~
import {onBeforeMount} from 'vuex'
onBeforeMount(()=>{
	
})
~~~



~~~
vue2.0                       vue3.0
beforeCreate                 x
Created                      x
beforeMount		             onBeforeMount  (充当以前的created)
Mounted						 onMounted
beforeUpdate                 onBeforeUpdate
Updated                      onUpdated
beforeDestroy			     onBeforeDestroy
Destroyed                    onUnMounted


~~~

## 6 组件传值



### 父传子：(defineProps)

父：

~~~


<template>
  <HelloWorld :name="obj.name"/>
</template>


<script setup>
import {reactive} from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const obj = reactive({
  name:"张飞"
})

</script>


~~~

子：

~~~
<template>
子组件:
{{name}}
 
</template>

<script setup>
import {defineProps } from "vue";

defineProps(['name'])
~~~

###  子传父：（defineEmits）



​	父：

~~~
<template>
  <HelloWorld :name="obj.name"   @change="change"/>
</template>


<script setup>
import {reactive} from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const obj = reactive({
  name:"张飞",
  age:19
})
const change=(val)=>{
    obj.name=val
}

</script>
~~~

子：

~~~
<template>
子组件:
{{name}}
  <button @click="ff('王五')">改变</button>
</template>

<script setup>
import {defineProps,defineEmits } from "vue";

defineProps(['name'])

const emit=defineEmits(['change'])

const ff=(val)=>{
    emit("change",val)
}



~~~

# 路由的使用

demo1----》demo2

demo1：

~~~
<template>
    <h1>Demo1</h1>
    <button @click="ff">goDemo2</button>
</template>

<script setup>
    import {reactive} from 'vue';
    import {useRouter} from 'vue-router'
    const data=reactive({
        id:1
    })
    let router=useRouter();
    const ff=()=>{
        router.push("/demo2?id="+data.id)
    }
</script>

<style>

</style>
~~~



demo2:

~~~
<template>
    <h1>Demo2</h1>
    <!-- {{id}} -->
</template>

<script setup>
    import {useRoute} from 'vue-router'
    const route=useRoute();
    console.log(route.query.id);
    
</script>

<style>

</style>
~~~



# 状态机的使用

store/index.js:

~~~
import { createStore } from "vuex";
export default createStore({
    state:{
        user:{
            username:"abc",
            password:"123"
        }
    },
    getters:{},
    mutations:{
        CHANGE_USER(state,data){
            state.user=data
        }
    },
    actions:{
    
    },
    modules:{}
})
~~~

vue:

~~~
<template>
    <div>
        Demo3:
        {{store.state.user}}
        <input type="text" v-model="data.user.username">
        <input type="text" v-model="data.user.password">
        <button @click="change">改变user</button>
    </div>
</template>

<script setup>
    import {useStore} from 'vuex'  
    import {reactive} from 'vue'
    const data=reactive({
        user:{}
    })
    const store=useStore();
    
    const change=()=>{
        store.commit("CHANGE_USER",data.user)
    }

</script>

<style>

</style>
~~~



# vue3.0如果挂载全局

2.0：main.js: Vue.prototype.api=api

3.0：main.js:

~~~
//引入api

import api from './http/api.js'

const app=createApp(App);

//挂载全局

app.config.globalProperties.api=api;

app.use(store)

app.use(router);

app.mount('#app')
~~~



vue:

~~~
    import {getCurrentInstance} from 'vue'
    const {proxy}=getCurrentInstance()
    console.log(proxy.api);
~~~

作业:

~~~
1 登录 +注册
2 学生的CRUD(非分页)
stu:_id sname age
user: _id username  password

~~~

# 总结:

~~~
import {reactive,watch,computed,钩子函数} from 'vue'
import {useStore} from 'vuex'
import {useRouter,useRoute} from 'vue-router'


~~~



