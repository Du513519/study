## react脚手架搭建



### 脚手架的搭建

通过脚手架创建react项目：

1. npx临时安装脚手架（推荐使用）

   ```bash
   npx create-react-app my-app
   ```

   使用npx来安装项目，会临时创建`create-react-app`，当项目安装完成后，会立即删除`create-react-app`工具，使用这种方式安装项目时长会比全局安装方式要长一点，但是它能保证你项目里面的相关依赖是最新的。

2. 全局安装脚手架工具

   ```bash
   // 全局安装脚手架
   npm i -g create-react-app
   // 使用脚手架创建项目
   create-react-app [projectname]
   ```

   使用全局安装项目的方式比npx的方式要更快，但是由于是全局安装的`create-react-app`工具，如果你不更新它，那么你安装下来的项目可能是旧的版本。



### 文件目录

* public：存放静态资源的目录
* public/index.html：当前项目的默认模板文件
* src：源代码的存放位置
* src/index.js：项目的入口文件
* src/App.js：项目的跟组件，类似于vue中的app.vue文件
* .gitignore：git提交的时候，可以忽略的文件



命令：

* npm start：启动项目命令
* npm build：项目的构建和打包
* npm test：测试当前项目
* npm eject：在react中可以通过这个命令将一些脚本和工具的默认配置反编译出来到项目中，比如webpack配置文件、bable配置文件等等，开发人员可以获得配置文件的权限去配置，这个操作是不可逆的。