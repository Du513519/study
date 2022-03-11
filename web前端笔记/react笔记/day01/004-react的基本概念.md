## 基本概念



react中文官网：https://react.docschina.org/



react是一个js库，我们一般将react全家桶称为react框架。

对于react本身来说，可以在老项目中使用，通过引入js核心文件，也可以在大型项目中基于脚手架的方式来开发（前端工程化），结合周边的react插件，来完成react全家桶开发。



### react的由来

react源于facebook内部项目，因为公司对市场上的javascript框架不满意，决定自己写一套框架，用来架构自己的网站，做出来之后发现这个框架非常好用，与2013年5月开源了。

由于react设计思想及其独特，属性革命性的创新，性能非常好，代码逻辑也非常的简单，所以受到了越来越多的人的关注和使用，被认为可能是未来web开发的主流工具。

这个项目本身也越滚越大，从早期的UI引擎编程了一整套前后端通吃的Web App解决方案，衍生出了react-native，目标也更加宏伟，希望用写web app的方式去写原生的应用，如果能够实现，那么真整个互联网行业都将被颠覆，因为只需要写一套代码就可以多段运行。



### 使用react的理由

1. 使用组件化的开发方式，符合现代化的开发趋势
2. 技术成熟，社区完善，配套齐全，适合用于大型项目
3. 有facebook出品，有专门的团队在维护，技术支持是可靠的。
4. 学习一次到处编写
5. 使用方式简单，性能好，支持服务器端渲染
6. react非常火，从技术角度来说，满足了大家的好奇心，提高自己的水平



### react的特点

1. 声明式的设计：react采用声明范式，可以轻松的描述应用。
2. 高效：react提供了虚拟DOM，最大限度的减少了DOM操作
3. 灵活：react可以与已知的库或框架进行搭配



### 虚拟DOM

虚拟dom是用js的对象来描述的DOM对象信息

DOM对象

```jsx
<div className="container">
	<h3>hello react</h3>
    <p>react非常好</p>
</div>
```

对应的虚拟DOM如下：

```js
{
    type: 'div',
    props: { className: 'container' },
    children: [
        {
            type: 'h3',
            props: null,
            children: [
                {
                    type: "text",
                    props: {
                        textContent: 'hello react'
                    }
                }
            ]
        },
        {
            type: 'p',
            props: null,
            children: [
                {
                    type: "text",
                    props: {
                        textContent: 'react非常好'
                    }
                }
            ]
        }
    ]
}
```



### 虚拟DOM如何提升效率的

react能精准的照发发生变化的DOM对象，只更新发生变化的部分

在react第一次创建dom的时候，会给DOM对象对应的虚拟dom（virtual dom）对象，在DOM对象发生变化的是时候，react会先更新所有的虚拟对象，然后react会将更新后的虚拟dom和更新前的虚拟dom进行对比，从而找出发生变化的部分，react会将发生变化的部分跟心到真实的DOM对象中。