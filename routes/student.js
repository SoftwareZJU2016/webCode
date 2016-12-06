var express = require('express');

var router = express.Router();
var viewDir = 'student/';

router.route('/BBS')
    //.get(checkLogin)
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

router.route('/classIntroduction')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'classIntroduction', {
            //
        });
    })

router.route('/courseResource')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'courseResource', {
            //
        });
    })

router.route('/courseResource_goodhomework')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'courseResource_goodhomework', {
            //
        });
    })

router.route('/courseResource_referencematerial')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'courseResource_referencematerial', {
            //
        });
    })

router.route('/courseResource_video')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'courseResource_video', {
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

router.route('/homework')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'homework', {
            //
        });
    })

router.route('/inbox')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'inbox', {
            //
        });
    })

router.route('/inbox_detail')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'inbox_detail', {
            //
        });
    })

router.route('/teacherIntroduction')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'teacherIntroduction', {
            //
        });
    })

/* 检测登录辅助函数 */
function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.session.message = '请先登录';
        res.redirect('/login');
    } else if (req.session.userType == 'V') {
        req.session.message = '请先以学生身份登录';
        res.redirect('/login');
    } else
        next();
}

module.exports = router;