## ReactTypescript内部数据



### 类组件

```tsx
import React, { Component } from 'react'

type State = {
    msg: string;
    email: string;
}

export default class Header extends Component<Props, State> {
  state = {
      msg: '类组件的state msg',
      email: '1212@qq.com'
  }

  render() {
    return (
      <div>
          msg: {this.state.msg}
      </div>
    )
  }
}
```

> 传递泛型State数据类型约束内部状态state的值



### 函数组件

可以在`useState`后跟上泛型约束

如果`useState`给了默认值，那么就不用传递泛型约束，会自动识别数据类型，如果没有给默认值，就必须传递泛型约束，否则修改数据时会报错。

```tsx
import React, { useState } from 'react';

interface Props {
    title: string;
}

interface User {
    name: string,
    age: number
}

const Nav: React.FC<Props> = (props) => {

    const [count, setCount] = useState<number>(0);
    const [msg, setMsg] = useState<string>();
    const [user, setUser] = useState<User>({name: '张三', age: 20});

    function changeCount() {
        setCount(3);
    }

    function changeMsg() {
        setMsg('蜗牛学苑');
    }

    function changeUser() {
        setUser({
            name: '李四',
            age: 30
        });
    }

    return (
        <div>
            count: {count}
            <button onClick={changeCount}>修改count</button>
            <br />
            msg: {msg}
            <button onClick={changeMsg}>修改msg</button>
            <br />
            用户名字：{user.name}
            <button onClick={changeUser}>修改user</button>
            {/* {props.title} */}
        </div>
    )
}

export default Nav;
```



