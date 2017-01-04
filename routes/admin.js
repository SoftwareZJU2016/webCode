var express = require('express');

var Topic = require('../models/topic');
var Link = require('../models/link');
var Feedback = require('../models/feedback');
var User = require('../models/user');

var router = express.Router();
var viewDir = 'admin/';

/* 中间件 检测登录以及获取友链数据*/
router.use((req, res, next) => {
    if (!req.session.userID) {
        req.session.message = '请先登录';
        res.redirect('/login');
    } else if (req.session.userType != 'A') {
        req.session.message = '请先以管理员身份登录';
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
        } else
            next();
    }
});

router.route('/guide')
    .get((req, res, next) => {
        var courseID = req.session.courseID;
        res.render(viewDir+'guide', {
            links: res.locals.links,
            courses: res.locals.courses
        });
    })

router.route('/visitorFeedback')
    .get((req, res, next) => {
        var courseID = req.session.courseID;
        Feedback.getAll((_feedbacks) => {
            res.render(viewDir+'visitorFeedback', {
                feedbacks: _feedbacks,
                links: res.locals.links,
                courses: res.locals.courses
            });
        });
    })

router.route('/visitorFeedback/:id')
    .get((req, res, next) => {
        var feedbackID = req.params.id;
        Feedback.get(feedbackID, (_feedback) => {
            if (!_feedback) {
                res.status(404).send('404 Not Found');
                return;
            }
            res.render(viewDir+'visitorFeedback_detail', {
                feedback: _feedback,
                links: res.locals.links,
                courses: res.locals.courses
            });
        });
    })
    .post(function (req, res, next) {
        var id = req.params.id;
        Feedback.deal(id, function (success) {
            if(success){
                res.json({
                    code: 1,
                    body: {}
                })
            }else{
                res.json({
                    code: 0,
                    body: {}
                })
            }

        })
    })

router.route('/websiteGuide')
    .get((req, res, next) => {
        var courseID = req.session.courseID;
        res.render(viewDir+'websiteGuide', {
            links: res.locals.links,
            courses: res.locals.courses
        });
    })

module.exports = router;