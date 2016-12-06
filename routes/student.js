var express = require('express');

var router = express.Router();
var viewDir = 'student/';

/* check login */
router.use((req, res, next) => {
    if (!req.session.user) {
        req.session.message = '请先登录';
        res.redirect('/login');
    } else if (req.session.userType == 'V') {
        req.session.message = '请先以学生身份登录';
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

router.route('/inbox')
    .get((req, res, next) => {
        res.render(viewDir+'inbox', {
            //
        });
    })

router.route('/inbox_detail')
    .get((req, res, next) => {
        res.render(viewDir+'inbox_detail', {
            //
        });
    })

router.route('/teacherIntroduction')
    .get((req, res, next) => {
        res.render(viewDir+'teacherIntroduction', {
            //
        });
    })

module.exports = router;