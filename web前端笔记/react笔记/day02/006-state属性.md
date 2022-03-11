## 组件的state属性



react组件内部数据state，它是组件内部的状态机，当它发生改变的时候可以引起dom的重新渲染。

**react函数组件没有内部状态state，只有类组件才有state。**



### 定义数据和使用数据

`state`是固定写法，不能修改。

* 在`constructor`中定义state内部状态

  ```jsx
  import React, { Component } from 'react'
  
  export default class State extends Component {
      constructor(props) {
          super(props);
          this.state = {
              title: '蜗牛学苑'
          }
      }
      render() {
          return (
              <div>
                  标题：{this.state.title}
              </div>
          )
      }
  }
  ```

* 可以直接在类中定义state

  ```jsx
  import React, { Component } from 'react'
  
  export default class State extends Component {
      state = {
          title: '蜗牛学苑111'
      }
      render() {
          return (
              <div>
                  标题：{this.state.title}
              </div>
          )
      }
  }
  ```



### 修改数据

**错误写法，直接修改state数据**

```jsx
import React, { Component } from 'react'

export default class State extends Component {
    state = {
        title: '蜗牛学苑111'
    }
    changeTitle = () => {
        this.state.title = '修改后的蜗牛学苑';
        console.log(this.state);
    }
    render() {
        return (
            <div>
                标题：{this.state.title}
                <button onClick={this.changeTitle}>修改title</button>
            </div>
        )
    }
}
```



**正确写法，通过setState函数修改数据**

```jsx
import React, { Component } from 'react'

export default class State extends Component {
    state = {
        title: '蜗牛学苑111'
    }
    changeTitle = () => {
        this.setState({
            title: '修改后的蜗牛学苑'
        });
    }
    render() {
        return (
            <div>
                标题：{this.state.title}
                <button onClick={this.changeTitle}>修改title</button>
            </div>
        )
    }
}
```



### 修改对象

* 通过es6的结构扩展语法将对象的数据扩展到要修改的对象里面去，然后覆盖需要修改的属性值。

```jsx
import React, { Component } from 'react'

export default class State extends Component {

    state = {
        title: '蜗牛学苑111',
        user: {
            name: '张三',
            age: 20
        }
    }
    changeTitle = () => {
        // this.state.title = '修改后的蜗牛学苑';
        this.setState({
            title: '修改后的蜗牛学苑'
        });
    }

    changeName = () => {
        this.setState({
            user: {
                ...this.state.user,
                name: '李四'
            }
        });
    }

    render() {
        return (
            <div>
                标题：{this.state.title}
                <button onClick={this.changeTitle}>修改title</button>
                <br />
                姓名：{this.state.user.name}
                <br />
                年龄：{this.state.user.age}
                <br />
                <button onClick={this.changeName}>修改姓名</button>
            </div>
        )
    }
}
```

* 通过结构的方式将需要修改的数据单独结构出来修改

  ```jsx
  import React, { Component } from 'react'
  
  export default class State extends Component {
  
      state = {
          title: '蜗牛学苑111',
          user: {
              name: '张三',
              age: 20
          }
      }
      changeTitle = () => {
          this.setState({
              title: '修改后的蜗牛学苑'
          });
      }
      changeName = () => {
          const {user} = this.state;
          user.name = '李四'
          this.setState({
              // user: this.state.user
              user
          });
      }
      render() {
          return (
              <div>
                  标题：{this.state.title}
                  <button onClick={this.changeTitle}>修改title</button>
                  <br />
                  姓名：{this.state.user.name}
                  <br />
                  年龄：{this.state.user.age}
                  <br />
                  <button onClick={this.changeName}>修改姓名</button>
              </div>
          )
      }
  }
  ```



### 计数器案例