const mysql = require("mysql")
const  configSQL = require('../MySQL.json')
var connection = mysql.createConnection({
  host     : configSQL.host,
  user     : configSQL.user,
  password : configSQL.password,
  database  : configSQL.database
});

connection.connect(function(err) {
  if (err) {
    console.error('[MySQL]: Not connect to MySQL');
    return;
  }

  console.log('[MySQL]: connected to database ThreadID: id ' + connection.threadId);
});
module.exports = connection;