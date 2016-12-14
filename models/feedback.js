var pool = require('./index');

var Feedback = {};

Feedback.get = (feedbackID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'SELECT * FROM feedbackID WHERE id = ?';
        connection.query(query, [feedbackID], (err, results, fields) => {
            if (err) { 
                console.log(err);
                results[0] = null;
            }
            connection.release();
            callback(results[0]);
        });
    });
}

Feedback.getAll = (callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'SELECT * FROM feedback';
        connection.query(query, (err, results, fields) => {
            if (err) { 
                console.log(err);
                results = [];
            }
            connection.release();
            callback(results);
        });
    });
}

module.exports = Feedback;