# 回顾

~~~
1 MongoDB好处:处理海量数据,有独特的查询手段
2 MongoDB的结构: 数据库-->集合---->文档
~~~

# MongoDB之CRUD操作

## 1 添加

~~~
db.集合名.insert({})
db.集合.insert([])

db.stus.insert({sname:"张三",age:18,gender:"男"});
~~~

## 2 查询(基本)

~~~
2.1 查询所有:db.集合名.find()  /db.集合名.find({})    
2.2 根据条件查询
	//查询sname为张三
		db.stus.find({sname:"张三"})
	//查询_id为61a04319197d00006a080688
		db.stus.find({_id:ObjectId("61a04319197d00006a080688")})
	//查询年龄为18的
		db.stus.find({age:18})
	
~~~

## 3 查询(进阶)

语法:

~~~
db.集合.find({属性:{比较操作符:值}})
~~~

比较操作符

~~~
$eq  =
$gt   >
$gte  >=
$lt   <
$lte  <=
$ne   !=
$in  在数组中
$nin 不在数组中

//查询年龄>18
db.stus.find({age:{$gt:18}})
//查询年龄不是18
db.stus.find({age:{$ne:18}})
//查询年龄是 18或者28或者38的人
db.stus.find({age:{$in:[18,28,38]}})
//查询年龄不是 18/28/38的人
db.stus.find({age:{$nin:[18,28,38]}})
//查询年龄在20~40之间人
db.stus.find({age:{$gte:20,$lte:40}})
db.stus.find({age:{$gte:20},age:{$lte:40}}) //错误的，属性会被覆盖
~~~



逻辑操作

语法:

~~~
db.集合名.find({$and:[{条件1},{条件2},{条件3}.....]})
~~~



~~~
$and
$or

//查询年龄>=15,并且名字是张三，并且性别为男
db.集合名.find({$and:[{条件1},{条件2},{条件3}.....]})
db.stus.find({$and:[{age:{$gte:15}},{sname:"张三"},{gender:"男"}]})
//查询年龄>=15,或者名字是张三，或者性别为男
db.stus.find({$or:[{age:{$gte:15}},{sname:"张三"},{gender:"男"}]})
~~~



## 4分页

由于后台数据海量，不可能全部加载到内存用于渲染,因此为了提高客户体验，节约内存，我们会用到分页

4大参数:

~~~
pageindex:当前页
pagesize:页容量
count: 总条数
pagecount:总页数

~~~

涉及到的语法:

~~~
总条数：db.集合名.find().count()
跳过xx行数据: db.集合名.find().skip(xx)
查询前xx行数据:db.集合名.find().limit(xx)
skip和limit可以共存:跳过前m行，查询前n行数据
db.集合名.find().skip(m).limit(n)
~~~

~~~
如果pagesize=3;
pageindex=1:
db.stus.find({}).skip(0).limit(3)
pageindex=2:
db.stus.find({}).skip(3).limit(3)
pageindex=3:
db.stus.find({}).skip(6).limit(3)
//分页公式
db.stus.find({}).skip((pageindex-1)*pagesize).limit(pagesize)
~~~



## 5 排序

mongoDB可以根据字段升序或者降序

语法

~~~
db.集合.find().sort({属性:1/-1})  
1:升序
-1：降序
~~~





## 6 投影

可以指定想要查询的字段

语法

~~~
db.stus.find({条件},{投影})
~~~



比如只想查询名字和年龄

~~~
//只想查询sname和age
db.stus.find({},{sname:1,age:1,_id:0})
~~~



## 7 模糊匹配

~~~
db.集合.find({属性:{$regex:/正则表达式/可选}})


//查询出sname包含三
db.集合.find({属性:{$regex:/正则表达式/可选}})
db.stus.find({sname:{$regex:/三/}})

//查询出sname包含a，不区分大小写
db.stus.find({sname:{$regex:/a/i}})
~~~



## 8 修改

语法:

~~~
db.集合.update({条件},{$set:{修改的属性}}.{可选})
可选：multi:true  --可以修改多个（默认只能修改一个）
~~~

~~~
//把id为61a04564197d00006a08068d 的名字改为张三三,年龄改为19
db.stus.update({_id:ObjectId('61a04564197d00006a08068d')},{$set:{sname:"张三三",age:19}})

//把年龄为20-40的性别都改为女
db.stus.update({age:{$gte:20,$lte:40}},{$set:{gender:"女"}},{multi:true})
~~~



回忆multiple的作用：

~~~
    <select name="" id="" multiple size="2">
        <option value="">aa</option>
        <option value="">bb</option>
        <option value="">cc</option>
        <option value="">dd</option>
        <option value="">ee</option>
    </select>


    <input type="file" name="" id="" multiple>
~~~



## 9 删除

语法:

~~~
db.集合.remove({条件})
~~~

~~~
//删除id为61a04564197d00006a08068d

db.stus.remove({_id:ObjectId('61a04564197d00006a08068d')})

//删除年龄=21
db.stus.remove({age:21})
~~~



# node.js操作MongoDB

前置：需要局部下载mongoose插件

~~~
npm i mongoose
~~~



注意：express项目只要开服则立马会执行app.js,由于在app.js中require了各个路由，因此路由.js文件也会被执行，

但是里面的方法(router.get/post...)只有当前端正确访问url时才会执行



## 通过mongoose操作数据库步骤



### 1 连接数据库

~~~
const mongoose=require('mongoose')
// const url="mongodb://ip:端口/数据库名"
const url="mongodb://localhost:27017/stuDB";
mongoose.connect(url)
//监听
mongoose.connection.on("connected",()=>{
    console.log("数据库连接成功");
})
~~~



### 2 设置Schema和Model



mongoose数据结构：

~~~
String/Number/Object/Array
~~~

~~~
//设置Schema结构(集合的字段)
const Schema=mongoose.Schema;
const userSchema=new Schema({
    username:String,   
    password:String,
    head:{
        type:String,
        default:"a1.jpeg"
    }
},{versionKey:false});//{versionKey:false}能够避免产生无意义字段
//设置model
//参数1：自定义，以后用于关联
//参数2：userSchema
//参数3：集合名
const userModel= mongoose.model("usersModel",userSchema,"users");
//该userModel就是操作数据库的关键
~~~

### 3 操作数据库 

mongoose操作数据的所有方法全部是异步

添加：

~~~
model对象.create({})
~~~

查询:

~~~
model对象.find({条件})   ---可以查询多个
model对象.findOne({条件})  ---只能查询一个
~~~

删除:

~~~
model对象.deleteOne({条件})
~~~

修改:

~~~
model对象.updateOne({条件},{修改的字段})  使用mongoose无需写$set 
~~~





## 项目结构的变换:

~~~
项目名:
  public  前端资源
  routes  后端资源
  utils   工具
  controller  控制层
  models  模型
  app.js  入口
~~~

执行顺序:

~~~
app.js--->路由.js---->controller.js--->model.js


包含关系:
user.js(路由)--->require('../controller/userController')
userController.js---->require('../models/userModel')
	
~~~





# 作业:

完成登录、注册、学生CRUD之mongoDB版

