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

module.exports = Teacher;