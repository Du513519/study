# 云开发

## 概念

~~~
开发者无需简单服务器，可以直接使用云服务器和云数据进行开发和测试,多用于测试

~~~

## 云数据

~~~
注意：每一个集合都需要重新设置数据权限
{
  "read": true,
  "write": true
}
~~~

### 使用

### 1 获取db

~~~
方式1：获取默认db
	const db = wx.cloud.database()

方式2: 获取指定db
    const testDB = wx.cloud.database({
      env: 'cloud1-4g47r8ribe6a25f6'
    })
~~~

#### 2 获取指定集合

~~~
let stus=db.collection("stus")
~~~



#### 3 crud操作

~~~
1 添加  ：  集合.add({data:{字段}})

    async add(){
        let res=await stus.add({data:{
            sname:"王五",
            age:16
        }})
        console.log(res);
    },
 

2 根据id删除:   集合.doc('_id').remove()

    async del(){
        let res=await stus.doc('5b049cc861cd1355014f779b3a316f96').remove();
        console.log(res);
    },




3 修改  :集合.doc('_id').update({data:{}})

    async upd(){
        let res=await stus.doc('54ad1eea61cd10510198c2275ae9c308').update({data:{
            sname:"张三三",
            age:40
        }});
        console.log(res);
    },
    
4 查询一个 :  集合.doc('_id').get()

    async getOne(){
        let res=await stus.doc('54ad1eea61cd10510198c2275ae9c308').get();
        console.log(res.data);
    },

5 查询多个 : 集合.where({条件}).get()

	    //模糊
	    async getMany(){
            let res=await stus.where({
                sname:/张/
            }).get();
            console.log(res.data);
   		 },
   		 
   		 
   		 //精确
   		 async getMany(){
            let res=await stus.where({
                sname:'张三'
            }).get();
            console.log(res.data);
   		 },
    
    
    
~~~

## 云函数

~~~a
把自己封装好的函数存在在云服务器中，方便以后调用

~~~

### 配置

~~~
项目根目录：project.config.json：

{
    //配置存储云函数的根目录
    "cloudfunctionRoot": "cloudfunctions/",
~~~



### 使用

1 在根目录右键新建node.js云函数

2 编辑index.js

~~~
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    // const wxContext = cloud.getWXContext()
    //event用来获取参数
   console.log(event);
   let stus=[1,2,3]
    return {
       sum:event.n1+event.n2,
       stus
    }
}
~~~

3 右键云函数，上传并同步......(第一次会叫你下载插件，点是)

4 小程序中调用云函数:

~~~
async  getCloudFunction(){
       let res=await wx.cloud.callFunction({
            name:"getOneUser",
            data:{
                n1:1,
                n2:2
            }
        })
        console.log(res.result);
    },
~~~

### 使用云函数的本地调试

~~~
右键云函数，开启云函数本地调试即可
~~~

## 使用云函数操作云数据库

~~~
把wx.cloud.database()改为cloud.database()
需要注意的:获得集合需要在云函数入口中写

~~~

~~~
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database({
    env: 'cloud1-4g47r8ribe6a25f6'
})
console.log(db);

// 云函数入口函数
exports.main = async (event, context) => {
    // const wxContext = cloud.getWXContext()
    //event用来获取参数
    console.log(event);
    //获取集合
let stus = db.collection("stus")
console.log(stus);
    let res = await stus.where({
        sname: /张/
    }).get();
    console.log(res.data);
    
    return {
        sum: event.n1 + event.n2,
        stus:res.data
    }
}
~~~



# uni-app

## 概念

移动端跨平台框架:写一套代码，以后可以编译成小程序、ios等不同端



## 使用工具

~~~
hbuilder x 
打印：clog--->console.log()

~~~

## 新建项目

~~~
1 选择uni-app
2 编辑代码
3 开启微信开发者工具的服务端口 (只需要配置一次)
4 运行-》运行到小程序模拟器--》微信开发者工具
~~~



## 准备工作

~~~
新建以下目录即可:
common  样式
components 组件
store  状态机
http 请求
~~~



## store

uni-app内置了vuex

步骤1 ：创建文件

~~~
项目根目录新建store目录，该目录下新建index.js
~~~

步骤2:编辑文件(index.js)

~~~
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
	  name:"张三"
  },
  getters:{},
  actions:{},
  mutations:{},
  modules: {
   
  }
})
~~~

步骤3：引入该js(编辑main.js)

~~~
import App from './App'
//引入store
import store from './store/index.js'
import Vue from 'vue'
const app = new Vue({
	store,
    ...App
})

~~~

步骤4：在页面中使用仓库

~~~
方式1：原生
		computed:{
			name(){
				return this.$store.state.name
			}
			

方式2：辅助
	import {mapState} from 'vuex'
		computed:{
			...mapState(['name'])
		},
~~~



# uni-app中的生命周期

## 1 应用生命周期  (app.vue)

~~~
onLaunch	当uni-app 初始化完成时触发（全局只触发一次）
onShow	当 uni-app 启动，或从后台进入前台显示
~~~



## 2 页面生命周期  (pages下的vue文件的export default 下)

~~~
onLoad	监听页面加载，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参），参考示例		
onShow	监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
onPullDownRefresh	监听用户下拉动作，一般用于下拉刷新，参考示例		
onReachBottom	页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。具体见下方注意事项
~~~



## 3 组件生命周期  (pages下的vue文件的export default 下)

~~~
beforeCreate	在实例初始化之后被调用。详见		
created	在实例创建完成后被立即调用。详见		
beforeMount	在挂载开始之前被调用。详见		
mounted	挂载到实例上去之后调用。详见 注意：此处并不能确定子组件被全部挂载，如果需要子组件完全挂载之后在执行操作可以使用$nextTickVue官方文档		
beforeUpdate	数据更新时调用，发生在虚拟 DOM 打补丁之前。详见	仅H5平台支持	
updated	由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。详见	仅H5平台支持	
beforeDestroy	实例销毁之前调用。在这一步，实例仍然完全可用。详见		
destroyed	Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件
~~~



# 封装http

1 在项目根目录下新建http目录，该目录下新建request.js:

~~~
function request({url,method='GET',data}){
	return new Promise((resolve,reject)=>{
		uni.showLoading({
		    title: '加载中'
		});
		uni.request({
		    url,
			method,
			data,
			success(res) {
				resolve(res.data)
			},
			fail(res){
				reject(res)
			},
			complete(){
				uni.hideLoading()
			}
		});
	})
}
export default request;

~~~



2 挂载全局

~~~
//引入http
import request from './http/request.js'

//挂载全局
Vue.prototype.request=request;
~~~



# 

~~~

~~~

# 作业：

~~~
 使用uni-app完成：
 1 登录(授权),登录后显示头像和昵称以及注销(查询官方文档)
 	要求：使用vuex保存userInfo
 2 触底分页(显示商品图片)
 3 向上刷新(重新显示第一页图片)
~~~















