## 组件的props属性

在react中，如果组件更新数据后，要渲染dom，那么这样的数据有两个来源，一个是props，另一个是state



### 函数式组件的props

**简单的数据**

获取外部传入的参数

```jsx
import React from 'react'
export default function Test(props) {
    console.log(props);
    return (
        <div>
            标题：{props.title}
        </div>
    )
}
```



**对象的方式**

通过es6的结构扩展将对象扩展后传入

```jsx
import React, { Component } from 'react'
import Test from './components/Test.jsx';


export default class App extends Component {
  render() {
    let user = {
      name: '张三',
      age: 20
    }

    return (
      <div>
        {/* <Test title='蜗牛学苑' name={user.name} age={user.age} /> */}
        <Test title='蜗牛学苑' {...user} />
      </div>
    )
  }
}
```



可以传递整个对象进去

```jsx
import React, { Component } from 'react'
import Test from './components/Test.jsx';
export default class App extends Component {
  render() {
    let user = {
      name: '张三',
      age: 20
    }
    return (
      <div>
        {/* <Test title='蜗牛学苑' name={user.name} age={user.age} /> */}
        {/* <Test title='蜗牛学苑' {...user} /> */}
        <Test title='蜗牛学苑' user={user} />
      </div>
    )
  }
}
```



### 类组件的props

类组件中，通过`this.props`获取外部传入的参数

```jsx
import React, { Component } from 'react'
export default class PropsClass extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                标题：{this.props.title}
            </div>
        )
    }
}
```





### props默认值

#### 类组件中使用props默认值

通过静态属性`defaultProps`设置默认值，这个`defaultProps`是固定写法，不能修改其他值

```jsx
import React, { Component } from 'react'

export default class PropsClass extends Component {
    static defaultProps = {
        title: '蜗牛学苑默认值',
        name: '张三'
    }
    render() {

        console.log(this.props);

        return (
            <div>
                标题：{this.props.title}
                姓名：{this.props.name}
            </div>
        )
    }
}
```



直接给类绑定属性：

```jsx
import React, { Component } from 'react'

class PropsClass extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                标题：{this.props.title}
                姓名：{this.props.name}
            </div>
        )
    }
}
PropsClass.defaultProps = {
    title: '蜗牛学苑默认值',
    name: '张三'
}
export default PropsClass;
```



#### 函数组件中使用props默认值

在函数名上绑定`defaultProps`属性设置默认值

```jsx
import React from 'react'
function Test(props) {
    console.log(props);
    return (
        <div>
            标题：{props.title}
            <br />
            姓名：{props.user.name}
            <br />
            年龄：{props.user.age}
        </div>
    )
}
Test.defaultProps = {
    title: '蜗牛学苑默认值',
    name: '张三'
}
export default Test;
```



### props验证器

`propTypes`是固定写法，不能更改

1. 安装插件prop-types

   ```bash
   yarn add prop-types
   ```

2. 引入插件

   ```bash
   import PropTypes from 'prop-types';
   ```

3. 使用数据类型校验

   函数组件：

   ```jsx
   import React from 'react'
   import PropTypes from 'prop-types';
   
   function Test(props) {
       console.log(props);
       return (
           <div>
               标题：{props.title}
               <br />
               姓名：{props.user.name}
               <br />
               年龄：{props.age}
           </div>
       )
   }
   Test.defaultProps = {
       // title: '蜗牛学苑默认值',
       name: '张三'
   }
   Test.propTypes = {
       title: PropTypes.string,
       age: PropTypes.number.isRequired
   }
   export default Test;
   ```

   类组件中通过static设置`propTypes`数据类型校验

   ```jsx
   import React, { Component } from 'react'
   import PropTypes from 'prop-types';
   
   class PropsClass extends Component {
        static propTypes = {
            title: PropTypes.string,
            age: PropTypes.number.isRequired
       }
       render() {
   
           console.log(this.props);
   
           return (
               <div>
                   标题：{this.props.title}
                   姓名：{this.props.name}
               </div>
           )
       }
   }
   export default PropsClass;
   
   ```

   类组件直接绑定`propTypes`

   ```jsx
   import React, { Component } from 'react'
   import PropTypes from 'prop-types';
   
   class PropsClass extends Component {
       render() {
           console.log(this.props);
           return (
               <div>
                   标题：{this.props.title}
                   姓名：{this.props.name}
               </div>
           )
       }
   }
   PropsClass.propTypes = {
       title: PropTypes.string,
       age: PropTypes.number.isRequired
   }
   export default PropsClass;
   
   ```

   









