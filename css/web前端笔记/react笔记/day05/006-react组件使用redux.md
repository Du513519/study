## react组件使用redux



### 在组件中使用react-redux

react没有办法直接拿到redux中的数据

我们需要第三方插件来完成，

这个插件就是`react-redux`，通过它将react组件和redux仓库结合起来使用。





1. 安装react-redux

   ```bash
   yarn add react-redux
   // or
   npm i react-redux
   ```

2. 创建redux仓库，并暴露出去

   store/index.js

   ```js
   import { createStore } from 'redux';
   import counterReducer from "./reducers/counterReducer";
   
   const store = createStore(counterReducer);
   
   export default store;
   ```

3. 通过Provider组件将react UI组件变成容器组件

   react-redux认为：react的组件都是UI组件，如果UI组件想要拿到store仓库数据，必须要称为一个容器组件

   ```js
   import React from 'react';
   import ReactDOM from 'react-dom';
   import App from './App';
   import store from "./store";
   // react-redux认为：react的组件都是UI组件，如果UI组件想要拿到store仓库数据，必须要称为一个容器组件
   import { Provider } from 'react-redux';
   
   ReactDOM.render(
       <Provider store={store}>
           <App />
       </Provider>,
     document.getElementById('root')
   );
   ```

   将store传入Provider组件中，后续的子组件才有资格去获取store仓库数据

4. 通过高阶组件connect将组件与redux仓库链接起来

   （1）引入`connect`高阶组件

   ```jsx
   import { connect } from 'react-redux';
   ```

   （2）将组件与redux仓库链接

   ```jsx
   // 将仓库数据注入到组件的props中
   function mapStateToProps(state) {
       console.log(state)
       return {
           count: state.count
       };
   }
   
   export default connect(mapStateToProps)(Counter);
   ```

   `mapStateToProps`： 将仓库数据注入到组件的props中，其中有个state参数，必须返回一个对象作为注入到组件props中的数据

5. 派发action

   重点：通过`this.props.dispatch()`派发action

   ```jsx
   import React, {Component} from 'react';
   import { connect } from 'react-redux';
   import { addActionAC, reduceActionAC } from '../store/actions/counter'
   
   class Counter extends Component {
   
       componentDidMount() {
           console.log('counter:', this.props)
       }
   
       handleAdd = () => {
           const addAction = addActionAC(10);
           this.props.dispatch(addAction);
       }
   
       handleReduce = () => {
           const reduceAction = reduceActionAC(20);
           this.props.dispatch(reduceAction);
       }
   
       render() {
           return (
               <div>
                   count: { this.props.count }
                   <button onClick={this.handleAdd}>增加count</button>
                   <button onClick={this.handleReduce}>减少count</button>
               </div>
           );
       }
   }
   
   // 将仓库数据注入到props中
   function mapStateToProps(state) {
       console.log(state)
       return {
           count: state.count
       };
   }
   
   export default connect(mapStateToProps)(Counter);
   ```

6. 还可以通过`mapDispatchToProps`函数映射自定义的`dispatch`到组件的props中

   ```jsx
   // 将仓库数据注入到props中
   function mapStateToProps(state) {
       console.log(state)
       return {
           count: state.count
       };
   }
   
   function mapDispatchToProps(dispatch) {
       return {
           addCountDispatch: (num) => {
               const addAction = addActionAC(num);
               dispatch(addAction)
           },
           reduceCountDispatch: (num) => {
               const reduceAction = reduceActionAC(num);
               dispatch(reduceAction);
           }
       }
   }
   
   export default connect(mapStateToProps, mapDispatchToProps)(Counter);
   ```

   