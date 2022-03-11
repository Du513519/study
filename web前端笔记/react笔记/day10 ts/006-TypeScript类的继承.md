## TypeScript类的继承



### 类的继承

```typescript
class People {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Police extends People {
    money: number;
    constructor(name: string, money: number) {
        super(name);
        this.money = money;
    }

    work(thiefName: string) {
        console.log(this.name + '抓' + thiefName);
    }
}

const police = new Police('王sir', 10000);
console.log(police.name);
police.work('老王');
console.log(police.money);
```

在ts中类的继承与es6中的类的继承是一致 的

在类的继承中，constructor中必须要有super



### 类修饰符

在ts中新增了类的访问修饰符，对属性进行修饰，在不同场景中去使用修饰符。

| 访问修饰  | 含义       | 范围             |
| :-------- | :--------- | :--------------- |
| private   | 私有类型   | 本类             |
| protected | 受保护类型 | 本类、子类       |
| public    | 公有类型   | 本类、子类、外部 |

* public：如果你没有写这个修饰符，默认就是public修饰的

  ```typescript
  class Girl {
      public name: string;
      constructor(name: string) {
          this.name = name;
      }
  
      getName() {
          return this.name;
      }
  }
  
  class Doctor extends Girl {
      constructor(name: string) {
          super(name);
      }
  
      getDoctorName() {
          return this.name;
      }
  }
  
  const girl = new Girl('九尾狐');
  const name = girl.name;
  
  const doctor = new Doctor('阿卡丽');
  
  doctor.name;
  const doctorName = doctor.getDoctorName();
  console.log(doctorName);
  
  export default {}
  ```

* private：一旦属性定义了修饰符private，那么这个属性就无法被外部访问，也不能被继承。你可以通过定义一个方法返回私有属性的值。

  ```typescript
  class Girl {
      public name: string;
      private age: number;
      constructor(name: string, age: number) {
          this.name = name;
          this.age = age;
      }
  
      getName() {
          return this.name;
      }
  
      getAge() {
          return 18;
      }
  }
  
  class Doctor extends Girl {
      constructor(name: string) {
          super(name, 20);
      }
  
      getDoctorName() {
          return this.name;
      }
  
      getDoctorAge() {
          return this.age;
      }
  }
  
  const girl = new Girl('九尾狐', 20);
  const name = girl.name;
  const age = girl.getAge();
  console.log(age);
  
  export default {}
  ```

* protected：属性被protected修饰后，只有自己和子类可以访问该属性，外部是无法访问的。

  ```typescript
  class Girl {
      public name: string;
      private age: number;
      protected money: number = 100000000;
      constructor(name: string, age: number) {
          this.name = name;
          this.age = age;
      }
  
      getName() {
          return this.name;
      }
  
      getAge() {
          return 18;
      }
  
      getMoney() {
          return this.money;
      }
  }
  
  class Doctor extends Girl {
      constructor(name: string) {
          super(name, 20);
      }
  
      getDoctorName() {
          return this.name;
      }
  
      getDoctorMoney() {
          return this.money;
      }
  }
  
  const girl = new Girl('九尾狐', 20);
  const name = girl.name;
  const age = girl.getAge();
  console.log(age);
  
  
  const doctor = new Doctor('阿卡丽');
  
  doctor.name;
  const doctorName = doctor.getDoctorName();
  console.log(doctorName);
  const money = doctor.getMoney();
  console.log(money);
  
  export default {}
  ```



### 类只读属性

类的属性可以设置为只读，一旦设置后这个属性只能被读取，不能被修改。

```typescript
class Girl {
    protected readonly money: number = 100000000;
    setMoney(money: number) {
        this.money = money;
    }
}
```