# 条件编译

## 作用：

~~~
处理不同平台的兼容性
~~~

## 语法

~~~
注释 #ifndef / #ifdef    平台

代码

注释 #endif


注释：
	如果是js   ：  //
	如果是template  <!-- -->
	如果是style  /*   */
~~~

- \#ifdef：if defined 仅在某平台存在
- \#ifndef：if not defined 除了某平台均存在



比如:

~~~
// #ifndef MP-WEIXIN
console.log(1);
// #endif
~~~



~~~
<template>

			
			<!-- #ifdef MP-WEIXIN  -->
			
			abc
			
			<!-- #endif  -->
	</view>

</template>
~~~



~~~
<style>
		
		/* #ifndef MP-WEIXIN */
		view{
			color:red
		}	
		/* #endif */
		
</style>
~~~

# 地图组件(map)

定位+地图渲染

~~~
	<map :latitude="latitude" :longitude="longitude"></map>
	
~~~

	export default {
		data() {
			return {
				  latitude: 39.909,
				  longitude: 116.39742,
			}
		},


​		
		 onLoad() {
			 let that=this
				uni.getLocation({
				    success: function (res) {
				        console.log('当前位置的经度：' + res.longitude);
				        console.log('当前位置的纬度：' + res.latitude);
						that.latitude=res.latitude;
						that.longitude=res.longitude
				    }
				});
			
		},






# 腾讯地图

百度 “腾讯地图api”

## 前置步骤：

~~~
申请开发者密钥（key）：申请密钥

开通webserviceAPI服务：控制台 ->应用管理 -> 我的应用 ->添加key-> 勾选WebServiceAPI -> 保存

(小程序SDK需要用到webserviceAPI的部分服务，所以使用该功能的KEY需要具备相应的权限)

下载微信小程序JavaScriptSDK，微信小程序JavaScriptSDK v1.1   JavaScriptSDK v1.2

安全域名设置，在小程序管理后台 -> 开发 -> 开发管理 -> 开发设置 -> “服务器域名” 中设置request合法域名，添加https://apis.map.qq.com
~~~

## 代码：

~~~
<template>

	
	<view class="">
		<button type="default" @click="search">搜索周边</button>
		<input type="text" v-model="t"/>
		<map :latitude="latitude" :longitude="longitude" :markers="mks"></map>
	
	</view>

</template>

<script>
	
	// 引入SDK核心类
	var QQMapWX = require('@/utils/qqmap-wx-jssdk.min.js');
	
	// 实例化API核心类
	var qqmapsdk = new QQMapWX({
	  key: 'KGOBZ-YDI66-2EFSK-EEDUD-DPETH-WBFAU'
	});
	
	export default {
		data() {
			return {
				  latitude: 39.909,
				  longitude: 116.39742,
				  t:"",
				  mks:[]
			}
		},
		
		
		 onLoad() {
			 let that=this
				uni.getLocation({
				    success: function (res) {
				        console.log('当前位置的经度：' + res.longitude);
				        console.log('当前位置的纬度：' + res.latitude);
						that.latitude=res.latitude;
						that.longitude=res.longitude
				    }
				});
			
		},
		
		
		methods: {
			search(){
				let that=this;
				console.log(this.t);
				
				let la=this.latitude
				let lo=this.longitude
				let key=this.t;
				
				 qqmapsdk.search({
				      keyword: key,  //搜索关键词
				      location: `${la},${lo}`,  //设置周边搜索中心点
				      success: function (res) { //搜索成功后的回调
					  console.log(res);
				        var mks = []
				        for (var i = 0; i < res.data.length; i++) {
				          mks.push({ // 获取返回结果，放到mks数组中
				            title: res.data[i].title,
				            id: res.data[i].id,
				            latitude: res.data[i].location.lat,
				            longitude: res.data[i].location.lng,
				            // iconPath: "/resources/my_marker.png", //图标路径
				            width: 20,
				            height: 20
				          })
				        }
						that.mks=mks
				      },
				     
				  });								
		
			}
		}
	}
</script>

<style >
	map{
		width: 100%;
		height: 750rpx;
	}
</style>

~~~



# 插件

## 1 scss  （全局）

## 2 ucharts (局部)

~~~
echarts只能用于PC，小程序可以使用ucharts
~~~



