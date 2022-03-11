## redux对象特性

在reducer中，state是对象的话，像下面这样去更改返回原来的state，state的地址是没有发生改变的，是无法引起react组件的重绘

```js
const store = createStore(function (state = {count: 0}, action) {
    console.log(action);

    switch (action.type) {
        case 'add':
            state.count += action.num;
            return state;
        case 'reduce':
            state.count -= action.num;
            return state;
        default: return state;
    }
});
```



正确写法：

对于对象我们可以扩展返回一个新的state

```js
const store = createStore(function (state = {count: 0}, action) {
    console.log(action);

    switch (action.type) {
        case 'add':
            state.count += action.num;
            return {
                ...state
            };
        case 'reduce':
            state.count -= action.num;
            return {
                ...state
            };
        default: return state;
    }
});
```



对象中嵌套了对象或数组的话，我们需要将里面的对象或数组进行扩展，你也可以直接将state进行深拷贝

```js
import { createStore } from 'redux';

const store = createStore(function (state = {count: 0, users: ['张三', '李四']}, action) {
    console.log(action);

    switch (action.type) {
        case 'add':
            // state += action.num;
            state.count += action.num;
            // state.users.push(action.user);
            const users = [...state.users];
            users.push(action.user);
            return {
                ...state,
                users: [...users]
            };
        case 'reduce':
            // state -= action.num;
            state.count -= action.num;
            // state.users.shift();
            const users2 = [...state.users];
            users2.shift();
            return {
                ...state,
                users: [...users2]
            };
        default: return state;
    }
});

console.log(store);

console.log('getState', store.getState())

const action = {
    type: 'add',
    num: 1,
    user: '王五'
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



**reducer初始化的时候action的值是redux默认给的，我们通常初始化时匹配不到这个action，所以执行的是default**

