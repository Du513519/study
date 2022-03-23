## ES6新特性

### 一、扩展运算符

#### 1、含义

扩展运算符（spread）是三个点（`...`），将一个数组转为用逗号分隔的参数序列。

```js
console.log(...[2,3,4]); //2 3 4
```

该运算符主要用于函数调用。

```js
function add(x,y){
   return x+y;
}
function push(array,...items){
   array.push(...items);//完成添加多条数据
   return array;
}
var numbers=[4,38];
console.log('add结果为:',add(...numbers));
console.log('新数组:',push(numbers,...[56,78,98,43]));
```

上面代码中，`array.push(...items)`和`add(...numbers)`这两行，都是函数的调用，它们的都使用了扩展运算符。该运算符将一个数组，变为参数序列。

扩展运算符与正常的函数参数可以结合使用，非常灵活。

```js
function f(v, w, x, y, z) { }
var args = [0, 1];
f(-1, ...args, 2, ...[3]);
```

#### 2、扩展运算符的应用

- 合并数组


扩展运算符提供了数组合并的新写法。

```js
var array1=[23,35,67];
var array2=[44,66,88];
//ES5
console.log(array1.concat(array2));
//ES6
console.log([...array1,...array2]);
```

- 数组的克隆


```js
 var array1=[22,33,55];
 var array2=[...array1];
 console.log('array1',array1);
 console.log('array2',array2);
```

- 将伪数组转成真正的数组


```html
<div>第1个div</div>
<div>第2个div</div>
<div>第3个div</div>
<script>
    console.log(document.querySelectorAll("div"));
    console.log([...document.querySelectorAll("div")]);
</script>  
```

### 二、解构赋值

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构

#### 1、基本使用

下面是基本使用语法

以前，从数组中指定位置获取数据，并为变量赋值，通过如下方式完成

```js
let array=["蜗牛学院","www.woniuxy.com"];
var name=array[0];
var url=array[1];
console.log('name',name);
console.log('url',url);
```

ES6 允许写成下面这样。

```js
//数组的使用
let[name,url]=['蜗牛学院','www.woniuxy.com'];
console.log('name',name);
console.log('url',url);
```

上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值,这就是解构赋值在数组中最基本的使用。

使用展开语法获取多个值

```js
let[head,...tail]=[1,2,3,4,5,6];
console.log(head); //1
console.log(tail);// [2,3,4,5,6]
```

解构不成功，变量的值为`undefined`

```js
let [foo] = [];
let [bar, foo] = [1];
```

不完全解构

```js
let [x, y] = [1, 2, 3];
x // 1
y // 2
```



数组参数的使用

```js
function foo([a,b]){
     console.log(a);
     console.log(b);
}
foo(["蜗牛学院","www.woniuxy.com"]);
//传参即赋值 let[a,b]=["蜗牛学院","www.woniuxy.com"];
```

#### 2、对象的解构

基础知识：ES6中字面量定义对象时，可以进行简化。

之前的写法

```javascript
let name="张三";
let age=19;
let f=function(){
    
}
let student={
    name:name,
    age:age,
    f:f
}
```

简化写法：默认属性名为变量名，默认属性值为变量的值

```javascript
let name="张三";
let age=19;
let f=function(){
    
}
let student={
    name,
    age,
    f
}
```



##### （1）基本用法

```js
let personInfo={name:'Giles',age:18};
let{name,age}=personInfo;
console.log('姓名',name);
console.log('年龄',age);
```

对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值是由它的位置决定的；而对象的属性没有次序，变量必须与属性同名才能取得正确的值。

```js
let personInfo={name:'Giles',age:18};
let{age,name}=personInfo;
console.log('姓名',name); //Giles
console.log('年龄',age);  //18
```

上面代码，等号左边的两个变量的次序与等号右边两个同名属性的次序不一致。但是对取值完全没有影响。

如果变量名与属性名不一致，导致取不到值，最后等于undefined

```js
let {n,a}={name:Giles,age:18};
console.log('姓名',name); //undefined
console.log('年龄',age); //undefined
```

那么如果属性名和变量名不一致，但是又想获取到数据，应该写成下面这样

```js
let {name:n,age:a}={name:'Giles',age:18};
console.log('姓名',name); //Giles
console.log('年龄',age); //18
```

实际上说明，对象的结构赋值是下面形式的简写

```js
let {name:name,age:age}={name:'Giles',age:18};
```

也就是说，对象的解构赋值的内部机制是先找到同名属性，然后再赋值给对应的变量。真正赋值的是后者，而不是前者。

```js
let {name:n}={name:'Giles',age:18};
n  //"Giles"
name //error:name is not defined
```

上面的代码中，name是匹配模式，n才是变量。真正被赋值的是变量n,而不是模式name

##### （2）嵌套解构

```js
let p={
     name:'Giles',
     age:18,
     realname:{
         firstname:'zhai',
         middlename:'ji',
         lastname:'zhe'
     }
 }
let {name,age,realname:{firstname}}=p;
console.log(firstname);
```

注意：这时realname是结构目标，不是变量，因此不会被赋值,firstname才是变量。

##### （3）默认值

为变量设置默认值

```js
let {name,age=18}={name:"Giles"};
console.log('name',name);
console.log('age',age);
```

##### （4）函数参数

```js
function foo({name,age=21}){
    console.log(name,age);
}
foo({name:"Giles",age:21});
```

##### （5）函数返回值

```js
function foo(){
     return{
        name:"Giles",
        age:18
     }
}
let {name:n,age:a}=foo();
console.log('name',n);
console.log('age',a);
```

#### 3、字符串的解构

字符串也可以解构赋值，这是因为此时字符串被转换成了一个类似数组的对象。

```js
const[a,b,c,d,e]="hello";
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

类似数组的对象都有一个length属性，因此还可以对这个属性进行解构赋值。

```js
let {length:len}="hello";
console.log(len);
```

### 三、严格模式

严格模式可以让我们及早发现错误，使代码更安全规范，推荐在代码中一直保持严格模式运行。

严格模式的目的

- 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为
- 消除代码运行的一些不安全之处，保证代码运行的安全
- 提高编译器效率，增加运行速度
- 为未来新版本的Javascript做好铺垫

变量必须使用关键词声明，未声明的变量不允许赋值

```js
"use strict";
name="woniuxy"; //name is not defined
```

强制声明防止污染全局

```js
"use strict";
function foo() {
  name = "woniuxy";
}
foo();
console.log(name); 
```

关键词不允许做变量使用

```js
"use strict";
var public = 'woniuxy';
```

变量参数不允许重复定义

```js
"use strict";
//不允许参数重名
function foo(name, name) {} 
```

单独为函数设置严格模式

```js
function strict(){  
  "use strict";  
  return "严格模式";  
}  
function notStrict() {  
  return "正常模式";  
} 
```

### 四、Set类

#### 1、set集合的概念

ES6提供了新的数据结构-Set。它类似于数组，但是成员的值都是唯一的。没有重复。

#### 2、基本使用

##### （1）生成set集合


```js
const s=new Set();
```

##### （2）常用的属性和方法


| 属性/方法                 | 含义                                         |
| ------------------------- | -------------------------------------------- |
| add(value)                | 添加某个值，返回Set结构本身                  |
| delete(value)             | 添加某个值，返回一个布尔值，表示删除是否成功 |
| has(value)                | 返回一个布尔值，表示参数是否为Set的成员      |
| clear()                   | 清除所有成员，没有返回值                     |
| Set.prototype.constructor | 构造函数，默认就是Set函数                    |
| Set.prototype.size        | 返回Set实例的成员总数                        |

案例

```js
const s=new Set();
//向set集合中添加某个值，返回set解构本身
s.add('中华人民共和国');
s.add('美利坚合众国');
s.add('大不列颠和北爱尔兰联合王国');
console.log(`共有${s.size}个元素`);
console.log(s);
if(s.has('中华人民共和国')){
     console.log('元素存在于集合中');
}else{
     console.log('元素不存在于集合中');
}
s.delete('美利坚合众国');
console.log(s);
//清空集合
s.clear();
console.log(s);
```

##### （3）数组转换

可以使用`点语法` 或 `Array.form` 静态方法将Set类型转为数组，这样就可以使用数组处理函数了

```js
const set=new Set(['giles','monica']);
console.log([...set]);
console.log(Array.from(set));
```

##### （4）去除重复

```js
let array=[1,2,3,4,5,6,5,4,3,4];
array=[...new Set(array)];
```

#### 3、遍历操作

Set结构的实例有4个遍历方法，可用于遍历成员

| 方法      | 含义                     |
| --------- | ------------------------ |
| keys()    | 返回键名的遍历器         |
| values()  | 返回键值的遍历器         |
| entries() | 返回键值对的遍历器       |
| forEach() | 使用回调函数遍历每个成员 |

keys方法、values方法、entries()方法返回的都是遍历器对象。由于Set结构没有键名，只有键值(或者说键名和键值是同一个值)，所以keys方法和values方法的行为完全一致。

```js
let set=new Set(['red','green','blue']);
for(let item of set.keys()){
    console.log(item);
}
// red
// green
// blue
for(let item of set.values()){
    console.log(item);
}
// red
// green
// blue
for(let item of set.entries()){
    console.log(item);
}
// ["red","red"]
// ["green","green"]
// ["blue","blue"]
```

上面的代码中，entries方法返回的遍历器同时包含键名和键值，所以每次输出一个数组，其两个成员完全相等。

Set结构的实例默认可遍历，其默认遍历器生成函数就是它的values方法。

这意味着，可以省略values方法，直接用for...of遍历set

```js
let set=new Set(['red','green','blue']);
for(let x of set){
    console.log(x);
}
```

### 五、Map

#### 1、map的概念

Map是一组键值对的结构，用于解决以往不能用对象做为键的问题

- 具有极快的查找速度
- 函数、对象、基本类型都可以作为键或值

#### 2、基本使用

```js
//实例化map集合
let map=new Map();
//使用set向集合中添加元素
map.set("cn","中华人民共和国");
map.set("en","美利坚合众国");
map.set("fk","大不列颠和北爱尔兰联合王国");\
//使用size获取集合的数量
console.log(map.size);
//使用delete(key)删除元素
console.log(map.delete("en"));
//使用get(key)获取元素
console.log(map.get("cn"));
//使用has(key)检测数据是否存在
console.log(map.has("en"));
//清空map集合
map.clear();
console.log(map);
```

#### 3、遍历操作

使用 `keys()/values()/entries()` 都可以返回可遍历的迭代对象。

```js
let map=new Map([['cn','中华人民共和国'],['en','美利坚合众国']]);
console.log(map.keys());
console.log(map.values());
console.log(map.entries());
```

可以使用`keys/values` 函数遍历键与值

```js
let map=new Map([['cn','中华人民共和国'],['en','美利坚合众国']]);
 for(let key of map.keys()){
      console.log(key);
 }
 for(let value of map.values()){
      console.log(value);
 }
```

使用`for/of`遍历操作，直播遍历Map 等同于使用`entries()` 函数

```js
let map=new Map([['cn','中华人民共和国'],['en','美利坚合众国']]);
for(let[key,value] of map){
     console.log(`${key}=>${value}`);
}
```

使用`forEach`遍历操作

 ```js
let map=new Map([['cn','中华人民共和国'],['en','美利坚合众国']]);
map.forEach((item,key)=>{
     console.log(`${key}=>${item}`);
})
 ```

 
