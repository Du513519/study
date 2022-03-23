## ReactTypescript搭建



### 创建react typescript项目

参考地址：https://create-react-app.bootcss.com/

通过命令创建react项目的ts版本：

```bash
npx create-react-app my-app --template typescript
```



tsconfig.json

* lib：ts指定包含在编译中的库文件
* allowjs：允许在ts中写js代码
* jsx：用jsx的方式进行编译
* include：将src文件下的文件进行编译



### 编写类组件

在tsx中可以通过`tsrcc`创建类组件，我们也可以在tsx中写jsx类组件

ts版本版本中的类组件有泛型`Props`和`State`

```tsx
import React, { Component } from 'react'

type Props = {}

type State = {}

export default class Header extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div>Header</div>
    )
  }
}

```



### 函数组件

tsx中可以通过`tsrfc`快速创建函数组件，也可以写jsx组件

第一种定义函数组件方式：其中`Props`是props数据类型

```tsx
import React from 'react'

type Props = {}

export default function Nav({}: Props) {
  return (
    <div>Nav</div>
  )
}
```



第二种定义函数组件方式：

```tsx
import { FC } from 'react';

// interface Props {}
type Props = {};

const Nav: FC<Props> = () => {
    return (
        <div>nav1111</div>
    )
}

export default Nav;
```



> type 是指数据别名，和interface类似，都可以作为数据类型约束，但是interface可以被class类通过implements实现，type不能被类实现