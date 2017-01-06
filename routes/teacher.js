var express = require('express');
var multer  = require('multer');
var Link = require('../models/link');
var User = require('../models/user');
var Course = require('../models/course');
var Teacher = require('../models/teacher');
var File = require('../models/file');
var Class = require('../models/class');
var Message = require('../models/message');
var Homework = require('../models/homework');

var router = express.Router();
var viewDir = 'teacher/';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        var array = file.originalname.split('.');
        var name = array.slice(0, array.length-1);
        if (array.length == 1)
            cb(null, file.originalname + '-' + Date.now());
        else {
            cb(null, name.join() + '-' + Date.now() + '.' + array[array.length-1]);
        }    
    }
})
var upload = multer({ storage: storage });

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
                    Class.getTeaClass(req.session.userID, req.session.courseID, classes => {
                        res.locals.classes = classes;
                        next();
                    })
                });
            }); 
        } else {
            next();
        }
    }
});

router.route('/classIntroduction')
    .get((req, res, next) => {
        var courseID = req.session.courseID;
        Course.get(courseID, function (course_info) {
            res.render(viewDir+'classIntroduction', {
                links: res.locals.links,
                classes: res.locals.classes,
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
            Course.updateClassPlan(courseID, content, function (success) {
                if(success){
                    res.json({
                        code: 1,
                        msg: '教学日历更新成功',
                        body: {}
                    })
                }else{
                    res.json({
                        code: 0,
                        msg: '教学日历更新失败',
                        body: {}
                    })
                }
            })
        }else if(edit_id == 3){
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
        }else if(edit_id == 4){
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
        }else if(edit_id == 5){
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
        }else if(edit_id == 6){
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
        }else if(edit_id == 7){
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
        File.getClassFiles(req.session.courseID, classFiles => {
            File.getCourseFiles(req.session.courseID, courseFiles => {
                var refmtl = [], goodhomework = [], media = [];
                courseFiles.forEach((e, i) => {
                    switch (e.type) {
                        case '1':
                            refmtl.push(e); break;
                        case '2':
                            goodhomework.push(e); break;
                        case '3':
                            media.push(e); break;
                    }
                });
                res.render(viewDir+'courseResource', {
                    classes: res.locals.classes,
                    slides: classFiles,
                    refmtl: refmtl,
                    goodhomework: goodhomework,
                    media: media,
                    links: res.locals.links
                });
            })
        })
    })

router.post('/courseResource/upload', upload.single('file'), (req, res, next) => {
    File.add(req.session.userID, req.file.originalname, req.file.path, req.file.size, fileID => {
        if (!fileID) {
            res.json({
                code: 0,
                msg: '课程资料更新失败',
                body: {}
            })
        } else if (req.body.type != 0) {
            Course.addFile(fileID, req.session.courseID, req.body.type, success => {
                res.json({
                    code: success ? 1 : 0,
                    msg: '课程资料更新'+ (success ? '成功' : '失败'),
                    body: {}
                })
            })
        } else {
            Class.addFile(fileID, req.session.courseID, success => {
                res.json({
                    code: success ? 1 : 0,
                    msg: '班级资料更新'+ (success ? '成功' : '失败'),
                    body: {}
                })
            })
        }
    });
})

router.post('/courseResource/delete', (req, res, next) => {
    File.delete(req.body.fileID, (success) => {
        res.json({
            code: success ? 1 : 0,
            msg: '文件删除' + (success ? '成功' : '失败'),
            body: {}
        })
    })
})

router.route('/guide')
    .get((req, res, next) => {
        res.render(viewDir+'guide', {
            links: res.locals.links
        });
    })

router.route('/homework/:classID/list')
    .get((req, res, next) => {
        var section = (res.locals.classes.find(e => {
            return e.id == req.params.classID;
        })).section;
        Homework.getClassHomework(req.params.classID, homeworks => {
            res.render(viewDir+'homework', {
                classID: req.params.classID,
                section: section,
                classes: res.locals.classes,
                homeworks: homeworks,
                links: res.locals.links
            });
        })
    })
    .post(upload.single('file'), (req, res, next) => {
        File.add(req.session.userID, req.file.originalname, req.file.path, req.file.size, fileID => {        
            Homework.add(req.params.classID, req.session.userID, req.body.dueTime, req.body.title, req.body.content, fileID, success => {
                res.json({
                    code: success ? 1 : 0,
                    msg: '作业发布' + (success ? '成功' : '失败'),
                    body: {}
                })
            });
        })
    })

router.route('/homework/:classID/correct')
    .get((req, res, next) => {
        var section = (res.locals.classes.find(e => {
            return e.id == req.params.classID;
        })).section;
        Homework.getClassHomework(req.params.classID, homeworks => {
            Homework.getClassAllSubmit(req.params.classID, submits => {
                homeworks.forEach(e => {
                    e.submitNum = 0;
                    submits.forEach(_e => {
                        if (_e.id == e.id)
                            e.submitNum++;
                    });
                });
                res.render(viewDir+'homework_correct', {
                    section: section,
                    homeworks: homeworks,
                    classes: res.locals.classes,
                    links: res.locals.links
                });
            })
        })
        
    })

router.route('/homework/:classID/correct/:hwID')
    .get((req, res, next) => {
        var section = (res.locals.classes.find(e => {
            return e.id == req.params.classID;
        })).section;
        Homework.getClassSubmitHomework(req.params.classID, req.params.hwID, homeworks => {
            res.render(viewDir+'homework_submit', {
                section: section,
                homeworks: homeworks,
                classes: res.locals.classes,
                links: res.locals.links
            });
        })
    })
    .post((req, res, next) => {
        if (req.body.dl) { 
            File.getByID(req.body.fileID, file => {
                res.download(file.filepath, file.name);
            });
        } else {
            Homework.correct(req.params.hwID, req.body.stuID, req.body.score, req.body.comment, success => {
                res.json({
                    code: success ? 1 : 0,
                    msg: '作业批改' + (success ? '成功' : '失败'),
                    body: {}
                })
            })
        }
    })

router.route('/homework/:classID/duplicate')
    .get((req, res, next) => {
        res.render(viewDir+'homework_duplicate', {
            classes: res.locals.classes,
            links: res.locals.links
        });
    })

router.route('/others_addlink')
    .get((req, res, next) => {
        res.render(viewDir+'others_addlink', {
            links: res.locals.links
        });
    })

router.route('/others_link')
    .get((req, res, next) => {
        res.render(viewDir+'others_link', {
            classes: res.locals.classes,
            links: res.locals.links,
        });
    })
    .post((req, res, next) => {
        if (req.body.op == 'add') {
            Link.add(req.session.courseID, req.body.content, req.body.url, success => {
                res.json({
                    code: success ? 1 : 0,
                    msg: '添加链接' + (success ? '成功' : '失败'),
                    body: {}
                })
            })
        } else if (req.body.op == 'del') {
            Link.delete(req.body.id, success => {
                res.json({
                    code: success ? 1 : 0,
                    msg: '删除链接' + (success ? '成功' : '失败'),
                    body: {}
                })
            })
        }
    })

router.route('/others_info')
    .get((req, res, next) => {
        res.render(viewDir+'others_info', {
            classes: res.locals.classes,
            links: res.locals.links
        });
    })
    .post((req, res, next) => {
        var courseID = null;
        var classID = req.body.classID == '' ? null : req.body.classID;
        var reciever = req.body.reciever == '' ? null : req.body.reciever;
        if (classID == null && reciever == null)
            courseID = req.session.courseID;
        Message.add(courseID, classID, reciever, req.session.userID, req.body.title, req.body.content, success => {
            res.json({
                code: success ? 1 : 0,
                msg: '信息发送' + (success ? '成功' : '失败'),
                body: {}
            });
        })
    })

router.route('/others_info_succeed')
    .get((req, res, next) => {
        res.render(viewDir+'others_info_succeed', {
            links: res.locals.links
        });
    })

router.route('/teacherIntroduction')
    .get((req, res, next) => {
        Teacher.getByID(req.session.userID, teacher => {
            res.render(viewDir+'teacherIntroduction', {
                name: req.session.username,
                intro: teacher.intro,
                style: teacher.style,
                previous: teacher.previous_teaching,
                research: teacher.research,
                book: teacher.book,
                honor: teacher.honor,
                classes: res.locals.classes,
                links: res.locals.links
            });
        })
    })
    .post((req, res, next) => {
        var teacherID = req.session.userID;
        var edit_id = req.body.edit_id;
        var content = req.body.content;
        Teacher.update(teacherID, edit_id, content, function (success) {
            if(success){
                res.json({
                    code: 1,
                    msg: '教师信息更新成功',
                    body: {}
                })
            } else {
                res.json({
                    code: 0,
                    msg: '教师信息更新失败',
                    body: {}
                })
            }
        })
    })

module.exports = router;