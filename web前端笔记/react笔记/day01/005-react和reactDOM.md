## react和DOM



### 安装核心包

1. react
2. react-dom
3. babel-standalone



1. 初始化项目

   ```bash
   yarn init -y
   ```

2. 安装三个核心包

   ```bash
   yarn add react react-dom babel-standalone
   ```

   react：react的核心包

   react-dom：提供与DOM相关功能

   babel-standalone：由babel编译器提供，可以将es6代码转换成es5代码，这样在不支持es6的浏览器上可以执行react代码



### 简单使用react

1. 引入三个包

   ```html
   <script src="./node_modules/react/umd/react.production.min.js"></script>
       <script src="./node_modules/react-dom/umd/react-dom.production.min.js"></script>
       <script src="./node_modules/babel-standalone/babel.min.js"></script>
   ```

2. 创建根元素root

   ```html
   <div id="root"></div>
   ```

3. 创建react组件并绑定到root元素上

   ```html
   <script type="text/babel">
           const temp = React.createElement('h1', null, 'hello react');
   
           ReactDOM.render(temp, document.getElementById('root'));
   </script>
   ```

   



### 多个DOM

```html
<script type="text/babel">
        const temp1 = React.createElement('h1', null, 'hello react1');
        const temp2 = React.createElement('h2', null, 'hello react2');
        const temp3 = React.createElement('h3', null, 'hello react3');
        const temp = React.createElement('div', null, [temp1, temp2, temp3]);

        ReactDOM.render(temp, document.getElementById('root'));
</script>
```



### JSX的方式

```html
<script type="text/babel">
        const temp = (
            <div>
                <h1>react1</h1>
                <h2>react2</h2>
                <h3>react3</h3>
            </div>
        )

        ReactDOM.render(temp, document.getElementById('root'));
    </script>
```

通过对比，我们发现jsx的写法比上面的写法更加的直观，让你联想到html的dom结构。

jsx最终会转换成React.createElement函数来创建react组件。