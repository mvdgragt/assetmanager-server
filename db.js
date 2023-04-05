
const mysql = require("mysql2")

 const urlDB = "mysql://root:5NOSSCDlL9LV2b1svlOH@containers-us-west-55.railway.app:6016/railway"

const pool = mysql.createPool('mysql://root:5NOSSCDlL9LV2b1svlOH@containers-us-west-55.railway.app:6016/railway');



module.exports = pool.promise();