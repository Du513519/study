# 自定义指令

## 概念

vue除了内置的指令(v-xx)外，我们也可以自定义指令取完成某些业务



## 分类

~~~
1 全局自定义指令(一旦定义好之后，可以在任意组件中使用) ---推荐

2 局部自定义指令(只能在当前组件中定义和使用)
~~~



## 语法

1 全局

import Vue  from 'vue'

Vue.directive("指令名称",{

​	钩子函数(){

​		//业务...	

​	}

})

~~~

~~~

2 局部

~~~
export default {
	directives:{
		"指令名称":{
			钩子函数(){
				//业务
			}
		}
	}

}
~~~

## 指令相关的钩子函数

~~~
1 bind:(初始化)指令被绑定元素时调用 (只会调用一次)
2 inserted:当被指令绑定的元素挂载到页面时(添加到dom) ---重点
3 update:当组件更新时
~~~



## 例子：全局自定义指令的演示

步骤1：

src/新建directives目录，该目录下新建mydirective.js,编辑该js

~~~
import Vue from 'vue'
Vue.directive("laowang",{
    inserted(el,binding){
        console.log(el); //被绑定的元素
        console.log(binding.value); //绑定的值
    }
})
~~~



步骤2：使用mydirective.js

~~~
在main.js:
import './directives/mydirective.js'
~~~



步骤3 ：绑定元素

~~~
        <button v-laowang="name">测试</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name:"张三"
        }
    }
}
</script>
~~~

## 自定义指令和元信息的区别

~~~
元信息:标记在路由中。切换路由时才会生效
自定义指令：标记在元素中，当满足钩子时才会触发
~~~



## 案例1

~~~
页面中有一个输入框，当页面加载时，让输入框获取焦点
~~~

 js:

~~~
import Vue from 'vue'
Vue.directive("laowang",{
    inserted(el,binding){
       el.focus();
    }
})
~~~

vue:

~~~
<input type="text" v-laowang>
~~~

## 案例2

~~~
模拟加载图片时比较慢，为了提高客户体验，如果图片还未加载完，则显示本地默认的图片
~~~

   js:

~~~
import Vue from 'vue'
Vue.directive("laowang",{
    inserted(el,binding){
       console.log(el,binding.value);
       
       //通过延时器为每一个图重新设置src属性
       setTimeout(() => {
        //el.setAttribute("src",binding.value)
        el.src=binding.value
       }, Math.random()*5000);
    }
})
~~~

vue:

~~~
<template>
    <div>
        <!-- <router-view/> -->
        <img v-laowang="item.url" src="./assets/logo.png"  v-for="item in imgs" :key="item.id">
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            imgs:[
                {
                    id:1,
                    url:"https://img2.baidu.com/it/u=1001022810,2877119290&fm=26&fmt=auto"
                },
                 {
                    id:2,
                    url:"https://img0.baidu.com/it/u=3544341050,283367167&fm=26&fmt=auto"
                },
                 {
                    id:3,
                    url:"https://img1.baidu.com/it/u=2782051080,1777536132&fm=26&fmt=auto"
                }
            ]
            
        }
    }
}
</script>

<style>

</style>

~~~

## 案例3

~~~
不同的用户，有不同的权限，
比如:以下三个账号都能查询学生，但是
aaa  123    ==> 只能编辑学生（只看得见编辑按钮）
bbb  123    ==> 只能删除学生 （只看得见删除按钮）
ccc  123    ==> 既能编辑又能删除 (都看得见)

~~~

相关代码：

js:

~~~
import Vue from 'vue'
import store from '../store/index.js'
Vue.directive("laowang",{
    inserted(el,binding){
       console.log(el,binding.value);
       //删除  编辑
       if(store.state&&store.state.user&&store.state.user.user){
            if(!store.state.user.user.privilege.includes(binding.value)){
                el.parentNode.removeChild(el);
            }
       }
       
    }
})
~~~

vue:

~~~
<el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-laowang="'编辑'" size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button v-laowang="'删除'"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
~~~

# echarts

## 概念

~~~
echarts是百度前端团队基于canvas的js图标库(可视化数据)

~~~

## 安装

~~~
npm i echarts
~~~



## demo：

~~~
<template>
  <div>
    <div id="main" style="width: 1200px; height: 400px"></div>
  </div>
</template>

<script>
//引入
import * as echarts from "echarts";

export default {
  data() {
    return {
      obj: {
        names: [],
        ages: [],
      },
      myChart: {},
    };
  },
  watch: {
    obj: {
      handler(newVal) {
        console.log(newVal);

        this.myChart.setOption({
          xAxis: {
            data:newVal.names,
          },
          series: [
            {
              data: newVal.ages,
            },
          ],
        });
      },
      deep: true,
    },
  },
  async created() {
    let res = await this.api.stus.getStus();
    console.log(res.result);
    this.obj.names = res.result.map((item) => item.sname);
    this.obj.ages = res.result.map((item) => item.age);
  },

  //初始化
  mounted() {
    this.myChart = echarts.init(document.getElementById("main"));
    this.myChart.setOption({
      title: {
        text: "名字-年龄",
      },
      tooltip: {},
      xAxis: {
        data: [],
      },
      yAxis: {},
      series: [
        {
          name: "年龄",
          type: "bar",
          data: [],
        },
      ],
    });
  },
};
</script>

<style>
</style>
~~~



## 作业：

~~~
1 完成学生-名字的柱状图
2 完成学生-名字的饼状图
3 完成班级-人数的柱状图/饼状图

~~~

