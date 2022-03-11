## withRouter高阶组件



### 非路由组件的跳转

经过`<Route>`组件配置的组件被称为路由组件，未经过`Route`配置的组件叫非路由组件，意味着非路由组件`props`中没有相关的路由信息，所以我们不能在非路由组件内部直接通过`history.push()`跳转路由。



1. 将路由组件内部的props路由相关信息传入到非路由组件中

   传入路由信息

   ```jsx
   <Nav {...this.props} />
   ```

   跳转路由

   ```jsx
   goto = () => {
       this.props.history.push('/home/student');
   }
   ```

   不推荐这种方式，因为组件嵌套过多的时候，props属性会层层传递，导致以后不太好维护

2. withRouter高阶组件

   高阶组件是react提出的一种组件，本质是一个函数，参数是一个普通的组件，然后经过处理后返回一个新的组件。

   ```jsx
   function HOC(Component) {
       return class WrapperComponent extends React.Component {
           
           history = () => {
               
           }
           
           render() {
               return (
               	<Component history={this.history}></Component>
               )
           }
       }
   }
   ```

   科里化函数的地址：https://www.jianshu.com/p/2975c25e4d71

   withRouter的使用

   ```jsx
   import { withRouter } from 'react-router-dom';
   
   class Nav extends Component {}
   
   export default withRouter(Nav);
   ```

   通过withRouter高阶组件包裹组件之后，那么组件内部就可以访问到路由的相关信息

   这时就可以通过路由信息进行跳转

   ```jsx
   this.props.history.push('/home/student');
   ```



### 高阶组件的案例

```jsx
import React, {Component} from 'react';

function HOC(Comp) {
    return class WrapperCom extends Component {
        render() {
            return (
                <Comp title={'蜗牛学苑'} />
            )
        }
    }
}

class Header extends Component {
    render() {
        return (
            <div>
                标题：{this.props.title}
            </div>
        );
    }
}

export default HOC(Header);

```

