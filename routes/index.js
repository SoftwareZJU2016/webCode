var express = require('express');

var User = require('../models/user');
var router = express.Router();

router.route('/')
    .get(checkLogin)
    .get((req, res, next) => {
        if (req.session.userType == 'A')
            res.redirect('/admin/visitorFeedback');
        else if (req.session.userType == 'T')
            res.redirect('/teacher/classIntroduction');
        else if (req.session.userType == 'S')
            res.redirect('/student/classIntroduction');
        else
            res.redirect('/visitor/classIntroduction');
    })

/* user login */
router.route('/login')
    .get((req, res, next) => {
        if (req.session.userID) {
            req.session.message = '已经登录';
            res.redirect('/');
        }
        else {
            res.render('login', {
                //
            });
        }
    })
    .post((req, res, next) => {
        var userID = req.body.userID,
            password = req.body.password,
            type = req.body.type,
            courseID = req.body.courseID;
        User.getByIDAndType(userID, type, (user) => {
            if (!user) {
                res.json({
                    code: 0,
                    msg: '用户名不存在',
                    body: {}
                });
            } else {
                if (password != user.password) {
                    res.json({
                        code: 0,
                        msg: '用户名或密码错误',
                        body: {}
                    });
                } else {
                    req.session.userID = user.id;
                    req.session.username = user.name;
                    req.session.userType = user.type;
                    req.session.courseID = courseID;
                    res.json({
                        code: 1,
                        msg: '登录成功',
                        body: {
                            name: user.name,
                            type: user.type
                        }
                    });
                }
            }
        });        
    })

router.route('/logout')
    .get((req, res, next) => {
        req.session.userID = null;
        req.session.userType = null;
        req.session.courseID = null;
        req.session.username = null;
        res.redirect('/login');
    })

/* 测试一下文件比如静态页面的发送 */
router.route('/hello')
    .get((req, res, next) => {
        var options = {
            root: './views/',
            dotfiles: 'deny'
        };
        res.sendFile('index.html', options, err => {
            console.log(err);
        });
    })

/* 检测登录辅助函数 */
function checkLogin(req, res, next) {
    if (!req.session.userID) {
        req.session.message = '请先登录';
        res.redirect('/login');
    } else
        next();
}

module.exports = router;