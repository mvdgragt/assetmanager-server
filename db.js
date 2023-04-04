const mysql = require("mysql2")

// const pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "assetmanager"
// });

const urlDB = `mysql://root:5NOSSCDlL9LV2b1svlOH@containers-us-west-55.railway.app:6016/railway`

const pool = mysql.createPool(urlDB);

// const pool = mysql.createPool({
//     host: `${process.env.DB_HOST}`,
//     user: `${process.env.DB_USER}`,
//     password: `${process.env.DB_PASSSWORD}`,
//     database: `${process.env.DB_DATABASE}`
// });


let sql2 = "SELECT SerialNumber FROM movements INNER JOIN assets ON movements.AssetID = assets.id INNER JOIN persons ON movements.PersonID = persons.id WHERE persons.FirstName = 'PYP' AND persons.LastName = '6' AND movements.BookInDate IS NULL AND assets.AssetTypeID=5"


pool.execute(sql2, function (err, result) {
    if(err) throw err;
    //console.log(result)
    result.forEach((res) => {
 //   console.log(res.SerialNumber)
    })
})

module.exports = pool.promise();