# 回顾

~~~
1 计算属性 computed
	在源数据的基础上进行计算之后并且渲染，同时不会改变源数据
	主要使用场景：多个地方会改变一个地方,比如总价等
	拥有缓存,一旦第一次计算之后会把结果放入内存,只要源数据不发生改变则会用到缓存(提高性能)
	简写版 计算属性名(){return ....}
	完整版 : 计算属性名:{
				get(){return ...},set(val){}
			}
	
2 侦听器 watch
	可以侦听某写属性,一旦数据发生改变则会触发watch中的函数
	主要使用场景：一个地方会改变多个地方
	简写版 已经被定义过属性名(){....}
	完整版: 已经被定义过属性名:{
	       handler(newVal,oldVal){
	       		.....
	       },
	       deep:true,//深度监听，监听对象
	       immediate:true//立即侦听
	}
	
	 
3 v-model 是@input/@change和:value的语法糖   (表单)双向绑定
  参考的m-v-vm
  
4 生命周期钩子函数
   创建前后、挂载前后、修改前后、销毁前后
   created(){}
   mounted(){}
5 数据变更检测
  1 对象的属性的增减
    增：对象.属性=“”
    减: delete 对象.属性
  2 数组的长度控制/根据下标改变值
  
  官推：this.$set(对象/数组,属性/下标,值)
  

~~~

# Props

vue项目肯定有多个组件(*.vue)组成,而组件不可能全都是同级别的，就有父组件和子组件,他们中间必然有参数的传递,props属性就是用来在组件中接受父组件传递过来的参数的

~~~
1 props是写在子组件中，位置和data等同级别
2 props可以传递任意类型的数据

~~~



子组件:

~~~
<template>
    <div>
        子组件的内容:{{name}},{{age}},{{user}},{{arr}}
    </div>
</template>

<script>
export default {
    //props中的数组的元素是String类型，值对应父组件传值中:后面的属性
    props:['name','age','user',"arr"],
}
</script>
~~~



父组件:

~~~
<template>
    <div>
         父组件的内容
        <Son :name="name" :age="age" :user="user" :arr="arr"/>
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
            name:"张三",
            age:18,
            user:{
                uname:"abc",
                pwd:"123"
            },
            arr:[1,2,3]
        }
    }
}
</script>
~~~

## 探究问题1：子组件能不能改变父组件传递过来的参数

~~~
不能：原因避免父组件的属性难以维护
~~~

## 探究问题2：父组件如果不传递参数，则子组件接受的默认值是？

~~~
undefined
~~~

## 探究问题3：如果父组件传递参数给子组件之后，又改变了该参数，则子组件会怎么?

~~~
子组件会自动同步参数值
~~~

## 面试题：单项数据流是什么?

~~~
子组件可以通过props使用父组件传递过来的数据,
父组件值的更新，会影响到子组件，反之则不行
~~~



## props的验证

### 1 数据类型验证

可以做到对父组件传递过来的参数的类型的验证，如果类型不符合要求，则报错

数据类型：Number、String、Object、Array

语法:

~~~
export default {
    //props
    props:{
    	//对应的属性:数据类型
        name:String,
        age:Number
    },
}

    props:{
        name:String,
        //如果是数字或者字符串都正确
        age:[Number,String]
    },
    
   
~~~

### 2 必传属性(required)

~~~
export default {
    //props中的数组的元素是String类型，值对应父组件传值中:后面的属性
    props:{
        name:{
            type:String,
            required:true
        },
~~~

### 3 默认值(default)

~~~
export default {
    //props中的数组的元素是String类型，值对应父组件传值中:后面的属性
    props:{
        name:{
            type:String,
            default:"王五"
        },
~~~

#### 3.1 如果是默认的对象/数组，必须用函数返回,而不是直接定义

~~~
<script>
export default {
  //props中的数组的元素是String类型，值对应父组件传值中:后面的属性
  props: {
    user: {
      type: Object,
      default: function () {
        return {
          x: 1,
          y: 2,
        };
      },
    },
    arr:{
        type:Array,
        default:function(){
            return [22,33,44]
        }
    }
  },
};
</script>


注意：如果返回对象要写箭头函数的简写模式，则：
export default {
  //props中的数组的元素是String类型，值对应父组件传值中:后面的属性
  props: {
    user: {
      type: Object,
      default: () => ({x:1,y:2})
    },

~~~



# 自定义事件

## 语法使用

目的：父组件自定义事件后，子组件能够调用父组件定义好的事件（顺便也能够传递参数）

语法:

父组件: 

~~~
        <Son @ff="ff"/>
        
     methods:{
       ff(s1,s2){
        console.log(s1,s2);
       }
    }

~~~

子组件:

~~~
 <button @click="ff">改变</button>
 
 
   methods:{
      ff(){
          this.$emit("ff","我爱你","给我钱")
      }
  }
~~~



目前我们讲了几个$xx

~~~
$refs  $set   $emit  $data

~~~

## 使用场景

~~~
如果子组件想要改变父组件中的data值，则会使用到自定义事件
子组件可以通过自定义事件把参数传递给父组件，让父组件自个来修改即可
~~~

# 总结

1 公共数据一定要放在父组件上

2 如果要修改公共数据，则所有修改公共数据的方法也一定要放在父组件上，子组件只需要传值

3 如果父子嵌套很深，则不建议用props，难以维护(以后会用到vuex状态机来管理公共数据)

4 如果父组件传递对象给子组件，那么子组件可以直接改变对象的属性,从而影响到父组件（不会报错）

5 子组件修改父组件数据同时子组件也会同步的套路:

​	1 data+watch    2  computed(完整版)

​    

# axios

## 概念：

axios是基于promise实现对ajax的一个封装

作用就是代替ajax发送异步请求

由于它是基于promise，因此我们首选await/async来处理回调



## 局部安装

npm  i  axios



## 引入axios

~~~
import axios from 'axios'

~~~

## 语法

1 get提交(查询)

~~~
axios({
	url:"地址",
	method:"get",
	params:{参数}
})  --- 返回promise

//简写
axios.get("地址",{params:{参数}})  --- 返回promise
~~~

2 post提交(增删改)

~~~
axios({
	url:"地址",
	method:"post",
	data:{参数}
})

//简写
axios.post("地址",{参数})   --- 返回promise
~~~



使用:

~~~

~~~





