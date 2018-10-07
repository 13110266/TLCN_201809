var mysql = require('mysql');

var connection      =  mysql.createConnection({
    host        :         "127.0.0.1",
    user        :         "root",
    password    :         "1234",
    database     :         "tlcn"
});
connection.connect();
module.exports = connection;