var pool = require('./index');

var User = {};

User.getByIDAndType = (userID, userType, callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return;
        }
        var query = 'SELECT * FROM user WHERE id = ? and type = ?';
        connection.query(query, [userID, userType], (err, results, fields) => {
            if (err) { 
                console.log(err);
                results[0] = null;
            }
            connection.release();
            callback(results[0]);
        });
    });
};

module.exports = User;