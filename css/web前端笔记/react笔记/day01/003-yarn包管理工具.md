## 003-yarn包管理工具

之前大家学习了npm包管理工具

yarn是有facebook、google一起开发的一款包管理工具，yarn弥补了npm的一些缺陷



### npm的缺陷

1. npm下载包的时候比较慢，我们要去配置淘宝镜像，即便配置了有时候还是很慢
2. 同一个项目中，安装的时候无法保证版本统一性，在package.json这个文件中的版本号有时候是不同固定的，比如我们经常看到的`^17.0.2`表示安装的17.x.x中的版本，那么我们不同的时间去运行这个项目可能会出现依赖包的版本不一致导致项目报错。
3. 下载报错的问题，安装的时候，一个包抛出错误，但是npm会继续下载和安装包，那么项目运行的时候就会出现各种异常，导致不好定位。



### yarn的特点

1. 快速性，yarn缓存我们下载过的包，所以每次使用的时候无需重复下载，同时利用必行下载最大化利用资源，因此安装速度也更快
2. 安全性，在执行代码之前，yarn会通过算法校验每个安装包的完整性。
3. 可靠性，有一个锁文件和明确的算法，yarn能够保证在不同的系统上无差异的工作。
4. 并行安装，无聊npm还是yarn在执行包的安装的时候，都会执行一系列的任务，npm是按照队列来执行每个包，也就是说必须要等到当前包安装完成后才会执行后面的包，而yarn是同步执行任务，提高了性能。
5. 安装版本统一，为了防止拉取到不同的版本，yarn有一个锁定文件（yarn.lock）记录了被安装的包的版本号，每次更新或增加模块，yarn就会创建（或更新）这个yarn.lock文件
6. 更简洁的输出，npm的输出信息更加的冗长



### yarn的基本用法

#### yarn的下载

```bash
npm i -g yarn

查看版本yarn --version
```



```bash
yarn config list
```



yarn淘宝源安装，

```bash
yarn config set registry https://registry.npm.taobao.org -g

// 配置 node-sass 的二进制包镜像地址
yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
```



#### yarn常用命令

1. 初始化一个项目

   ```bash
   yarn init -y
   ```

2. 添加依赖包

   ```bash
   yarn add [packagename] // 添加到dependencies
   yarn add [packagename] --dev // 添加到devDependencies
   yarn add [packagename]@[version] // 安装某个版本的依赖
   ```

3. 移除依赖包

   ```bash
   yarn remove [packagename]
   ```

4. 常用命令

   | npm 命令                             | yarn 命令                |
   | ------------------------------------ | ------------------------ |
   | npm install                          | yarn add                 |
   | npm install [package] --save         | yarn add [package]       |
   | npm install [package] --save-dev     | yarn add [package] --dev |
   | npm install [package]@1.1.1 --save   | yarn add [package]@1.1.1 |
   | npm uninstall [package] --save(-dev) | yarn remove [package]    |
   | npm update --save                    | yarn upgrade             |
   | npm  init                            | yarn init                |

















