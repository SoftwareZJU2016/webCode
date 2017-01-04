var express = require('express');
var Link = require('../models/link');
var User = require('../models/user');
var Feedback = require('../models/feedback');

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
    .post(function (req, res, next) {
        var title = req.body.title,
            content = req.body.content,
            contact = req.body.contact,
            type = req.body.type;
        
        Feedback.add(title, content, contact, type, function (success) {
            if(success){
                res.json({
                    code: 1,
                    msg: '插入成功',
                    body: {}
                })
            }else{
                res.json({
                    code: 0,
                    msg: '插入反馈失败',
                    body: {}
                })
            }
        })

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