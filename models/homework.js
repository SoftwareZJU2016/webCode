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

module.exports = Homework;