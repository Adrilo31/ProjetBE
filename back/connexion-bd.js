
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, 'co.env') });
const mysql = require('mysql2');
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});


module.exports = pool;