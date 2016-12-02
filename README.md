# SE SYSTEM(暂定..)
## 环境搭建
1. 下载安装git
1. 去官网下载安装 nodejs（装LTS版本吧
1. 找一个合适的地方放项目...
    ```
    git clone https://github.com/ZJU-SRE/...
    ```
1. 进入项目目录（有package.json的目录
1. 用nodejs的软件包管理器npm下载项目需要的依赖（这里为了加速从阿里提供的镜像站下载）
    ```
    npm install --registry=https://registry.npm.taobao.org
    ```
1. 运行
    ```
    npm run dev
    ```
1. 访问htpp://localhost:3000/
1. 开启mysql服务（mysqld)，配置mysql（其实就是执行data.sql
    ```
    mysql -h localhost -u root -p < data.sql的路径
    ```

## 前端
### `views`目录
用模板引擎[pug](https://pugjs.org)定义页面结构，其中的变量由后端填充，后端渲染完会自动返回html

前端可以通过表单和后端交换数据，表单提交的方式会放弃本页面，所以页面会刷新

可以查看 http://localhost:3000/login 或者 views/login.pug 感受一下

### `public`目录
放网站中用到的css，js（别忘了在模板里引入

前端也可以通过js写ajax请求和后端交换数据，页面可以不刷新

js/main.js里有个例子

用到的库可以是[jquery](http://jquery.com/)，也可以直接写原生js

## 后端
### `models`目录
操作数据库，返回数据，和`router`目录下的内容有比较大的关系

用到的库是[mysqljs](https://github.com/mysqljs/mysql)

### `routes`目录
写明当收到前端对某个路径发起ajax请求时后端的行为（可能需要利用`models`目录下的函数从数据库得到数据

当前端以表单方式提交请求时或者get请求时，**通常**要返回渲染好的页面html

以ajax方式提交请求时，可以返回json等数据

用到的框架是[express](https://expressjs.com)


#### 劝退
（感觉学习成本太高的话还是换成php，jsp之类的吧0 0
