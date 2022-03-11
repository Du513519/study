## useHistory函数



### 回顾类路由组件中使用history

路由组件

```js
this.props.history.push('/home')
```

非路由组件

```jsx
import { withRouter } from 'react-router-dom'

class App extends React.Component {
    render() {
        this.props.hitr
        
        return <div></div>
    }
}

export default withRouter(App)
```



### 函数组跳转路由

函数路由组件：

```jsx
function Login(props) {

    console.log(props)
    function goto() {
        props.history.push('/home');
    }

    return (
        <div>
            登录页面
            <button onClick={goto}>跳转到home</button>
        </div>
    )
}

export default Login;

```

和类路由组件的跳转方式一样



函数非路由组件：

```jsx
import { withRouter } from 'react-router-dom';

function Header(props) {
    console.log(props)

    function goto() {
        props.history.push('/login');
    }

    return (
        <div>
            header
            <button onClick={goto}>跳转到登录页面</button>
        </div>
    )
}

export default withRouter(Header);

```

也可以通过`withRouter`高阶组件注入路由信息



函数组件还可以通过`useHistory`hook函数跳转路由

```jsx
import { useHistory } from 'react-router-dom';

function Header() {
    const history = useHistory();

    function goto() {
        history.push('/login');
    }
    return (
        <div>
            header
            <button onClick={goto}>跳转到登录页面</button>
        </div>
    )
}
export default Header;
```



### 路由参数获取

路由参数传递方式：

1. params
2. query
3. state
4. search



**useLocation**

```jsx
import { useLocation } from 'react-router-dom';

const loc = useLocation();
```

相当于我们之前路由信息里面的location



**useParams**

```jsx
import { useParams } from 'react-router-dom';
const params = useParams();
```

通过hook函数useParams获取动态路由参数



路由组件和非路由组件都可以使用