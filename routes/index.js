var express = require('express');

var router = express.Router();

/* index page */
router.route('/')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render('index', { title: 'Hey', message: 'Hello there!!' });
    })

/* 测试一下文件比如静态页面的发送 */
router.route('/hello')
    .get((req, res) => {
        var options = {
            root: './views/',
            dotfiles: 'deny'
        };
        res.sendFile('index.html', options, err => {
            console.log(err);
        });
    })

/* user login */
router.route('/login')
    .get((req, res, next) => {
        if (req.session.user) {
            req.session.message = '已经登录';
            res.redirect('/');
        }
        else {
            res.render('login', {
                title: '测试数据',
                lalala: 'Hello',
                test: [
                    {
                        a: 'aa',
                        b: 'bb',
                        c: 'cc'
                    },
                    {
                        a: 'aaa',
                        b: 'bbb',
                        c: 'ccc'
                    }
                ]
            });
        }
    })
    .post((req, res, next) => {
        var user_id = req.body.id,
            password = req.body.password;
        User.getInfo(user_id, (err, user) => {
            if (err) console.log(err);
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
                    req.session.user = user.id;
                    res.json({
                        code: 1,
                        msg: '登录成功',
                        body: {}
                    });
                }
            }
        });
    })

router.route('/login/form_way')
    .post((req, res, next) => {
        var user_id = req.body._id,
            password = req.body._password;
        User.getInfo(user_id, (err, user) => {
            if (err) console.log(err);
            if (!user) {
                res.render('login', {
                    msg: '用户不存在',
                    title: '测试数据',
                    lalala: 'Hello',
                    test: [
                        {
                            a: 'aa',
                            b: 'bb',
                            c: 'cc'
                        },
                        {
                            a: 'aaa',
                            b: 'bbb',
                            c: 'ccc'
                        }
                    ]
                });
            } else {
                if (password != user.password) {
                    res.render('login', {
                        msg: '密码错误',
                        title: '测试数据',
                        lalala: 'Hello',
                        test: [
                            {
                                a: 'aa',
                                b: 'bb',
                                c: 'cc'
                            },
                            {
                                a: 'aaa',
                                b: 'bbb',
                                c: 'ccc'
                            }
                        ]
                    });
                } else {
                    req.session.user = user.id;
                    res.redirect('/');
                }
            }
        });
    })
/* 检测登录辅助函数 */
function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.session.message = '请先登录';
        res.redirect('/login');
    } else
        next();
}

module.exports = router;