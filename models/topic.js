var pool = require('./index');

var Topic = {};

Topic.getAll = (courseID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return;
        }
        //？表示等待填充的数据，这种方式可以防止MYSQL注入攻击
        var query = 'SELECT * from user, topic WHERE course_id = ? AND topic.creator_id = user.id ORDER BY last_reply_time';
        //第二个参数就是一个填充数据的数组
        connection.query(query, [courseID], (err, results, fields) => {
            //results是数据库操作返回的结果，是一个数组！
            if (err) {
                console.log(err);
                results = [];
            }
            connection.release();
            callback(results); //由于查询数据库是异步的，所以用回调函数的方式，拿到结果之后再作为参数返回
        });
    })
};

Topic.getByID = (topicID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return;
        }
        var query = 'SELECT * FROM user, topic WHERE topic.id = ? AND user.id = topic.creator_id';
        connection.query(query, [topicID], (err, results, fields) => {
            if (err) {
                console.log(err);
                results = [];
            }
            callback(results[0]);
            connection.release();
        });
    });
};

Topic.getReply = (topicID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return;
        }
        var query = 'SELECT * FROM topic_reply, user WHERE topic_reply.creator_id = user.id AND topic_id = ?';
        connection.query(query, [topicID], (err, results, fields) => {
            if (err) {
                console.log(err);
                results = [];
            }
            connection.release();
            callback(results);
        })
    })
}

Topic.add = (data, callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return;
        }
        var query = 'INSERT INTO topic(creator_id, course_id, post_time, title, content, anonymity) \
                     VALUES (?, ?, NOW(), ?, ?, ?)';
        connection.query(
            query, 
            [data.creatorID, data.courseID, data.title, data.content, data.anonymity], 
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    results = [];
                }
                connection.release();
                //如果插入数据有自增的primery key，可以用results.insertId拿到值
                //这里results.insertId就是reply_id
                callback(results.insertId);
            }
        )
    })
}

Topic.addReply = (data, callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return;
        }
        var query = 'INSERT INTO topic_reply(topic_id, creator_id, post_time, content, anonymity) \
                     VALUES (?, ?, NOW(), ?, ?)';
        connection.query(
            query, 
            [data.topicID, data.creatorID, data.content, data.anoymity, data.topicID], 
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    results = [];
                }
                callback(results.insertId);

                connection.query(
                    'UPDATE topic SET reply_num = reply_num + 1 WHERE id = ?', 
                    [data.topicID], 
                    (err, results, fields) => {
                        if (err) {
                            console.log(err);
                        }
                        connection.release();
                    }
                )

            }
        )
    })
}

Topic.delete = (topicID, callback) => {
    pool.getConnection((err, connection) => {
        var query = 'DELETE FROM topic WHERE id = ?';
        connection.query(query, [topicID], (err, result, fields) => {
            if (err) {
                console.log(err);
            } else if (result.affectedRow != 0) {
                callback(true);
            } else {
                callback(false);
            }
            connection.release();
        })
    });
}

module.exports = Topic;