var pool = require('./index');

var Topic = {};

Topic.getByID = (topicID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'SELECT * FROM course WHERE id = ?';
        connection.query(query, [topicID], (err, results, fields) => {
            if (err) { 
                console.log(err);
                results[0] = null;
            }
            connection.release();
            callback(results[0]);
        });
    });
};

Topic.getReply = (topicID) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'SELECT * FROM topic_reply WHERE topic_id = ?';
        connection.query(query, [topicID], (err, results, fields) => {
            if (err) {
                console.log(err);
                results[0] = null;
            }
            connection.release();
            callback(results);
        })
    })
}

module.exports = Course;