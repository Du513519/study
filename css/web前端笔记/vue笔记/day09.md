# 回顾

~~~
vuex: 用来存储数据和函数的(公共的)
5个属性:
state  数据 
getters 计算属性  参数(state)
actions  异步请求方法 参数(context,data)
	context.commit
	context.dispatch
mutations  用来修改state数据的方法 参数(state,data)
modules 分模块

在组件中：this.$store来获取仓库对象
this.$store.dispatch




~~~

# 辅助函数(语法糖)

## 前置：需要在组件中通过vuex引入函数

~~~
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
~~~

## 1 mapState和mapGetters

  index.js:

~~~
export default new Vuex.Store({
  state: {
    name:"张三",
   
    n1:1,
    n2:2
  },
~~~

vue组件：

~~~
 computed:{
        ...mapState(['name']),
        ...mapGetters(['sum'])

    },
~~~

## 2 mapMutations和mapActions



~~~
    methods:{
        ...mapMutations(['CHANGE_NAME']),
        ...mapActions(['getStus']),
~~~

### 练习：通过辅助函数获取stus

index.js:

~~~
import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../http/axios.js'
import {STUS} from '../http/const.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    stus:[],

  },

  mutations: {
 
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



vue组件:

~~~
<template>
    <div>



      <span v-for="item in stus" :key="item._id">
          {{item.sname}} <br>
      </span>

       
    </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return{
           
        }
    },
    methods:{
   
        ...mapActions(['getStus']),
       
    },
    computed:{
        ...mapState(['stus']),
  

    },
    created(){
      this.getStus()
    }
}
</script>




<style>

</style>
~~~



# vuex模块化

## modules属性

### 步骤1 新建结构

在store/新建modules目录，在该目录下分别新建模块.js(比如stu.js/cla.js)

### 步骤2 编辑index.js

index.js:

~~~
import Vue from 'vue'
import Vuex from 'vuex'
import stu from './modules/stu.js'
import cla from './modules/cla.js'
Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    stu,
    cla
  }
})

~~~

### 步骤3：编辑模块.js

~~~
import axios from '../../http/axios.js'
import {STUS} from '../../http/const.js'
export default {
    //解决命名冲突问题
    namespaced:true,
    state: {
        name:"张三",
        stus:[],
        n1:1,
        n2:2
      },
      getters:{
        sum(state){
          return state.n1+state.n2
        }
      },
      mutations: {
         //参数1:state对象
         //参数2：接受外界的值
          CHANGE_NAME(state,data){
                state.name=data
          },
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
      modules: {
      }
}
~~~

### 步骤4在vue组件中使用

~~~
import {createNamespacedHelpers} from 'vuex'
const {mapState:mapState_stu,mapGetters:mapGetters_stu,mapMutations:mapMutations_stu,mapActions:mapActions_stu} =createNamespacedHelpers('stu');
// const {mapState:mapState_cla,mapGetters:mapGetters_cla,mapMutations:mapMutations_cla,mapActions:mapActions_cla} =createNamespacedHelpers('cla');
export default {

    methods:{
        ...mapMutations_stu(['CHANGE_NAME']),
        ...mapActions_stu(['getStus']),
       
    },
    computed:{
        ...mapState_stu(['name','stus']),
        ...mapGetters_stu(['sum'])
    },
    
}
</script>
~~~



## 扩展

...mapState([])可以改为...mapState({})

作用：重命名

使用场景：当在一个vue组件中使用多个模块使用



inde.js:

~~~
export default {
    //解决命名冲突问题
    namespaced:true,
    state: {
        name:"张三",
~~~



vue组件:

~~~
import {createNamespacedHelpers} from 'vuex'
const {mapState:mapState_stu} =createNamespacedHelpers('stu');

export default {
    computed:{
        ...mapState_stu({
            name_stu:'name'
        }),
        
        
 渲染：{{name_stu}}
 
~~~







# 面试题：混入是什么?(mixins)

每一个组件都有mixins属性来设置混入对象,我们提取公共的属性（data、methods等），用于各个组件中

语法:

~~~
export default {
    mixins:[混入对象],
    
~~~

## 步骤

1 src下新建mixins目录，该目录下新建mixins_list.js

2 编辑mixins_list.js

~~~
export default {
    data(){
        return{
            name:"abc"
        }
    },
    methods:{
        ff(){
            console.log("ffff");
        }
    }
}
~~~

3 在组件中使用混入对象

~~~
import mixins from '../../mixins/mixins_list.js'
export default {
    mixins:[mixins]
~~~



以上，组件就拥有了混入对象中的data和methods。





# 补充：

# ***\*扩展：模块化后通过原生方法获取子模块中的属性\****

***\*state：store\*******\*仓库对象\*******\*.state.模块名.key\*******\*
\*******\*getters：store\*******\*仓库对象\*******\*.getters[‘模块名/key’]\*******\*
\*******\*mutations：store\*******\*仓库对象\*******\*.commit(‘模块名/method’)\*******\*
\*******\*actions：store\*******\*仓库对象\*******\*.dispatch(‘模块名/method’)\****

 

 

 

# ***\*扩展：想要在js文件中获取store仓库对象\****

直接通过import store  from  ‘......store/index.js ’

store就是仓库对象

