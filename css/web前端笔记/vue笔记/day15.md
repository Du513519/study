# vue响应式原理

## 概念

~~~
当一个 Vue 实例被创建时，它将 data 对象中的所有的 property 加入到 Vue 的响应式系统中。当这些 property 的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。
~~~

## 基本使用

~~~
<body>
    <div id="app">
        {{name}}
      
    </div>
</body>
</html>
<script>
    let vm=new Vue({
        el:"#app",
        data(){
            return{
                name:"张三"
            }
        }
    })
   console.log(vm);
   console.log(vm.name);
~~~



## 今日目标：

~~~
0 自己写一个Vue实例
1 this.属性和this.$data属性同步
2 通过el可以挂载渲染元素
3 实现响应式功能
~~~

## 语法：数据劫持(代理)-ES6

~~~
//劫持某个对象的某个属性，一旦劫持成功后，以后获取该对象，就会执行get方法，并且返回该方法的值,以后修改该对象，就会执行set方法
Object.defineProperty(对象,对象的属性,{
    get(){
        // return...
    },
    set(){}
})
~~~





## 例子1 get做法

~~~
let stu1={name:"杰伦",age:18}

Object.defineProperty(stu1,'name',{
    get(){
        return "杰伦经纪人"
    },
    set(){}
})

console.log(stu1.name);
~~~



## 例子2 get方法解决堆栈溢出

~~~
let stu1={name:"杰伦",age:18}
let val=stu1.name;
Object.defineProperty(stu1,'name',{
    get(){
        return val
    },
    set(){}
})

console.log(stu1.name);
~~~



## 例子3 set做法

~~~
let stu1={name:"杰伦",age:18}
let val=stu1.name;//力宏
Object.defineProperty(stu1,'name',{
    get(){
        return val
    },
    set(newVal){
        val=newVal;
    }
})

console.log(stu1.name);
stu1.name="力宏"
console.log(stu1.name);
~~~



## 例子4  遍历

~~~
    let stu1 = { name: "杰伦", age: 18 }

    Object.keys(stu1).forEach(k => {
        let val = stu1[k];
        Object.defineProperty(stu1, k, {
            get() {
                return val
            },
            set(newVal) {
                val = newVal;
            }
        })
    })



console.log(stu1.name+stu1.age);
 stu1.name="力宏";
 stu1.age=20
 console.log(stu1.name+stu1.age);
~~~



## 例子5 封装方法

~~~
    function defineReactive(obj, k, v) {
        Object.defineProperty(obj, k, {
            get() {
                console.log(`触发get方法,用户在获取${k}属性`);
                return v
            },
            set(newVal) {
                console.log(`触发set方法,用户在操作${k}属性`);
                v = newVal;
            }
        })
    }
    let stu = { name: "杰伦", age: 18 }
    defineReactive(stu, 'name', stu.name)
    console.log(stu.name);
    stu.name = "力宏"
    console.log(stu.name);
~~~



## 例子6  封装class

~~~
    class Observer {//观察者
        //初始化
        constructor(data) {
            this.data = data
            //业务，劫持对象里面的所有属性
            this.walk();
        }
        walk(){
            Object.keys(this.data).forEach(k=>{
                this.defineReactive(this.data,k,this.data[k])
            })
        }
        //劫持
        defineReactive(obj, k, v) {
            Object.defineProperty(obj, k, {
                get() {
                    console.log(`触发get方法,用户在获取${k}属性`);
                    return v
                },
                set(newVal) {
                    console.log(`触发set方法,用户在操作${k}属性`);
                    v = newVal;
                }
            })
        }
    }


     let stu= { name: "杰伦", age: 18 }

     new Observer(stu)

     console.log(stu.name);

     stu.name="力宏"

     console.log(stu.name);
~~~



## 例子7 模拟vue,完成this.属性和this.$data属性的同步

~~~
    class Vue{
        constructor(option){
            this.$data=option.data();
            this.proxy();
        }
        proxy(){
            Object.keys(this.$data).forEach(k=>{
                //以下方法不推荐，只有第一次同步了，如果以后其中一方发生改变，则另一方不会变
                // this[k]=this.$data[k]
                //使用劫持
                Object.defineProperty(this,k,{
                    get(){
                        return this.$data[k]
                    },
                    set(newVal){
                        this.$data[k]=newVal
                    }
                })
            })
        }
    }

        let vm=new Vue({
            data(){
                return{
                    name:"张三",
                    age:18
                }
            }
        })
~~~



## 例子8 模拟vue  完成渲染

~~~
 class Vue{
        constructor(option){
            this.$data=option.data();
            this.$el=option.el;
            this.proxy();
            //渲染
            new Compiler(this.$el,this.$data)
        }
        proxy(){
            Object.keys(this.$data).forEach(k=>{
                //以下方法不推荐，只有第一次同步了，如果以后其中一方发生改变，则另一方不会变
                // this[k]=this.$data[k]
                //使用劫持
                Object.defineProperty(this,k,{
                    get(){
                        return this.$data[k]
                    },
                    set(newVal){
                        this.$data[k]=newVal
                    }
                })
            })
        }
    }

    //渲染
    class Compiler{
        constructor(el,data){
            this.el=document.querySelector(el);  //<div id="app"> <div>{{name}}</div><div>
            this.data=data; //{name:'张三'}
            //渲染
            this.compile();
        }
        compile(){
            const node=this.el.firstElementChild
            if(/\{\{([a-z]+)\}\}/.test(node.innerText)){
               let res=RegExp.$1.trim();//$后面是数字1不是l
               console.log(res);
               //渲染
               node.innerText=this.data[res];
            }

        }
    }
    

        let vm=new Vue({
            el:"#app",
            data(){
                return{
                    name:"李四",
                }
            }
        })
~~~



## 例子9  实现vue的响应式-- 单个观察者

~~~
 class Vue{
        constructor(option){
            this.$data=option.data();
            this.$el=option.el;
            //劫持$data;
            new Observer(this.$data)
            this.proxy();
            //渲染
            new Compiler(this.$el,this.$data)
        }
        proxy(){
            Object.keys(this.$data).forEach(k=>{
                //以下方法不推荐，只有第一次同步了，如果以后其中一方发生改变，则另一方不会变
                // this[k]=this.$data[k]
                //使用劫持
                Object.defineProperty(this,k,{
                    get(){
                        return this.$data[k]
                    },
                    set(newVal){
                        this.$data[k]=newVal
                    }
                })
            })
        }
    }

    //渲染
    class Compiler{
        constructor(el,data){
            this.el=document.querySelector(el);  //<div id="app"> <div>{{name}}</div><div>
            this.data=data; //{name:'张三'}
            //渲染
            this.compile();
        }
        compile(){
            const node=this.el.firstElementChild
            if(/\{\{([a-z]+)\}\}/.test(node.innerText)){
               let res=RegExp.$1.trim();//$后面是数字1不是l
               console.log(res);
               //渲染
               const render=()=>{
                node.innerText=this.data[res];
               }
               //实例化一个wathcer(观察者)
               w=new Watcher(render)
            }

        }
    }
    
    let w;
    //观察者
    class Watcher{
        constructor(callback){
            this.callback=callback;
            this.update();
        }
        //重新渲染
        update(){
            this.callback();
        }

    }


        let vm=new Vue({
            el:"#app",
            data(){
                return{
                    name:"李四",
                }
            }
        })
~~~



## 例子10 实现vue的响应式-- 观察者/订阅者模式



订阅者：来用“通知”观察者执行渲染的人  (管理观察者)

观察者：用来执行渲染的人

在template中：一个{{}} 对应一个观察者，而一个属性对应一个订阅者

如果页面上有:

~~~
{{name}} {{name}}
{{age}}{{age}}{{age}}

观察者：5个
订阅者:两个·，一个订阅name，一个订阅age
订阅者1管理name对应的那两个观察者
订阅者2管理age对应的那三个观察者
~~~



~~~
    //遍历传递过来的对象的所有属性，然后加以劫持
    class Observer {//观察者
        //初始化
        constructor(data) {
            this.data = data
            //业务，劫持对象里面的所有属性
            this.walk();
        }
        walk(){
            Object.keys(this.data).forEach(k=>{
                this.defineReactive(this.data,k,this.data[k])
            })
        }
        //劫持
        defineReactive(obj, k, v) {
            //创建一个dep
            let dep=new Dep();
            Object.defineProperty(obj, k, {
                get() {
                    console.log(`触发get方法,用户在获取${k}属性`);
                   if(Dep.target){
                         //dep添加wathcer
                        dep.addWatchers(Dep.target)
                   }

                    return v
                },
                set(newVal) {
                    console.log(`触发set方法,用户在操作${k}属性`);
                    v = newVal;

                    //重新渲染
                    dep.notify();
                }
            })
        }
    }


    //  let stu= { name: "杰伦", age: 18 }

    //  new Observer(stu)

    //  console.log(stu.name);

    //  stu.name="力宏"

    //  console.log(stu.name);


    class Vue{
        constructor(option){
            this.$data=option.data();
            this.$el=option.el;
            //劫持$data;
            new Observer(this.$data)
            this.proxy();
            //渲染
            new Compiler(this.$el,this.$data)
        }
        proxy(){
            Object.keys(this.$data).forEach(k=>{
                //以下方法不推荐，只有第一次同步了，如果以后其中一方发生改变，则另一方不会变
                // this[k]=this.$data[k]
                //使用劫持
                Object.defineProperty(this,k,{
                    get(){
                        return this.$data[k]
                    },
                    set(newVal){
                        this.$data[k]=newVal
                    }
                })
            })
        }
    }

    //渲染
    class Compiler{
        constructor(el,data){
            this.el=document.querySelector(el);  //<div id="app"> <div>{{name}}</div><div>
            this.data=data; //{name:'张三'}
            //渲染
            this.compile();
        }
        compile(){
            const node=this.el.firstElementChild
            if(/\{\{([a-z]+)\}\}/.test(node.innerText)){
               let res=RegExp.$1.trim();//$后面是数字1不是l
               console.log(res);
               //渲染
               const render=()=>{
                node.innerText=this.data[res];
               }
               //实例化一个wathcer(观察者)
               new Watcher(render)
               
            }

        }
    }
    
   
    //观察者
    class Watcher{
        constructor(callback){
            this.callback=callback;
            Dep.target=this
            this.update();
            Dep.target=null
        }
        //重新渲染
        update(){
            this.callback();
        }

    }
    //订阅者
    class Dep{
        constructor(){
            this.watchers=[];
        }
        // 添加
        addWatchers(w){
            this.watchers.push(w);
        }
        //通知
        notify(){
            this.watchers.forEach(w=>{
                w.update();
            })
        }
    }


        let vm=new Vue({
            el:"#app",
            data(){
                return{
                    name:"李四",
                }
            }
        })
~~~



# 面试题：说说 vue响应式的原理

~~~
1  数据劫持(Object.defineProperty)--->劫持对象的属性，触发get和set
2  用到观察者/订阅者模式
   观察者：render（渲染）
   订阅者:notify(通知) 
   便于管理
~~~

补充：双向绑定的原理：vue响应式原理+v-model（语法糖）





















