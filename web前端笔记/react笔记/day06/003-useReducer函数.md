## useReducer函数

定义useReducer

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

state: 是我们需要使用的数据

dispatch：作为修改state数据的函数



[`useState`](https://react.docschina.org/docs/hooks-reference.html#usestate) 的替代方案。它接收一个形如 `(state, action) => newState` 的 reducer，并返回当前的 state 以及与其配套的 `dispatch` 方法。（如果你熟悉 Redux 的话，就已经知道它如何工作了。）

在某些场景下，`useReducer` 会比 `useState` 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。并且，使用 `useReducer` 还能给那些会触发深更新的组件做性能优化，因为[你可以向子组件传递 `dispatch` 而不是回调函数](https://react.docschina.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down) 。



计数器案例：

```jsx
import { useReducer } from 'react';
function reuder(state, action) {
    switch (action.type) {
        case 'add':
            return {
                ...state,
                count: state.count + action.payload.num
            };
        case 'reduce':
            return {
                ...state,
                count: state.count - action.payload.num
            };
        default: return state;
    }
}
const initState = {
    count: 0
}
export default function UseReducer() {
    const [state, dispatch] = useReducer(reuder, initState);
    function addCount() {
        dispatch({
            type: 'add',
            payload: {
                num: 1
            }
        });
    }
    function reduceCount() {
        dispatch({
            type: 'reduce',
            payload: {
                num: 10
            }
        });
    }
    return (
        <div>
            count: { state.count }
            <br />
            <button onClick={addCount}>添加</button>
            <button onClick={reduceCount}>减少</button>
        </div>
    )
}
```

