## reducer拆分合并



在项目中，模块其实是很多的，我们需要根据模块来进行reducer的拆分，维护起来也更加方便一点，

按照模块进行拆分：学生模块、班级模块、授权模块等等



### 拆分与合并

reducers/counter.js

```js

const initState = {
    count: 0
}

export default function counterReducer(state = initState, action) {
    switch (action.type) {
        default: return state;
    }
}

```

reducers/shopping.js

```js

const initState = {
    productList: [{
        id: 1,
        img: require('../../assets/images/model1.jpg'),
        title: 'java入门到放',
        desc: '精通java的是个步骤',
        price: 1000
    }, {
        id: 2,
        img: require('../../assets/images/model2.jpg'),
        title: 'web从入门到住院',
        desc: '前端性能优化的一个不会',
        price: 1100
    }, {
        id: 3,
        img: require('../../assets/images/model3.jpg'),
        title: 'Python爬虫实战',
        desc: '数据的抓取艺术',
        price: 1200
    }, {
        id: 4,
        img: require('../../assets/images/model4.jpg'),
        title: 'Python爬虫实战',
        desc: '数据的抓取艺术',
        price: 1300
    }],
    tableList: []
}

export default function shoppingReducer (state = initState, action) {
    const { payload } = action;
    const {tableList} = state;
    switch (action.type) {
        case 'addShopping':
            const { productList } = state;
            const productObj = productList[payload.index];
            if (tableList.some(item => item.id === productObj.id)) {
                // 有数据，更新数量
                const index = tableList.findIndex((item) => {
                    return item.id === productObj.id;
                })
                tableList[index].count += 1;
            } else {
                // 没有数据，添加数据
                tableList.push({
                    ...productList[payload.index],
                    count: 1
                });
            }
            // return JSON.parse(JSON.stringify(state));
            return {
                ...state,
                tableList: [...tableList]
            };
        case 'delShopping':
            if (tableList[payload.index].count > 1) {
                // 将count数量减一
                tableList[payload.index].count -= 1;
            } else {
                // 删除数据
                tableList.splice(payload.index, 1);
            }
            return {
                ...state,
                tableList: [...tableList]
            }
        default: return state;
    }
}

```



### 合并reducer

1. 在reducers目录下创建index.js文件，使用`combineReducers`将reducer合并起来

```js
import { combineReducers } from 'redux';
import counterReducer from "./counter";
import shoppingReducer from "./shopping";

export default combineReducers({
    counterReducer,
    shoppingReducer
})
```

类似于vuex中models模块化

合并之后暴露出去，键就是命名空间

在页面里面使用的时候，需要找到对应的命名空间键才能访问到值

2. 在store/index.js中，导入合并后的reducers

   ```js
   import { createStore } from 'redux';
   import { composeWithDevTools } from 'redux-devtools-extension';
   import reducers from './reducers/index'
   
   const store = createStore(reducers, composeWithDevTools());
   
   export default store;
   ```

   

3. 在合并之后使用state时，需要找到键

```js
function mapStateToProps(state) {
    return {
        productList: state.shoppingReducer.productList,
        tableList: state.shoppingReducer.tableList,
        count: state.counterReducer.count
    }
}

export default connect(mapStateToProps)(App);
```



>  **reducer或者action中的type不能取同名的，否则会报错，出现混乱，会导致其他的模块的reducer执行**

