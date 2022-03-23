## 调试工具react-devtools



### 课程目标

1. 学会使用react-devtools调试工具，在浏览器中对react代码进行调试



### 课程实验

1. 安装react-devtools，在浏览器中进行react代码调试

   

### 课堂引入

平时在控制台中查看元素时，我们看到的是浏览直接呈现的DOM元素，无法直接看到我们编写的react组件，所有为了方便大家的调试，今天给大家介绍react-devtools调试工具。



### 授课进程

1. 打开github获取到插件项目，并现在到本地。

   插件的地址为：https://github.com/facebook/react-devtools/tree/v3，从这个地址里面找到DownloadZIP，将项目现在到本地。

   ![image-20201023093727864](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/xuchaobo/20210808173406.png)

2. 解压项目，并安装依赖。

   下载的zip文件解压到本地的目类里面。接着进入react-devtools-3目录，在控制台使用npm install命令将当前工程的依赖现在到本地。

3. 指定命令打包生成插件

   再进入到react-devtools-3\shells\chrome切换到chrome目录下，运行node build.js，当前目录下会生成build目录 这个build目录下的unpacked目录就是chrome中所需react-devtools的工具扩展程序包。

   ![image-20201023094120283](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/xuchaobo/20210808173415.png)

4. 打开chrome浏览器，配置插件

   打开谷歌浏览器，网址输入chrome://extensions/，选择`加载已解压的程序`，选择我们上一步生成的unpacked文件夹，这样就把插件安装成功。

   ![image-20201023094340008](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/xuchaobo/20210808173421.png)

   这个时候你在chrome加载插件栏里面就可以看到React Developer Tools插件。

   接着我们运行代码，就可以在浏览器中选择react来查看组件。

   ![image-20201023094635170](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/xuchaobo/20210808173428.png)



### 第二种方式，采用`git clone`下载代码

克隆代码到本地

```bash
git clone https://github.com/facebook/react-devtools.git
```

切换到v3分支

```bash
git checkout -b v3 origin/v3
```

安装依赖

```bash
yarn
```

进入shells\chrome下

```bash
node build
```

在谷歌浏览器的扩展程序中添加shells\chrome\build\unpacked文件夹



### 课程小结

1. react-devtools调试工具可以清晰的看到react组件层级关系和数据流向。

   

### 随堂作业

1. 安装react-devtools调试工具，并在控制台中对react组件进行调试。



### 扩展内容 （选填）



### 教案附件 （选填）



