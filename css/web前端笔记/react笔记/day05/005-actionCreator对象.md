## actionCreator对象

actionCreator是action的创建器，目前action是一个对象，没办进行参数传递，无法动态的进行数据更改。

提出了actionCreator函数用来创建action，接收用户的参数。

actionCreator必须要返回一个action对象。

```js
export const addActionAC = function (num) {
    return {
        type: 'add',
        num,
        user: '王五'
    }
}

export const reduceActionAC = function (num) {
    return {
        type: 'reduce',
        num
    }
}

```



以后我们创建action的时候，大多数情况下都会创建一个actionCreator。