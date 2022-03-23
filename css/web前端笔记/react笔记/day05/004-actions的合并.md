## actions的合并



* 将所有通过`export xxx`的方式导出的内容全部引入并取别名

```js
import * as countAction from './store/actions/counter'

// 访问
// countAction.addCountAC()
```



* 在actions目录下新建index.js文件

  简写：

  ```js
  export * from './counter';
  export * from './shopping';
  ```

  全写：

  ```js
  import { addCountAC, reduceCountAC } from './counter';
  import { addShoppingAC, delShoppingAC } from './shopping';
  
  export {
      addCountAC,
      reduceCountAC,
      addShoppingAC,
      delShoppingAC
  }
  ```

  两种方式等价的