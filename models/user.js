var pool = require('./index');

var User = {};

User.getByIDAndType = (userID, userType, callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return;
        }
        var query = 'SELECT * FROM user WHERE id = ? and type = ?';
        connection.query(query, [userID, userType], (err, results, fields) => {
            if (err) { 
                console.log(err);
                results[0] = null;
            }
            connection.release();
            callback(results[0]);
        });
    });
};

User.getCourse = (userID, userType, callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return;
        }
        if (userType == 'S' || userType == 'T') {
            var query = 'SELECT course.id, title FROM course, user_class, class \
                    WHERE class.id = user_class.class_id AND class.course_id = course.id AND user_class.user_id = ?';
        } else {
            var query = 'SELECT id, title FROM course';
        }
        connection.query(query, [userID], (err, results, fields) => {
            if (err) {
                console.log(err);
                results = [];
            }
            callback(results);
            connection.release();
        })
    })
}

/*学生获得他选取的这门课的class_id*/
User.GetClass = (userID, userType, courseID, callback) =>{
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return;
        }

        var sql = 'SELECT * FROM user_class WHERE user_id = ? and course_id = ? and user_type = ?';
        connection.query(sql, [userID, courseID, userType], (err, results, fields) => {
            if (err) {
                console.log(err);
                results = [];
            }
            callback(results[0]);
            connection.release();
        })

    })
}

/*学生获得他选取的这门课的老师的id*/
User.studentGetTeacher = (courseID, classID, callback) =>{
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return;
        }
        var sql = 'SELECT * FROM user_class, user WHERE course_id = ? and class_id = ? and user_type = ? and user_class.user_id = user.id';
        connection.query(sql, [courseID, classID, "T"], (err, results, fields) => {
            if (err) {
                console.log(err);
                return ;
            }
            callback(results);
            connection.release();
        })

    })
}



module.exports = User;