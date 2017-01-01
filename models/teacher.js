var pool = require('./index');

var Teacher = {};

Teacher.getByID = (teaID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'SELECT * FROM teacher WHERE tea_id = ?';
        connection.query(query, [teaID], (err, results, fields) => {
            if (err) {
                console.log(err);
                results[0] = null;
            }
            connection.release();
            callback(results[0]);
        });
    });
}

Teacher.update = (teacherID, index, content, callback) => {
    switch (index) {
        case '1':
            Teacher.updateTeacherIntro(teacherID, content, callback);
            break;
        case '2':
            Teacher.updateTeacherStyle(teacherID, content, callback);
            break;
        case '3':
            Teacher.updateTeacherPre(teacherID, content, callback);
        case '4':
            Teacher.updateTeacherResearch(teacherID, content, callback);
            break;
        case '5':
            Teacher.updateTeacherBook(teacherID, content, callback);
            break;
        case '6':
            Teacher.updateTeacherHonor(teacherID, content, callback);
            break;
    }
}

/*根据教师id更新 教师模块 总体介绍*/
Teacher.updateTeacherIntro = function (teacherID, content, callback) {
    pool.getConnection(function (err, connection) {
        if (err) console.log(err);

        var query = 'UPDATE teacher SET intro = ? WHERE tea_id = ?';
        connection.query(query, [content, teacherID], (err, results, fields) => {
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

/*根据教师id更新 教师模块 教学风格*/
Teacher.updateTeacherStyle = function (teacherID, content, callback) {
    pool.getConnection(function (err, connection) {
        if (err) console.log(err);

        var query = 'UPDATE teacher SET style = ? WHERE tea_id = ?';
        connection.query(query, [content, teacherID], (err, results, fields) => {
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

/*根据教师id更新 教师模块 以往教学*/
Teacher.updateTeacherPre = function (teacherID, content, callback) {
    pool.getConnection(function (err, connection) {
        if (err) console.log(err);

        var query = 'UPDATE teacher SET previous_teaching = ? WHERE tea_id = ?';
        connection.query(query, [content, teacherID], (err, results, fields) => {
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

/*根据教师id更新 教师模块 科研成果*/
Teacher.updateTeacherResearch = function (teacherID, content, callback) {
    pool.getConnection(function (err, connection) {
        if (err) console.log(err);

        var query = 'UPDATE teacher SET research = ? WHERE tea_id = ?';
        connection.query(query, [content, teacherID], (err, results, fields) => {
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

/*根据教师id更新 教师模块 出版图书*/
Teacher.updateTeacherBook = function (teacherID, content, callback) {
    pool.getConnection(function (err, connection) {
        if (err) console.log(err);

        var query = 'UPDATE teacher SET book = ? WHERE tea_id = ?';
        connection.query(query, [content, teacherID], (err, results, fields) => {
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

/*根据教师id更新 教师模块 所获荣誉*/
Teacher.updateTeacherHonor = function (teacherID, content, callback) {
    pool.getConnection(function (err, connection) {
        if (err) console.log(err);

        var query = 'UPDATE teacher SET honor = ? WHERE tea_id = ?';
        connection.query(query, [content, teacherID], (err, results, fields) => {
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

module.exports = Teacher;