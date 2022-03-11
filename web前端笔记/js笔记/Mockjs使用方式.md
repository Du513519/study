MockJS用于前后端分离开发时，前端人员在缺少后端接口的情况下，自己做一些模拟数据来帮助前端完成工作。

1.安装mockjs

- nodejs安装方式

通过cmd执行npm install mockjs

在网页中通过 import Mock from 'mockjs'

-   直接引入js文件

在网页中通过script标签引入

<script src="http://mockjs.com/dist/mock.js">

### 一、Mockjs使用方式

1、在网页中引入mock.js文件

2、通过Mockjs定义数据接口

定义另外一个js文件，在该js文件中完成模拟的数据接口，需要使用这些数据接口的网页，先引入mock.js后引入数据接口js文件。

3、通过Ajax访问数据接口



### 二、通过Mcokjs定义新增接口

1、定义新增接口

```javascript
//定义注册接口
Mock.mock("register","post",function(data){
    let paramString=data.body;
    //拆除用户名和密码
    let account=paramString.split("&")[0].split("=")[1];
    let password=paramString.split("&")[1].split("=")[1];
    //封装对象
    let user={account:account,password:password};
    //先从localStorage中取出保存用户信息的数据users
    //先定义一个空变量
    let users;
    if(localStorage.getItem("users")==null){
        users=[];
    }else{
        users=JSON.parse(localStorage.getItem("users"));
    }
    //将新用户添加到数组中
    //用户名重复性校验
    let isRepeat=users.some(function(v){
        return v.account==account;
    });
    if(isRepeat){
        return {code:500};//模拟服务器响应
    }else{
        users.push(user);
        //将用户数组保存到localStorage中
        localStorage.setItem("users",JSON.stringify(users));
        return {code:200};//模拟服务器响应
    }
})
```

2、网页中使用Ajax去请求接口

```
 $.ajax({
   url:"woniuxy/student",
   type:"post",
   dataType:"json",
   data:{
     name:"张三",
     sex:"男",
     age:12,
     birthday:"1999-08-07"
   },
   success:function(data){
     console.log(data);
     alert(data.message);
   }
 });
```

### 三、H5本地存储

H5提供了2个对象，可以将**一段字符串数据**持久化的保存在浏览器上。

**localStorage**和**sessionStorage**

这两个对象具备相同的函数：

**setItem("key","value")** 保存一组键值对数据

**getItem("key")** 根据键取出值

**removeItem("key")** 根据键删除值

**clear()**  删除所有键值对数据

这两个对象的区别是:**localStorage**所存储的数据时持久化的保存在浏览器上的，关闭浏览器之后数据依然存在。**sessionStorage**在关闭浏览器以后数据会丢失。



### 四、其他接口

```javascript
//定义用户信息数组
let students=[];
let id=1;
//定义新增用户信息的接口
Mock.mock("student/add","post",function(params){
    //模拟后端人员处理数据
    let paramString=params.body;//从body中取出参数字符串
    //取出每一个参数的名字和值
    let paramArr=paramString.split("&");
    let student=new Object();
    student.id=id++;
    //遍历数组，每一对参数转换为对象中的属性
    for(let i=0;i<paramArr.length;i++){
        let paramName=paramArr[i].split("=")[0];
        let paramValue=paramArr[i].split("=")[1];
        student[paramName]=paramValue;
    }
    students.push(student);
    //响应数据给前端
    return {code:"200",message:"新增成功"}
});

//定义分页查询接口
Mock.mock("student/search","post",function(params){
    let pageIndex=params.body.split("&")[0].split("=")[1];
    let pageNum=params.body.split("&")[1].split("=")[1];
    let start=(pageIndex-1)*pageNum;
    let end=pageIndex*pageNum;
    let list=[];
    for(let i=start;i<end;i++){
        list.push(students[i]);
    }
    return {code:"200",message:"查询成功",list:list}
});
//定义根据id查询数据接口
Mock.mock("student/searchById","post",function(params){
    var id=params.body.split("=")[1];
    let stu=null;
    for(let i=0;i<students.length;i++){
        if(students[i].id==id){
            stu=students[i];
            break;
        }
    }
    return {code:"200",message:stu==null?"查询失败":"查询成功",result:stu}
});
//随机数据接口
//users表示用户接口地址
Mock.mock("users",{//返回给前端的数据格式为一个对象
    "users|4":[{//返回的数据的属性名为users是一个数组,共4个用户数据
        "id|+1":1,//每一个用户数据的id生成方式为自增1,从1开始
        "name":"@cname",//每一个用户数据的name生成方式,随机中文姓名
        "age|18-28":25,//每一个用户数据的年龄生成方式,25用于占位
        "sex|1":["男","女"],//每一个用户数据的sex生成方式,男女随机一个
        "job|1":["java","前端","UI","测试"],//job属性的生成方式随机4个中的一个
        "address":"@county(false)",//address生成方式随机一个地址
        "head":"@image(200x200)",//head生成方式，是一个由mockjs提供的200x200的网络图片地址
        "sign":"@cword(50)"//签名生成方式，随机的汉字50个
    }]
});
```



