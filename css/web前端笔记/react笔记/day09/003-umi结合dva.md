## umi结合dva

### 搭建流程

包含以下功能，

- **内置 dva**，默认版本是 `^2.6.0-beta.20`，如果项目中有依赖，会优先使用项目中依赖的版本。
- **约定式的 model 组织方式**，不用手动注册 model
- **文件名即 namespace**，model 内如果没有声明 namespace，会以文件名作为 namespace
- **内置 dva-loading**，直接 connect `loading` 字段使用即可
- **支持 immer**，通过配置 `immer` 开启

### 约定式的 model 组织方式

符合以下规则的文件会被认为是 model 文件，

- `src/models` 下的文件
- `src/pages` 下，子目录中 models 目录下的文件
- `src/pages` 下，所有 model.ts 文件(不区分任何字母大小写)

比如：

```bash
+ src
  + models/a.ts
  + pages
    + foo/models/b.ts
    + bar/model.ts
```

其中 `a.ts`，`b.ts` 和 `model.ts` 如果其内容是有效 dva model 写法，则会被认为是 model 文件。



### 计数器案例

1. 在src目录下创建models文件夹

2. 在models文件夹下创建counter.js

   ```js
   export default {
     namespace: 'foo',
     state: {
       count: 0
     },
     reducers: {
       addCountReducer(state, action) {
         return {
           ...state,
           count: state.count + action.payload.num
         }
       },
       reduceCountReducer(state, action) {
         return {
           ...state,
           count: state.count - action.payload.num
         }
       }
     }
   };
   ```

   > namespace：可以填写，也可以不用填写，如果不填写，那么umi会将文件名作为命名空间，如果填写了，就以填写的命名空间为准

3. 通过connect将组件与redux链接

   ```jsx
   import { connect } from 'umi';
   
   function MyMusic(props) {}
   
   function mapStateToProps (state) {
     console.log(state)
     return {
       count: state.foo.count
     }
   }
   export default connect(mapStateToProps)(MyMusic)
   ```

   > connect从umi中导入

4. 展示count

   ```jsx
   <div>
       我的音乐
       <br />
       count: {props.count}
       <button onClick={handleAdd}>增加count</button>
       <button onClick={handleReduce}>减少count</button>
   </div>
   ```

5. 修改数据

   ```jsx
   function handleAdd() {
       props.dispatch({
         type: 'foo/addCountReducer',
         payload: {
           num: 1
         }
       });
     }
   
     function handleReduce() {
       props.dispatch({
         type: 'foo/reduceCountReducer',
         payload: {
           num: 10
         }
       });
     }
   ```

   

在函数组件中，可以使用`useSelector`来获取redux数据

使用`useDispatch`来生成`dispatch`来派发action

```jsx
import { useSelector, useDispatch } from 'umi';

function MyMusic(props) {
  console.log(props)

  const dispatch = useDispatch();

  const count = useSelector((state) => {
    return state.foo.count;
  });

  console.log(count)

  function handleAdd() {
    dispatch({
      type: 'foo/addCountReducer',
      payload: {
        num: 1
      }
    });
  }

  function handleReduce() {
    dispatch({
      type: 'foo/reduceCountReducer',
      payload: {
        num: 10
      }
    });
  }

  return (
    <div>
      我的音乐
      <br />
      count: {count}
      <button onClick={handleAdd}>增加count</button>
      <button onClick={handleReduce}>减少count</button>
    </div>
  )
}
export default MyMusic;

```



### immer

- Type: `boolean | object`
- Default: `false`

表示是否启用 immer 以方便修改 reducer。

注：如需兼容 IE11，需配置 `{ immer: { enableES5: true }}`。



immer的作用：

开启之后，在reducer里面更改state数据可用不用返回一个新的state



配置immer

在.umirc.ts文件中：

```ts
import { defineConfig } from 'umi';

export default defineConfig({
  dva: {
    immer: true
  }
});

```



配置成功后在reducer里面可以不用返回新的state：

```js
reducers: {
    addCountReducer(state, action) {
      state.count = state.count + action.payload.num;
      // return {
      //   ...state,
      //   count: state.count + action.payload.num
      // }
    },
    reduceCountReducer(state, action) {
      state.count = state.count - action.payload.num;
      // return {
      //   ...state,
      //   count: state.count - action.payload.num
      // }
    }
  }
```

