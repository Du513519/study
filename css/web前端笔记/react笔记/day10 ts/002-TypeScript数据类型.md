## TypeScript数据类型

typescript包含了js中 的所有的数据类型，不仅如此，还增加了其他的数据类型：枚举类型



### 数字类型

```typescript
let price: number = 10;

price = 100;
price = 100.1;
price = '100' // 报错，数据类型不匹配
```

> 定义数据类型：在变量名右侧这么写`:number`，定义数据类型
>
> 数字类型包括了整数和浮点数
>
> 数据类型一旦被声明了，就无法去更改



### 布尔类型

```typescript
let flag: boolean = true;
flag = false;
flag = 100; // 报错，数据类型不匹配
```



### 字符串类型

```typescript
let username: string = '张三';
username = true; // 报错，数据类型不匹配

export default {};
```



### 数组类型

1. 第一张定义数据方式（推荐）

   ```typescript
   let arr: number[] = [1,2,3];
   let arr2: string[] = ['1','2','3'];
   ```

2. 第二种定义数组方式

   ```typescript
   let arr3: Array<number> = [1,2];
   ```

   上面两种方式等价

3. 第三种

   ```typescript
   let arr: number[] = [1,2,3];
   let arr2: string[] = ['1','2','3'];
   
   let arr3: Array<number> = [1,2];
   
   let arr4: any[] = [1, '1', true];
   ```

   > any代表任何数据类型



### 元组类型(tuple)

元组类型（tuple）属于数组的一种，元组类型允许表示一个已知元素数量和类型的数组，各个元素类型不必相同，比如你可以定义一个数组里面只能存放number和string类型的元组。

```typescript
let arr: [string, number, boolean] = ['张三', 20, true];

export default {};
```

> 数组的长度和数据类型顺序都是固定的



### 枚举类型

enum类型是对javascript数据类型的一个补充，比如：支付成功后的状态：0：失败，1： 超时，2：成功

```js
const payMsg = {
    payId: '123',
    msg: '支付',
    state: 0
}
// 这样的state被称为魔鬼数字，这样的代码可维护性很差，没人知道是什么意思
payMsg.state = 3;
```



js中的解决方案：

```js
const states = {
    fail: 0,
    timeout: 1,
    success: 2
}

const payMsg = {
    payId: '123',
    msg: '支付',
    state: states.fail
}

payMsg.state = states.success;
states.error = 3;
```



typescript中定义枚举类型：

```typescript
enum states {
    fail = 0,
    timeout = 1,
    success = 2
}

console.log(states.fail);
console.log(states);
console.log('访问1', states['1']);
states.error = 3; // 报错，states内部没有error；
```

enum中的数据是不能更改的



```typescript
enum fullYear3 {
    spring = '0',
    summer = '1',
    autumn = '2',
    winter = '3'
}

console.log(fullYear3);
```

> 如果定义枚举类型的值是字符串，那么只有一种访问方式：fullYear3.spring



什么时候使用枚举类型？

一般在项目的默认变量的值是固定的，那么你可以考虑使用枚举类型

比如：一年四季，状态，一年12个月，一周七天等等