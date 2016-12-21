var express = require('express');
var Link = require('../models/link');
var User = require('../models/user');
var Course = require('../models/course')
var Teacher = require('../models/teacher')

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
        Course.get(req.session.courseID, function (course_info) {
            res.render(viewDir+'classIntroduction', {
                links: res.locals.links,
                courses: res.locals.courses,
                description: course_info.description,
                plan: course_info.plan,
                background: course_info.background,
                assess: course_info.assess,
                textbook: course_info.textbook,
                homework: course_info.homework_intro,
                basic: course_info.basic_request,
            });
        });

    })

//error
router.route('/teacherIntroduction')
    .get((req, res, next) => {
        Teacher.getByID(req.session.teacherid, function (teacher_info) {
            res.render(viewDir+'teacherIntroduction', {
                links: res.locals.links,
                courses: res.locals.courses,
                intro: teacher_info.intro,
                style: teacher_info.style,
                previous: teacher_info.previous_teaching,
                research: teacher_info.research,
                book: teacher_info.book,
                honor: teacher_info.honor,
            });
        })
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

router.route('/courseResource')
    .get((req, res, next) => {
        res.render(viewDir+'courseResource', {
            links: res.locals.links,
            courses: res.locals.courses
        });
    })

module.exports = router;