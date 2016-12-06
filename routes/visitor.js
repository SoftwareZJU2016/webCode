var express = require('express');

var router = express.Router();
var viewDir = 'visitor/';

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

router.route('/feedback')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'feedback', {
            //
        });
    })

router.route('/feedback_succeed')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'feedback_succeed', {
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
    } else
        next();
}

module.exports = router;