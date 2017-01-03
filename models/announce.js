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

Announce.add = (creator_id, title, content, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'INSERT INTO announce(creator_id, post_time, title, content) \
                     VALUES(?, NOW(), ?, ?)';
        connection.query(query, [creator_id, title, content], (err, results, fields) => {
            if (err) { 
                console.log(err);
                results = null;
            }
            callback(results.affectedRows == 0 ? false : true);
            connection.release();
        });
    });
}
//得到最近的announce
Announce.getRecentRecord = (creator_id, callback) => {
 pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'SELECT title, content, max(post_time) FROM announce WHERE creator_id = ?';
        connection.query(query, [creator_id], (err, results, fields) => {
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