var express = require('express');

var User = require('../models/user');
var Topic = require('../models/topic');
var Link = require('../models/link');
var Class = require('../models/class');

var router = express.Router();

var viewDir = 'bbs/';

/* 中间件 检测登录以及获取友链数据*/
/* (req, res, next) => {...} js箭头函数 相当于一个匿名函数：function(req, res, next) {...} */
/* 箭头函数最好不要在前端用，因为比较新，一些老浏览器不支持 */
router.use((req, res, next) => {
    //从http request的session中获取数据
    if (!req.session.userType || req.session.userType == 'V') {
        req.session.message = '请先登录！';
        res.redirect('/login'); //将http response设置成重定向
    } else {
        if (req.method == 'GET') { //get访问的页面都需要获取友链数据
            Link.get(req.session.courseID, (links) => {
                res.locals.links = links; //（res.locals比较特殊，在中间件里用于给后续操作传递数据
                //js的函数执行是异步的 
                //为了保证执行next()时courses信息是已经拿到的，把next()放在获取course函数的回调函数里执行
                User.getCourse(req.session.userID, req.session.userType, (courses) => {
                    res.locals.courses = courses; 
                    if (req.session.userType == 'S') {
                        User.studentGetTeacher(req.session.courseID, req.session.classid, function(teachers) {
                            res.locals.teachers = teachers;
                            next();
                        })
                    } else if (req.session.userType == 'T') {
                        Class.getTeaClass(req.session.userID, req.session.courseID, classes => {
                            res.locals.classes = classes;
                            next();
                        })
                    } else {
                        next(); //由于没有设置过res（上面那行不算），所以还可以继续操作，用next函数express会去找下一个与请求匹配的路由操作
                    }//如果设置过HTTP response的值比如使用res.render(), res.json()
                    //express就会把res返回到客户端(HTML或者JSON字符串），后端就不能接着操作了
                });
            }); 
        } else {
            next();
        }
    }
});

router.route('/') //对/bbs首页的http请求
    .get((req, res, next) => { //如果是get请求
        var courseID = req.session.courseID,
            type = req.session.userType;
        //调用models目录下写好的数据库相关函数获取帖子信息（一定要用回调的形式，因为查询数据库是异步操作
        Topic.getAll(courseID, function(_topics){
            res.render(viewDir+'index',  //将http response设置为渲染views/bbs/index.pug得到的HTML
                { //第二个参数是一个对象，里面是填充到模板里的数据
                    courses: res.locals.courses,
                    teachers: res.locals.teachers,
                    userType: type, 
                    topics: _topics,
                    links: res.locals.links
                }
            );
        });
    })


router.route('/topic/:id') // 对/bbs/topic/1这种链接的http请求，:id表示参数，用req.params.id可以获取到值
    .get((req, res, next) => {
        var topicID = req.params.id, //获取到url里的帖子ID
            type = req.session.userType,
            courseID = req.session.courseID;
        Topic.getByID(topicID, function(_topic){ 
            if (!_topic) {
                res.status(404).send('404 Not Found');
                return;
            }
            Topic.getReply(topicID, function(_replys){
                res.render(viewDir+'topic', {
                    courses: res.locals.courses,
                    teachers: res.locals.teachers,
                    userType: type,
                    topic: _topic,
                    replys: _replys,
                    links: res.locals.links
                });
            });
        });
    })
    .post((req, res, next) => { //如果是post请求
        var data = {};
        data.topicID = req.params.id;
        data.creatorID = req.session.userID;
        data.content = req.body.content;
        data.anonymity = req.body.anonymity;
        Topic.addReply(data, (_replyID) => {
            if (_replyID) {
                //这里把HTTP response设置成一种格式化字符串（json），
                //前端发起ajax请求后会拿到这个json，而不是一个整个页面的HTML，就可以比较自由的操作了
                res.json({ 
                    code: 1,
                    msg: '回复成功',
                    body: {
                        replyID: _replyID 
                    }
                });
            } else {
                res.json({
                    code: 0,
                    msg: '回复失败',
                    body: {}
                });
            }
        });
    })

router.route('/topic/delete')
    .post((req, res, next) => {
        var topicID = req.body.topicID;
        Topic.delete(topicID, (result) => {
            if (result) {
                res.json({
                    code: 1,
                    msg: '删帖成功',
                    body: {}
                });
            } else {
                res.json({
                    code: 0,
                    msg: '删帖失败',
                    body: {}
                });
            }
        })
    })

router.route('/post')
    .get((req, res, next) => {
        var courseID = req.session.courseID;
        res.render(viewDir+'post', {
            userType: req.session.userType,
            teachers: res.locals.teachers,
            links: res.locals.links
        });
    })
    .post((req, res, next) => {
        var data = {};
        data.creatorID = req.session.userID;
        data.courseID = req.session.courseID;
        data.title = req.body.title;
        data.content = req.body.content;
        data.anonymity = req.body.anonymity;
        Topic.add(data, (_topicID) => {
            if (_topicID) 
                res.json({
                    code: 1,
                    msg: '新帖发表成功',
                    body: {
                        topicID: _topicID 
                    }
                });
            else
                res.json({
                    code: 0,
                    msg: '新帖发表失败',
                    body: {}
                });
        });
    })

module.exports = router;