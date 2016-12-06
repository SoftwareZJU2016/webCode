var express = require('express');

var User = require('../models/user');
var Topic = require('../models/topic');
var Link = require('../models/link');

var router = express.Router();

var viewDir = 'bbs/';

router.use((req, res, next) => {
    if (!req.session.userType || req.session.userType == 'V') {
        req.session.message = '请先登录！';
        res.redirect('/login');
    } else
        next();
})

router.route('/')
    .get((req, res, next) => {
        var courseID = req.session.courseID,
            type = req.session.userType;
        Topic.getAll(courseID, (_topics) => {
            Link.get(courseID, (_links) => {
                res.render(viewDir+'index', {
                    userType: type,
                    topics: _topics,
                    links: _links
                });
            });
        });
    })

router.route('/topic/:id')
    .get((req, res, next) => {
        var topicID = req.params.id,
            type = req.session.userType,
            courseID = req.session.courseID;
        Topic.getByID(topicID, (_topic) => {
            Topic.getReply(topicID, (_replys) => {
                Link.get(courseID, (_links) => {
                    res.render(viewDir+'topic', {
                        userType: type,
                        topic: _topic,
                        replys: _replys,
                        links: _links
                    });
                });
            });
        });
    })
    .post((req, res, next) => {
        
    })

router.route('/post')
    .get((req, res, next) => {
        var courseID = req.session.courseID;
        Link.get(courseID, (_links) => {
            res.render(viewDir+'post', {
                userType: req.session.userType,
                links: _links
            });
        })
    })
    .post((req, res, next) => {
        //
    })

module.exports = router;