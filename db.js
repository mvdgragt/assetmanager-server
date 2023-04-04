require("dotenv").config();

const mysql = require("mysql2")

// const pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "assetmanager"
// });

const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`

const pool = mysql.createPool(urlDB);

// const pool = mysql.createPool({
//     host: `${process.env.DB_HOST}`,
//     user: `${process.env.DB_USER}`,
//     password: `${process.env.DB_PASSSWORD}`,
//     database: `${process.env.DB_DATABASE}`
// });



module.exports = pool.promise();