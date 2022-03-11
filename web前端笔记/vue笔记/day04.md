# 侦听器

## 	概念

​	vue提供了watch属性用来监听数据的变化，一旦数据发生变化，则会触发watch中的函数,我们就能够在该函数中写自己的业务

## 	 语法

~~~
watch:{
	要监听的属性(newVal,oldVal){}
}
~~~

## Demo_监听基本类型

~~~
<template>
    <div>
        {{name}}
        <button @click="name='李四'">按钮</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name:"张三"
        }
    },
    watch:{
        name(newVal,oldVal){
            console.log(newVal,oldVal);
        }
    }
}
</script>
~~~



## Demo_监听引用类型（对象）

默认的是无法监听到对象中的属性的改变，如果需要监听则有以下两个方法:

### 方法1：  使用'对象.属性'来监听

缺点：如果对象属性很多，并且都需要被监听，那么就难以维护

~~~
<template>
    <div>
        {{stu}}
        <button @click="stu.name='李四';stu.age=18">按钮</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            stu:{
                 name:"张三",
                 age:19
            }
        }
    },
    watch:{
        'stu.name'(newVal,oldVal){
            console.log(newVal,oldVal);
        },
        'stu.age'(newVal,oldVal){
            console.log(newVal,oldVal);
        }
    }
}
</script>

~~~

### 方法2: 深度监听

该方法需要用到watch的完整语法

~~~
watch:{
	属性:{
		handler(newVal,oldVal){},
		deep:true
	}

}
~~~

#### 坑：新旧对象指向了同一个地址，导致两个值是一样（都是新的值）

#### 解决：深拷贝 +计算属性

~~~
<template>
    <div>
        {{stu2}}
        <button @click="stu.name='李四';stu.age=18">按钮</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            stu:{
                 name:"张三",
                 age:19
            }
        }
    },
    computed:{
        stu2(){
            console.log("执行计算属性");
            return   JSON.parse(JSON.stringify(this.stu))
        }
    },
    watch:{
        stu2:{
            handler(newVal,oldVal){
                 console.log("执行监听");
                console.log(newVal,oldVal);
            },
            deep:true
        }
        
    }
}
</script>

~~~

## 立即侦听 

只有完整语法才能写该属性,代表页面加载完会立即侦听一次

~~~
immediate:true
~~~



## 计算属性和侦听的区别

~~~
共同点: 
1 都是数据修改之后会自动触发 
2 都有简写版和完整版的语法
区别：
	1 计算属性是源数据修改之后会重新计算，而侦听无论是计算属性还是属性改变都会触发
	2 计算属性着重点在做渲染，而监听着重点在做业务
	3 使用场景的不同:
		"多" 影响  ”一“ ---》计算属性
		"一" 影响  ”多“ ---》侦听
		
~~~

# 表单双向绑定



## MVVM模型

~~~
M  model 模型(数据)
V  view  视图(页面)
VM  view-model  视图模型(vue的底层)

vue能通过自身的响应式系统做到:
如果更改data中额数据，则页面自动渲染
如果页面的表单元素发生改变，则data也自动发生改变



~~~

## 语法

~~~
只需要在表单元素中添加 : v-model="" 即可实现双向绑定
~~~



## demo1：测试文本框

~~~
<template>
  <div>
      <input type="text" v-model="username">
      {{username}} 
      <button @click="username='张三'">改变</button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            username:"",
        }
    }
}
</script>


~~~

文本框中的:value和v-model只能选一个·



## dem2:测试单选框

~~~
<template>
  <div>
      男<input type="radio"  v-model="gender" value="男">
      女<input type="radio"  v-model="gender" value="女">
      <button @click="gender='男'">改变</button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            //初始值
            gender:"女"
        }
    }
}
</script>
~~~

注意：

1 单选框中必须要value属性

2 绑定的数据是String类型

3 绑定的数据只要和某个单选框的value值匹配则能够让该单选框被勾选

4 name已经不需要了



## demo3： 测试复选框

### 场景1： 绑定的data是数组(用于获取勾选的值)



~~~
<template>
  <div>
      <!-- 男<input type="radio"  v-model="gender" value="男">
      女<input type="radio"  v-model="gender" value="女"> -->

      爱好: 
      吃饭  <input type="checkbox" v-model="hobbys" value="吃饭">
      睡觉  <input type="checkbox" v-model="hobbys" value="睡觉">
      打豆豆 <input type="checkbox" v-model="hobbys" value="打豆豆">
      <button @click="gender='男'">改变</button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            //初始值
            hobbys:['吃饭','打豆豆']
        }
    }
    
}
</script>
~~~



### 场景2：绑定boolean(查看是否被勾选)

~~~
<template>
  <div>
      <!-- 男<input type="radio"  v-model="gender" value="男">
      女<input type="radio"  v-model="gender" value="女"> -->

      全选: <input type="checkbox">
      吃饭  <input type="checkbox" v-model="h1" >
      睡觉  <input type="checkbox" v-model="h2">
      打豆豆 <input type="checkbox" v-model="h3">
      <button @click="gender='男'">改变</button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            h1:true,
            h2:false,
            h3:true
        }
    }
}
</script>
~~~



## demo4:测试下拉列表

~~~
<template>
  <div>
      <!-- 男<input type="radio"  v-model="gender" value="男">
      女<input type="radio"  v-model="gender" value="女"> -->

      <!-- 全选: <input type="checkbox">
      吃饭  <input type="checkbox" v-model="h1" >
      睡觉  <input type="checkbox" v-model="h2">
      打豆豆 <input type="checkbox" v-model="h3"> -->

      <select v-model="sel">
        <option value="1">aa</option>
        <option value="2">bb</option>
        <option value="3">cc</option>
      </select>

      <button @click="gender='男'">改变</button>
  </div>
</template>

<script>
export default {
    data(){
        return{
           sel:"2"
        }
    }
}
</script>
~~~

# 练习：全选

~~~
<template>
  <div>
     全选: <input type="checkbox" v-model="qx">
      吃饭  <input type="checkbox" v-model="h1" >
      睡觉  <input type="checkbox" v-model="h2">
      打豆豆 <input type="checkbox" v-model="h3">
  </div>
</template>

<script>
export default {
  data() {
    return {
        h1:false,
        h2:false,
        h3:false,
    };
  },
  computed:{
    qx:{
       get(){
         return this.h1&&this.h2&&this.h3
       },
       set(val){
        this.h1=val;
        this.h2=val;
        this.h3=val;
       }
    }
  },
};
</script>


~~~

# 数据变更检测问题

在以下情况中，vue是无法检测到数据的变更(也就不会重新渲染)

## 情况1：对象的属性的增减

解决1： 更改地址

~~~
//添加属性
<template>
  <div>
      {{stu}}
      <button @click="change">变更</button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            stu:{
                name:"张三"
            }
        }
    },
    methods:{
        change(){
            this.stu={
                ...this.stu,
                age:18
            }
        }
    }
}
</script>


删除属性：
<script>
export default {
    data(){
        return{
            stu:{
                name:"张三",
                sex:"男"
            }
        }
    },
    methods:{
        change(){
            // this.$set(this.stu,"age",18)
            //语法: delete 对象.属性
              delete this.stu.sex
              this.stu={
                  ...this.stu
              }
        }
    }
}

</script>





解决2：官方推荐使用$set
语法: this.$set(对象,"属性”,"新值")
	
		demo：this.$set(this.stu,"age",18)


语法: this.$set(数组,"下标”,"新值")


~~~

## 情况2： 数组中根据下标改变值

~~~
<template>
  <div>
      {{arr}}
      <button @click="change">变更</button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            arr:[11,22,33]
        }
    },
    methods:{
        change(){
        //无法检测的
        // this.arr[0]=111;
        //使用$set
        //this.$set(this.arr,0,111)
        this.arr[0]=111;
        this.arr=[...this.arr]
        }
    }
}

</script>

<style>

</style>
~~~

## 情况3：改变数组的长度


~~~
    methods:{
        change(){
            //清空
            // this.arr.length=0;
            this.arr=[];
        }
    }
~~~

## 总结：这些情况vue无法检测到

~~~
1 对象属性的增减
2 数组改变长度和根据下标改变值
~~~



# vue的生命周期

## 什么叫生命周期？

~~~
事物从出生到死亡的整个过程
vue中指的是组件的生命周期:指的是组件从创建到销毁的整个过程，在整个生命周期中，分有几个阶段，当程序走到对应的阶段时，会自动触发某些函数，我们程序员就可以在该函数中写自己的业务了----这些函数在对应的生命周期阶段会自动执行，我们是无需手动调用
而我们喜欢把这些函数叫做钩子函数
~~~

### 补充：在函数中调用另一个函数

~~~
<template>
  <div>
      <button @click="f1">变更</button>
  </div>
</template>

<script>
export default {
    data(){
        return{
           
        }
    },
    methods:{
        f1(){
            console.log("f1");
            //手动调用F2
            this.f2();
        },
        f2(){
            console.log("f2");
        }
    }
}
~~~

## 生命周期的阶段

一共分为4个阶段,函数的位置和data、methods等同级

1 创建阶段(创建前、创建后)

~~~
初始化data/methods....
   beforeCreate(){
        console.log("创建前");
    },
    created(){
         console.log("创建后");
    },

created:多用于数据的初始化，我们以后经常在该钩子发ajax请求数据
~~~

2 挂载阶段(渲染阶段) (挂载前、挂载后)

~~~
节点渲染
 beforeMount(){
         console.log("挂载前");
    },
    mounted(){
         console.log("挂载后");
    },
~~~



3 修改阶段 (修改前、修改后)

~~~
改变数据
beforeUpdate(){
         console.log("修改前");
    },
    updated(){
         console.log("修改后");
    },
~~~



4 销毁阶段 (销毁前、销毁后)

~~~
切换组件、手动销毁
 beforeDestroy() {
         console.log("销毁前");
    },
    destroyed() {
         console.log("销毁后");
    },
  
~~~



注意：创建和挂载钩子函数是同步的



**computed和watch的区别：**

1、computed能完成的功能，watch都能完成，但是watch能完成的功能，computed不一定能完成，如watch可以进行异步操作

2、所有被Vue管理的函数，都要写出普通函数，不是被Vue管理的函数，如定时器，ajak，异步回调等等，最好都写成箭头函数，这样this的指向才是vm实例对象





3、 v-show不能与template联用
