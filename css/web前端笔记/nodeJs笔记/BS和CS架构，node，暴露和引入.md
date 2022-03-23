闭包：

~~~
优点：可以重复定义变量，避免全局变量污染
缺点：定义的变量一直在内存中，不会被回收，占用内存
~~~



# B/S和C/S架构

B/S:浏览器/服务器架构

~~~
桌面上所有的浏览器都属于B/s
~~~

优点：

~~~
程序员只需要维护服务端代码即可
~~~

缺点：

~~~
客户端不做任何计算
~~~





c/s:客户端/服务器架构

~~~
桌面上除开浏览器的其他可执行程序（*.exe）都属于C/S
~~~

 缺点：

~~~
维护成本高（维护服务器和客户端代码）
~~~

优点

~~~
客户端一定会做大量的计算
~~~



# 网络协议

~~~
计算机网络之间只要遵循协议，即可进行交互
~~~



## TCP/IP协议

TCP:传输协议

IP:因特网协议



面试题：当用户在地址栏输入地址后敲回车，发生了什么？（一次完整的http事务的过程）

~~~
1 建立TCP连接（经历3次握手）
	1.1第一次握手:浏览器向服务器发起请求，问服务器你状态正常吗？
	1.2第二次握手:服务器响应客户端，说我正常，你来吧
	1.3第三次握手：浏览器发起请求，我要开始发送数据
	
2 浏览器发送请求，服务器就处理请求，最终响应浏览器
3 关闭TCP连接(经历4次挥手)
	3.1 第一次挥手：浏览器向服务器发请求：事情处理完了，我要断开连接，可以吗
	3.2 第二次挥手：服务器响应浏览器，我这边检查下是否真的处理完了
	3.3 第三次挥手：服务器响应浏览器，事情已经处理完毕
	3.4 第四次挥手:浏览器向服务器发请求：好的，我关闭连接
4 浏览器渲染页面
~~~

tcp协议:安全性、完整性（整个数据是不会丢失的）浏览网页，下载

upd协议:快速(数据可能会丢失)  视频会议





# node.js

## js运行环境:

~~~
1 浏览器
2 node.js
~~~



## 概念

~~~
node是一个基于chrome v8引擎的js的运行时(运行环境)
chrome v8引擎是公认速度最快的引擎
我们一般会用node来做后台(服务端)
~~~



## 下载

~~~
百度  "node.js" 自行下载以及安装(无脑安装)
~~~

## 查看node版本号

​	终端:(用来敲命令的)

​	我们目前可以使用的终端：

​	1 win+r  (windows自带的)

​    2 vscode （ctrl+`）



~~~
node -v
~~~



## node 中运行js文件

前置：

~~~
./代表当前目录
../代表上一级
cd 跳转目录
~~~



执行 js文件

~~~
node 文件
~~~



练习：

E:/web67/code1

​	code1目录下新建a.js

E:/web67/code2

​	code2目录下新建b.js



1 通过vscode终端进入 code1目录,分别去执行a.js和b.js

2通过win终端进入web67目录，分别取执行a.js和b.js





# node中的规范

回顾：js由 dom 、bom、ECMAScript    组成,

其中ES就是js的规范

而node中的规范叫Commonjs



前端js文件是共享的,会有全局变量污染的问题，尽管在不同的js文件中设置相同的变量，会报错,这不是我们想要的



# require

## 模块化

每个js文件应该是独立，互不干扰的，



## 引入

在node.js中，可以通过require在一个js文件中引入另一个js文件

语法:

~~~
require('路径.js')

注意：后缀是可以省的
比如:
require('./a')
require('./a.js')

~~~

问题：仅仅通过require('路径.js')只允许程序执行引入的那个js，但却不能拿到引入js中定义的变量，说明了node中，每一个js文件是独立的（在不同的js文件定义相同的变量名是允许,避免了全局变量污染）





## 暴露

由于后端通过require引入的js文件默认无法共享数据，因此需要手动暴露某些变量才能传递数据到另一个js文件

语法:

~~~
module.exports
~~~



暴露:

~~~
let user = {
    name: "张三",
    age: 2
}
module.exports = {
    user
};

注意：module.exports只能写一次
~~~

引入 (喜欢用解构)

~~~
let {user}=require('./a')
console.log(user.name);
console.log(user.age);


不用解构：
let obj=require('./a')
console.log(obj.user.name);
console.log(obj.user.age);
~~~



### 很少见的写法:(了解)

暴露:

~~~
let name="abc";;
let age=12
module.exports.name=name;
module.exports.age=age;

~~~



引入:

~~~
const obj=require('./a')
console.log(obj);
或者
const {name,age}=require('./a')
console.log(name,age);
~~~





## 另一种暴露(了解)

语法:

~~~
exports
~~~

暴露：

~~~
let user = {
    name: "张三",
    age: 2
}

exports.k1=user;
exports.k2="aa"


~~~

引入:

~~~
const {k1,k2}=require('./a')
console.log(k1,k2);
~~~



练习：

~~~
前置：
E:/web67/code1

	code1目录下新建a.js

E:/web67/code2

	code2目录下新建b.js
	
在a.js中
定义一个user对象{name:"张三",age:18},
定义一个字符串address=“重庆”,
定义一个狗数组[{type:"金毛"},{type:"哈士奇"},{type:"泰迪"}]。

然后在 b.js中引入a.js,并且输出：我叫张三，今年18岁，来自重庆，我喜欢的狗有金毛、哈士奇、泰迪

~~~

答案：

~~~
a.js:
let user={
    name:"张三",
    age:18
};
let address="重庆";
let dogs=[{type:"金毛"},{type:"哈士奇"},{type:"泰迪"}];
let obj={
    user,
    address,
    dogs
}
module.exports=obj




b.js:

const {user,address,dogs}=require('../code1/a');
// let str="";
// dogs.forEach(item=>{
//     str+=item.type+"、";
// })
// str=str.substring(0,str.length-1);
console.log(`我叫${user.name},今年${user.age},来自${address},我喜欢的狗有`
+dogs.map(item=>item.type).join("、"));
~~~



# 前端的模块化

语法:

~~~
<script src="xxx.js" type="module"></script>
~~~

## 前端的暴露和引入

html:一定要使用 type="module"

~~~
    <script src="./a.js" type="module"></script>
    <script src="./b.js" type="module"></script>
~~~

暴露语法:

~~~
export 定义变量
~~~

引入语法:

~~~
import {} from 'xx.js'
~~~

注意：前端的引入的后缀是不能省的

暴露

~~~
export let age=18;
export let name="张三";
~~~

注意：export可以写多个

引入

~~~
import {name,age} from './a.js'
console.log(name,age);
~~~



但是我们一般暴露时喜欢暴露一个对象

~~~
export let user={
    name:"张三",
    age:18
}
~~~



## 但但是我们更喜欢这么做：

暴露语法:

~~~
export {}
~~~



~~~
暴露：
let user={
    name:"张三",
    age:18
}
let address="重庆"
export {user,address}




引入:
import {user,address} from './a.js'
console.log(user,address);
~~~



## 如果无需暴露引入，只是为了执行某个js文件：

~~~
import  './a.js'
console.log("bbbb");
~~~



## 暴露和引入时可以更改变量名（了解）

我们可以在暴露和引入时取别名，语法:

~~~
变量  as  新变量
~~~

暴露

~~~
let user={
    name:"张三",
    age:18
}
export {user as u}
~~~

引入

~~~
import {u as user} from './a.js'
console.log(user);
~~~

## 默认暴露(重点)

语法:

暴露

~~~
export default 定义好的变量名
~~~

引入

~~~
import 自定义变量 from 'xx.js'
~~~



demo:

~~~
暴露:
let user={
    name:"张三",
    age:18,
}

export default user

引入:
import obj from './a.js'
console.log(obj);
~~~





# 暴露引入总结:

## 后端:

暴露：

~~~
module.exports={。。。。}
~~~

引入:

~~~
const obj =require('路径')
~~~

## 前端:

暴露:

~~~
export {变量}

export default 变量    (重点)
~~~

引入

~~~
import {变量} from '路径.js'    --该变量要匹配暴露的变量
 
import 自定义变量 from '路径.js'    (重点)
~~~



# node自带的三大模块(了解)

node本身就有以下3个模块:

~~~
1 服务器
2 fs（file system）文件模块
3 path路径模块
~~~

## 关于引入问题：

~~~
如果引入的是自己写的js文件，则路径一定有./或../
如果引入的是node自身或者第三方模块（插件）则路径一定是名字
比如: require('../aa') -->引入的自己的js
     require('aa')-->引入的是别人插件

~~~



## 服务器模块(http)

~~~
服务器能够接受客户端的请求，并且能够响应数据给客户端
~~~

### 写一个服务器

~~~
//引入node的服务器模块
const http=require('http');
const server=http.createServer((request,response)=>{
    //request:接受浏览器请求的参数
    //response：响应浏览器数据
    response.write("<h1>哈哈</h1>");
    response.end();
})
//设置监听(listener)
server.listen(8080,()=>{
    console.log("服务器开服成功");
})
~~~

注意：关服:ctrl+c

访问:localhost:端口

## 文件模块(fs)

### 1 读取文件

~~~
//读取文件(把磁盘中文件读到内存)
//参数1：是否异常   参数2：编码
fs.readFile('./aa/hello.txt',"utf-8",function(err,data){
    if(!err){
        //正常
        console.log(data);
    }
})

~~~

### 2 写入文件（覆盖）

~~~
fs.writeFile('./aa/hello.txt','写入的内容',function(err){
    console.log(!err?"正常":"异常");
})

~~~

### 3 追加文件

~~~
fs.appendFile('./aa/hello.txt','写入的内容',function(err){
    console.log(!err?"正常":"异常");
})
~~~

### 4 复制文件

~~~
//参数1：老地址   参数2：新地址
fs.copyFile('./aa/hello.txt','./aa/hello2.txt',function(err){
    console.log(err);
})
~~~



### 5 删除文件

~~~
fs.unlink("./aa/hello2.txt",function(err){
    console.log(err);
})

~~~



### 6 重命名/移动文件

~~~
fs.rename("./aa/hello.txt","./xx.java",function(err){
    console.log(err);
})
~~~

### 7 创建文件夹

~~~
fs.mkdir("./bb",err=>{
    console.log(err);
})
~~~



### 8 删除文件夹（只能删除空文件夹）

~~~
fs.rmdir("./bb",err=>{
        console.log(err);
    })
~~~



### 练习

~~~
练习:
1 在项目根目录下创建AA目录和BB目录
2 在AA目录下新建a.text文件,并且输出内容“你好，世界”
3 拷贝a.text到BB目录下，并且重命名为b.text
4 追加“hello world”内容到b.text中
5 删除AA目录
6 打印b.text内容到控制台

请分别执行以上4个步骤
~~~



## 路径模块（path）



~~~
const path=require('path')
//获得当前文件所在的完整目录
let filepath="C:/67期/第三阶段/day01/code/hello.js";
console.log(__dirname);//C:\67期\第三阶段\day01\code
//获取最后一段目录
console.log(path.basename(filepath));//hello.js
//获取末尾的文件的后缀
console.log(path.extname(filepath));//.js
//拆分路径
console.log(path.parse(filepath));

//拼接绝对路径
//如果拼接的子路径有.则是以当前路径所在目录之后继续拼接
console.log(path.resolve("./a",'./b','./c'));//C:\67期\第三阶段\day01\code\a\b\c
//如果拼接的子路径没有.,则直接以盘符拼接
console.log(path.resolve("/a",'./b','./c'));//C:\a\b\c
console.log(path.resolve("./a",'/b','./c'));//C:\b\c
~~~

