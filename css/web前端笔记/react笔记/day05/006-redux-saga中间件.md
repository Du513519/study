## redux-saga中间件

目前我们获取数据保存到redux中，我们会这么做：

```jsx
async componentDidMount() {
    console.log(this.props);
    const res = await getUser();
    this.props.dispatch({
        type: 'saveUser',
        payload: {
            data: res
        }
    });
}
```

这种方式如果其他文件中也需要去获取数据并保存到redux中，我们可能或将代码复制并运行，这样对于以后的维护也不太友好，如果我们能封装使用就更好了。



1. 安装redux-saga

   ```bash
   yarn add redux-saga
   ```

2. 在store文件中创建saga文件

   在saga中，我们需要用到几个函数：

   * call：发起异步请求的函数
   * put：相当于dispatch，派发action
   * takeEvery：拦截dispatch派发的action，匹配相应的函数，执行业务逻辑代码

   ```js
   import { call, put, takeEvery } from 'redux-saga/effects';
   import { getAccountList } from '../../api/user';
   
   function *getUserSaga() {
       // call在发起请求调用接口获取数据
       const res = yield call(getAccountList);
       // 相当于dispatch，派发action
       yield put({
           type: 'initUser',
           payload: {
               userList: res.data.data
           }
       });
   }
   
   // 这是一个generator函数，它的作用就是拦截派发的saga
   export default function *index() {
       // 拦截dispatch派发的action，匹配相应的函数，执行业务逻辑代码
       yield takeEvery('getUserSaga', getUserSaga);
   }
   
   ```

   在`redux-saga/effects`中引入saga需要用到的函数，put，call，tekeEvery

   需要暴露出去一个对象，这个对象是一个`generator`生成器，里面的`tekeEvery`用来拦截dispatch派发的action

   根据传递的aciton中的type进行匹配，如果在saga中匹配成功，就会执行业务逻辑，如果匹配失败，那么通知reducer更新数据

   当saga能够匹配到dispatch派发的请求，执行`generator`生成器

   * 通过call发送异步请求拿到数据
   * 拿到数据之后，通过put派发aciton通知reducer更新数据

3. 在store/index.js引用saga

   ```js
   import { createStore, applyMiddleware } from 'redux';
   import { composeWithDevTools } from 'redux-devtools-extension';
   import reducers from './reducers/index'
   import logger from 'redux-logger';
   // 用来创建saga中间件的创建器
   import createSagaMiddleware from 'redux-saga';
   import saga from './saga'
   
   // 创建saga中间件
   const sagaMiddleware = createSagaMiddleware();
   
   const store = createStore(reducers, composeWithDevTools(applyMiddleware(logger, sagaMiddleware)));
   // const store = createStore(reducers, applyMiddleware(logger));
   
   // 加载我们写好的saga文件
   sagaMiddleware.run(saga);
   
   export default store;
   ```

   * `import createSagaMiddleware from 'redux-saga';`引入saga创建器，不是saga中间件
   * `const sagaMiddleware = createSagaMiddleware();`：创建中间件
   * 将saga中间件放入到`applyMiddleware`中开发加载
   * `sagaMiddleware.run(saga);`:启动的时候加载saga文件

4. 在页面中派发请求

   ```jsx
   componentDidMount() {
       console.log(this.props);
       this.props.dispatch({
           type: 'getUserSaga'
       });
   }
   ```

   在组件中派发action，这个action是我们自定义的saga中的，不是action文件中的