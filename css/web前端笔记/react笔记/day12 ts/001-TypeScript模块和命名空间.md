## TypeScript模块和命名空间



### 模块

在ts中模块化的使用和在js中的使用方式没有区别，知识ts中有了更友好的代码提示

Animal.ts

```typescript
class Animal {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

export default Animal;
```

Animal2.ts

```typescript
import Animal from './index';


const animal = new Animal('金毛', 2);

console.log(animal.name);
console.log(animal.age);
```



### 命名空间

命名空间是位于全局命名空间下的一个普通的带有名字的javascript对象

mod.ts

```typescript
export namespace moda {
    export class Mod {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
    }
}
```

mod2.ts

```typescript
export namespace modb {
    export class Mod {
        name: string;
        age: number;
        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }
    }
    
}

```



使用

mod3.ts

```typescript
import { moda } from './mod';
import { modb } from './mod2';

const dog = new moda.Mod('金毛');
const dog2 = new modb.Mod('泰迪', 2);
```

这样使用的话，我们可以不用去更改类名就可以使用了。

