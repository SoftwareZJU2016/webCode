var express = require('express');

var router = express.Router();
var viewDir = 'visitor/';

router.route('/classIntroduction')
    .get((req, res, next) => {
        res.render(viewDir+'classIntroduction', {
            //
        });
    })

router.route('/courseResource')
    .get((req, res, next) => {
        res.render(viewDir+'courseResource', {
            //
        });
    })

router.route('/courseResource_goodhomework')
    .get((req, res, next) => {
        res.render(viewDir+'courseResource_goodhomework', {
            //
        });
    })

router.route('/courseResource_referencematerial')
    .get((req, res, next) => {
        res.render(viewDir+'courseResource_referencematerial', {
            //
        });
    })

router.route('/courseResource_video')
    .get((req, res, next) => {
        res.render(viewDir+'courseResource_video', {
            //
        });
    })

router.route('/feedback')
    .get((req, res, next) => {
        res.render(viewDir+'feedback', {
            //
        });
    })

router.route('/feedback_succeed')
    .get((req, res, next) => {
        res.render(viewDir+'feedback_succeed', {
            //
        });
    })

router.route('/guide')
    .get((req, res, next) => {
        res.render(viewDir+'guide', {
            //
        });
    })

router.route('/teacherIntroduction')
    .get((req, res, next) => {
        res.render(viewDir+'teacherIntroduction', {
            //
        });
    })

module.exports = router;