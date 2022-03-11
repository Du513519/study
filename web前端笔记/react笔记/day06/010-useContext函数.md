## useContext函数

在vue中，如果底层组件要拿到上传组件的数据，可以使用vuex，

还可以通过provide/inject获取上层组件的数据

provide：将数据传入到底层中，后面的所有的子组件都可以拿到这个数据

inject：子组件通过inject获取到上传组件provide提供的数据



useContext可以实现跨组件通信，上层组件提供数据，子组件可以直接获取

1. 创建上下文

   src/context.js

   ```js
   import React from 'react';
   
   export const ColorContext = React.createContext('blue');
   ```

2. 通过`Context.Provider`提供数据

   ```jsx
   import UseContext from "./components/UseContext";
   import { ColorContext } from './context';
   import { useState } from 'react';
   
   function App() {
   
       const [color, setColor] = useState('red');
   
       return (
           <ColorContext.Provider value={color}>
               <UseContext />
               <button onClick={() => setColor('blue')}>修改颜色</button>
           </ColorContext.Provider>
       )
   }
   ```

3. 在函数组件就可以通过`useContext`获取上层组件提供的数据

   ```jsx
   import { useContext } from 'react';
   import { ColorContext } from '../context';
   
   export default function UseContext() {
   
       const color = useContext(ColorContext);
       console.log(color)
   
       return (
           <div style={{ color: color }}>context</div>
       )
   }
   ```

   