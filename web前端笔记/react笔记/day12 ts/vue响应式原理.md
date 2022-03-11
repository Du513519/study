## vue响应式原理

关键的类：Observer、Compiler、Watcher、Dep



原来手动操作DOM元素的方式（jquery）可能效率上来说要低一点，可能有一些无效操作。

使用vue或者react这样的MVVM框架不需要手动操作DOM元素，它数据驱动的。

react要完成页面的更新，通用setState函数更新，会使用diff算法对虚拟dom和真实dom对比。

vue用了Object.defineProperty这个函数去对数据进行劫持来进行dom更新，这个属性是es5就有的。



核心内容：数据劫持、观察者模式



### Object.defineProperty

这个对象提供了set和get方法，可以对属性的劫持。

vue对data里面的所有数据做了劫持，只要对data里面的数据进行更改，就会进入Object.defineProperty函数内部去执行业务。

将data中的数据进行set、get的数据劫持，被称为reactive化。



### 观察者模式

观察者模式是一个设计模式，设计模式就是前辈总结出来的经验。

比如去乡村基吃饭，点餐和取餐

对比vue中响应式观察者模式：

Observer：在组件初始化的时候，对data里面的所有数据做劫持，给他每个数据注册getter和setter。

Compiler： 将vue的语法编程成html原生能识别的语法。

Watcher：每个组件被创建实例的时候都会生成一个watcher实例，它是作为vue组件和Dep之间的一个桥梁，当数据更新的时候，watcher就会被通知去更新它关联的组件。

Dep：作为依赖收集器，收集watcher，当数据发生更新的时候，触发get，通过dep的notify函数通知watcher去更新组件。



注册环节：将所有的data数据通过Object.defineProperty的get、set方法进行劫持，在get函数内部会做一些判断，你是单纯的访问数据还是对数据在dom上进行渲染，数据更新的话watcher就会去渲染，watcher会被dep收集起来。



发布环节：一旦数据被更改，就会被set防范劫持到，然后更新数据，同时让dep的norify函数去通知watcher更新关联的组件。





![image-20220302100136750](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/wujie/20220302100147.png)