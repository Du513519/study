## useEffect函数

函数组件没有生命周期，如果我们需要在组件初始化或结束后，卸载后做一些操作，我们可以用useEffect模拟类组件的生命周期，

```js
componentDidMount() {}
componentDidUpdate() {}
componentWillUnmount() {}
...
```



### useEffect

作用：

1. 让函数组件拥有自己的生命周期
2. useEffect可以模拟componentDidMount、comopnentDidUpdate、componentWillUnmount这些生命周期，可以看做是这些生命周期函数的结合体。
3. useEffect有两个参数
   * 第一个参数是一个函数，称为effect函数，在函数内部处理业务逻辑
   * 第二个参数是一个数组，数组里面可以填写监听对象，当对象改变后执行effect函数



1. 模拟componentDidMount生命周期

   ```jsx
   import { useEffect, useState } from 'react';
   function UseEffect() {
       const [count, setCount] = useState(0);
       useEffect(() => {
           console.log('模拟componentDidMount======')
       }, []);
       function changeCount() {
           setCount(1);
       }
       return (
           <div>
               count: {count}
               <br />
               <button onClick={changeCount}>修改count</button>
           </div>
       )
   }
   export default UseEffect;
   ```

   > 注意：第二个参数是一个空数组，那么它在初始化时只执行一次，后面不执行了

2. 模拟comopnentDidUpdate

   ```jsx
   import { useEffect, useState } from 'react';
   
   function UseEffect() {
       const [count, setCount] = useState(0);
   
       useEffect(() => {
           console.log('模拟comopnentDidUpdate======')
       });
   
       function changeCount() {
           setCount(1);
       }
   
       return (
           <div>
               count: {count}
               <br />
               <button onClick={changeCount}>修改count</button>
           </div>
       )
   }
   
   export default UseEffect;
   
   ```

   > 注意：第二个参数数组可以不用传递，那么每次state更新后都会执行effect函数

3. 监听属性，模拟comopnentDidUpdate

   ```jsx
   useEffect(() => {
       console.log('监听属性，模拟comopnentDidUpdate======')
    }, [name]);
   ```

   > 类似于vue中的watch，当监听的属性发生改变的时候执行内部代码

4. 模拟componentWillUnmount销毁函数

   ```jsx
   useEffect(() => {
       let timer = setInterval(() => {
           console.log('1')
       }, 1000);
   
       return () => {
           console.log('模拟componentWillUnmount======');
           clearInterval(timer)
       }
   }, [])
   ```

   > 在effect函数内部需要返回一个函数，这个函数会在组件卸载时调用执行一些资源清理工作



数据更新之后，我们可以使用useEffect函数监听属性去执行代码

```jsx
useEffect(() => {
    
}, [xxx]);
```

