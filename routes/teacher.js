var express = require('express');
var Link = require('../models/link');
var User = require('../models/user');
var Course = require('../models/course')

var router = express.Router();
var viewDir = 'teacher/';

/* 检测登录 */
router.use((req, res, next) => {
    if (!req.session.userID) {
        req.session.message = '请先登录';
        res.redirect('/login');
    } else if (req.session.userType != 'T' && req.session.userType != 'A') {
        req.session.message = '请先以教师身份登录';
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
        var courseID = req.session.courseID;
        Course.get(courseID, function (course_info) {
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
    .post((req, res, next) => {
        var courseID = req.session.courseID;
        var edit_id = req.body.edit_id;
        var content = req.body.content;

        if(edit_id == 1){
            Course.updateClassDescription(courseID, content, function (success) {
                if(success){
                    res.json({
                        code: 1,
                        msg: '课程简介更新成功',
                        body: {}
                    })
                }else{
                    res.json({
                        code: 0,
                        msg: '课程简介更新失败',
                        body: {}
                    })
                }
            })
        }else if(edit_id == 2){
            Course.updateClassBackground(courseID, content, function (success) {
                if(success){
                    res.json({
                        code: 1,
                        msg: '教学背景更新成功',
                        body: {}
                    })
                }else{
                    res.json({
                        code: 0,
                        msg: '教学背景更新失败',
                        body: {}
                    })
                }
            })
        }else if(edit_id == 3){
            Course.updateClassAssess(courseID, content, function (success) {
                if(success){
                    res.json({
                        code: 1,
                        msg: '考核方式更新成功',
                        body: {}
                    })
                }else{
                    res.json({
                        code: 0,
                        msg: '考核方式更新失败',
                        body: {}
                    })
                }
            })
        }else if(edit_id == 4){
            Course.updateClassTextbook(courseID, content, function (success) {
                if(success){
                    res.json({
                        code: 1,
                        msg: '使用教材更新成功',
                        body: {}
                    })
                }else{
                    res.json({
                        code: 0,
                        msg: '使用教材更新失败',
                        body: {}
                    })
                }
            })
        }else if(edit_id == 5){
            Course.updateClassHomework(courseID, content, function (success) {
                if(success){
                    res.json({
                        code: 1,
                        msg: '大作业介绍更新成功',
                        body: {}
                    })
                }else{
                    res.json({
                        code: 0,
                        msg: '大作业介绍更新失败',
                        body: {}
                    })
                }
            })
        }else if(edit_id == 6){
            Course.updateClassBasicRequest(courseID, content, function (success) {
                if(success){
                    res.json({
                        code: 1,
                        msg: '基础要求更新成功',
                        body: {}
                    })
                }else{
                    res.json({
                        code: 0,
                        msg: '基础要求更新失败',
                        body: {}
                    })
                }
            })
        }
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

router.route('/homework_assign_addNew')
    .get((req, res, next) => {
        res.render(viewDir+'homework_assign_addNew', {
            links: res.locals.links
        });
    })

router.route('/homework_correct')
    .get((req, res, next) => {
        res.render(viewDir+'homework_correct', {
            links: res.locals.links
        });
    })

router.route('/homework_duplicate')
    .get((req, res, next) => {
        res.render(viewDir+'homework_duplicate', {
            links: res.locals.links
        });
    })

router.route('/others_addlink')
    .get((req, res, next) => {
        res.render(viewDir+'others_addlink', {
            links: res.locals.links
        });
    })

router.route('/others_info')
    .get((req, res, next) => {
        res.render(viewDir+'others_info', {
            links: res.locals.links
        });
    })

router.route('/others_info_succeed')
    .get((req, res, next) => {
        res.render(viewDir+'others_info_succeed', {
            links: res.locals.links
        });
    })

router.route('/link')
    .get((req, res, next) => {
        res.render(viewDir+'link', {
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