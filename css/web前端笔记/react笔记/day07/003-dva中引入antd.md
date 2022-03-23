## dva中引入antd



### 按需加载antd

1. 通过 npm 安装 `antd` 和 `babel-plugin-import` 。`babel-plugin-import` 是用来按需加载 antd 的脚本和样式的，详见 [repo](https://github.com/ant-design/babel-plugin-import) 。

   ```bash
   npm install antd babel-plugin-import --save
   ```

2. 编辑 `.webpackrc`，使 `babel-plugin-import` 插件生效。

   ```json
   {
     "extraBabelPlugins": [
       [
           "import", // 检测项目是否使用import语句
           { "libraryName": "antd", // 检测通过import是否引入antd
            "libraryDirectory": "es", // 检测是否使用了es文件夹
            "style": "css"  // 自定打包引入css样式，不会将所有的样式都加载进去
           }
       ]
     ]
   }
   ```

3. 在项目的routes文件夹下使用antd

   IndexPage.js

   ```jsx
   import React from 'react';
   import { connect } from 'dva';
   import { Button } from 'antd';
   
   function IndexPage() {
     return (
       <div>
         <Button type="primary">Primary Button</Button>
         <Button>Default Button</Button>
         <Button type="dashed">Dashed Button</Button>
         <br />
         <Button type="text">Text Button</Button>
         <Button type="link">Link Button</Button>
       </div>
     );
   }
   
   IndexPage.propTypes = {
   };
   export default connect()(IndexPage);
   ```



### 自定义主题色

1. 将.webpackrc文件中的配置改成如下

   ```js
   {
     "extraBabelPlugins": [
       ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }]
     ]
   }
   ```

   将style该成true

2. 配置theme主题色

   ```js
   {
       "theme": {
             "@primary-color": "pink"
         }
   }
   ```

3. 将主题色单独提取到js文件中
   src/theme.js

   ```js
   export default {
       "@primary-color": "pink"
   }
   ```

   在.webpackrc配置文件中引入使用theme.js

   ```js
   {
       "theme": "./src/theme.js"
   }
   ```

4. 重启项目