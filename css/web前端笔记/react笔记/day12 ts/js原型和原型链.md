## js原型和原型链

### 什么是原型

每个javascript对象（null）创建的时候，就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型中继承属性。



只要搞定`prototype`、`__proto__`、`constructor`这三者之间的关系

`prototype`：每一个函数都有prototype，这个属性指向函数的原型对象（只有函数才会有prototype，其他的是没有的）；

`__proto__`：这是每个对象（null）都会有的属性，这个属性指向该对象的原型。

`constructor`：每一个原型都有一个构造器，指向关联的构造函数



```js
function Person (name) {
    this.name = name;
}

const person = new Person('张三');

console.log(Person.prototype.constructor === Person); // true
console.log(person.__proto__ === Person.prototype); // true
console.log(person.__proto__.constructor === Person); // true 
console.log(person.constructor === Person); // true
```

`person.constructor === Person`：person实例没有这个属性，是从原型上去找到的`constructor `



![image-20220228094919375](C:\Users\jack\AppData\Roaming\Typora\typora-user-images\image-20220228094919375.png)



### 什么是原型链

简单表述：如果实例去访问属性，这个实例身上没有这个属性，那么它会到原型上去寻找，如果原型上也没有这个属性，那么它会到原型的原型上去寻找，

如果还没有找到就一直持续到原型上去寻找，直到找到这个值，或者最后没有找到位置，找到了值就返回值，如果没有找到值就返回`undefined`，如果是没有找到原型则返回的是null。



```js
console.log(person.__proto__.__proto__ === Object.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true
```



![image-20220228100124058](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/wujie/20220228100125.png)



### 手动实现new

请手动实现一个new函数，去实现new关键字的功能？

```js
new Person('张三');
```



```js
function newF(Fn, ...args) {
    let obj = {};

    obj.__proto__ = Fn.prototype;

    const result = Fn.apply(obj, args);

    if (result === null) {
        return obj;
    }

    return typeof result === 'object' ? result : obj;
}
```

