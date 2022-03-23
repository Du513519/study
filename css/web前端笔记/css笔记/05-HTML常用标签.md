## HTML常用标签

**html常用标签的分类**：

- 文本标签：用于文本显示的标签
- 表格标签：实现表格的标签
- 表单标签：用于数据交互，数据库连接
- 列表标签：有序列表和无序列表
- 其他标签:内容居中，盒子，跑马灯，框架标签等

### 常用的文本标签

#### 	标题标签h1-h6

- h1~h6 数字越大，字体越小

- 所有标题标签都加粗

- 独占一行

- 默认上下有间距

- 有利于SEO优化，可以将标签里面的文本进行搜索引擎的收录，利用搜索排名

    ```html
    <h1>这是标题1</h1>
    <h2>这是标题2</h2>
    <h3>这是标题3</h3>
    <h4>这是标题4</h4>
    <h5>这是标题5</h5>
    <h6>这是标题6</h6>
    ```

### **文字标签:font**

```
<font color="颜色" size="数字" face="字体"></font>
```

color:颜色

size:大小   只能是1到7之间的数字

face:字体样式

### HTML常用相关属性

	1. bgcolor="颜色"   设置背景颜色
	2. background="图片"  设置背景图片 

#### 段落标签 p

- 一个段落就用一个P标签

- 独占一行，上下有间距

- 注意：p标签里面不能嵌套p标签，可以嵌套其他标签

    ```html
    <p>
        段落文本
    </p>
    ```

### br 换行(单标签)

### hr 分割线(单标签)

#### strong/b 加粗

- 推荐使用strong

### 删除线标签del  s

```html
<del>
	￥998
</del>
```

可以实现文字删除线的效果

#### 斜体  i  / em

### **u下划线**

### sup上标签

### sub下标签

### pre 格式化标签 

```html
<pre>
	2 + 5
	=
	7
</pre>
```

可以实现格式化，经常放具有固定格式的文档

#### span标签

- 用于简短性文本或者提示性信息，没有任何样式

### label标签

- 没有任何样式，label有特殊的用法，结合表单元素使用。

- for属性去指定表单元素的id名，通过这个id名找到对应的表单元素，点击label里面的文本可以控制该表单元素获取鼠标焦点

- id命名规范：只能由字母、数字、下划线和-构成，以字母开头

- ```
    <label for="user">账号</label><input type="text" id="user">
    ```

### 内容居中：center

### 图片标签 img(单标签)

```html
<img src="图片的路径" alt="图片加载失败时显示的文字" title="鼠标移入图片时显示的文字" width="图片的宽度" height="图片的高度">
```

- src：图片路径可以是网络图片路径，也可以是本地图片路径

    - 文件路径

        - 绝对路径：指目录下的绝对位置

        - 相对路径：是从当前文件出发（以当前文件为参考），去找指定文件的路径

            ../ 返回上一级   多个../返回多个上一级

- alt：图片加载失败时显示的文字，用于图片加载失败时显示在页面上的文字。

- title：一般用于图片加载成功时解释说明的文字，鼠标移入图片时显示。

- width：宽度

- height：高度

- 注意：宽度和高度同时设置，可能会造成图片变形，只设置一个值时，另一个按照原图比例进行缩放

### 超链接 a

```html
<a href="需要跳转的网页路径" target="新开网页的方式"></a>
```

- href：链接网页路径
    - 其他服务器的网页，必须以http或https开头
    - 本地的网页，建议使用相对路径
    - 锚点：以#开头，加上id名，跳转到页面中指定位置
    - #：代表跳转到当前页面，相当于刷新
- target：新开网页的方式，默认会在当前窗口显示
    - _blank 新开一个窗口
    - _self 默认本窗口打开

### 锚点的使用 

```
<a href="#锚点名称">连接名字</a>
<a id="锚点名称">内容</a>
<a name="锚点名称">内容</a>
```

注意：id权重大于name权重

### 其他标签

#### div标签

- div是布局标签，可以看作一个布局容器
- 独占一行，没有任何样式

#### 跑马灯标签

```html
<marquee scrollamount="滚动的速度" behavior="alternate" direction="方向">公告：明天周五，要周末了，但是周六上课</marquee>
```

- 已经废弃，后面可以通过css动画实现，还可以通过js控制

#### 框架标签iframe

```html
<ul>
    <li><a href="http://www.woniuxy.com" target="frame">蜗牛学院</a> </li>
    <li><a href="http://www.baidu.com" target="frame">百度</a> </li>
</ul>
<iframe src="http://www.baidu.com" name="frame" frameborder="1" width="1200px" height="500px"></iframe>
```

- target=""代表我们需要跳转页面时，控制我们自定义的框架，将目标网页渲染到我们指定的框架标签里面（name=“”中的值必须和target一致）
- 缺点：需要去指定宽高

#### 带边框的容器 fieldset

```html
<fieldset>
     <legend>登录</legend>
     <form action="">
         <label for="user">用户名：</label>
         <input type="text" placeholder="请输入用户名" value="admin" id="user"> <br>
         密码：
         <input type="password">
     </form>

</fieldset>
```

- legend:设置容器边框上的名字，边框左上角

### 特殊符号——转义字符

在HTML网页中要使用特殊符号，请转义

- 空格  &nbsp；
- 版权 &copy；
- 注册商标 &reg; &reg
- 小于 &lt；
- 大于 &gt；

### 表格标签

```html
 <table border="1" width="宽度" height="高度" bordercolor="边框颜色" bgcolor="背景颜色" align="对齐方式">
        <tr>
            <td>商品名</td>
            <td>介绍</td>
            <td>数量</td>
            <td>价格</td>
        </tr>
        <tr>
            <td>小米手机</td>
            <td>有小米还有大米，有小米还有大米</td>
            <td>1</td>
            <td>100</td>
        </tr>
        <tr>
            <td>大米手机</td>
            <td>大米先生定制版</td>
            <td>10</td>
            <td>5</td>
        </tr>
    </table>
```

- table：代表表格，一个table代表一个表格

    - border：设置表格的边框
    - width：宽度
    - height：高度
    - align：表格再页面中的对齐方式
        - left左对齐
        - right右对齐
        - center居中对齐
    - cellspacing：(外边距)设置单元格之间的间距
    - cellpadding：（内边距）设置单元格中内容到单元格边框之间的间距
    - bgcolor：设置背景颜色

- tr：代表行，一个tr代表一行

    - height：高度

    - align：当前行里面的数据在单元格中对齐方式
        - left左对齐
        - right右对齐
        - center居中对齐
    - bgcolor：设置背景颜色

- td：代表列，一个td代表一个单元格（列）

    - width：宽度，设置了当前这一列的宽度
        - 可以设置百分比，它参考父元素的宽度
        - 设置了一个单元格的宽度，会控制整个一列宽度
    - height：高度：设置一个单元格高度，可以控制整行的高度

    - align：当前单元格里面的数据在单元格中对齐方式
        - left左对齐
        - right右对齐
        - center居中对齐
    - bgcolor：设置背景颜色

- th：代表表头的单元格，默认文字加粗，水平居中对齐

- 注意：

    1. 表格默认是没有任何效果的，如果需要查看，那么添加边框border，默认表格大小由内容决定

    2. 单元格中的数据默认在水平方向左对齐，垂直方向居中对齐

    4. thead:代表表格的头部  

        tbody：表格内容区域，用于动态生成的数据

        tfoot：表格的尾部

    5. table里面只能放tr，tr里面只能放td或者th

    6. table设置宽高，表格中没有内容时，会均分，一旦有内容，会根据内容大小进行分配

#### 合并单元格

- rowspan：跨行合并，垂直方向合并单元格
- colspan：跨列合并，水平方向上合并单元格
- 注意：这两个属性都是控制单元格td，合并了单元格，对应的被合并掉的单元格需要删除掉

#### 表格嵌套

- 嵌套的表格放在单元格td里面
- 表格通过嵌套可以实现我们的页面布局

### 列表标签

- 无序列表 ul

    ```html
    <ul>
        <li></li>
        <li></li>
    </ul>
    ```

- type：规定列表的项目符号的类型，不赞成使用，使用样式取代它。

    - disc（圆点）
    - square（方框）
    - circle（空心圆）

- 有序列表 ol

    ```html
    <ol>
        <li></li>
        <li></li>
    </ol>
    ```

- 注意：

    1. ol和ul里面只能放li
    2. 一般常用于导航的设计
    3. ol和ul前后有间距

2.style="list-style: none;"： 取消项目符号

​		定义列表 dl

```
	<dl>
        <dt>中国</dt>
        <dd>中华人民共和国</dd>
         <dt>冰糖雪梨</dt>
        <dd>新鲜的食材往往只需要简单的烹饪</dd>
    </dl>
```



### 表单标签

- 表单：用于数据提交的单子
- 表单标签：将数据进行提交或者填写的功能空间

#### 普通文本框

```html
<input type="text">
```

- name：数据类型
- value：提交给服务器的数据
- disabled：禁用控件，不能提交给服务器
- required：必填项
- autofocus:自动获取鼠标焦点
- readonly：只读，内容可以负值，可以提交给服务器
- placeholder：设置默认的提示性文本，点击输入内容后会消失

#### 密码框

```html
<input type="password">
```

- placeholder：设置默认的提示性文本，点击输入内容后会消失
- value可以设置文本框默认的文本

#### 单选

```html
<input type="radio">
```

- 注意：多个单选框连接起来，需要设置相同的name名
- checked：可以设置默认选中，复选也可以

#### 复选

```html
<input type="checkbox">
```

#### 下拉列表

```html
<select name="">
    <option vlaue=""></option>
     <option vlaue=""></option>
</select>
```

- 注意：下拉列表默认是显示第一个选项
- option：里面设置下拉列表的选项
    - selected:设置该选项为默认选项

#### 文本域

```html
<textarea rows="数字" cols="数字"></textarea>
```

- rows：控制文本域中可以显示多少行
- cols：控制文本域中一行显示的字符数
- 可以变相通过这两个属性来控制文本域的宽高

### 文件上传

```
<!-- 文件上传：默认只能选择一个，multiple可以上传多个文件 -->
 <input type="file" multiple>
```

注意：使用过程中，其所在的form标签必须加上enctype="multipart/form-data"

### 时间设置

```
<input type="date">
```

  HTML5新增特性

#### 按钮

```html
普通按钮
<input type="button" value="普通按钮">
<button> 普通按钮</button>
提交按钮
<input type="submit" value="提交按钮">
<button type="submit">提交</button>
重置按钮
<input type="reset" value="重置">
<button type="reset">重置</button>
```

- 重置和提交按钮需要配合form标签使用
- 将按钮所在的form表单的元素进行操作：重置或提交

#### form表单

- action:数据提交的服务器地址（接口）
- method：数据提交的方式
    - get：从服务器获取数据，也可以提交数据给服务器，数据会显示在地址栏
    - post：提交数据给服务器，数据不会显示在地址栏
    - 一般get用于开发过程中进行测试，post一般用于上线之后

- 

练习：

### 12306注册页面



![中国铁路12306](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/longzongfei/202109071946681.png)