var express = require('express');
var multer  = require('multer');
var Link = require('../models/link');
var User = require('../models/user');
var Course = require('../models/course')
var Teacher = require('../models/teacher')
var Message = require('../models/message')
var File = require('../models/file')
var Homework = require('../models/homework')

var router = express.Router();
var viewDir = 'student/';
var abosoluteDir = "/Users/crcrcry/Documents/Git/Software-zju/webCode/";

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
                    User.studentGetTeacher(req.session.courseID, req.session.classid, function(teachers) {
                        res.locals.teachers = teachers;
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
        Course.get(req.session.courseID, function (course_info) {
            res.render(viewDir+'classIntroduction', {
                links: res.locals.links,
                courses: res.locals.courses,
                teachers: res.locals.teachers,
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
router.route('/teacherIntroduction/:id')
    .get((req, res, next) => {
        Teacher.getByID(req.params.id, function (teacher_info) {
            res.render(viewDir+'teacherIntroduction', {
                links: res.locals.links,
                courses: res.locals.courses,
                teachers: res.locals.teachers,
                name: teacher_info.name,
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
            courses: res.locals.courses,
            teachers: res.locals.teachers,
        });
    })

router.route('/courseResource_referencematerial')
    .get((req, res, next) => {
        res.render(viewDir+'courseResource_referencematerial', {
            links: res.locals.links,
            courses: res.locals.courses,
            teachers: res.locals.teachers,
        });
    })

router.route('/courseResource_video')
    .get((req, res, next) => {
        res.render(viewDir+'courseResource_video', {
            links: res.locals.links,
            courses: res.locals.courses,
            teachers: res.locals.teachers,
        });
    })

router.route('/guide')
    .get((req, res, next) => {
        res.render(viewDir+'guide', {
            links: res.locals.links,
            courses: res.locals.courses,
            teachers: res.locals.teachers,
        });
    })

router.route('/homework')
    .get((req, res, next) => {
        Homework.getClassHomework(req.session.classid, homeworks => {
            Homework.getStuAllSubmit(req.session.classid, req.session.userID, submits => {
                homeworks.forEach(e => {
                    var submit = submits.find(_e => {
                        return _e.hw_id == e.id
                    });
                    e.status = submit ? '已提交' : '未提交';
                    e.score = submit ? submit.score : -1;
                    e.comment = submit ? submit.comment : '';
                })
                res.render(viewDir+'homework', {
                    classes: res.locals.classes,
                    homeworks: homeworks,
                    teachers: res.locals.teachers,
                    courses: res.locals.courses,
                    links: res.locals.links
                });
            })
        });
    })
    .post(upload.single('file'), (req, res, next) => {
        File.add(req.session.userID, req.file.originalname, req.file.path, req.file.size, fileID => {
            if (!fileID) {
                res.json({
                    code: 0,
                    msg: '提交作业失败',
                    body: {}
                });
                return;
            }
            Homework.submit(req.body.hwID, req.session.userID, fileID, success => {
                res.json({
                    code: success ? 1 : 0,
                    msg: '作业提交' + (success ? '成功' : '失败'),
                    body: {}
                });
            });
        });
    })

router.route('/inbox')
    .get((req, res, next) => {
        Message.getAll(req.session.userID, req.session.classid, req.session.courseID, function (message) {
            res.render(viewDir+'inbox', {
                links: res.locals.links,
                courses: res.locals.courses,
                teachers: res.locals.teachers,
                messages: message,
            });
        })
    })

router.route('/inbox/:id')
    .get((req, res, next) => {
        var messageID = req.params.id;
        Message.getByID(messageID, function (message) {
            res.render(viewDir+'inbox_detail', {
                links: res.locals.links,
                courses: res.locals.courses,
                teachers: res.locals.teachers,
                message: message
            });
        })
    })

router.route('/courseResource')
    .get((req, res, next) => {
        File.getClassFiles(req.session.classid, function (resources) {
            res.render(viewDir+'courseResource', {
                links: res.locals.links,
                courses: res.locals.courses,
				teachers: res.locals.teachers,
                resources: resources
            });
        })
    })

//文件预览
router.route('/view/:id')
    .get(function (req, res, next) {
        var fileID = req.params.id;

        //例子：res.redirect("/test.pdf"); 注意：可以预览public/test.pdf，注意redirect中/不可省，也不是\
        File.getByID(fileID, function (file) {
            var filepath = file.filepath.substr(7);
            res.redirect(filepath);
        })

    })

//文件下载
router.route('/download/:id')
    .get(function (req, res, next) {
        var fileID = req.params.id;

        //例子：res.download(abosoluteDir+"/public/test.pdf", "mytest.pdf", function (err){});
        File.getByID(fileID, function (file) {
            res.download(abosoluteDir+file.filepath, file.name, function (err) {
                if(err){
                    //未处理
                }
            })
        })
    })


module.exports = router;