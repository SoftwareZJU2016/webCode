# SE SYSTEM(暂定..)
## 环境搭建
+ 下载安装git
+ 去官网下载安装 nodejs（装LTS版本吧
+ 找一个合适的地方放项目...
```
git clone https://github.com/SoftwareZJU2016/webCode.git
```
+ 进入项目目录（有package.json的目录
+ 用nodejs的软件包管理器npm下载项目需要的依赖（这里为了加速从阿里提供的镜像站下载）
```
npm install --registry=https://registry.npm.taobao.org
```
+ 运行
```
npm run dev
```
+ 访问http://localhost:3000/
+ 开启mysql服务（mysqld)，配置mysql（其实就是执行data.sql
```
mysql -h localhost -u root -p < data.sql的路径
```
如果之后发现data.sql更新了最好重新执行一次

## 前端
### `views`目录
用模板引擎[pug](https://pugjs.org)定义页面结构，其中的变量由后端填充，后端渲染完会自动返回html

前端可以通过表单和后端交换数据，表单提交的方式会放弃本页面，所以页面会刷新

<p style="text-decoration: line-through">可以查看 http://localhost:3000/login 或者 views/login.pug 感受一下</p>
（感受个P直接上手写吧

### `public`目录
放网站中用到的css，js（别忘了在模板里引入

前端也可以通过js写ajax请求和后端交换数据，页面可以不刷新

<p style="text-decoration: line-through">js/main.js里有个例子</p>


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

**登录后在req中有下列数据可以用**
+ req.session.userID
+ req.session.userType
+ req.session.courseID
+ req.session.username

#### 劝退
<p style="text-decoration: line-through">（感觉学习成本太高的话还是换成php，jsp之类的吧0 0</p>
（退个P我都写这么多了0 0
