## 自定义hook函数

在组件中，有些公共的业务逻辑，可以考虑提取到自定义hook函数中，在需要使用的时候调用就可以了



Position.jsx

```jsx
import { useEffect, useState } from 'react';

export default function Position() {

    const [pageX, setPageX] = useState(0);
    const [pageY, setPageY] = useState(0);

    // 模拟componentDidMount生命周期
    useEffect(() => {
        window.addEventListener('mousemove', function (e) {
            setPageX(e.pageX);
            setPageY(e.pageY);
        })
    }, []);

    return (
        <div>
            pageX: {pageX}
            <br />
            pageY: { pageY }
        </div>
    )
}
```

这段代码作为组件可以复用，但是里面的x和y值是没法公用的，所以我们需要将x和y的值提取到自定义hook函数中保存起来进行使用。



自动以hook

hooks/usePosition.js中

```js
import {useEffect, useState} from "react";

function usePosition() {

    const [pageX, setPageX] = useState(0);
    const [pageY, setPageY] = useState(0);

    // 模拟componentDidMount生命周期
    useEffect(() => {
        // console.log('1212')

        function move (e) {
            // console.log(e)
            setPageX(e.pageX);
            setPageY(e.pageY);
        }

        window.addEventListener('mousemove', move);

        return () => {
            window.removeEventListener('mousemove', move);
        }
    }, []);

    return [pageX, pageY];
}

export default usePosition;
```

使用usePosition

```jsx

import usePosition from "../hooks/usePosition";

export default function Position() {
    const [pageX, pageY] = usePosition();

    return (
        <div>
            pageX: {pageX}
            <br />
            pageY: { pageY }
        </div>
    )
}
```



> 在自定义hook函数的时候，约定俗成以use开头