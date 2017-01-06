var pool = require('./index');

var Feedback = {};

/*根据id得到一条反馈信息，反馈类型得到的是正确的文本内容*/
Feedback.get = (feedbackID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'SELECT * FROM feedback WHERE id = ?';
        connection.query(query, [feedbackID], (err, results, fields) => {
            if (err) { 
                console.log(err);
                results[0] = null;
            }
            if(results[0].type == "0"){
                results[0].type = "其他";
            }else if(results[0].type == "1"){
                results[0].type = "网站界面";
            }else if(results[0].type == "2"){
                results[0].type = "网站内容";
            }else if(results[0].type == "3"){
                results[0].type = "教学安排";
            }
            connection.release();
            callback(results[0]);
        });
    });
}

/*按照最近更新时间，得出反馈列表，反馈类型得到的是正确的文本内容*/
Feedback.getAll = (callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'SELECT * FROM feedback ORDER BY post_time DESC';
        connection.query(query, (err, results, fields) => {
            if (err) { 
                console.log(err);
                results = [];
            }
            for(i = 0; i < results.length; i++){
                if(results[i].type == "0"){
                    results[i].type = "其他";
                }else if(results[i].type == "1"){
                    results[i].type = "网站界面";
                }else if(results[0].type == "2"){
                    results[i].type = "网站内容";
                }else if(results[i].type == "3"){
                    results[i].type = "教学安排";
                }
            }
            connection.release();
            callback(results);
        });
    });
}

/*插入反馈，若没留联系方式则contact=""，type请传入数字而不是字符串*/
Feedback.add = function (title, content, contact, type, callback) {
    pool.getConnection(function (err, connection) {
        if (err) console.log(err);

        var query = 'insert into feedback(title, content, post_time, contact, type) values (?, ?, ?, ?, ?);';
        //js传递现在的时间进数据库
        connection.query(query, [title, content, new Date(), contact, type], function(err, results, fields){
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