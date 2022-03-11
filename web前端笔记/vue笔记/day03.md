# 面试

~~~
v-for能够遍历哪些数据类型

1 数组
2 对象
<template>
    <div>
        <span v-for="(item,k,index) in user" >{{k}}:{{item}}-{{index}} <br/></span>
    </div>
</template>

<script>
export default {
    data(){
        return{
            user:{
                _id:1,
                name:"张三",
                age:18
            }
        }
    }
}
</script>
3 数字
<template>
    <div>
        <span v-for="item in n">{{item}}</span>
    </div>
</template>

<script>
export default {
    data(){
        return{
           n:5
        }
    }
}
</script>

4 字符串

<template>
    <div>
        <span v-for="item,index in str">{{item}}--{{index}}</span>
    </div>
</template>

<script>
export default {
    data(){
        return{
           str:"abcd"
        }
    }
}
</script>
~~~



# 计算属性

## 概念

当我们想从源数据（data）的基础上拿到新数据并渲染出来,同时也不会改变源数据，则计算属性



## 语法（简写）

~~~
computed:{
        计算属性名(){
            return  data中的属性+计算
        },
    }

~~~

使用:

~~~
和data一样，可以直接在页面进行渲染 {{计算属性名}}
~~~





注意：计算属性的取名不能和data中属性的取名一样，否则优先data

## 场景

当要渲染计算之后同时也不会改变源数组的时候则会使用计算属性



比如向渲染两数之和

~~~
<template>
    <div>
        {{sum}}
    </div>
</template>

<script>
export default {
    data(){
        return{
           n1:1,
           n2:1
        }
    },
    computed:{
        sum(){
           return this.n1+this.n2
        },
    }
}
</script>
~~~

## 计算属性(computed)和方法(methods)的区别

1 计算属性会产生缓存，如果源数据没有被修改，则下一次会直接使用缓存中的数据 （性能提升）,只有改变了源数据，则计算属性才会重新计算



2 只有渲染计算属性，它才会执行



## 坑：如果改变计算属性，会怎样？



报错：原因你没有写计算属性的完整版

~~~
Computed property "getName" was assigned to but it has no setter.
~~~

解决：使用计算属性的完整的写法

## 计算属性完整语法

~~~
<template>
    <div>
   
        {{getName}}
        <button @click="changeName">改变名字</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            xing:"王",
            ming:"五"
        }
    },
    computed:{
        getName:{
            //用来渲染
            get(){
                 return this.xing+this.ming
            },
            //当直接修改计算属性值的会触发set
            set(val){
                console.log(val);
                let xing=val.substring(0,1);
                let ming=val.substring(1);
                console.log(xing,ming);
                this.xing=xing;
                this.ming=ming;
            }
        }
    },
    methods:{
       changeName(){
           this.getName="王麻子";
       }
    }
}
</script>

<style>

</style>
~~~

## 以后用得比较多的场景

如果修改多个地方都影响某一个地方时就会用到计算属性

购物车的总计