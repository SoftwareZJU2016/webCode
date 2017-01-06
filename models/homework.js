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

Homework.submit = (hwID, stuID, fileID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'INSERT INTO submit_homework(hw_id, stu_id, file_id, submit_time) \
                     VALUES (?, ?, ?, NOW())';
        connection.query(query, [hwID, stuID, fileID], (err, results, fields) => {
            if (err) { 
                console.log(err);
            }
            callback(results.affectedRows != 0 ? true : false);
            connection.release();
        });
    });
}

Homework.delete = (hwID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'DELETE FROM homework WHERE id = ? ';
        connection.query(query, [hwID], (err, results, fields) => {
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

        var query = 'SELECT * FROM file, homework WHERE homework.class_id = ? \
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
        connection.query(query, [classID, hwID], (err, results, fields) => {
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
                     AND homework.class_id = ? AND submit_homework.stu_id = ?';
        connection.query(query, [classID, stuID], (err, results, fields) => {
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

Homework.correct = (hwID, stuID, score, comment, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'UPDATE submit_homework SET score = ?, comment = ? \
                     WHERE hw_id = ? AND stu_id = ?';
        connection.query(query, [score, comment, hwID, stuID], (err, results, fields) => {
            if (err) {
                console.log(err);
                results = {};
            }
            callback(!results.affectedRows ? false : true);
            connection.release();
        });
    });
}

module.exports = Homework;