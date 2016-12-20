var pool = require('./index');

var Feedback = {};

/*根据id得到一条反馈信息*/
Feedback.get = (feedbackID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'SELECT * FROM feedbackID WHERE id = ?';
        connection.query(query, [feedbackID], (err, results, fields) => {
            if (err) { 
                console.log(err);
                results[0] = null;
            }
            connection.release();
            callback(results[0]);
        });
    });
}

/*按照最近更新时间，得出反馈列表*/
Feedback.getAll = (callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'SELECT * FROM feedback ORDER BY post_time DESC';
        connection.query(query, (err, results, fields) => {
            if (err) { 
                console.log(err);
                results = [];
            }
            connection.release();
            callback(results);
        });
    });
}

/*插入反馈，若没留联系方式则contact=""*/
Feedback.add = function (title, content, contact) {
    pool.getConnection(function (err, connection) {
        if (err) console.log(err);

        var query = 'insert into feedback(title, content, post_time, contact) values (?, ?, ?, ?);';
        //js传递现在的时间进数据库
        connection.query(query, [title, content, new Date(), contact], function(err, results, fields){
            if (err) {
                console.log(err);
            }
            if(connection.affectedRows == 0){
                callback(false);
            }else{
                callback(true);
            }
            connection.release();
        });
    })
}

/*已阅读*/
Feedback.deal = function (feedbackID, callback) {
    pool.getConnection(function(err, connection){
        if (err) console.log(err);

        var query = 'UPDATE feedback SET status = 1 WHERE id = ?';
        connection.query(query, [feedbackID], function(err, results, fields){
            if (err) {
                console.log(err);
            }
            if(connection.affectedRows == 0){
                callback(false);
            }else{
                callback(true);
            }
            connection.release();
        });
    });
}

module.exports = Feedback;