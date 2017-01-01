var pool = require('./index');

var Class = {};
module.exports = Class;

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

Class.addFile = (fileID, classID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'INSERT INTO file_class(file_id, class_id) \
                     VALUES(?, ?)';
        connection.query(query, [fileID, classID], (err, results, fields) => {
            if (err) { 
                console.log(err);
            }
            callback(results.affectedRows == 0 ? false : true);
            connection.release();
        });
    });
}