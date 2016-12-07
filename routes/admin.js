var express = require('express');

var Topic = require('../models/topic');
var Link = require('../models/link');

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
                next();
            });
        } else
            next();
    }
});

router.route('/guide')
    .get((req, res, next) => {
        var courseID = req.session.courseID;
        res.render(viewDir+'guide', {
            links: res.locals.links
        });
    })

router.route('/visitorFeedback')
    .get((req, res, next) => {
        var courseID = req.session.courseID;
        res.render(viewDir+'visitorFeedback', {
            links: res.locals.links
        });
    })

router.route('/visitorFeedback_detail')
    .get((req, res, next) => {
        var courseID = req.session.courseID;
        res.render(viewDir+'visitorFeedback_detail', {
            links: res.locals.links
        });
    })

router.route('/websiteGuide')
    .get((req, res, next) => {
        var courseID = req.session.courseID;
        res.render(viewDir+'websiteGuide', {
            links: res.locals.links
        });
    })

module.exports = router;