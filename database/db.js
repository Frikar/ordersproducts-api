const mysql = require('mysql');

//MYSQL Pool with .env
const pool = mysql.createPool({
    connectionLimit : 100,
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    debug    :  false
});

module.exports = {
    pool, mysql
}
