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

## 分锅
后端每个人都写一部分model和route，最好不要动别人负责的文件

## views/route部分
要做的事
+ 在模板里为动态数据布局（其实一般是由前端做的。。
+ 定义各页面路由行为

模板参考views/bbs/里我写好的部分，也可以看[pug](https://pugjs.org)的文档

可以参考我写的bbs.js部分，里面有一些注释

上传文件，插入图片相关的功能以及其他感觉比较复杂的功能可以晚一点写

文本编辑器先用textarea代替，参考bbs发帖/回帖部分

如果需要用到别人还没写好的model功能就先编一个，通知一下对方需要什么API，等对方写好了替换掉

**登录后在req对象里有下列数据可以用**
+ req.session.userID
+ req.session.userType
+ req.session.courseID
+ req.session.username
+ req.session.classid：表示一个学生在选择课程登陆后，他所在班级的id
+ req.session.teacherid：表示一个学生在选择课程登陆后，他所在班级的老师的id
（session这里假设一个班一个老师？没想好session这里，软管这种一个班多个老师的情况怎么搞，
而且前端好像也没考虑一个班多个老师的情况，但是数据库中表定义是可以实现一个班多个老师的）

**CR: student部分，bbs部分**

**YP: admin部分，visitor部分**

**YWM：teacher部分**

### student 
10个页面左右

有些页面感觉可以合并。。反正写的人看着办吧0 0

### teacher 
18个页面左右

有些页面感觉可以合并。。反正写的人看着办吧0 0

### admin
4个页面，查看游客反馈的页面似乎写好

### visitor
9个页面，一些页面可能可以合并

### bbs
基本功能里还有管理员删除帖子和置顶的功能没做，置顶功能需要改数据库设计

## models部分
1. 可以参考我写的topic.js部分，里面有一点注释
2. 按data.sql里的表定义写，觉得数据库有问题就改，改的时候通知一下

**YP: announce, class, course**

**CR: link, teacher, topic，feedback**

**YWM: file, homework, message, user**

### annouce.js
定义通知数据的操作

### class.js
定义班级数据的操作

### course.js
定义课程数据的操作

### file.js
定义文件数据的操作

### homework.js
定义作业数据的操作

### link.js
定义友情链接数据的操作

### teacher.js
定义教师数据的操作

### topic.js
定义帖子数据的操作

### user.js
定义用户数据的操作

### feedback.js
- 定义游客反馈数据的操作
- 反馈类型对应数据库里字符'0'、'1'、'2'、'3',插入反馈的时候注意一下调用函数

### message.js
定义私信数据的操作