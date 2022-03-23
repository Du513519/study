# 回顾

~~~
小程序：无需下载安装，直接扫一扫或搜索即可游玩
项目结构:
	  pages 
	  	
	  	每一个页面由4个文件组成，js、json、wxml、wxss
	  	文件夹和4个子文件的前缀匹配
	  app.json （全局配置:pages、window、tabBar）
	  app.js (全局业务,生命周期、全局数据)
	  app.wxss(全局样式)
单位:rpx(自适应)
组件:view  scroll-view swiper(swiper-item) text rich-text image navigator
数据渲染: {{}}   wx:for="{{arr}}" wx:key="id"  送了 item 和  index 
wx:for-item  wx:for-index

条件渲染和隐藏显示
wx:if=""
hidden=""

自定义组件:

事件：
	冒泡：tap
	非冒泡: input focus blur 
注册事件 <标签    bind事件类型="函数"/catch事件类型=""  
js:函数(e){
	e.xxx
}
传参: mark:属性=""  data-属性=""
小程序想要重新渲染:
this.setData({
	已定义的属性：值
})

弹性项：flex:0 0 width

~~~

# 获取文本框的值：

~~~
<input type="text" bindinput="change" />
   change(e){
        console.log(e.detail.value);
~~~

# 小程序中的简易双向绑定

~~~
 <input model:value="{{value}}"  />
 
     data: {
       value:""
       
 注意：只能使用value，并且只能是基本数据类型
 
~~~



# 生命周期

小程序中分为了4类

1 小程序的生命周期

~~~
onLaunch (options) {
    // Do something initial when launch.  初始化
  },
  onShow (options) {
    // Do something when show.  切入小程序时
  },
  onHide () {
    // Do something when hide.  切出小程序
  },
~~~





2 页面的生命周期 (核心是onLoad和onShow)

~~~
	onLoad: function (options) {
           //页面初始化，
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
		//每次进入页面时都会触发
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },
~~~



3 组件的生命周期

~~~
Component({
    /**
     * 组件的属性列表
     */
    lifetimes: {
        attached: function() {
          // 在组件实例进入页面节点树时执行
        },
        detached: function() {
          // 在组件实例被从页面节点树移除时执行
        },
      },
~~~

~~~
created	无	在组件实例刚刚被创建时执行	1.6.3
attached	无	在组件实例进入页面节点树时执行	1.6.3
ready	无	在组件在视图层布局完成后执行	1.6.3
moved	无	在组件实例被移动到节点树另一个位置时执行	1.6.3
detached	无	在组件实例被从页面节点树移除时执行	1.6.3
error	Object Error	每当组件方法抛出错误时执行
~~~



4 组件所在页面的生命周期

~~~
Component({
  pageLifetimes: {
    show: function() {
      // 页面被展示
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  }
})
~~~



~~~

生命周期	参数	描述	最低版本
show	无	组件所在的页面被展示时执行	2.2.3
hide	无	组件所在的页面被隐藏时执行	2.2.3
resize	Object Size	组件所在的页面尺寸变化时执行	2.4.0
~~~



# 网络请求

~~~
wx.request({
  url: ', //仅为示例，并非真实的接口地址
  data: {
  
  },
  method:"提交方式"
  success (res) {
  	//成功
    console.log(res.data)
  },
  fail(res){
  	//失败
  },
  complete(res){
  	//无论成功失败都会进入
  }
})
~~~

## 轮播图：

wxml:

~~~
<swiper class="banner">
  <swiper-item wx:for="{{swiperData}}" wx:key="goods_id">
    <image mode="widthFix" src="{{item.image_src}}" />
  </swiper-item>
</swiper>
~~~



js:

~~~
Page({
  data: {
    swiperData:[]
  },

  
  onLoad() {
      let that=this;
      wx.request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        success(res){
          console.log(res.data.message);
          that.setData({
            swiperData:res.data.message
          })
        }
      })
  },
})
~~~



wxss:

~~~
.banner{
  /* border: 1rpx red solid; */
  width: 95%;
  margin: 10rpx auto;
}
.banner image{
  width: 100%;
  height: 100%;
}
~~~

