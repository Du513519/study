## react性能优化方案



### shoulComponentUpdate

使用shoulComponentUpdate 的功能类似于类组件继承 `PureComponent `，达到了性能优化效果。

```js
shoulComponentUpdate(nextProps, nextState) {
    if (nextProps === this.props && this.state === nextState) {
        return false
    } else {
        return true;
    }
}
```



### 传递参数的优化

```jsx
class Parent extends React.Component {
    state = {
        name: '',
        age: 10,
        user: {
            gender: 1,
            id: 1
        }
        // ....
    }
    
    render() {
        const {name, user} = this.state;
        return (
        	<Child name={name} user={user}</Child>
        )
    }
}
```

避免在父组件中将属性展开过后传递给子组件。这样会带来一些性能消耗



### key定义

对于数组数据，在遍历渲染的时候要求不要使用index作为key，而是使用唯一的值（比如：id）作为key值。因为用index有可能导致数组与渲染出来的不一致。

虚拟DOM上会增加一个标志，diff算法进行对比的时候，就会使用这个key作为参考条件。



### 路由懒加载

路由组件懒加载：

* loadable插件可以实现路由懒加载，第三方的
* React.lazy()，官方的



### Fragment

当你的子组件需要一个父组件的时候，你可以使用React.Fragment来定义一个空的父标签

或者`<></>`来定义父标签，一次来减少dom的渲染个数达到性能优化

```jsx
render() {
    return (
    	<>
        	<p></p>
       	 	<p></p>
        </>
    ) 
}

render() {
    return (
    	<React.Fragment>
        	<p></p>
       	 	<p></p>
        <React.Fragment/>
    ) 
}
```

当我们循环生成dom元素时，使用`React.Fragment`空标签，它可以绑定key属性，而`<></>`是不能绑定key的。



### 组件的卸载和加载

尽量减少组件的创建和销毁，尤其是真对一些经常切换展示的组件，这样的组件，我们可以使用css样式的`display`属性控制是否展示，而不是使用三元运算符去控制是否渲染。

类似于vue中的`v-show`和`v-if`



### 计算缓存

当我们计算量很大的时候，很耗时的时候，我们可以将计算结果缓存。

类组件中使用`get`作为计算属性，函数组件里面 使用`useMemo`、`userCallback`，都能达到性能优化的目的。



### 整个前端领域性能优化方案

* 雪碧图
* 图标字体
* 减少DOM操作（文档片段）
* 尽量减少http请求
* 用link标签引入样式，少用`@import`
* 图片懒加载
* 防抖节流
* 瀑布流
* 事件委托









































