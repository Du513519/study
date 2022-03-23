## dva配置less



### css样式

在我们自己手动搭建的react框架时，使用样式时，直接引入css，相当于全部样式，它会影响所有组件的样式。

```js
import 'css/style.css'
```

在react脚手架生成的项目中，我们使用样式模块化：

```js
import styles from 'css/style.module.css'
```



在dva中对css做了模块处理，你在哪个组件中使用css样式，就在哪里引入css文件，引入后还要定义一个变量接收样式才生效

```jsx
import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css'

function IndexPage() {
  return (
    <div className={styles.box}>
      css样式
    </div>
  );
}
export default connect()(IndexPage);
```



如果样式中类名是横岗隔开的，那么我们需要这样使用：

```jsx
<div className={styles['box-two']}>
    css样式
</div>
```



### less使用

less是react推荐使用的

1. 安装less

   ```bash
   yarn add less less-loader@5.0.0
   // or
   npm i less less-loader@5.0.0
   ```

2. 创建indexPage.less文件

   ```less
   .box {
       display: flex;
       list-style: none;
   
       & > li {
           padding: 0 10px;
       }
   
       .active {
           color: red;
       }
   }
   
   .active {
       color: red;
   }
   ```

3. 在页面中使用less样式

   ```jsx
   import React from 'react';
   import { connect } from 'dva';
   import styles from './indexPage.less'
   
   function IndexPage() {
     return (
       <div>
         <ul className={[styles.box]}>
           <li className={styles.active}>产品</li>
           <li>用户</li>
           <li>班级</li>
         </ul>
   
         <div className={styles.active}>颜色</div>
       </div>
     );
   }
   
   IndexPage.propTypes = {
   };
   
   export default connect()(IndexPage);
   
   ```

   > 注意：在组件中使用less样式绑定className要约less样式的嵌套一致

