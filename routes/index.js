var express = require('express');

var router = express.Router();
require('./login.js')(router);

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

/* 检测登录辅助函数 */
function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.session.message = '请先登录';
        res.redirect('/login');
    } else
        next();
}

module.exports = router;