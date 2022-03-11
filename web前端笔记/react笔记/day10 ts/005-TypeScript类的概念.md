## TypeScript类的概念



### 类的定义

```typescript
class People {
    static id: number = 0;
    username: string;
    constructor(username: string) {
        this.username = username;
    }

    getName(): string {
        return this.username;
    }

    get computedName() {
        return this.username;
    }

    set setName(val: string) {
        this.username = val;
    }
}

const people = new People('张三');
console.log(people.username);
console.log(People.id);
console.log(people.getName());
const name: string = people.computedName;
console.log('get,', name);
people.setName = '李四';
console.log('setName后的name，', people.username);

export default {};
```

在ts中定义一个类与es6的语言基本一致，只是在数据类型上做了约束。

> 注意：在constructor中初始化数据的时候，需要去类中定义数据类型。