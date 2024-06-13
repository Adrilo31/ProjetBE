const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config()

const path = require('path');
dotenv.config({ path: path.resolve(__dirname, 'co.env') });

// Connexion à mysql
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

// Pour tester la connexion
pool.getConnection(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données");
});


module.exports = pool;