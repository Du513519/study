## model数据管理



### model文件配置解析

```js

export default {
  // 代表命名空间，每个model文件都必须要加上命名空间，可以方式开发过程中模块的重名
  namespace: 'example',

  // 存放模块数据的地方，和我们之前手动创建的redux里面的state是一个意思
  state: {},

  // 可以发布订阅内容，对数据进行监控
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  // 类似于vuex中的actions，它可以发送异步请求，将redux-saga封装进来了
  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  // 等同于redux中的reducers，同步更新数据
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
```



### 使用model管理数据

1. 在index.js中
   加载model文件

   ```js
   app.model(require('./models/user').default);
   ```

2. 初始化state
   models/user.js

   ```js
   {
       state: {
           userList: [
             {
               id: 1,
               account: "张三",
               password: "123456",
               email: "125454@qq.com",
             },
             {
               id: 2,
               account: "李四",
               password: "123456",
               email: "125454@qq.com",
             },
             {
               id: 3,
               account: "王五",
               password: "123456",
               email: "125454@qq.com",
             },
           ],
         },
   }
   ```

3. 添加reducer
   models/user.js

   ```js
   {
       reducers: {
       save(state, action) {
         return { ...state, ...action.payload };
       },
       addUserReducer(state, action) {
         const payload = action.payload;
         let id = 1; 
         if (state.userList.length !== 0) {
           id = state.userList[state.userList.length - 1].id + 1;
         }
         
         state.userList.push({
           ...payload,
           id
         });
   
         return {
           ...state,
           userList: [...state.userList]
         };
       },
       delUserReducer(state, action) {
         const {index} = action.payload;
         state.userList.splice(index, 1);
   
         return {
           ...state,
           userList: [...state.userList]
         }
   
       }
     },
   }
   ```

4. 通过connect高阶组件将组件与redux链接

   ```jsx
   import { connect } from 'dva';
   function mapStateToProps(state) {
       return {
           userList: state.user.userList
       }
   }
   export default connect(mapStateToProps)(User);
   ```

5. 渲染数据

   ```jsx
   <table border='1'>
       <thead>
           <tr>
               <th>编号</th>
               <th>账号</th>
               <th>密码</th>
               <th>邮箱</th>
               <th>操作</th>
           </tr>
       </thead>
       <tbody>
           {
               props.userList.map((user, index) => (
                   <tr key={user.id}>
                       <td>{user.id}</td>
                       <td>{user.account}</td>
                       <td>{user.password}</td>
                       <td>{user.email}</td>
                       <td>
                           <button onClick={() => handleDel(index)}>删除</button>
                       </td>
                   </tr>
               ))
           }
       </tbody>
   </table>
   ```

6. 创建form表单，绑定ref

   ```jsx
   const accountRef = useRef();
   const passwordRef = useRef();
   const emailRef = useRef();
   
   
   <input ref={accountRef} placeholder='请输入账号' />
   <br />
   <input ref={passwordRef} placeholder='请输入密码' />
   <br />
   <input ref={emailRef} placeholder='请输入邮箱' />
   <br />
   <button onClick={handleAdd}>提交</button>
   ```

7. 在组件中添加数据或删除数据
   添加：

   ```jsx
   function handleAdd() {
           const account = accountRef.current.value;
           const password = passwordRef.current.value;
           const email = emailRef.current.value;
   
           props.dispatch({
               type: 'user/addUserReducer',
               payload: {
                   account,
                   password,
                   email
               }
           });
       }
   ```

   删除：

   ```jsx
   function handleDel(index) {
       props.dispatch({
           type: 'user/delUserReducer',
           payload: {
               index
           }
       });
   }
   ```

   > 注意：action中的type的值应该从namespace命名空间开始写，根据命名空间去寻找reducer