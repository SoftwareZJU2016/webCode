var express = require('express');

var router = express.Router();
var viewDir = 'teacher/';

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

router.route('/classIntroduction')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'classIntroduction', {
            //
        });
    })

router.route('/classIntroduction_for_visitor')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'classIntroduction_for_visitor', {
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

router.route('/homework_assign_addNew')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'homework_assign_addNew', {
            //
        });
    })

router.route('/homework_correct')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'homework_correct', {
            //
        });
    })

router.route('/homework_duplicate')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'homework_duplicate', {
            //
        });
    })

router.route('/others_addlink')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'others_addlink', {
            //
        });
    })

router.route('/others_info')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'others_info', {
            //
        });
    })

router.route('/others_info_succeed')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'others_info_succeed', {
            //
        });
    })

router.route('/link')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'link', {
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

router.route('/teacherIntroduction_for_visitor')
    .get(checkLogin)
    .get((req, res, next) => {
        res.render(viewDir+'teacherIntroduction_for_visitor', {
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