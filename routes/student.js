var express = require('express');
var Link = require('../models/link');

var router = express.Router();
var viewDir = 'student/';

/* check login */
router.use((req, res, next) => {
    if (!req.session.userID) {
        req.session.message = '请先登录';
        res.redirect('/login');
    } else if (req.session.userType == 'V') {
        req.session.message = '请先以学生身份登录';
        res.redirect('/login');
    } else {
        if (req.method == 'GET') {
            Link.get(req.session.courseID, (links) => {
                res.locals.links = links;
                next();
            })
        } else {
            next();
        }
    }
});

router.route('/BBS')
    .get((req, res, next) => {
        res.render(viewDir+'BBS', {
            links: res.locals.links
        });
    })

router.route('/BBS_article')
    .get((req, res, next) => {
        res.render(viewDir+'BBS_article', {
            links: res.locals.links
        });
    })

router.route('/BBS_post')
    .get((req, res, next) => {
        res.render(viewDir+'BBS_post', {
            links: res.locals.links
        });
    })

router.route('/classIntroduction')
    .get((req, res, next) => {
        res.render(viewDir+'classIntroduction', {
            links: res.locals.links
        });
    })

router.route('/courseResource')
    .get((req, res, next) => {
        res.render(viewDir+'courseResource', {
            links: res.locals.links
        });
    })

router.route('/courseResource_goodhomework')
    .get((req, res, next) => {
        res.render(viewDir+'courseResource_goodhomework', {
            links: res.locals.links
        });
    })

router.route('/courseResource_referencematerial')
    .get((req, res, next) => {
        res.render(viewDir+'courseResource_referencematerial', {
            links: res.locals.links
        });
    })

router.route('/courseResource_video')
    .get((req, res, next) => {
        res.render(viewDir+'courseResource_video', {
            links: res.locals.links
        });
    })

router.route('/guide')
    .get((req, res, next) => {
        res.render(viewDir+'guide', {
            links: res.locals.links
        });
    })

router.route('/homework')
    .get((req, res, next) => {
        res.render(viewDir+'homework', {
            links: res.locals.links
        });
    })

router.route('/inbox')
    .get((req, res, next) => {
        res.render(viewDir+'inbox', {
            links: res.locals.links
        });
    })

router.route('/inbox_detail')
    .get((req, res, next) => {
        res.render(viewDir+'inbox_detail', {
            links: res.locals.links
        });
    })

router.route('/teacherIntroduction')
    .get((req, res, next) => {
        res.render(viewDir+'teacherIntroduction', {
            links: res.locals.links
        });
    })

module.exports = router;