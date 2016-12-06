var express = require('express');

var router = express.Router();
var viewDir = 'teacher/';

/* 检测登录 */
router.use((req, res, next) => {
    if (!req.session.user) {
        req.session.message = '请先登录';
        res.redirect('/login');
    } else if (req.session.userType != 'T' || req.session.userType != 'A') {
        req.session.message = '请先以教师身份登录';
        res.redirect('/login');
    } else
        next();
});

router.route('/BBS')
    .get((req, res, next) => {
        res.render(viewDir+'BBS', {
            //
        });
    })

router.route('/BBS_article')
    .get((req, res, next) => {
        res.render(viewDir+'BBS_article', {
            //
        });
    })

router.route('/BBS_post')
    .get((req, res, next) => {
        res.render(viewDir+'BBS_post', {
            //
        });
    })

router.route('/classIntroduction')
    .get((req, res, next) => {
        res.render(viewDir+'classIntroduction', {
            //
        });
    })

router.route('/classIntroduction_for_visitor')
    .get((req, res, next) => {
        res.render(viewDir+'classIntroduction_for_visitor', {
            //
        });
    })

router.route('/courseResource')
    .get((req, res, next) => {
        res.render(viewDir+'courseResource', {
            //
        });
    })

router.route('/courseResource_goodhomework')
    .get((req, res, next) => {
        res.render(viewDir+'courseResource_goodhomework', {
            //
        });
    })

router.route('/courseResource_referencematerial')
    .get((req, res, next) => {
        res.render(viewDir+'courseResource_referencematerial', {
            //
        });
    })

router.route('/courseResource_video')
    .get((req, res, next) => {
        res.render(viewDir+'courseResource_video', {
            //
        });
    })

router.route('/guide')
    .get((req, res, next) => {
        res.render(viewDir+'guide', {
            //
        });
    })

router.route('/homework')
    .get((req, res, next) => {
        res.render(viewDir+'homework', {
            //
        });
    })

router.route('/homework_assign_addNew')
    .get((req, res, next) => {
        res.render(viewDir+'homework_assign_addNew', {
            //
        });
    })

router.route('/homework_correct')
    .get((req, res, next) => {
        res.render(viewDir+'homework_correct', {
            //
        });
    })

router.route('/homework_duplicate')
    .get((req, res, next) => {
        res.render(viewDir+'homework_duplicate', {
            //
        });
    })

router.route('/others_addlink')
    .get((req, res, next) => {
        res.render(viewDir+'others_addlink', {
            //
        });
    })

router.route('/others_info')
    .get((req, res, next) => {
        res.render(viewDir+'others_info', {
            //
        });
    })

router.route('/others_info_succeed')
    .get((req, res, next) => {
        res.render(viewDir+'others_info_succeed', {
            //
        });
    })

router.route('/link')
    .get((req, res, next) => {
        res.render(viewDir+'link', {
            //
        });
    })

router.route('/teacherIntroduction')
    .get((req, res, next) => {
        res.render(viewDir+'teacherIntroduction', {
            //
        });
    })

router.route('/teacherIntroduction_for_visitor')
    .get((req, res, next) => {
        res.render(viewDir+'teacherIntroduction_for_visitor', {
            //
        });
    })

module.exports = router;