# 关于异步执行问题(重要)



## 小程序

~~~
需求：我们想要页面元素渲染后再执行某一个函数，该怎么办

this.setData({赋值data中的数据},()=>{//当页面都渲染完毕后才会执行})
~~~

## Vue：

~~~
//赋值代码
//当页面都渲染完毕后才会执行
this.$nextTick(() => {
});
~~~



# 左右联动

需求：

点击左侧，滚动右侧

滚动右侧，改变左侧

## wxml:

~~~

<view style="display: flex;" >

    <scroll-view  class="left" scroll-y style="height: 100vh;">
        <view class="{{currentIndex==index?'select':''}}" bindtap="change_left"  mark:index="{{index}}" style="height: 400rpx;width: 100rpx;" wx:for="{{lefts}}" wx:key="index">{{item}}</view>
    </scroll-view>


    <scroll-view bindscroll="change_right" scroll-top="{{right_top}}"   scroll-y style="height: 100vh;">
        <view style="height:{{item.height}}rpx;"  class="right" wx:for="{{rights}}" wx:key="id">{{item.text}}</view>
    </scroll-view>
</view>
~~~

## wxss:

~~~
.select{
    background-color: red;
}
~~~

## js:

~~~
// pages/cat2/cat2.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        lefts:['a','b','c','d','e','f','g','h','i'],
        right_top:0,
        arr:[],
        currentIndex:0,
        isflag:true

    }, 
    //左变右
    change_left(e){
        
        this.setData({
            right_top:this.data.arr[e.mark.index],
            currentIndex:e.mark.index,
            isflag:false
        })
        setTimeout(()=>{
            this.setData({
                isflag:true
            })
        },200)
    },
    //右变左
    change_right(e){
       if(this.data.isflag){
        console.log("ok");
        let top=e.detail.scrollTop;
        console.log(top);
        let arr=this.data.arr;
        for(let i=0;i<arr.length-1;i++){
            if(top>arr[i] && top <arr[i+1]){
                this.setData({
                    currentIndex:i
                })
            }else if(top>arr[arr.length-1]){
                this.setData({
                    currentIndex:arr.length-1
                })
            }
        }
       }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that=this;
        this.setData({
            rights:[
                {id:1,text:"a对应的内容",height:500},
                {id:2,text:"b对应的内容",height:1500},
                {id:3,text:"c对应的内容",height:700},
                {id:4,text:"d对应的内容",height:600},
                {id:5,text:"e对应的内容",height:800},
                {id:6,text:"f对应的内容",height:2500},
                {id:7,text:"g对应的内容",height:500},
                {id:8,text:"h对应的内容",height:500},
                {id:9,text:"i对应的内容",height:5000},
            ],
        },()=>{
            //计算右侧每个元素距离顶部的高度
            wx.createSelectorQuery().selectAll(".right").boundingClientRect(function(res){
                console.log(res);
                let arr=[];
                res.forEach(item=>{
                    arr.push(item.top)
                })
                that.setData({
                    arr
                })
            }).exec();
        })
    },


})
~~~

## 性能优化

~~~
每次滚动右侧都会触发函数，性能开销比较大
解决：防抖节流(自行百度)

~~~

# 公共仓库globalData

作用：用于存储公共数据,比如userInfo、baseURL等

位置:app.js

~~~
  //全局数据
  globalData: {
    userInfo: null
  }
})
~~~

赋值:

~~~
this.globalData.属性=值,无需写this.setData()
~~~



## 在其他页面.js中调用

~~~
在最顶端:let app= getApp(); 能够获取全局对象
app.globalData.属性可以赋值/获取数据
~~~



# 授权

## 步骤

~~~
1 通过wx.getUserProfile()--》弹出是否授权的框，如果用户点击是，则响应给你用户信息对象(昵称、头像)
2 通过wx.login()-->获取临时身份凭证（code）
3 通过wx.request()向后端（开发者服务器）发送请求(把code和用户信息传递过去),后端通过appid+appsecret+code打包请求微信服务，最终微信响应openId等身份交给后端，后端经过处理把登录态(token)响应给前端
4 前端拿到token之后保存本地，以后在各大业务中发起qjax时在header中携带token来完成业务

~~~

## 代码-授权获取token

~~~
    login() {
        //授权并且获得用户信息
        wx.getUserProfile({
            desc: "授权",
            success(res) {
                console.log(res.userInfo);
                let userInfo = res.userInfo;
                //获取临时凭证(code)
                wx.login({
                    success(res) {
                        console.log(res.code);
                        //向开发者服务器发送请求(code、userInfo)
                        wx.request({
                            url: 'http://47.98.128.191:3001/users/wxLogin',
                            method: 'POST',
                            data: {
                                code: res.code,
                                userInfo,
                                //正式开发中，不需要传以下,一般都是后端会设置好的
                                //以下两个参数一定要写真实
                                appId: 'wx572ced4094dbeceb',
                                appSecret: '85031bfda599fb4049260928a1266c34'
                            },
                            success(res){
                                console.log(res.data.token);
                                //把token保存到本地
                                wx.setStorageSync('token', res.data.token)
                            }
                        })
                    }
                })
            },
            fail(res) {
                console.log(res);
            }
        });
    },
~~~

## 代码：解码token获取userInfo，并且交给globalData

~~~
// app.js
App({
  onLaunch() {
    console.log("小程序初始化");
    this.getUserInfo()
  },

  getUserInfo() {
    let that=this;
    wx.request({
      url: 'http://47.98.128.191:3001/users/getUserInfo',
      //在请求头中携带token
      header: {
        Authorization:wx.getStorageSync('token')
      },
      success(res){
          console.log(res.data.userInfo);
          //把用户对象赋值给全局globalData
          that.globalData.userInfo=res.data.userInfo
          
          //调用回调函数
          //if(that.getUserInfoReady){
           // that.getUserInfoReady();
          //}        
      }
    })
  },



  //全局数据
  globalData: {
    userInfo: null
  }
})
~~~

## 在某页面定义回调函数获取全局数据的方法

1 在页面.js中为app注册回调函数

~~~
    let app = getApp();
    
    
    data: {
        userInfo: {}
    },
    
    
    onLoad: function (options) {
        let that=this;
      
        //为app注册函数
        app.getUserInfoReady = function () {
            that.setData({
                userInfo: app.globalData.userInfo
            })
        }
    },
~~~

2 在app.js的获取到数据后调用回调函数：

~~~
if(that.getUserInfoReady){
     that.getUserInfoReady();
}      
~~~

