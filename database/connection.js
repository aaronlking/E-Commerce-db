const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    database: 'aking_cs355fa21',
    user: 'aking_cs355fa21',
    password: '*********',
});

module.exports = connection;