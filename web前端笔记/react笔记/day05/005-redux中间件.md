## redux中间件



redux本身没有提供可以去调用异步请求的方式，但是它提供了中间件，我们可以中间件的方式去做其他的操作，这也是redux强大灵活的原因。

没有使用中间件的工作流程图：

![image-20210108175229334](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/lvxingtian/20210108175229.png)



使用了中间件的工作流程图：

![image-20210108175240680](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/lvxingtian/20210108175240.png)



在redux中使用了中间件，我们通过dispatch派发action给reducer，执行之前会通过中间件的处理，继续派发action给后面的中间件进行处理，直到最后一个中间件处理完毕，最后再派发action通知reducer更新数据。比如打印日志，发起异步请求获取服务器数据等等。

redux中间件的作用强化disaptch。

没有中间件的disaptch只能派发action通知reducer更新数据。



redux中常用的中间件：

1. redux-logger：每次在派发action的时候，都会在控制台打印出state的变化，这个中间件只适合在开发环境中使用。
2. redux-thunk：可以让dispatch接收函数作为参数，在函数里面可以发起异步请求
3. redux-saga：可以在dispatch派发action的时候，拦截到你的请求，进行异步处理，再将action派发给reducer更新数据



### redux-logger

1. 安装中间件

   ```bash
   yarn add redux-logger --dev
   // or
   npm i redux-logger -D
   ```

2. 在store中使用中间件，通过`applyMiddleware`使用中间件

   ```js
   import { createStore, applyMiddleware } from 'redux';
   import { composeWithDevTools } from 'redux-devtools-extension';
   import reducers from './reducers/index'
   import logger from 'redux-logger';
   
   const store = createStore(reducers, applyMiddleware(logger));
   
   export default store;
   
   ```

3. 使用中间件的同时，使用redux-devtools，这么使用

   ```js
   import { createStore, applyMiddleware } from 'redux';
   import { composeWithDevTools } from 'redux-devtools-extension';
   import reducers from './reducers/index'
   import logger from 'redux-logger';
   
   const store = createStore(reducers, composeWithDevTools(applyMiddleware(logger)));
   
   export default store;
   
   ```

   