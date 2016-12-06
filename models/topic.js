var pool = require('./index');

var Topic = {};

Topic.getAll = (courseID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return;
        }
        var query = 'SELECT * from topic WHERE course_id = ?';
        connection.query(query, [courseID], (err, results, fields) => {
            if (err) {
                console.log(err);
                results = [];
            }
            connection.release();
            callback(results);
        });
    })
};

Topic.getByID = (topicID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return;
        }
        var query = 'SELECT * FROM topic WHERE id = ? ORDER BY reply_time';
        connection.query(query, [topicID], (err, results, fields) => {
            if (err) {
                console.log(err);
                results = [];
            }
            callback(results[0]);
            connection.release();
        });
    });
};

Topic.getReply = (topicID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return;
        }
        var query = 'SELECT * FROM topic_reply WHERE topic_id = ?';
        connection.query(query, [topicID], (err, results, fields) => {
            if (err) {
                console.log(err);
                results = [];
            }
            connection.release();
            callback(results);
        })
    })
}

module.exports = Topic;