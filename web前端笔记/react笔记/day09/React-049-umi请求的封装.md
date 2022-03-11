## umi请求的封装



### 课程目标

1. 掌握umi请求的封装



### 课程实验

1. 封装umi请求
2. 使用封装后的请求获取数据



### 课堂引入

​		umi已经内置了网络请求，我们可以直接使用，无需额外下载插件，但是我们在使用中，需要根据自己的需求去进行合适的封装，以方便后续调用接口。



### 授课进程

1. 在src下面创建utils文件夹，里面新增request.js文件

   ```js
   import { extend } from 'umi-request';
   
   // 通过extend函数创建请求实例
   const request = extend({
     // 在请求路径的前面拼接内容
     prefix: 'http://127.0.0.1:8002',
     // 在请求路径的后面拼接内容
     // suffix: '',
     // 请求超时时长
     timeout: 10000,
     headers: {
       // "Content-type": 'application/json'
       // 这个token，通常你应该去localstorage或者是cookie中获取
       token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoieGlhb2ZlaSIsInJvbGUiOnsibWVudXMiOlsiL2hvbWUiLCIvdXNlciIsIi9yb2xlIiwiL3Byb2R1Y3QiLCIvcHJvZHVjdC9saXN0IiwiL3Byb2R1Y3QvY2F0ZWdvcnkiLCIvY2hhcnQiLCIvY2hhcnQvYmFyIiwiL2NoYXJ0L2xpbmUiLCIvY2hhcnQvcGllIl0sIl9pZCI6IjVmYzc4NDJkMjY0MjAwMDBkYzAwNTAzYyIsImF1dGhUaW1lIjoiMjAyMS0wMy0xN1QxMzowMDozMC41MDJaIiwiYXV0aFVzZXIiOiJ4aWFvZmVpIiwiY3JlYXRlRGF0ZSI6bnVsbCwiY3JlYXRlVGltZSI6IjIwMjAtMTItMDIiLCJuYW1lIjoi6LaF57qn566h55CG5ZGYIiwic3RhdGUiOjEsInVwZGF0ZURhdGUiOiIyMDIxLTAzLTE3VDEzOjAwOjMwLjUwOVoifSwiX2lkIjoiNWZiNjY1ZjEyMjViMDAwMDM2MDA0ZGY1IiwiZXhwIjoxNjM0MTgzMzcyLjQwNCwiaWF0IjoxNjM0MDk2OTcyfQ.MYBzYtVAeWtFWI2UYuGIyWrwBMc0j_J4NvskNIV_Gu8'
     },
     errorHandler: err => {
       // 比如弹窗提示，告诉用户有什么错误
       // 或者跳转到登录页呀，还有错误页面等等。
       console.log('请求失败', err);
     }
   });
   
   export default request;
   ```

   - prefix:请求路径的前缀
   - suffix请求路径的后缀
   - timeout：请求超时时间
   - headers：请求头设置
   - params：请求默认参数
   - errorHandler：异常信息处理

2. 在src目录下面创建api文件夹，里面创建userReuqest.js文件

   ```js
   import request from "../utils/request"
   
   // 获取到所有用户
   export const getAllUser = ()=>{
       return request.get("/users/getAccountList2")
   }
   // 新增用户
   export const addUser = (data)=>{
       return request.post("/users/accountadd",{data})
   }
   // 删除用户
   export const delUser = (params)=>{
       return request.get("/users/delAccount",{params})
   }
   ```

封装过程中，无需在添加http路径

get请求传递参数需要传递一个params，post请求传递参数需要传递data参数



### 课程小结

1. umi内置了网络请求，无需额外下载插件
2. 封装umi网络请求时，可以将一些公共的信息封装进去，比如请求路径前缀，token等信息。



### 随堂作业



### 扩展内容 （选填）



### 教案附件 （选填）



