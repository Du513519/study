## TypeScript数据类型（二）



### any任意类型

你可以给变量设置any类型，那么变量就可以支持任何的数据类型

```typescript
let num: any = 10;
num = '10';
num = true;
num = [];
```

有时候我们确实不知道数据类型是什么，可以使用any。



### undefined和null

```typescript
let gender: number | undefined | null;

gender = 10;
gender = undefined;
gender = null;
```

数据类型可以定义多个，因为有时候后端给的数据有可能是null



undefined和null的区别？

```js
undefined == null // true
undefined === null // false

typeof undefined // 'undefined'
typeof null // 'object'
```

undefined是null派生类，子类的意思。



### never类型

never类型表示的是那些永远不存在的值的类型。

例如：never类型是那些总是会抛出错误或根本不会有返回值的函数表达式返回值的类型。

```typescript
let other: never;

other = (() => {
    throw new Error('错误');
})();
```



### object类型

在ts中object类型主要用于表达三种数据类型：{}、[]、function

```typescript
let user: object = {};
let user2: object = [];
let user3: object = function() {};
```

通常情况下我们不定义object，因为别人传递参数给你的时候可能是这三个中的一个，那么我们在使用的时候很可能出错。



如果我们就是要定义对象的数据类型，如何定义：

```typescript
let user4: {name: string, age: number, gender: number} = {name: '张三', age: 20, gender: 0};
```

如果希望对象中可以设置任意的属性，那么可以这么写：

```typescript
let user4: {name: string, age: number, gender: number, [k: string]: any} = {name: '张三', age: 20, gender: 0};

user4.money = 10000;
user4.email = '12121';
```

`[k: string]: any`: 代表左侧是键的数据类型，右侧代表值的数据类型



数组里面存放对象的数据类型定义方式：

```typescript
let students: {name: string, age: number}[] = [{
    name: '张三',
    age: 20
}, {
    name: '李四',
    age: 20
}];
```



### 类型断言

有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

通过*类型断言*这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。



第一种尖括号写法：

```typescript
let value: any = '张三'; // ['张', '三']
const arr: string[] = (<string>value).split('');
console.log(arr);
```

第二种as写法：

```typescript
let value: any = '张三'; // ['张', '三']
const arr = (value as string).split('');
console.log(arr);
```

两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用JSX时，只有 `as`语法断言是被允许的。