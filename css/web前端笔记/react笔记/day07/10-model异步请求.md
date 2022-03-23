## model异步请求



### 封装fetch请求

```js
import fetch from 'dva/fetch';
import qs from 'querystring';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function handleHeaders(options) {
  const headers = options.headers = options.headers ? options.headers : {};
  const defaultHeaders = {
    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };
  // 将多个对象合并成一个对象，和es6里面的解构扩展是一个意思
  options.headers = Object.assign({}, defaultHeaders, headers);

  // post提交参数
  // options{method:"post",body:{}}
  if (options.method === 'post') {
    // post请求传递参数是在body里面
    var body = options.body ? options.body : {};
    body = qs.stringify(body);
    options.body = body;
  }
}


/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {}) {

  //get，判断如果你options没有method 默认get请求，
  // {id:1,name:xiaowang}  id=1&name=xiaowang
  if (!options.method) {
    url += `?${qs.stringify(options.params)}`;
  }
  //处理头部
  handleHeaders(options);

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}

```





### 创建api文件夹，封装请求

services/user.js

```js
import MyRequest from '../utils/MyRequest'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoieGlhb2ZlaSIsInJvbGUiOnsibWVudXMiOlsiL2hvbWUiLCIvdXNlciIsIi9yb2xlIiwiL3Byb2R1Y3QiLCIvcHJvZHVjdC9saXN0IiwiL3Byb2R1Y3QvY2F0ZWdvcnkiLCIvY2hhcnQiLCIvY2hhcnQvYmFyIiwiL2NoYXJ0L2xpbmUiLCIvY2hhcnQvcGllIl0sIl9pZCI6IjVmYzc4NDJkMjY0MjAwMDBkYzAwNTAzYyIsImF1dGhUaW1lIjoiMjAyMS0wMy0xN1QxMzowMDozMC41MDJaIiwiYXV0aFVzZXIiOiJ4aWFvZmVpIiwiY3JlYXRlRGF0ZSI6bnVsbCwiY3JlYXRlVGltZSI6IjIwMjAtMTItMDIiLCJuYW1lIjoi6LaF57qn566h55CG5ZGYIiwic3RhdGUiOjEsInVwZGF0ZURhdGUiOiIyMDIxLTAzLTE3VDEzOjAwOjMwLjUwOVoifSwiX2lkIjoiNWZiNjY1ZjEyMjViMDAwMDM2MDA0ZGY1IiwiZXhwIjoxNjQ0ODkwNDk5LjI0OCwiaWF0IjoxNjQ0ODA0MDk5fQ.cBigTn3Qk86u2d2B5WJuXt3IebZuEFVINnbgpxNdlrY';
const baseUrl = 'http://127.0.0.1:8002';

export function getAccountList() {
  return MyRequest(`${baseUrl}/users/getAccountList`, {
    method: 'post',
    headers: {
      token
    }
  });
}

export function accountadd(data = {}) {
  return MyRequest(baseUrl + '/users/accountadd', {
    method: 'post',
    body: data,
    headers: {
      token
    }
  })
}

export function delAccount(id) {
  return MyRequest(`${baseUrl}/users/delAccount`, {
    params: {
      id
    },
    headers: {
      token
    }
  })
}

```





### 封装effects

model/user.js

```js
import {accountadd, delAccount, getAccountList} from '../services/user';

export default {
  // 代表命名空间，每个model文件都必须要加上命名空间，可以方式开发过程中模块的重名
  namespace: "user",

  // 存放模块数据的地方，和我们之前手动创建的redux里面的state是一个意思
  state: {
    userList: []
  },

  // 类似于vuex中的actions，它可以发送异步请求，将redux-saga封装进来了
  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: "save" });
    },
    *getUserEffect({ payload }, { call, put }) {
      // eslint-disable-line
      const res = yield call(getAccountList);
      // console.log(res)
      // yield put({ type: "save" });
      yield put({
        type: 'initUserReducer',
        payload: {
          userList: res.data.data
        }
      });
    },
    *addUserEffect({ payload }, { call, put }) {
      // console.log(payload)
      yield call(accountadd, payload);
      yield put({
        type: 'getUserEffect'
      });
    },
    *delUserEffect({ payload }, { call, put }) {
      yield call(delAccount, payload.id);
      yield put({
        type: 'getUserEffect'
      });
    }
  }
};

```





### 封装reducer

models/user.js

```js
import {accountadd, delAccount, getAccountList} from '../services/user';

export default {
  // 代表命名空间，每个model文件都必须要加上命名空间，可以方式开发过程中模块的重名
  namespace: "user",

  // 存放模块数据的地方，和我们之前手动创建的redux里面的state是一个意思
  state: {
    userList: []
  },


  // 等同于redux中的reducers，同步更新数据
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

    },
    initUserReducer(state, action) {
      const { userList } = action.payload;
      // state.userList = userList;
      return {
        ...state,
        userList: [...userList]
      }
    }
  },
};

```





### 组件中的派发action

* 查询user

  ```js
    useEffect(() => {
      // 调用接口，获取数据
      props.dispatch({
        type: 'user/getUserEffect'
      });
    }, []);
  ```

* 添加user数据

  ```js
  function handleAdd() {
          const account = accountRef.current.value;
          const password = passwordRef.current.value;
          const email = emailRef.current.value;
  
          props.dispatch({
            type: 'user/addUserEffect',
            payload: {
              account,
              password,
              email,
              role: '5fc7842d26420000dc00503c'
            }
          });
      }
  ```

* 删除user数据

  ```js
  function handleDel(index) {
        props.dispatch({
          type: 'user/delUserEffect',
          payload: {
            id: props.userList[index]._id
          }
        });
      }
  ```

  