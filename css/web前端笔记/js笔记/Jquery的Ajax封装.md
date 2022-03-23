![image-20210901095313874](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210901095313874.png)



**服务器**：

硬件：运行了服务端程序的这台电脑被称为服务器。

软件：在计算机上运行的服务端程序。

服务器运行在互联网上，每一台服务器在互联网上都有一个特定IP地址，通过IP地址可以找到这台服务器。

为了便于用户的使用和记忆,我们可以将IP绑定到某一个域名上，用户通过域名对该IP发起访问。

IP=》服务器

**port（端口）**：服务端程序在运行时就会监听计算机中的某一个端口，我们要向该服务端发送信息，需要在IP地址后跟上端口的序号。一般情况下服务端监听的是80端口，当我们访问时可以省略端口号，因为HTTP协议默认访问80端口。

端口=》服务端

**接口**：服务端根据不同的需求，编写不同的程序，每一个程序分别对应一个不同的访问地址。

接口=》服务端上不同的数据

**参数**：服务端的接口在执行时所需要的前端数据，就是参数

**请求地址**：http://IP:端口/服务端接口名称，通过请求地址就能访问服务端的某一个接口，进行前后端的数据交互。

**请求**：客户端通过请求地址向服务端发起访问

**响应**：服务端在客户端发起请求以后执行程序将客户端需要的数据发送给客户端。

请求的几种方式：

超链接、表单、**Ajax**

http协议的请求方式:

**get:查询接口**

**post:新增**

**put：更新整体数据**

**patch：更新部分数据**

**delete：删除数据**



**AJAX Asynchrolized Javascript And Xml：异步的JavaScript和XML。Ajax是一种进行前后端数据交互的技术。**

Ajax的使用：

1.创建XMLHttpRequest对象

let xhr=new XMLHttpRequest();

2.设置请求地址

xhr.open("GET",地址);

3.设置回调函数

xhr.onreadystatechange=function(){

​	if(xhr.status==200&&xhr.readyState==4){

​		console.log(xhr.responseText);

​	}

}

4.发送请求

xhr.send();

Jquery对原生的Ajax进行了封装（我们使用原生的Ajax所需要的4步，Jquery定义了函数，将这部分代码封装在了函数中）。

函数1：

$.ajax({

​	url:"请求地址",

​	type:"请求方式",

​	data:传递给接口参数,

​	dataType:"json",//服务器响应给客户端的数据类型

​	success:function(data){

​		//data形参 代表服务器响应给客户端的数据

​	},

​	error:function(){

​	}

})



函数2：以Get方式发送请求

$.get("请求地址",function(data){

})

函数3：以Post方式发送请求

$.post("地址",{参数},function(data){



});