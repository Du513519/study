## redux三大核心概念



react是没有相关的插件，没有仓库管理的插件，react的社区提供第三仓插件，叫做redux，进行状态的存放与操作。

redux插件：本身只是一个js库，可以和任何框架进行搭配，比如vue、react、angular等等

vue自己有一套vuex状态管理库，借鉴了redux思想，结合vue的开发特点开发出来的插件。

在市面上大多数采用了redux插件你，当然mobx，redux学习难度要大一点，由于后面学习的umi是把redux封装进去了，所以学习redux。

![Snipaste_2021-09-29_21-23-12](D:\蜗牛学苑\第五阶段教案整理\image\Snipaste_2021-09-29_21-23-12.png)



vuex：



![Snipaste_2021-09-29_14-28-12](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/wujie/20210929142858.png)



redux：



![timg-2](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/wujie/20210929143000.jpeg)

reducers：类似于vuex中的mutations，作为唯一一个可以更改store仓库数据的对象

action：作为一个操作动作的描述器，描述了这个动作是做什么操作，通知reducer如何操作数据

store：数据仓库，存放所有数据的地方，redux中通常只有一个仓库。



什么时候会用到redux？

组件与组件之间的通信很复杂的时候，可以考虑使用redux

如果项目很简单，那么也没有必要使用redux。



### store

数据仓库，存放所有数据的地方，redux中通常只有一个仓库。

1. 安装redux

   ```bash
   yarn add redux
   // or
   npm i redux
   ```

2. 创建仓库store

   store/index.js

   ```js
   import { createStore } from 'redux';
   
   const store = createStore(function (state = 0) {
       return state;
   });
   
   console.log(store);
   
   console.log('getState', store.getState())
   ```

3. 在根目录下的index.js文件中引入store文件

   ```jsx
   import React from 'react';
   import ReactDOM from 'react-dom';
   import './index.css';
   import App from './App';
   import './store/index'
   
   ReactDOM.render(
     <React.StrictMode>
       <App />
     </React.StrictMode>,
     document.getElementById('root')
   );
   ```

   

### action

作为一个操作动作的描述器，描述了这个动作是做什么操作，通知reducer如何操作数据

1. action是一个通知对象，**里面必须要有一个type属性**，表示当前通知的类型，至于其他的属性，你可以自定义（大数据使用payload字段作为参数）

   ```js
   const action = {
       type: 'add',
       num: 1
   }
   ```

2. 作为描述，它是无法更新数据，而是通知reducer才能更新数据

   通过dispatch函数派发action

   ```js
   store.dispatch(action);
   ```

   

### reducer

类似于vuex中的mutations，作为唯一一个可以更改store仓库数据的对象

根据action中的type动作进行state数据的修改

```js
import { createStore } from 'redux';

const store = createStore(function (state = 0, action) {
    console.log(action);

    switch (action.type) {
        case 'add':
            state += action.num;
            return state;
        case 'reduce':
            state -= action.num;
            return state;
        default: return state;
    }
});

console.log(store);

console.log('getState', store.getState())

const action = {
    type: 'add',
    num: 1
}

store.dispatch(action);

console.log('添加1：', store.getState())

const reduceAction = {
    type: 'reduce',
    num: 10
}

store.dispatch(reduceAction);

console.log('减少10：', store.getState())

```