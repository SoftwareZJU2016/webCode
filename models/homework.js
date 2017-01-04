var pool = require('./index');

var Homework = {};

Homework.getByID = (hwID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'SELECT * FROM homework WHERE id = ?';
        connection.query(query, [hwID], (err, results, fields) => {
            if (err) { 
                console.log(err);
                results[0] = null;
            }
            connection.release();
            callback(results[0]);
        });
    });
}

Homework.add = (classID, userID, dueTime, title, content, fileID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'INSERT INTO homework(class_id, creator_id, post_time, due_time, title, content, file_id) \
                     VALUES (?, ?, NOW(), ?, ?, ?, ?)';
        connection.query(query, [classID, userID, dueTime, title, content, fileID], (err, results, fields) => {
            if (err) { 
                console.log(err);
            }
            callback(results.affectedRows != 0 ? true : false);
            connection.release();
        });
    });
}

Homework.delete = (classID, userID, dueTime, title, content, fileID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'INSERT INTO homework(class_id, creator_id, post_time, due_time, title, content, file_id) \
                     VALUES (?, ?, NOW(), ?, ?, ?, ?)';
        connection.query(query, [classID, userID, dueTime, title, content, fileID], (err, results, fields) => {
            if (err) { 
                console.log(err);
            }
            callback(results.affectedRows != 0 ? true : false);
            connection.release();
        });
    });
}

Homework.getClassHomework = (classID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'SELECT * FROM homework, file WHERE homework.class_id = ? \
                    and homework.file_id = file.id';
        connection.query(query, [classID], (err, results, fields) => {
            if (err) {
                console.log(err);
                results = [];
            }
            connection.release();
            callback(results);
        });
    });
}

/* 返回一个班级内一个作业的全部提交 */
Homework.getClassSubmitHomework = (classID, hwID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'SELECT * FROM homework, submit_homework, file WHERE homework.id = submit_homework.hw_id AND file.id = submit_homework.file_id\
                     AND homework.class_id = ? AND submit_homework.hw_id = ?';
        connection.query(query, [classID, hwID, hwID], (err, results, fields) => {
            if (err) {
                console.log(err);
                results = [];
            }
            callback(results);
            connection.release();
        });
    });
}

/* 返回一个学生在一个班级内所有上交的作业 */
Homework.getStuAllSubmit = (classID, stuID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'SELECT * FROM homework, submit_homework, file WHERE homework.id = submit_homework.hw_id AND submit_homework.file_id = file.id \
                     AND homework.class_id = ? AND submit_homework.stu_id = ? AND homework.id = ?';
        connection.query(query, [classID, stuID, hwID], (err, results, fields) => {
            if (err) {
                console.log(err);
                results = [];
            }
            callback(results);
            connection.release();
        });
    });
}

/* 返回在一个班级内所有上交的作业 */
Homework.getClassAllSubmit = (classID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'SELECT * FROM homework, submit_homework WHERE homework.id = submit_homework.hw_id \
                     AND homework.class_id = ?';
        connection.query(query, [classID], (err, results, fields) => {
            if (err) {
                console.log(err);
                results = [];
            }
            callback(results);
            connection.release();
        });
    });
}

module.exports = Homework;