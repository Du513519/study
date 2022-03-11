# webpack(打包)

## 概念

前端资源构建工具

## 作用

~~~
1 转换 把浏览器不能识别的文件转成可以识别的文件
2 合并 把多个同类型文件合并一个文件
3 压缩 压缩代码（比如去掉空格等）-->让代码的体积变小   jquery.js  jquery.min.js
~~~

## 前后端分离项目

webpack来构建前端

express来构建后端



## 1 打包js

1  新建目录（项目，项目名不能叫关键词,比如webpack）,通过npm  init -y 命令生成package.json（初始化）

2  在当前项目局部下载安装webpack和webpack客户端

~~~
npm i webpack webpack-cli -D
~~~

-D 代表下载的插件只能用于开发环境(devDependencies)，打包后用于上线的项目是不包含该插件

3 在项目根目录下新建src目录，以后所有的代码都会放在该目录下

~~~
 项目
   src目录
   	 html目录
   	 css目录
   	 js目录
~~~

4  在项目根目录下新建webpack.config.js

~~~
module.exports={

    

}
~~~

以下的所有属性必须放在module.exports={} 里面

​    



### 4.1 打包模式(mode)

~~~
 mode:"development"  //开发模式  (打包之后代码不会被压缩)
 或者
 mode:"production"  //生产模式   (打包之后代码会被压缩)
~~~



### 4.2 配置入口js(entry)

~~~
 //配置入口
    entry:{
        //自定义js名：js的地址
        login:'./src/js/login.js',
        register:'./src/js/register.js'
    }
~~~

### 4.3 配置出口js(output)

~~~
    //配置出口
    output:{
        //打包之后放在哪里
        path:path.resolve(__dirname,"dist"),
        //打包之后的js的名字  ，当前路径已经在dist, [name]是语法
        //以后会在dist/js下生产login.js和register.js
        filename:'js/[name].js'
    }
~~~

### 4.4 打包命令(在项目根目录执行)

~~~
npx  webpack
~~~



webpack默认只能打包js，如果要打包html、css、scss、图片等需要额外下载插件

## 2 打包html

### 	2.1 下载和引入插件

~~~
npm i html-webpack-plugin -D

~~~

### 	2.2配置插件(plugins)

~~~
 plugins:[
        getHtmlWebpackPlugin('login'),
        getHtmlWebpackPlugin('register'),
    ]
    
    
 //封装页面
function getHtmlWebpackPlugin(name){
    return  new HtmlWebpackPlugin({
        //html引入哪些js
        chunks:[`${name}`],
        //html源路径
        template:`./src/html/${name}.html`,
        //html打包路径(默认已经在dist下面)
        filename:`./html/${name}.html`
    })
}
~~~

## 3 打包css 

### 	3.0准备工作

~~~
css目录下新建login.css
编辑login.js,把css引入进去
import '../css/login.css'
~~~

### 	3.1 下载和引入插件(module)

~~~
npm i mini-css-extract-plugin  style-loader   css-loader  -D
~~~

mini-css-extract 用于打包成外部样式

style-loader 用于打包成内部样式

css-loader:基础

####  内部样式

~~~
module:{
        rules:[
            {
                //匹配想要打包的css
                test:/\.css$/i,
                use:['style-loader','css-loader']
            }
        ]
    }
~~~



#### 外部样式

~~~
 plugins:[
        getHtmlWebpackPlugin('login'),
        getHtmlWebpackPlugin('register'),
        //配置外部样式
        new MiniCssExtractPlugin({
            filename:'css/[name].css'
        })
    ],
    module:{
        rules:[
            {
                //匹配想要打包的css
                test:/\.css$/i,
                use:[MiniCssExtractPlugin.loader,'css-loader']
            }
        ]
    }
~~~

## 4 打包scss



### 	4.0准备工作

~~~
css目录下新建login1.scss
编辑login.js,把scss引入进去
import '../css/login1.scss'
~~~

###   4.1 下载和引入插件(module)

~~~
npm i sass-loader -D
npm i node-sass -D  (被墙了，可能会下载失败)
~~~



### 4.2配置插件

### 内部

~~~
    module:{
        rules:[
            {
                //匹配想要打包的scss
                test:/\.scss$/i,
                use:['style-loader','css-loader','sass-loader']
            }
        ]
~~~







### 外部

~~~
 plugins:[
        getHtmlWebpackPlugin('login'),
        getHtmlWebpackPlugin('register'),
        //配置外部样式
        new MiniCssExtractPlugin({
            filename:'css/[name].css'
        })
    ],
    module:{
        rules:[
            {
                //匹配想要打包的css
                test:/\.scss$/i,
                use:[MiniCssExtractPlugin.loader,'css-loader','sass-loader']
            }
        ]
    }
~~~



## 5 打包图片

图片分为两种：

~~~
1 标签：<img src
2 样式：background-image:url()
~~~



### 5.0准备工作

~~~
分别在img标签和样式引入两个图
~~~

### 5.1 下载和使用插件

~~~
npm i url-loader file-loader html-withimg-loader -D
~~~

url-loader：用于css中的图

html-withimg-loader:用于标签的图

file-loader:基础

### 5.2 配置插件



css中的图片:

需要降低版本css-loader才能够正常使用:

~~~
  "devDependencies": {
    		"css-loader": "^5.2.6",
~~~



~~~
module:{
        rules:[
            {
                //匹配要打包的图片(配置css样式中的图片)
                test:/\.(png|jpg|jpeg|gif)$/i,
                use:{
                    loader:"url-loader",
                    options:{
                        //如果图小于8kb会自动转成base64格式
                        limit:1024*8,
                        //打包到哪里，默认路径就在dist
                        outputPath:"./img",
                        //解决标签引入图片的bug
                        esModule: false
                    }
                }
            },
~~~



html的图片:

~~~
    module:{
        rules:[
            {
                //匹配哪些页面的img图片
                test:/\.html$/i,
                use:['html-withimg-loader']
            }
~~~



## 6 服务器

上述的npx webpack是把项目打包，然后把打包之后的项目放入真实的服务器

如果我们只是为了测试打包之后的代码是否有问题，如果每次都要打包后查看，是很麻烦

解决：使用 webpack-dev-server插件，该插件可以提供一个服务，并且能够自动打包+开服



步骤:

~~~
1 下载插件
npm i  webpack-dev-server -D
~~~

~~~
2 开服
npx webpack serve
~~~

注意：打包后不会生产dist目录,（打包后的项目在内存中）

​	



# 总结：

~~~
webpack.config.js:
module.exports={
    //设置成生产模式
    mode:"production",
    //配置js入口
    entry:{
       
    },
    //配置js出口
    output:{
       
    },
    //配置页面和外部样式
    plugins:[
       
    ],
    //配置css、scss、图片规则的
    module:{
        rules:[
           
        ]
    },
    //配置服务器
    devServer:{
      
    }
}

~~~

# webpack中使用jquery

xx.js:

~~~
import $ from './jquery.js'
$(function(){
   $("#btn").click(function(){
       $.get("http://localhost:3000/stus/getStus",function(res){
           console.log(res.result);
       })
   })
})
~~~



# 上课使用的完整版:webpack.config.js

~~~
const path=require('path')
//页面插件
const HtmlWebpackPlugin=require('html-webpack-plugin')
//外部样式插件
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
module.exports={
    //设置成生产模式
    mode:"production",
    //配置入口
    entry:{
        //自定义js名：js的地址
        login:'./src/js/login.js',
        register:'./src/js/register.js'
    },
    //配置出口
    output:{
        //打包之后放在哪里
        path:path.resolve(__dirname,"dist"),
        //打包之后的js的名字  ，当前路径已经在dist, [name]是语法
        //以后会在dist/js下生产login.js和register.js
        filename:'js/[name].js'
    },
    //配置页面
    plugins:[
        getHtmlWebpackPlugin('login'),
        getHtmlWebpackPlugin('register'),

        new MiniCssExtractPlugin({
            filename:'css/[name].css'
        })
    ],
    module:{
        rules:[
            {
                //匹配想要打包的css
                test:/\.css$/i,
                use:[MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                //匹配想要打包的scss
                test:/\.scss$/i,
                use:[MiniCssExtractPlugin.loader,'css-loader','sass-loader']
            },
            {
                //匹配要打包的图片(配置css样式中的图片)
                test:/\.(png|jpg|jpeg|gif)$/i,
                use:{
                    loader:"url-loader",
                    options:{
                        //如果图小于8kb会自动转成base64格式
                        limit:1024*8,
                        //打包到哪里，默认路径就在dist
                        outputPath:"./img",
                        esModule: false
                    }
                }
            },
            {
                //匹配哪些页面的img图片
                test:/\.html$/i,
                use:['html-withimg-loader']
            }
        ]
    },
    devServer:{
        port:8888,//端口
        open:true,//打包+开服+打开浏览器
        hot:true//热更新
    }
}

//封装页面
function getHtmlWebpackPlugin(name){
    return  new HtmlWebpackPlugin({
        //html引入哪些js
        chunks:[`${name}`],
        //html源路径
        template:`./src/html/${name}.html`,
        //html打包路径(默认已经在dist下面)
        filename:`./html/${name}.html`
    })
}
~~~

