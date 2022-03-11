## useMemo函数

useMemo相当于vue中的计算属性computed，

第一个参数是一个函数，会返回一直值

第二参数是一个数组，它可以监听值的改变，当值改变后会重新计算值。

```jsx
import { useMemo, useState } from 'react';

export default function UseMemo() {

    const [firstName, setFirstName] = useState('张');
    const [lastName, setLastName] = useState('三');

    const fullName = useMemo(() => {
        return firstName + lastName;
    }, [firstName, lastName]);

    return (
        <div>
            姓名：{fullName}
            <br />
            <button onClick={() => setFirstName('李')}>修改姓</button>
        </div>
    )
}
```

