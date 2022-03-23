# sync

## 场景:

~~~
子组件想要修改父组件通过props传递过来的值
~~~

## 语法

~~~
父组件传值时通过.sync即可
<子组件  :自定义属性.sync="data中的属性"
等价于
<子组件  :自定义属性="data中的属性" @update:自定义属性="val=>data中的属性=val"
~~~



## Father.vue



~~~
<template>
    <div>
        father:
        <hr>
        <!-- @change="val=>content=val" -->
        <Son :content.sync="content"  />
        等价于
         <Son :content="content" @update:content="val=>content=val" />
    </div>
</template>

<script>
import Son from './Son.vue'
export default {
    components:{
        Son
    },
    data(){
        return{
            content:"A"
        }
    },
    methods:{
        // change(val){
        //     this.content=val
        // }
    }
}
</script>

~~~



## Son.vue

~~~
<template>
    <div>
        Son:
        {{content}}
        <button @click="change">修改</button>

       
    </div>
</template>

<script>
export default {
    props:["content"],
    methods:{
        change(){
            this.$emit("update:content","B")
        },
    }
}
</script>

<style>

</style>
~~~

# 面试题：刷新页面后，vuex保存的数据会丢失么？,如何解决数据丢失的问题？

~~~
会
解决：
	1 本地存储
	2 路由守卫再次查询(全局守卫)
	
	
~~~

# 扩展：模块化后通过原生方法获取子模块中的属性



~~~
state：store仓库对象.state.模块名.key
getters：store仓库对象.getters[‘模块名/key’]
mutations：store仓库对象.commit(‘模块名/method’)
actions：store仓库对象.dispatch(‘模块名/method’)
~~~



# vue+elementUI 功能：

~~~
1 登录 注册 注销 修改密码、头像上传
2 分页查询学生、搜索分页查询学生、添加、修改学生(头像上传)、查询班级、添加班级
3 面包屑
4 身份认证 (身份验证失败，不能进入stu主界面--守卫)

~~~

