# 回顾

~~~
暴露

​	后端：

  module.exports={}

   前端:

   export {}

   export default xx

引入

​	后端：const xx=require('')

​    import {} from 'xx.js'

​    import xx from 'xx.js'



node三大模块:

1 http

2 fs

3 path
~~~



# npm

## 概念

npm叫做包管理器,能够管理项目使用的那些插件(模块/包),npm是随着node.js一起安装,无需单独安装

## 查看npm的版本

~~~
npm -v
~~~

查看全局安装位置: 

~~~
npm root -g

比如我的是:C:\Users\86136\AppData\Roaming\npm\node_modules
~~~

## 作用

用户可以通过npm免费下载第三方插件,比如jquery。。。。。



## 设置淘宝镜像

~~~
npm config set registry https://registry.npm.taobao.org
~~~



## 后端项目初始化

~~~
1 新建一个目录充当项目
2 初始化
	npm init -y

~~~

初始化后会在当前目录下生成一个package.json文件

该文件：

~~~
1 显示项目信息
2 显示下载安装好的插件列表(dependencies)
~~~

# npm插件下载

## 分类

~~~
分为全局下载和局部下载

全局：插件将会下载到   npm root -g 所在位置  ,以后所有的项目能够使使用它
	脚手架、工具等会用到全局
局部: 插件将会下载到当前项目，只有当前项目能够使用(用的多)
	只有当前项目需要的插件，比如jquery
~~~

### 局部下载

~~~
语法:
npm install  插件名 --save
npm install  插件名 -S
npm i  插件名 -S
npm i  插件名 (推荐)
npm i    会自动根据package.json文件的插件列表下载

局部删除
npm uninstall  插件名
~~~

局部下载jquery

~~~
npm  i   jquery      -- 默认下载最新版
npm  i   jquery@2
~~~



注意：下载完毕后，会生成一个package-lock.json，该文件可以锁住曾经下载的插件的版本



### 全局下载

~~~
语法:
npm install  插件名  -g

全局删除
npm uninstall  插件名  -g
~~~



# Express

## 概念

是一个基于node平台用于快速开发服务端的框架



## 准备工作

脚手架：

有人帮你把这个开发过程中要用到的工具、环境都配置好了，你就可以方便地直接开始做开发，专注你的业务，而不用再花时间去配置这个开发环境，这个开发环境就是脚手架。



### 全局下载安装express的脚手架

~~~
npm i -g express-generator
~~~



## 通过脚手架生成express服务器项目

~~~
1 在当前目录下：express 项目名  ，就会在当前目录下生成新项目
2 express  c:.../项目     就会在指定的路径下生成新项目
~~~

## 初始化项目

根据package.json下载对应插件

~~~
npm i
~~~



## expxress项目结构

1 bin/www

~~~
创建服务.默认为3000
~~~

2 public

~~~
用来装前端资源：html、css、js、图片视频等
如果访问里面的资源时，不能写public
public下有一个xx.html,则访问地址应该是:localhost:3000/xx.html   
~~~

3 routes

~~~
用来写后端代码
~~~



4 view(不用管 --模板相关的)



5 app.js

~~~
入口js
~~~



## 开服方式1

~~~
npm start 
~~~

## 开服方式2

~~~
找到app.js

// module.exports = app;
app.listen(3000,()=>{
    console.log("3000开服成功");
})
~~~

~~~
开服: node ./app.js
~~~



前两种方式有个弊端，每次改完后端routes下的代码后需要手动ctrl+c关服再开服，很麻烦

## 开服方式3 (在开服方式2的基础上)

~~~
前置：全局安装nodemon插件   npm i nodemon -g
作用: 支持热更新(每次改完代码只要你有ctrl+s操作会自动重启服务)
注意：1 炸鸡慎用  2不要完全相信它（有时候会卡住，只能手动关服+开服）
~~~

~~~
开服:
	nodemon ./app.js
~~~



# 路由

## 概念

路由就是跳转地址(url)和和后端js的映射关系,当我们配置好路由后，以后前端发送ajax请求，就能够跳转到对应的后端函数中去



## 步骤

~~~

在后端路由分为了1级路由和2级路由,1级路由在app.js中，2级路由在routes/xx.js中


app.js(1级):
		var usersRouter = require('./routes/users');
		app.use('/users', usersRouter);

users.js(2级)
		router.get('/xxx', function(req, res, next) {
          res.send('respond with a resource');
		});
		
请求地址：localhost:3000/users/xxx
~~~



## 路由跳转的参数传递

### 如果前端是get请求

语法:req.query

~~~
router.get('/login', function(req, res, next) {
  const {username,password}=req.query
  console.log(username,password);
  res.send('你好世界');
});
~~~

### 如果前端是post请求

语法:req.body

~~~
router.post('/login', function(req, res, next) {
  const {username,password}=req.body
  console.log(username,password);
  res.send('你好世界');
});
~~~

规则：

查询用get提交

增删改用post提交

# 推荐一个测试工具 postman

该工具可以测试后台接口





# 响应

~~~
 res.send()
 注意：我们一般都会返回对象给前端
 比如: res.send({})
~~~



练习：完成登录、注册 

额外功能:

​	1 显示loading加载

​	2 在注册是，当焦点离开帐号框，触发ajax，显示账号可用或者账号已被注册

​    3 点击注册时，如果该账号已存在，则不允许注册

~~~
user:_id  username  password   head
~~~







