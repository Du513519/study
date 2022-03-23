## react路由



### 后端路由

在node.js中的路由，会根据获取到的路径去匹配我们对应router路由进行处理来分发路由处理，

```js
http://localhost:8080/login
```



```js
router.post('/login', function(req, res, next) {
    const data = req.body;
    //...处理
    res.send({
        code: 200,
        msg: '登录成功'
    });
})
```



### 前端路由

前端路由的目的是根据URL地址匹配，然后返回对应的组件或页面，然后浏览器渲染出来，

前端路由分为history和hash，h5的history出来之前，我们前端通常用的是hash，hash能兼容低版本浏览器。



react中也分为两种路由：

* hash：以`#`代表hash值，一般这个值会让浏览器来识别，根据hash值的不同来切换显示，这个hash不会发送给后端。

  ```js
  http://localhost:8080/#/login
  ```

* history：

  看起来比hash值要好看一点，它会发送给后端服务器，如果我们本地地址和服务器的值一样，那么它会访问服务器地址。它也需要后端配合做配置进行使用。

  ```js
  http://localhost:8080/login
  ```

  

不管vue或react他们的路由底层都是history对象

```js
window.history.go()
window.history.back()
window.history.forward();
```



通过windowd 的事件监听来切换hash，模拟路由切换

```html
<ul>
    <li><a href='#hash1'>#hash1</a></li>
    <li><a href='#hash2'>#hash2</a></li>
    <li><a href='#hash3'>#hash3</a></li>
    <li><a href='#hash4'>#hash4</a></li>
</ul>

<p id="content">默认内容</p>

<script>
    window.addEventListener('hashchange', function() {
        document.getElementById('content').innerHTML = window.location.hash;
    });
</script>
```



### react路由的安装

react本身是没有路由的，依靠第三方插件，`react-router-dom`

路由官网：https://v5.reactrouter.com/web/guides/quick-start

v6版本参考：https://www.cnblogs.com/nangezi/p/15733562.html

v6版本参考：https://blog.csdn.net/weixin_40906515/article/details/104957712

1. 安装路由

   ```bash
   yarn add react-router-dom@5.3.0
   // 或者
   npm i react-router-dom@5.3.0
   ```

2. 引入相关组件

   ```jsx
   import {
     BrowserRouter as Router,
     Switch,
     Route,
     Link
   } from "react-router-dom";
   ```

3. 配置一级路由

   ```jsx
   export default function App() {
     return (
       <Router>
         <div>
           <nav>
             <ul>
               <li>
                 <Link to="/">Home</Link>
               </li>
               <li>
                 <Link to="/about">About</Link>
               </li>
               <li>
                 <Link to="/users">Users</Link>
               </li>
             </ul>
           </nav>
   
           {/* A <Switch> looks through its children <Route>s and
               renders the first one that matches the current URL. */}
           <Switch>
             <Route path="/about">
               <About />
             </Route>
             <Route path="/users">
               <Users />
             </Route>
             <Route path="/">
               <Home />
             </Route>
           </Switch>
         </div>
       </Router>
     );
   }
   
   function Home() {
     return <h2>Home</h2>;
   }
   
   function About() {
     return <h2>About</h2>;
   }
   
   function Users() {
     return <h2>Users</h2>;
   }
   ```

   

