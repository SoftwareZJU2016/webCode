var pool = require('./index');

var Class = {};

Class.getByID = (classID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'SELECT * FROM class WHERE id = ?';
        connection.query(query, [classID], (err, results, fields) => {
            if (err) { 
                console.log(err);
                results[0] = null;
            }
            connection.release();
            callback(results[0]);
        });
    });
}

module.exports = Class;