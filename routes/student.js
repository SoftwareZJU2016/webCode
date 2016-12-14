var express = require('express');
var Link = require('../models/link');
var User = require('../models/user');

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
                User.getCourse(req.session.userID, req.session.userType, (courses) => {
                    res.locals.courses = courses;
                    next();
                });
            }); 
        } else {
            next();
        }
    }
});

router.route('/classIntroduction')
    .get((req, res, next) => {
        res.render(viewDir+'classIntroduction', {
            links: res.locals.links,
            courses: res.locals.courses
        });
    })

router.route('/courseResource')
    .get((req, res, next) => {
        res.render(viewDir+'courseResource', {
            links: res.locals.links,
            courses: res.locals.courses
        });
    })

router.route('/courseResource_goodhomework')
    .get((req, res, next) => {
        res.render(viewDir+'courseResource_goodhomework', {
            links: res.locals.links,
            courses: res.locals.courses
        });
    })

router.route('/courseResource_referencematerial')
    .get((req, res, next) => {
        res.render(viewDir+'courseResource_referencematerial', {
            links: res.locals.links,
            courses: res.locals.courses
        });
    })

router.route('/courseResource_video')
    .get((req, res, next) => {
        res.render(viewDir+'courseResource_video', {
            links: res.locals.links,
            courses: res.locals.courses
        });
    })

router.route('/guide')
    .get((req, res, next) => {
        res.render(viewDir+'guide', {
            links: res.locals.links,
            courses: res.locals.courses
        });
    })

router.route('/homework')
    .get((req, res, next) => {
        res.render(viewDir+'homework', {
            links: res.locals.links,
            courses: res.locals.courses
        });
    })

router.route('/inbox')
    .get((req, res, next) => {
        res.render(viewDir+'inbox', {
            links: res.locals.links,
            courses: res.locals.courses
        });
    })

router.route('/inbox_detail')
    .get((req, res, next) => {
        res.render(viewDir+'inbox_detail', {
            links: res.locals.links,
            courses: res.locals.courses
        });
    })

router.route('/teacherIntroduction')
    .get((req, res, next) => {
        res.render(viewDir+'teacherIntroduction', {
            links: res.locals.links,
            courses: res.locals.courses
        });
    })

module.exports = router;