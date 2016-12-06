var express = require('express');

var router = express.Router();
var viewDir = 'admin/';

router.route('/BBS')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'BBS', {
            //
        });
    })

router.route('/BBS_article')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'BBS_article', {
            //
        });
    })

router.route('/BBS_post')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'BBS_post', {
            //
        });
    })

router.route('/guide')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'guide', {
            //
        });
    })

router.route('/visitorFeedback')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'visitorFeedback', {
            //
        });
    })

router.route('/visitorFeedback_detail')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'visitorFeedback_detail', {
            //
        });
    })

router.route('/websiteGuide')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'websiteGuide', {
            //
        });
    })

/* 检测登录辅助函数 */
function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.session.message = '请先登录';
        res.redirect('/login');
    } else if (req.session.userType != 'A') {
        req.session.message = '请先以管理员身份登录';
        res.redirect('/login');
    } else
        next();
}

module.exports = router;