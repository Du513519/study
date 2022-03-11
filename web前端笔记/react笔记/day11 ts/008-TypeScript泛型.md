## TypeScript泛型



### 函数泛型

不使用泛型封装的函数：这样的函数不具备数据类型的封装，会冗余代码

```typescript
// 比较数组中的数字大小，返回最大的数字
function compare(arr: number[]): number {
    let max = arr[0];

    arr.forEach(item => {
        max = item > max ? item : max;
    });

    return max;
}

const max = compare([1,4,7,2,3]);
console.log(max);


function compareStr(arr: string[]): string {    
    let max = arr[0];

    arr.forEach(item => {
        max = item > max ? item : max;
    });

    return max;
}

const maxStr = compareStr(['c', 'a', 't', 'r']);
console.log(maxStr);
```



使用泛型封装：

**定义函数的时候，需要在函数名右侧增加`<T>`代表是泛型，后面调用函数的时候，需要传递一个数据类型**

**传递泛型数据类型：`compareFx<number>([1, 76,34, 56])`**

```typescript
function compareFx<T>(arr: T[]): T {
    let max = arr[0];

    arr.forEach(item => {
        max = item > max ? item : max;
    });

    return max;
}

const maxNumberFx = compareFx<number>([1, 76,34, 56]);
console.log('maxNumberFx:', maxNumberFx);

const maxStrFx = compareFx<string>(['a', 'r', 't', 'd']);
console.log('maxStrFx:', maxStrFx);
```

> 一句话理解泛型：泛型可以理解为就是数据类型参数。



### 类的泛型

> 给类定义泛型，在类名右侧写上`<T>`，这个T是一个变量，可以随意命名，通常是一个大写字母T
>
> 创建实例的时候传递泛型约束`new CompareFx<number>()`

```typescript
class CompareFx<T> {
    list: T[] = [];
    add(num: T): void {
        this.list.push(num);
    }

    max(): T {
        let max = this.list[0];

        this.list.forEach(item => {
            max = item > max ? item : max;
        });

        return max;
    }
}

const compareFx = new CompareFx<number>();
compareFx.add(1);
compareFx.add(3);
compareFx.add(6);
compareFx.add(4);

// 找出最大值
const maxFx = compareFx.max();

console.log(maxFx);

const compareFxStr = new CompareFx<string>();
compareFxStr.add('b');
compareFxStr.add('e');
compareFxStr.add('g');
compareFxStr.add('f');

const maxFxStr = compareFxStr.max();
console.log(maxFxStr);
```

