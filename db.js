
const mysql = require("mysql2")



// const pool = mysql.createPool({
//     host: 'containers-us-west-55.railway.app',
//     user: 'root',
//     password: '5NOSSCDlL9LV2b1svlOH',
//     database: 'railway',
//     port: 6016
// });

// const pool = mysql.createPool({
//     host: "containers-us-west-55.railway.app",
//     user: "root",
//     password: "5NOSSCDlL9LV2b1svlOH",
//     database: "railway"
// });

 const urlDB = "mysql://root:5NOSSCDlL9LV2b1svlOH@containers-us-west-55.railway.app:6016/railway"

const pool = mysql.createPool(urlDB);

// const pool = mysql.createPool({
//     host: `${process.env.DB_HOST}`,
//     user: `${process.env.DB_USER}`,
//     password: `${process.env.DB_PASSSWORD}`,
//     database: `${process.env.DB_DATABASE}`
// });



module.exports = pool.promise();