## useRef函数



### useRef

在函数组件中，获取DOM元素可以使用useRef去绑定ref得到dom元素，有点类似于`React.createRef`

```jsx
import { useRef } from 'react';

export default function UseRef() {

    const accountRef = useRef();
    const passwordRef = useRef();

    function submit() {
        console.log(accountRef.current.value);
        console.log(passwordRef.current.value)
    }

    return (
        <div>
            <input ref={accountRef} placeholder={'请输入账号'} />
            <br />
            <input ref={passwordRef} placeholder={'请输入密码'} />
            <button onClick={submit}>提交</button>
        </div>
    )
}
```

> DOM元素值是放在current中的