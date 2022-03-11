## this指向

1. 普通函数调用，this指向window，如果是严格模式，this指向undefined
2. 类的构造函数调用，this指向当前类的实例
3. 对象的方法调用，this指向调用改方法的对象
4. 箭头函数的this指向外层（父级）
5. 改变this指向的方式：bind、call、apply



有什么区别：

1. 是否立即在执行

   bind改变this指向后不会立即执行，call和apply改变this指向后会立即执行。

   ```js
   var obj = {
       name: '张三',
       getName(age, sex) {
           return this.name;
       }
   }
   
   var obj2 = {
       name: '李四'
   }
   
   console.log(obj.getName.call(obj2, 18, '男'));
   console.log(obj.getName.apply(obj2, [18, '男']));
   console.log(obj.getName.bind(obj2)(18, '男'))
   
   ```

2. 传递参数的不用

   call传递参数：单个单个传入的

   apply传递参数：以数组的方式传入





案例：

```js
function Cat() {
    let showName = function () {
        console.log(1);
    }

    return this;
}

Cat.showName = function () {
    console.log(2)
};

Cat.prototype.showName = function () {
    console.log(3)
}

var showName = function () {
    console.log(4)
}

function showName() {
    console.log(5)
}

Cat.showName(); // 2 访问的静态属性
showName(); // 4 var变量提升将函数提升的值给覆盖了
Cat().showName(); // 4 访问的是window里面的showName
showName(); // 4 var变量提升将函数提升的值给覆盖了
new Cat.showName(); // 2 实例化的Cat的静态属性showName
new Cat().showName(); // 3 访问实例化后的cat的原型方法

```

