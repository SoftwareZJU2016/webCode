var pool = require('./index');

var File = {};

File.getByID = (fileID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'SELECT * FROM file WHERE id = ?';
        connection.query(query, [fileID], (err, results, fields) => {
            if (err) { 
                console.log(err);
                results[0] = null;
            }
            connection.release();
            callback(results[0]);
        });
    });
}

module.exports = File;