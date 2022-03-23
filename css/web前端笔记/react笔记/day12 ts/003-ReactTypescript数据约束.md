## ReactTypescript数据约束



### 类组件

```tsx
import React, { Component } from 'react'

export type User = {
    name: string;
    age: number
}

export type Student = {name: string, age: number, gender: number};


export type Students = Student[]

type Props = {
    title: string;
    msg?: string;
    user: User;
    student: Student;
    students: Students
}

// type State = {}

export default class Header extends Component<Props> {
//   state = {}

  render() {
    return (
      <div>
          {
            this.props.title
          }
          学生姓名：{this.props.student.name}
      </div>
    )
  }
}
```

> 只要我们定义了Props数据类型，那么在使用这个组件的时候，就会有相应的提示，必传数据是那些。
>
> 组件间的数据类型共享：可以在组件中导出数据类型，在另一各组件中引入使用



### 函数组件

方式一定义函数组件

```tsx
import React, { PropsWithChildren } from 'react'

type Props =  {
    title: string;
}

export default function Nav2(props: PropsWithChildren<Props>) {
  return (
    <div>
        {props.title}
    </div>
  )
}
```

> 如果这种定义方式要访问`children`，你需要引入`PropsWithChildren`去定义props的数据类型



方式二：

通过`React.FC<Props>`定义函数组件

```tsx
import React from 'react';

interface Props {
    title: string;
}
const Nav: React.FC<Props> = (props) => {
    return (
        <div>
            {props.title}
        </div>
    )
}
export default Nav;
```



> props的数据类型一旦定义后，外部就能够很明确的知道需要传递哪些参数了