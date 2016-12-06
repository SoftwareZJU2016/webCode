var pool = require('./index');

var User = {};

User.getInfo = (username, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'SELECT * FROM user WHERE id = ?';
        connection.query(query, [username], (err, results, fields) => {
            if (err) { 
                callback(err, user);
                return;
            }
            user = results[0];
            connection.release();
            callback(err, user); /*!!! 回调函数！！**/
        });
    });
};

module.exports = User;