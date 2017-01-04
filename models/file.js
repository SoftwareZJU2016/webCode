var pool = require('./index');

var File = {};
module.exports = File;

File.getByID = function(fileID, callback){
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        //这个函数有bug，sql语句执行以后进不去函数
        var sql = 'SELECT * FROM file WHERE id = ?';
        connection.query(sql, [fileID], function(err, results, fields){
            if (err) {
                console.log(err);
                results[0] = null;
            }
            connection.release();
            callback(results[0]);
        });
    });
}

File.add = (uploader, name, path, size, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'INSERT INTO file(uploader_id, upload_time, name, filepath, size) \
                     VALUES(?, NOW(), ?, ?, ?)';
        connection.query(query, [uploader, name, path, size], (err, results, fields) => {
            if (err) { 
                console.log(err);
                results = null;
            }
            connection.release();
            callback(results.insertId);
        });
    });
}

File.getCourseFiles = (courseID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'SELECT * FROM file, file_course WHERE course_id = ? and file.id = file_course.file_id';
        connection.query(query, [courseID], (err, results, fields) => {
            if (err) { 
                console.log(err);
                results = null;
            }
            connection.release();
            callback(results);
        });
    });
}

File.getClassFiles = (classID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'SELECT * FROM file, file_class WHERE class_id = ? \
                     and file.id = file_class.file_id';
        connection.query(query, [classID], (err, results, fields) => {
            if (err) { 
                console.log(err);
                results = null;
            }
            connection.release();
            callback(results);
        });
    });
}

File.delete = (fileID, callback) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err);

        var query = 'DELETE FROM file WHERE id = ?';
        connection.query(query, [fileID], (err, results, fields) => {
            if (err) { 
                console.log(err);
                results = null;
            }
            connection.release();
            callback(results.affectedRows == 1 ? true : false);
        });
    });
} 

