## react路由匹配信息



### 路由器

BrowserRouter：类似于vue中路由的history模式，看起来比hash好看，如果本地路径和服务路径一样会发送到服务器

HashRouter：类似于vue中的hash模式，已#好开头，这种方式不会发送到服务器。



路由器要放在整个路由的最外层，如果其他的路由组件放到了它的外面会报错。



### 路径匹配器

#### Switch

类似js中switch，它会做模糊匹配的方式去查找路径，如果匹配到了就会将Route组件放出来，如果没有匹配到那么就不会渲染Route



由于switch是模糊匹配，有可能会导致路径匹配不到你想要的

我们这么处理

* 将`/`路径放到最后

```jsx
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
```

* 通过exact属性达到精确匹配

  ```jsx
  <Switch>
      <Route path="/" exact>
          <Home />
      </Route>
      <Route path="/about" exact>
          <About />
      </Route>
      <Route path="/users" exact>
          <Users />
      </Route>
  </Switch>
  ```



#### Route

作用：如果匹配到了路径，那么会渲染对应的组件。

path属性：匹配路径

component：匹配到之后要渲染的组件

```jsx
<Switch>
    <Route path="/" exact component={Home}></Route>
</Switch>
```

匹配路径渲染组件有两种方式，推荐大家使用component属性。



exact：精确匹配



### 导航

* Link：用来创建链接的

  跳转路由的方式有如下集中

  * to属性

    to传递string

    ```jsx
    <Link to="/">Home</Link>
    ```

    to传递对象

    ```jsx
    <Link to={{pathname: '/about'}}>About</Link>
    ```

  * replace：跳转路由后无法返回到刚刚的路径

    ```jsx
    <Link to={{pathname: '/about'}} replace>About</Link>
    ```

* NavLink：是Link标签的特殊版本

  activeClassName：选中的时候要呈现的样式class

  ```jsx
  <NavLink to={{pathname: '/about'}} activeClassName={'bgc'} replace>About</NavLink>
  ```

* Redirect：重定向

  from：从什么路径开始跳转

  to：跳转到什么路径去

  exact：精确匹配

> 注意：Rediect组件，一定要放在最前面，而且还要有exact属性



