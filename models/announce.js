var pool = require('./index');

var Announce = {};

Announce.getByID = (annoID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'SELECT * FROM announce WHERE id = ?';
        connection.query(query, [annoID], (err, results, fields) => {
            if (err) { 
                console.log(err);
                results[0] = null;
            }
            connection.release();
            callback(results[0]);
        });
    });
}

module.exports = Announce;