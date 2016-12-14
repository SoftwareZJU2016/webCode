var express = require('express');
var Link = require('../models/link');

var router = express.Router();
var viewDir = 'visitor/';

router.use((req, res, next) => {
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
});

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

router.route('/feedback')
    .get((req, res, next) => {
        res.render(viewDir+'feedback', {
            links: res.locals.links
        });
    })

router.route('/feedback_succeed')
    .get((req, res, next) => {
        res.render(viewDir+'feedback_succeed', {
            links: res.locals.links
        });
    })

router.route('/guide')
    .get((req, res, next) => {
        res.render(viewDir+'guide', {
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