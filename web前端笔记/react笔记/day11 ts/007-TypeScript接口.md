## TypeScript接口

接口定义了一批类需要遵循的规范，接口不关心内部实现状态，不关心实现的细节。



### 属性类型接口

```typescript
interface User {
    username: string;
    age: number;
    gender?: number;
}

let user: User = {username: '张三', age: 20};
let user2: User = {username: '李四', age: 21};
```

> 定义接口：使用`interface`定义接口，建议首字母要大写
>
> 接口中也可以定义可选属性`?:`



### 函数属性类型接口

函数参数的接口约束：

```typescript
interface User {
    username: string;
    age: number;
}

function show(user: User) {

}

const user: User = {
    username: '张三', age: 20
}
show(user);
// show({username: '张三', age: 20});

export default {};
```



函数返回值的接口约束：

```typescript
interface User {
    username: string;
    age: number;
}

interface User2 {
    username: string;
    age: number;
    gender: number;
}

function show(user: User): User2 {
    const user2: User2 = {
        ...user,
        gender: 0
    }

    return user2;

    // return {
    //     ...user,
    //     gender: 0
    // };
}
```



### 函数类型接口

函数类型接口，可以定义一个函数类型，约束参数及返回值的类型。

```typescript
interface Fn {
    (name: string, age: number): string;
}

const login: Fn = function(name, age) {
    console.log(name, age);
    
    return name + age;
}

login('张三', 20);

export default {};
```



### 可索引接口

可索引接口可以对数组和对象做约束。

数组：

```typescript
let arr: number[] = [1,2,3];
let arr3: string[] = ['1'];

interface ArrayNumber {
    [i: number]: number
}

let arr2: ArrayNumber = [1,2,3, 4];

interface ArrayString {
    [i: number]: string
}

let arr4: ArrayString = ['1', '2'];
```

> `[i: number]`代表数组的索引， 右侧数据类型代表数组的值， 其中`i`是随意取的一个名字



对象：

```typescript
interface Dictionary {
    [k: string]: any;
}

interface Obj {
    name: string,
    age: number,
    [k: string]: any;
}

let user: Obj = {
    name: '张三',
    age: 20,
    getName() {},
    isStudent: false
};
```

> `[k: string]`：代表对象中的键，右侧的数据类型是值的数据类型，其中`k`可以随意命名



### 类类型接口

类的继承只能是单继承，不能是多继承。

接口可以对类进行多个约束。

```typescript
interface IPhone {
    // call(name: string): void;
    call: (name: string) => void;
    playGame: (gameName: string) => void;
}

interface IPsp {
    playGame: (gameName: string) => void;
}


class Phone implements IPhone {
    call(name: string){
        console.log('打电话给', name);
    }
    playGame(gameName: string) {
        console.log('正在打', gameName, '游戏');
    }
}

class Psp implements IPsp {
    playGame(gameName: string) {
        console.log('正在打', gameName, '游戏');
    }
}

const phone = new Phone();

phone.call('张三');
phone.playGame('英雄联盟');

const psp = new Psp();
psp.playGame('王者荣耀');

export default {};
```



接口也可以继承接口：

```typescript
interface IPhone extends IPsp {
    // call(name: string): void;
    call: (name: string) => void;
    // playGame: (gameName: string) => void;
}

interface IPsp {
    playGame: (gameName: string) => void;
}
```

> 接口使用`extends`关键字继承接口