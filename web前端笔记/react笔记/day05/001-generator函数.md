## generator函数



### 异步编程

js本身是单线程，如果没有异步任务，代码执行效率是很低的。



前端异步编程解决方案：

1. 回调函数：将函数作为参数传到另一个函数中，在某个时刻调用这个函数
2. promise对象：是一个容器，里面存放了异步代码，能够获取到异步结果
3. 发布订阅：
4. 事件监听：



node中获取文件的信息

```js
fs.readFile('/file/read.md', function(err, data) {    
    if (err) {
        throw err;
    }
    fs.readFile('/file/read2.md', function(err, data) {
        // todo
    })
})
```

这样回调的方式进行异步处理，会导致回调地狱的问题。



使用Promise来解决回到地狱：

```js
new Promise((resolve, reject) => {
    $.ajax({
        url: '',
        method: '',
        success(res) {
			resolve(res);
        }
	});
}).then(res => {
    // 做了一些处理
    return Promise.resolve(res);
}).then(res => {
    // 继续做处理
}).catch(err => {
    // 错误处理
}).finally(() => {
    
});
```



### generator编程

generator(生成器)是es6里面引入的一个新的概念，它可以用来处理异步编程，但是使用起来比较困难，目前采用这种方式来解决异步编程的比较少，我们常用的应该是Promise或async/await



语法：

```js
function show() {}

function *show() {
    // generator语法
}
```

generatora和普通函数看起来很像，普通函数只会返回一个结果，但是generator可以返回多个结果



### 迭代器

当你实例化一个generator函数时会得到一个生成器，我们可以获取到这个迭代器。

```js
let iterator = show();
```

迭代器里面会有一个next函数，这个函数是用于流程控制的函数

next（）运行一次就会得到一个结果

generator函数内部有一个`yield`，作用就是用于暂停运行

```js
function *show() {
    console.log('show');
    yield;
    console.log('step1');
}

let iterator = show();

iterator.next();
iterator.next();
```



案例：

```js
function *main(val) {
    console.log('step01', val);
    let x = yield val + 1;
    console.log('step02', x);
    let y = yield (x * 2);
    console.log('step03', y);
    return x + y;
}

let it = main(10);
const res = it.next(); // step01 10
console.log('res', res); // res { value: 11, done: false }
const res2 = it.next(5); // step02 5
console.log('res2', res2); // res2 { value: 10, done: false }
const res3 = it.next(10); // step03 10
console.log('res3', res3); // res3 { value: 15, done: true }
```



面试回答：

* generator是一个处理异步的函数
* `*`：在generator函数名旁白有一个`*`，代表它是一个generator函数
* `yield`：generator函数内部运行过程中，遇到`yield`就会暂停运行，然后返回一个对象，`{value: xxx, done: boolean}`
* `next`：作为generator函数的启动器，执行next函数才会继续往下执行，遇到`yield`会暂停，然后返回一个对象，`{value: xxx, done: boolean}`，直到运行完毕done是true









