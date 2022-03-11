## TypeScript入门概念



### javascript特点

开发语言中，分为弱类型和强类型语言

js

```js
var i = 'xxx';
i = 10
i.split(); // 运行时报错，没有这个方法
```

java

```java
int i = 10;
i = 'xxx' // 开发报错，数据类型不符合
```

强类型语言在生命变量时数据类型是确定的，不会改变 的，后不可以赋值其他的数据类型。

弱类型语言在生命变量的时候没有确定数据类型，它的数据类型是不断变化的，只有在运行时才会确定下来。



强类型语言代表：java、c、c++

弱类型语言代表：javascript、php



### JS语言的问题

早期js中避免代码变量冲突：

```js
var i = 10;

// 另一个开发人员
var i = 'xxx';

// 立即执行函数
;(function() {
    var i = 10;
})();

// 通过开发人员名字前缀作为变量名声明
var wj_i = 10;

var zs_i = 10;
```



案例1：

```js
const user = {
    username: '张三',
    getName() {

    }
}
user.getname = function() {
    console.log('name');
}
user.getname();
```

当对象中没有这个属性时，调用的时候，开发阶段没有任何错误提示，在运行时才会报错。



案例2：

```js
// 求和
function sum(num1, num2) {
    return num1 + num2;
}

const result = sum(1, '2');
console.log(result);
```

函数传递参数的问题，没有约束参数数据类型



案例3：

```js
function list(arr) {
    return arr.reduce((sum, next) => {
        return sum += next;
    }, 0);
}

const result = list([1,2,3,4]);
console.log(result);

list(1,2,3); // 在运行时报错
```



案例4：

```js
setTimeout(() => {
    // 运行一段js代码
}, 100000);
```

在间隔时间过程中，其他数据变量可能被更改了，甚至被删除都有可能的



### typescript概念

1. typescript是微软开发的一款开源的编程语言
2. typescript是javascript的超集，完全准寻es5、es6标准。对js做了很多的扩展，安装ts标准来写，语法和内容都是js内容
3. 目前各大框架都无缝支持ts，react、vue3、umi框架等等



### typescript的安装

1. 保证电脑上安装了node

2. 全局安装typescript

   ```bash
   npm i -g typescript
   tsc -v // 查看版本
   ```

3. 创建index.ts文件

   ```typescript
   var username: string = '张三';
   username = 10; // 报错，数据类型不匹配
   ```

4. 编译ts文件
   ts文件不能直接在浏览器中运行，浏览器识别js文件，所以我们需要编译成js文件

   ```bash
   tsc index.ts
   ```

   编译成功后会在同级目录下生成js文件

5. 自动监控ts文件，自动编译

   ```bash
   tsc --init
   ```

   生成tsconfig.json文件

   * target：编译成js的版本
   * module：生成的模块化代码
   * strict：严格模式
   * outDir：生成js问价的目录

   自动监控ts

   选中终端----运行任务----tsc：监视tsconfig.json