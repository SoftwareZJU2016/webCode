var pool = require('./index');

var Course = {};

Course.get = function(courseID, callback){
    pool.getConnection(function(err, connection){
        if (err) console.log(err);

        var query = 'SELECT * FROM course WHERE id = ?';
        connection.query(query, [courseID], (err, results, fields) => {
            if (err) { 
                console.log(err);
                results[0] = null;
            }
            connection.release();
            callback(results[0]);
        });
    });
};

/*根据课程id更新 课程模块 课程简介*/
Course.updateClassDescription = function (courseID, content, callback) {
    pool.getConnection(function (err, connection) {
        if (err) console.log(err);

        var query = 'UPDATE course SET description = ? WHERE id = ?';
        connection.query(query, [content, courseID], (err, results, fields) => {
            if (err) {
                console.log(err);
            }
            if(results.affectedRows == 0){
                callback(false);
            }else{
                callback(true);
            }
            connection.release();
        });
    })
}

/*根据课程id更新 课程模块 教学日历*/
Course.updateClassPlan = function (courseID, content, callback) {
    pool.getConnection(function (err, connection) {
        if (err) console.log(err);

        var query = 'UPDATE course SET plan = ? WHERE id = ?';
        connection.query(query, [content, courseID], (err, results, fields) => {
            if (err) {
                console.log(err);
            }
            if(results.affectedRows == 0){
                callback(false);
            }else{
                callback(true);
            }
            connection.release();
        });
    })
}

/*根据课程id更新 课程模块 教学背景*/
Course.updateClassBackground = function (courseID, content, callback) {
    pool.getConnection(function (err, connection) {
        if (err) console.log(err);

        var query = 'UPDATE course SET background = ? WHERE id = ?';
        connection.query(query, [content, courseID], (err, results, fields) => {
            if (err) {
                console.log(err);
            }
            if(results.affectedRows == 0){
                callback(false);
            }else{
                callback(true);
            }
            connection.release();
        });
    })
}

/*根据课程id更新 课程模块 考核方式*/
Course.updateClassAssess = function (courseID, content, callback) {
    pool.getConnection(function (err, connection) {
        if (err) console.log(err);

        var query = 'UPDATE course SET assess = ? WHERE id = ?';
        connection.query(query, [content, courseID], (err, results, fields) => {
            if (err) {
                console.log(err);
            }
            if(results.affectedRows == 0){
                callback(false);
            }else{
                callback(true);
            }
            connection.release();
        });
    })
}

/*根据课程id更新 课程模块 使用教材*/
Course.updateClassTextbook = function (courseID, content, callback) {
    pool.getConnection(function (err, connection) {
        if (err) console.log(err);

        var query = 'UPDATE course SET textbook = ? WHERE id = ?';
        connection.query(query, [content, courseID], (err, results, fields) => {
            if (err) {
                console.log(err);
            }
            if(results.affectedRows == 0){
                callback(false);
            }else{
                callback(true);
            }
            connection.release();
        });
    })
}

/*根据课程id更新 课程模块 大作业介绍*/
Course.updateClassHomework = function (courseID, content, callback) {
    pool.getConnection(function (err, connection) {
        if (err) console.log(err);

        var query = 'UPDATE course SET homework_intro = ? WHERE id = ?';
        connection.query(query, [content, courseID], (err, results, fields) => {
            if (err) {
                console.log(err);
            }
            if(results.affectedRows == 0){
                callback(false);
            }else{
                callback(true);
            }
            connection.release();
        });
    })
}

/*根据课程id更新 课程模块 基础要求*/
Course.updateClassBasicRequest = function (courseID, content, callback) {
    pool.getConnection(function (err, connection) {
        if (err) console.log(err);

        var query = 'UPDATE course SET basic_request = ? WHERE id = ?';
        connection.query(query, [content, courseID], (err, results, fields) => {
            if (err) {
                console.log(err);
            }
            if(results.affectedRows == 0){
                callback(false);
            }else{
                callback(true);
            }
            connection.release();
        });
    })
}

Course.addFile = (fileID, courseID, type, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'INSERT INTO file_course(file_id, course_id, type) \
                     VALUES(?, ?, ?)';
        connection.query(query, [fileID, courseID, type], (err, results, fields) => {
            if (err) { 
                console.log(err);
            }
            callback(results.affectedRows == 0 ? false : true);
            connection.release();
        });
    });
}

module.exports = Course;