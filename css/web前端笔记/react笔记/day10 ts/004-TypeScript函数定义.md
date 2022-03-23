## TypeScript函数定义

在ts中函数的写法和js中的写法差不多，知识ts对函数的参数和返回值做了数据类型的约束。

* javascript中定义一个函数

  ```js
  function show(obj) {
      console.log(obj.name);
      return 1234;
  }
  
  show(122);
  ```

* typescript中函数的参数

  ```typescript
  function show(num: number) {
      console.log(num);
  }
  show(1);
  
  // 参数对象
  function show(user: {name: string, age: number}) {
      console.log(user.name);
  }
  show({name: '张三', age: 10});
  
  // 对象中可选参数
  function show(user: {name: string, age: number, gender?: number}) {
      console.log(user.name);
  }
  show({name: '张三', age: 10, gender: 0});
  
  // 单个参数，可选参数
  function show(name: string, age?: number) {
      console.log(name);
  }
  show('张三', 20);
  
  // 参数默认值
  function show(name: string = '张三') {
      console.log(name);
      
  }
  show();
  
  // 报错，可选参数不能给默认值
  function show(name?: string = '张三') {
      console.log(name);
      
  }
  show('李四');
  
  // 可选参数必须放在必填参数的后面
  function show(name: string, gender: number, age?: number) {
      console.log(name);
  }
  
  // 多个可选参数的时候，中间的一些可选参数如果不想传递，可以传递undefined
  function show(name: string, gender: number, age?: number, email?: string) {
      console.log(email);
  }
  show('张三', 0, undefined, '223@qq.com');
  ```

* 参数剩余模式数据类型

  ```typescript
  function show(name: number, ...rest: number[]) {
      console.log(rest);
      
  }
  show(1, 2, 3);
  show(1, 3);
  show(1);
  ```

* 函数返回数据类型

  ```typescript
  function sum(num1: number, num2: number): number {
      return num1 + num2;
  }
  const result = sum(1, 2);
  console.log(result);
  ```

* 函数没有返回数据类型，可以使void

  ```typescript
  function sum(num1: number, num2: number): void {
      // return num1 + num2;
  }
  const result = sum(1, 2);
  console.log(result);
  ```

  如果你手动加上了void，那么你就不能有返回值



日期案例：

```typescript
function dateFormat(dateType: string, date: Date): string {
    return '';
}

dateFormat('YYYY-MM-DD', new Date()); // 2022-02-16
dateFormat('YYYY-M-DD', new Date()); // 2022-2-16
dateFormat('YYYY/MM/DD', new Date());
dateFormat('YYYY年MM月DD日', new Date());
dateFormat('YYYY年MM月DD日 hh:mm:ss', new Date()); // 2022年02月16日 16:11:12
```

