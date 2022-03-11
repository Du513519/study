## woniumall项目开发

### 需求

登录模块，用户模块、角色管理、商品管理、商品分类、文件上传等等



### 后端接口

在线文档地址：https://www.showdoc.com.cn/1279163935652723/7121925152107786

密码：xcb

后端项目技术栈：node.js + express + mongodb



### 项目目录

目录结构

![image-20220117103338036](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/wujie/20220117103342.png)

api：存放第三方请求

utils：存放一些公共的开发工具

pages：存放页面的目录

components：存放功能组件的目录



### 路由

```bash
yarn add react-router-dom@5.3.0
```



### UI库

官网地址：https://ant.design/index-cn

antd相关插件：

antV：数据可视化解决方案，比如折线图，饼状图等等

antd-pro：中后台前端/设计解决方案

antd-mobile：手机端的UI库



开发步骤：

1. 安装antd

   ```bash
   yarn add antd
   // 或者
   npm i antd
   ```

2. 在项目中配置全局样式

   第一种方式：在index.js文件中引入样式

   ```js
   import 'antd/dist/antd.css';
   ```

   第二种方式：在`src/App.css`文件中引入全局样式
   
   ```css
   @import '~antd/dist/antd.css';
   ```



### 按需加载

`antd` 的 JS 代码默认支持基于 ES modules 的 tree shaking。



### 自定义主题色

1. 安装插件craco

   ```bash
   yarn add @craco/craco
   ```

2. 更改package.json文件

   ```json
   /* package.json */
   {
       "scripts": {
          "start": "craco start",
          "build": "craco build",
          "test": "craco test",
       }
   }
   ```

3. 在根目录下新建`craco.config.js`文件

   ```js
   /* craco.config.js */
   module.exports = {
     // ...
   };
   ```

4. 安装`craco-less`

   ```bash
   yarn add craco-less
   ```

5. 在App.js文件中引入

   ```js
   import './App.less';
   ```

6. 在App.less中引入全局样式

   ```less
   @import '~antd/dist/antd.less';
   ```

   在js文件中删除`import 'antd/dist/antd.css';`的方式引入样式

7. 在`craco.config.js`中配置

   ```js
   const CracoLessPlugin = require('craco-less');
   
   module.exports = {
     plugins: [
       {
         plugin: CracoLessPlugin,
         options: {
           lessLoaderOptions: {
             lessOptions: {
               modifyVars: { '@primary-color': '#1DA57A' }, // 自定义主题色的配置
               javascriptEnabled: true, // 允许使用js来进行控制
             },
           },
         },
       },
     ],
   };
   ```

8. 重启项目



### 表单校验

在rules中配置校验规则

**max**

必须设置 `type`：string 类型为字符串最大长度；number 类型时为最大值；array 类型时为数组最大长度

```jsx
<Form.Item
    label="用户名"
    name="username"
    rules={[
        {
            required: true,
            message: '请输入用户名',
        },
        {
            max: 6,
            message: '用户名太长了'
        },
        {
            min: 3,
            message: '用户名太短了'
        }
    ]}
    >
    <Input placeholder={'请输入用户名'} />
</Form.Item>
```

**min**

必须设置 `type`：string 类型为字符串最小长度；number 类型时为最小值；array 类型时为数组最小长度



**pattern**

正则校验

```jsx
{
    pattern: /^[0-9]{6}$/,
        message: '密码格式不正确'
}
```



**type**

类型，常见有 `string` |`number` |`boolean` |`url` | `email`等

```jsx
{
    type: 'email',
        message: '邮箱格式不正确'
}
```



**validator**

自定义校验，接收 Promise 作为返回值

```jsx
{
    validator: (_, value) => {
        if (isEmpty(value)) {
            return Promise.reject(new Error('请输入用户名'));
        } else {
            if (/^[\da-zA-Z]+$/.test(value)) {
                return Promise.resolve();
            } else {
                return Promise.reject(new Error('用户名格式不正确'));
            }
        }
    },
}
```

第二种方式，通过callback回调

```jsx
{
    validator: (_, value, callback) => {
        if (isEmpty(value)) {
            callback(new Error('请输入用户名'));
            // return Promise.reject(new Error('请输入用户名'));
        } else {
            if (/^[\da-zA-Z]+$/.test(value)) {
                callback();
                // return Promise.resolve();
            } else {
                callback(new Error('用户名格式不正确'));
                // return Promise.reject(new Error('用户名格式不正确'));
            }
        }
    },
}
```





### 后端项目启动

1. 安装依赖

   ```bash
   npm i 
   // 或者
   yarn
   ```

2. 启动项目

   ```bash
   npm run dev
   //或者
   yarn dev
   ```

   

### 样式隔离效果

1. 新建`less`或`css`文件以`.module.less`或者是`.module.css`结尾

2. 引入使用

   ```jsx
   import styles from './header.module.less'
   
   class Header extends Component {
       render() {
           return (
               <div className={styles.color}>
                   header
               </div>
           );
       }
   }
   export default Header;
   ```

   如果样式名有横岗，需要下面这样写

   ```jsx
   <div className={styles['login-box']}></div>
   ```



### src路径别名配置

在`craco.config.js`中配置如下

```js
const CracoLessPlugin = require('craco-less');
const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
};
```



### 登录页面布局

1. 重置样式

   重置样式的地址：https://meyerweb.com/eric/tools/css/reset/index.html

   在public文件夹下新建reset.css样式

   然后在public/index.html中引入使用

   ```html
   <link rel="stylesheet" href="reset.css">
   ```

2. 页面布局设计

   ```jsx
   import React, { Component } from 'react'
   import { Form, Input, Button, Checkbox } from 'antd';
   import styles from './login.module.less';
   import { isEmpty } from '../../utils/common'
   
   export default class Login extends Component {
       onFinish = (values) => {
       };
   
       render() {
           return (
               <div className={styles['login-box']}>
                   <div className={styles['login-form-box']}>
                       <img src={require('../../assets/images/logo.png')} width={'180px'} alt='图片' />
   
                       <Form
                           labelCol={{
                               span: 8,
                           }}
                           wrapperCol={{
                               span: 16,
                           }}
                           initialValues={{
                               remember: true,
                           }}
                           onFinish={this.onFinish}
                           autoComplete="off"
                       >
                           <Form.Item
                               label="用户名"
                               name="account"
                               required={true}
                               rules={[
                                   // {
                                   //     required: true,
                                   //     message: '',
                                   // },
                                   // {
                                   //     type: 'email',
                                   //     message: '邮箱格式不正确'
                                   // }
                                   {
                                       validator: (_, value) => {
                                           if (isEmpty(value)) {
                                               // callback(new Error('请输入用户名'));
                                               return Promise.reject(new Error('请输入用户名'));
                                           } else {
                                               if (/^[\da-zA-Z]+$/.test(value)) {
                                                   // callback();
                                                   return Promise.resolve();
                                               } else {
                                                   // callback(new Error('用户名格式不正确'));
                                                   return Promise.reject(new Error('用户名格式不正确'));
                                               }
                                           }
                                       },
                                   },
                               ]}
                           >
                               <Input placeholder={'请输入用户名'} />
                           </Form.Item>
   
                           <Form.Item
                               label="密码"
                               name="password"
                               rules={[
                                   {
                                       required: true,
                                       message: '请输入密码',
                                   },
                                   {
                                       pattern: /^[0-9]{6}$/,
                                       message: '密码格式不正确'
                                   }
                               ]}
                           >
                               <Input.Password placeholder={'请输入密码'} />
                           </Form.Item>
                           <Form.Item
                               wrapperCol={{
                                   offset: 8,
                                   span: 16,
                               }}
                           >
                               <Button type="primary" htmlType="submit">
                                   登录
                               </Button>
                           </Form.Item>
                       </Form>
                   </div>
               </div>
           )
       }
   }
   
   ```

3. 登录页面样式

   login.module.less

   ```less
   .login-box {
     height: 100vh;
     background-image: url("../../assets/images/login-bg.jpg");
     background-repeat: no-repeat;
     background-size: cover;
     background-position: center;
   
     .login-form-box {
       position: fixed;
       top: 280px;
       right: 380px;
       padding-right: 40px;
       width: 360px;
       background-color: #fff;
   
       img {
         padding: 30px 0 20px 0;
         margin: 0 auto;
         display: block;
       }
     }
   
     .color {
       color: red;
     }
   }
   
   ```

   



### 登录功能

form表单中onFinish触发条件是必须验证成功后，并且form表单中按钮还要有`htmlType`属性，否则无法触发onFinish



1. 安装axios

   ```bash
   yarn add axios
   ```

2. 调用接口登录

   ```jsx
   onFinish = (values) => {
           console.log('Success:', values);
           this.setState({
               isLoading: true
           })
           axios.post('/users/login', values).then(res => {
               console.log(res)
               const data = res.data;
               console.log(data)
               if (data.code === 0) {
                   notification.error({
                       message: '失败',
                       description: data.msg
                   });
               } else {
                   StorageUtil.setToken(data.data.token);
                   StorageUtil.setItem('userinfo', data.data.userInfo);
                   notification.success({
                       message: '成功',
                       description:
                           '登录成功',
                   });
                   // localStorage.setItem('token', data.token);
                   // localStorage.setItem('userinfo', JSON.stringify(data.userInfo));
                   this.setState({
                       isLoading: false
                   })
                   this.props.history.push('/');
               }
   
           }).catch(err => {
               notification.error({
                   message: '失败',
                   description: '登录失败，请重新尝试'
               });
               this.setState({
                   isLoading: false
               })
           });
       };
   ```

3. 在utils/StorageUtil.js中封装storage

   ```js
   // export function storageSetItem(key, value) {
   //     localStorage.setItem(key, JSON.stringify(value));
   // }
   //
   // export function storageGetItem(key) {
   //     return JSON.parse(localStorage.getItem(key));
   // }
   //
   // export function storageGetToken() {
   //     return storageGetItem('token')
   // }
   //
   // export function storageSetToken(token) {
   //     storageSetItem('token', token);
   // }
   
   export default class StorageUtil {
       static setItem(key, value) {
           localStorage.setItem(key, JSON.stringify(value));
       }
   
       static getItem(key) {
           return JSON.parse(localStorage.getItem(key));
       }
   
       static setToken(token) {
           StorageUtil.setItem('token', token);
       }
   
       static getToken() {
           return StorageUtil.getItem('token')
       }
   }
   ```



### 跨域配置

在package.json文件中配置如下：

```json
{
    "proxy": "http://127.0.0.1:8002"
}
```



### 请求的拦截封装

在utils/axios.js中封装如下：

```js
import axios from "axios";
import StorageUtil from "./StorageUtil";
import {notification} from "antd";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8002',
    timeout: 10000
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // console.log('请求拦截config：', config)
    // 在发送请求之前做些什么

    config.headers.token = StorageUtil.getToken();

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    const response = error.response;
    console.log(error.message)
    if (response) {
        const status = response.status;
        if (status === 500) {
            notification.error({
                message: '错误',
                description: '服务器错误'
            })
        } else if (status === 401) {
            notification.error({
                message: '错误',
                description: '权限过期，请重新登录'
            });
            window.location.href = '/login';
        } else if (status === 404) {
            notification.error({
                message: '错误',
                description: '访问路劲不存在'
            })
        }
    } else if (error.message === 'Network Error') {
        notification.error({
            message: '错误',
            description: '网络错误，请重新尝试'
        })
    } else if (error.message.includes('timeout')) {
        notification.error({
            message: '错误',
            description: '请求超时'
        })
    }
    return Promise.reject(error);
});

export default instance;

```



### 主页布局

使用antd中的`Layout`组件进行首页布局

```jsx
import React, { Component } from 'react'
import {Button, Layout, Menu} from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined, TeamOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import {Link, Route, Switch} from "react-router-dom";
import Home from "../Home/Home";
import User from "../User/User";
import Role from "../Role/Role";
import ProductList from "../ProductList/ProductList";
import ProductCategory from "../ProductCategory/ProductCategory";
import StorageUtil from "../../utils/StorageUtil";

const { Header, Content, Footer, Sider } = Layout;

export default class Main extends Component {

    state = {
        username: ''
    }

    componentDidMount() {
        const userinfo = StorageUtil.getItem('userinfo');
        this.setState({
            username: userinfo.role.name
        })
    }

    render() {
        return (
            <Layout style={{ height: '100vh' }}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <img src={require('@/assets/images/logo.png')} width={'140px'} style={{ margin: '0 auto', padding: '20px 0', display: 'block' }} alt={'图片'} />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <Link to={'/'}>首页</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                            <Link to={'/user'}>用户管理</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined />}>
                            <Link to={'/role'}>角色管理</Link>
                        </Menu.Item>
                        <Menu.SubMenu key="4" icon={<TeamOutlined />} title="商品管理">
                            <Menu.Item key="6">
                                <Link to={'/product/list'}>商品列表</Link>
                            </Menu.Item>
                            <Menu.Item key="8">
                                <Link to={'/product/category'}>商品分类</Link>
                            </Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{ padding: 0, color: 'white' }}>
                        <ul className={styles['header-box']}>
                            <li>欢迎【{this.state.username}】登录</li>
                            <li>
                                <Button type={'link'}>退出登录</Button>
                            </li>
                        </ul>
                    </Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <Switch>
                                <Route path={'/'} component={Home} exact={true} />
                                <Route path={'/user'} component={User} />
                                <Route path={'/role'} component={Role} />
                                <Route path={'/product/list'} component={ProductList} />
                                <Route path={'/product/category'} component={ProductCategory} />
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>蜗牛创想出品</Footer>
                </Layout>
            </Layout>
        )
    }
}

```



从`localStorage`中获取用户信息设置登录人员姓名：

```jsx
componentDidMount() {
        const userinfo = StorageUtil.getItem('userinfo');
        this.setState({
            username: userinfo.role.name
        })
    }
```



在`Content`组件中配置二级路由：

```jsx
<Content style={{ margin: '24px 16px 0' }}>
    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Switch>
            <Route path={'/'} component={Home} exact={true} />
            <Route path={'/user'} component={User} />
            <Route path={'/role'} component={Role} />
            <Route path={'/product/list'} component={ProductList} />
            <Route path={'/product/category'} component={ProductCategory} />
        </Switch>
    </div>
</Content>
```





### 面包屑动态渲染

```jsx
import React, {Component} from 'react';
import {Breadcrumb} from "antd";
import { withRouter } from 'react-router-dom';

let pathMap = {
    '/user': '用户管理',
    '/': '首页',
    '/role': '角色管理',
    '/product': '商品管理',
    '/product/list': '商品列表',
    '/product/category': '商品分类'
}

let unlisten = null;

class MyBreadcrumb extends Component {

    state = {
        breadcrumbList: ['/product', ' /product/category']
    }

    componentDidMount() {
        this.setPath();
        unlisten = this.props.history.listen(() => {
            console.log(this.props)
            this.setPath();
        });

    }

    componentWillUnmount() {
        typeof unlisten === 'function' && unlisten();
    }

    setPath = () => {
        const pathname = this.props.history.location.pathname;

        // ['product', "category", 'list']
        // ['/product',' /product/category, '/product/category/list']
        const pathArr = pathname.split('/').slice(1);
        const newPathArr = pathArr.map((item, index) => {
            // ['product']  '/product'
            // ['product', "category"] '/product/category'
            return '/' + pathArr.slice(0, index + 1 ).join('/');
        })
        console.log(newPathArr)
        this.setState({
            breadcrumbList:newPathArr
        })
    }

    render() {
        const { breadcrumbName } = this.state;

        return (
            <Breadcrumb>
                {
                    this.state.breadcrumbList.map(item => {
                        return (
                            <Breadcrumb.Item key={item}>{pathMap[item]}</Breadcrumb.Item>
                        )
                    })
                }

                <Breadcrumb.Item>{breadcrumbName}</Breadcrumb.Item>
            </Breadcrumb>
        );
    }
}

export default withRouter(MyBreadcrumb);

```



### 获取Form表单实例

1. 绑定ref

   ```jsx
   <Form ref={this.formRef}></Form>
   ```

2. 获取Form实例

   ```jsx
   this.formRef.current
   ```

3. Form实例常用方法

   ```jsx
   validateFields // 校验表单
   resetFields // 重置表单
   getFieldsValue // 获取表单值
   ```

   更多请查看antd官网



### 分页功能

使用组件`Pagination`

```jsx
<div style={{paddingTop: '10px'}}>
    <Pagination
        style={{ textAlign: 'center' }}
        current={this.state.current}
        pageSize={this.state.pageSize}
        onChange={this.pageChange}
        total={this.state.totalCount}
        showSizeChanger
        showQuickJumper
        showTotal={total => `共计 ${total} 条`}
        />
</div>
```

current：当前页

pageSize：当前条数

onChange：页码或 `pageSize` 改变的回调，参数是改变后的页码及每页条数

total：总共多少条数据

showSizeChanger：是否展示 `pageSize` 切换器，当 `total` 大于 50 时默认为 true

showQuickJumper：是否可以快速跳转至某页



### 左侧菜单刷新定位

```jsx
componentDidMount() {
    const pathname = this.props.history.location.pathname;
    console.log(pathname)
    const pathArr = pathname.split('/');
    const newPathArr = pathArr.slice(1, pathArr.length - 1);
    // ['product', 'category']
    // ['/product', '/product/category']
    console.log('pathArr:', pathArr);
    console.log("newPathArr:", newPathArr)
    const openKeys = newPathArr.map((item, index) => {
        return '/' + newPathArr.slice(0, index + 1).join('/');
    })
    console.log('openKeys', openKeys)
    this.setState({
        selectedKeys: [pathname],
        openKeys
    })
}
```



### 图片上传

![image-20211130171904347](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/wujie/20211130171912.png)



大家要去修改的属性：

* action：发送图片到后台接口地址

* name：发送到后台的文件参数名， 'imgSrc'

* 图片的数量

  ```jsx
  <Upload
      action="http://127.0.0.1:8002/goods/fileUpload"
      listType="picture-card"
      fileList={fileList}
      onPreview={this.handlePreview}
      onChange={this.handleChange}
      name='imgSrc'
      >
      {fileList.length >= 1 ? null : uploadButton}
  </Upload>
  ```

* onChange事件：监听图片上传的状态，当状态是`done`时候，后台返回了响应的数据



### 图片上传的封装

UploadWall.jsx

```jsx
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from "react";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class UploadWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = ({ fileList, file }) => {
        console.log(fileList)
        this.setState({ fileList })
    };

    validate = () => {
        return this.state.fileList.length > 0;
    }

    getFilenames = () => {
        if (this.state.fileList.length === 0) {
            return '';
        } else {
            const dataArr = this.state.fileList.map(file => {
                return file.response.data
            });
            return dataArr.join();
        }
    }

    clear = () => {
        this.setState({
            fileList: []
        })
    }

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;

        const { size = 1 } = this.props;

        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <>
                <Upload
                    name={'imgSrc'}
                    action="http://127.0.0.1:8002/goods/fileUpload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= size ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}

```



### 处理日期的方式

第一种，拆分成数组

```js
const authTime = new Date().toLocaleDateString().split('/').join('-')
```

第二种，通过`toLocaleDateString()`方法

```js
const authTime = new Date().toLocaleDateString().replace(/\//g, '-');
```

或者

```js
const authTime = new Date().toLocaleDateString().replaceAll('/', '-');
```

第三种，通过`moment.js`插件

```js
const authTime = moment().format('YYYY-MM-DD');
```



### 模拟路由导航守卫

WatchRoute.jsx

```jsx
import React, {Component} from 'react';
import {Redirect, Route} from "react-router-dom";
import StorageUtil from "@/utils/StorageUtil";
import { withRouter } from 'react-router-dom';

class WatchRoute extends Component {
    render() {
        const { path, component, ...restProps } = this.props;
        const pathname = this.props.history.location.pathname;

        if (StorageUtil.getItem('userinfo').role.menus.some(menu => menu === pathname)) {
            return (
                <Route path={path} component={component} {...restProps} />
            );
        } else {
            return <Redirect to={'/noauth'} />
        }

        // if (StorageUtil.getToken()) {
        //     return (
        //         <Route path={this.props.path} component={this.props.component} />
        //     );
        // } else {
        //     return <Redirect to={'/login'} />
        // }

    }
}
export default withRouter(WatchRoute);

```



将二级路由配置修改如下：

```jsx
<Switch>
    <WatchRoute path={'/home'} component={Home} exact={true} />
    {/*<Route path={'/user'} component={User} />*/}
    <WatchRoute path={'/user'} component={User} />
    <WatchRoute path={'/role'} component={Role} />
    <WatchRoute path={'/product/list'} component={ProductList} />
    <WatchRoute path={'/product/category'} component={ProductCategory} />
</Switch>
```

