var pool = require('./index');

var Link = {};

Link.get = (courseID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return;
        }
        var query = 'SELECT * FROM link WHERE course_id = ?';
        connection.query(query, [courseID], (err, results, fields) => {
            if (err) { 
                console.log(err);
                results = [];
            }
            connection.release();
            callback(results);
        });
    });
}

module.exports = Link;