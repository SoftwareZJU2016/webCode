var pool = require('./index');

var Link = {};

/*得到一门课的所有友情链接*/
Link.get = (courseID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return;
        }
        var query = 'SELECT * FROM link WHERE course_id = ?';
    connection.query(query, [courseID], (err, results, fields) => {
        if (err) {
            console.log(err);
            results = [];
        }
        connection.release();
    callback(results);
});
});
}

/*更新一门课的某个友情链接的内容*/
Link.updateName = function (courseID, name, url, callback) {
    pool.getConnection(function (err, connection) {
        if(err) {
            console.log(err);
            return ;
        }
        var sql = 'UPDATE link SET content = ? WHERE course_id = ? and url = ?';
        connection.query(sql, [name, courseID, url], function(err, result, fields){
            if(err){
                console.log(err);
                return ;
            }
            if(result.affectedRows == 0){
                callback(false);
            }else{
                callback(true);
            }
            connection.release();


        })
    })
}

/*更新一门课的某个友情链接的url*/
Link.updateURL = function (courseID, name, url, callback) {
    pool.getConnection(function (err, connection) {
        if(err) {
            console.log(err);
            return ;
        }
        var sql = 'UPDATE link SET url = ? WHERE course_id = ? and content = ?';
        connection.query(sql, [url, courseID, name], function(err, result, fields){
            if(err){
                console.log(err);
                return ;
            }
            if(result.affectedRows == 0){
                callback(false);
            }else{
                callback(true);
            }
            connection.release();
        })
    })
}

/*添加一门课的一个友情链接*/
Link.add = function (courseID, name, url, callback) {
    pool.getConnection(function (err, connection) {
        if(err) {
            console.log(err);
            return ;
        }
        var sql = 'INSERT INTO link(course_id, content, url) VALUES (?, ?, ?)';
        connection.query(sql, [courseID, name, url], function(err, result, fields){
            if(err){
                console.log(err);
                return ;
            }
            if(result.affectedRows == 0){
                callback(false);
            }else{
                callback(true);
            }
            connection.release();
        })
    })
}

/*删除一门课的某个友情链接*/
Link.delete = function (id, callback) {
    pool.getConnection(function (err, connection) {
        if(err) {
            console.log(err);
            return ;
        }
        var sql = 'DELETE FROM link WHERE id = ?';
        connection.query(sql, [id], function(err, result, fields){
            if(err){
                console.log(err);
                return ;
            }
            if(result.affectedRows == 0){
                callback(false);
            }else{
                callback(true);
            }
            connection.release();
        })
    })
}



module.exports = Link;