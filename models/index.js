var mysql = require('mysql');

var pool  = mysql.createPool({
  host: 'localhost',
  user: 'se_admin',
  password: '(>_0)',
  database: 'se_system',
  charset: "utf8"
});

/* 
 * The pool will emit a connection event when a new connection is made within the pool. 
 * If you need to set session variables on the connection before it gets used, 
 * you can listen to the connection event.
 */
pool.on('connection', connection => {
  connection.query('SET SESSION auto_increment_increment=1')
});

module.exports = pool;