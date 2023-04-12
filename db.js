require("dotenv").config();

const mysql = require("mysql2")

const pool = mysql.createPool(process.env.MYSQL_URL);

let sql2 = "SELECT SerialNumber FROM movements INNER JOIN assets ON movements.AssetID = assets.id INNER JOIN persons ON movements.PersonID = persons.id WHERE persons.FirstName = 'PYP' AND persons.LastName = '6' AND movements.BookInDate IS NULL AND assets.AssetTypeID=5"


pool.execute(sql2, function (err, result) {
    if(err) throw err;
    //console.log(result)
    result.forEach((res) => {
 //   console.log(res.SerialNumber)
    })
})

module.exports = pool.promise();

// CREATE TABLE `monthequipimport` (
//     `assetnumber` varchar(50) DEFAULT NULL,
//     `serialnumber` varchar(50) DEFAULT NULL,
//     `assetdescription` varchar(50) DEFAULT NULL,
//     `assettypename` varchar(50) DEFAULT NULL,
//     `location` varchar(50) DEFAULT NULL,
//     `purchasedate` varchar(50) DEFAULT NULL,
//     `purchasevalue` varchar(50) DEFAULT NULL,
//     `totalcost` varchar(50) DEFAULT NULL
//   );
  
// CREATE TABLE monthlyequipimport2 (
//     assetnumber VARCHAR(255),
//     serialnumber VARCHAR(255),
//     assetdescription VARCHAR(255),
//     assettypename VARCHAR(255),
//     location VARCHAR(255),
//     purchasedate VARCHAR(255),
//     purchasevalue DECIMAL(10,2),
//     totalcost DECIMAL(10,2),
//     PRIMARY KEY (serialnumber)
//   );

// CREATE TABLE monthlyequipimport (
//     assetnumber VARCHAR(255) NOT NULL,
//     serialnumber VARCHAR(255) NOT NULL,
//     assetdescription VARCHAR(255) NOT NULL,
//     assettypename VARCHAR(255) NOT NULL,
//     location VARCHAR(255) NOT NULL,
//     purchasedate VARCHAR(255) NOT NULL,
//     purchasevalue DECIMAL(10,2) NOT NULL,
//     totalcost DECIMAL(10,2) NOT NULL,
//     PRIMARY KEY (serialnumber)
//   );

// CREATE TABLE monthlyupload (
// 	assetdescription VARCHAR(255),
// 	assetnumber VARCHAR(15),
// 	assettypename VARCHAR(50),
// 	location VARCHAR(255),
// 	purchasedate VARCHAR(20),
// 	purchasevalue VARCHAR(10),
// 	serialnumber VARCHAR(25),
// 	totalcost INT(10),
// 	KEY `id` (`serialnumber`) USING BTREE
// );