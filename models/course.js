var pool = require('./index');

var Course = {};

Course.getByID((courseID, callback) => {
    pool.getConnection((err, connection) => {
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
});

module.exports = Course;