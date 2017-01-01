var pool = require('./index');

var Message = {}

//获得某学生在某门课程下所有消息
Message.getAll = function (studentID, classID, courseID, callback) {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'SELECT * FROM message WHERE reciever_id = ? and class_id = ? and course_id = ? ORDER BY post_time DESC';
        connection.query(query, [studentID, classID, courseID], (err, results, fields) => {
            if (err) {
                console.log(err);
                results = null;
            }
            connection.release();
            callback(results);
        });
    });
}

Message.getByID = function (messageID, callback) {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'SELECT * FROM message WHERE id = ?';
        connection.query(query, [messageID], (err, results, fields) => {
            if (err) {
                console.log(err);
                results = null;
            }
            connection.release();
            callback(results[0]);
        });
    });
}

Message.add = (courseID, classID, recieverID, creatorID, title, content, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);
        var query = 'INSERT INTO message VALUES (0, ?, ?, ?, ?, ?, ?, NOW())';
        connection.query(query, [creatorID, recieverID, classID, courseID, title, content], (err, results, fields) => {
            if (err) {
                console.log(err);
                results = null;
            }
            connection.release();
            callback(results.affectedRows == 0 ? false : true);
        });
    });
}

module.exports = Message;