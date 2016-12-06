var express = require('express');

var Topic  = require('../models/topic');

var router = express.Router();
var viewDir = 'admin/';

/* 检测登录 */
router.use((req, res, next) => {
    if (!req.session.userID) {
        req.session.message = '请先登录';
        res.redirect('/login');
    } else if (req.session.userType != 'A') {
        req.session.message = '请先以管理员身份登录';
        res.redirect('/login');
    } else
        next();
});

router.route('/guide')
    .get((req, res, next) => {
        res.render(viewDir+'guide', {
            //
        });
    })

router.route('/visitorFeedback')
    .get((req, res, next) => {
        res.render(viewDir+'visitorFeedback', {
            //
        });
    })

router.route('/visitorFeedback_detail')
    .get((req, res, next) => {
        res.render(viewDir+'visitorFeedback_detail', {
            //
        });
    })

router.route('/websiteGuide')
    .get((req, res, next) => {
        res.render(viewDir+'websiteGuide', {
            //
        });
    })

module.exports = router;