const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const middleware = require('./src/middleware/index');
const port = process.env.PORT || 5000;
// const bodyParser = require('body-parser')

// app.use(cors({
//     origin: "*",
// }));

app.use(cors({ 
    origin: '*', 
    credentials: true,
    preflightContinue: true,
  }))

// Set headers for preflight request
// app.options('/onloan', {mode:'cors'});

// app.use(express.json()); //req.body
app.use(middleware.decodeToken);
app.use(express.static('build'))
// app.use(bodyParser.json({ limit: '50mb' }));
//ROUTES//
//test
// get data from monthlyEquipmenUpload
app.get("/getMontlyUploadList", async(req,res) => {
try {
    const montlyAssets = await pool.query("SELECT * FROM monthlyequipimport");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
res.json(montlyAssets[0])
    
} catch (err) {
    console.error(err.message)
}
})

//Upload monthly spreadsheet
app.post('/monthlyupload', async (req, res) => {

    try {
        const { assetdescription, assetnumber, assettypename, location, purchasedate, purchasevalue, serialnumber, totalcost } = req.body; // array of objects
        const newAsset = await pool.query(`INSERT INTO monthlyupload (assetdescription, assetnumber, assettypename, location, purchasedate, purchasevalue, serialnumber, totalcost) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [assetdescription, assetnumber, assettypename, location, purchasedate, purchasevalue, serialnumber, totalcost]);
        res.json(newAsset);

    } catch (err) {

           console.error(err.message);
   
    }
}
    
  );
  
  //testing

// app.post("/monthlyupload", async (req, res) => {
//     try {
//     const { assetdescription, assetnumber, assettypename, location, purchasedate, purchasevalue, serialnumber, totalcost } = req.body;
//     const newAsset = await pool.query(`INSERT INTO monthlyupload (assetdescription, assetnumber, assettypename, location, purchasedate, purchasevalue, serialnumber, totalcost) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [assetdescription, assetnumber, assettypename, location, purchasedate, purchasevalue, serialnumber, totalcost])
//   res.json(newAsset[0])  
// console.log(req.body)
// } catch (err) {
//       console.error(err.message);
//     }
//   });
    
//create a person
app.post("/addNewPerson", async (req,res) => {
    try {
    const {FirstName,LastName,Email} = req.body; 
    const newPerson = await pool.query("INSERT INTO persons (FirstName,LastName,Email) VALUES (?,?,?)",[FirstName,LastName,Email]);
    //   const {FirstName,LastName,Email} = req.body; 
    //   const newPerson = await pool.query("INSERT INTO persons (ID,FirstName,LastName,Email,PersonNumber,Phone,UserName,Password,ManageBacIS,HbgID,IDHash,ParentEmail,PersonType,RelatedArray,Archived,SchoolClassID,Grade) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[ID,FirstName,LastName,Email,PersonNumber,Phone,UserName,Password,ManageBacIS,HbgID,IDHash,ParentEmail,PersonType,RelatedArray,Archived,SchoolClassID,Grade]);
    res.json(newPerson[0])
    console.log(req.body)
} catch (err) {
    console.error(err.message)
}})
//create an asset
app.post("/addNewDevice", async (req,res) => {
    try {
    const {AssetNumber,SerialNumber,PurchaseValue, CostCenter, AssetTypeID, AssetDescription} = req.body; 
    const newDevice = await pool.query("INSERT INTO assets (AssetNumber,SerialNumber,PurchaseValue,AssetTypeID,AssetDescription,CostCenter,PurchaseDate) VALUES (?,?,?,?,?,?,NOW())", [AssetNumber,SerialNumber,PurchaseValue,AssetTypeID,AssetDescription,CostCenter]);
    res.json(newDevice[0])
    console.log(req.body)
} catch (err) {
    console.error(err.message)
}})
//get all movements with a specific AssetTypeID
app.get("/movements", async(req,res) => {
    try {
       const allMovements = await pool.query("SELECT SerialNumber FROM movements INNER JOIN assets ON movements.AssetID = assets.id INNER JOIN persons ON movements.PersonID = persons.id WHERE persons.FirstName = 'PYP' AND persons.LastName = '2' AND movements.BookInDate IS NULL AND assets.AssetTypeID=5");
        res.json(allMovements[0])
    } catch (err) {
        console.error(err.message);
    }
})

//get all assets
app.get("/allAssets", async(req,res) => {
    try {
 //      const allAssets = await pool.query("SELECT AssetNumber, SerialNumber, PurchaseDate, PurchaseValue, AssetDescription, CostCenter, at.AssetType FROM assets a LEFT JOIN assettypes at ON at.ID = a.AssetTypeID");
       const allAssets = await pool.query("SELECT * FROM assets");

       res.json(allAssets[0])
    } catch (err) {
        console.error(err.message);
    }
})

//get all persons
app.get("/persons", async(req,res) => {
    try {
       const allPersons = await pool.query("SELECT CONCAT(FirstName, ' ', LastName)as full_name, Email, ID FROM persons");
        res.json(allPersons[0])
    } catch (err) {
        console.error(err.message);
    }
})

//get all assettypes
app.get("/assettypes", async(req,res) => {
    try {
       const allAssettypes = await pool.query("SELECT * FROM assettypes");
        res.json(allAssettypes[0])
    } catch (err) {
        console.error(err.message);
    }
})


// delete a person based on it's email
app.delete("/persons/:ID", async (req,res) => {
    try {
        const {ID} = req.params
        const updatedItem = await pool.query(`DELETE FROM persons WHERE ID = ?`,[ID])     
        res.json(updatedItem)

    } catch (err) {
        console.error(err.message)
    }
})



//get all records that are on loan
router.options('/onloan', cors())
app.get("/onloan", async (req,res) => {
    try {
        const allLoans = await pool.query("SELECT m.BookOutDate, m.BookInDate, CONCAT(p.FirstName, ' ', p.LastName)as full_name, p.Email, a.AssetNumber, a.SerialNumber, at.AssetType FROM movements m LEFT JOIN persons p ON p.ID = m.PersonID LEFT JOIN assets a ON a.ID = m.AssetID LEFT JOIN assettypes at ON at.ID = a.AssetTypeID WHERE m.BookInDate IS NULL AND a.AssetNumber IS NOT NULL");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.json(allLoans[0])
    } catch (err) {
        console.error(err.message)
       
    }
})

//get all records that are NOT on loan

app.get("/notonloan", async (req,res) => {
    try {
  //      const allnotLoans = await pool.query("SELECT m.BookOutDate, m.BookInDate, m.assetID, p.FirstName, p.LastName, p.Email, a.AssetNumber, a.CostCenter, a.ID, a.SerialNumber, at.AssetType FROM movements m LEFT JOIN persons p ON p.ID = m.PersonID LEFT JOIN assets a ON a.ID = m.AssetID LEFT JOIN assettypes at ON at.ID = a.AssetTypeID WHERE m.BookINDate IS NOT NULL");
  //const allnotLoans = await pool.query("SELECT a.ID, a.AssetNumber, a.SerialNumber, a.CostCenter, p.FirstName, p.LastName, ast.AssetType, m.AssetID, m.BookInDate FROM assets a LEFT JOIN movements m ON a.ID = m.AssetID LEFT JOIN persons p ON p.id = m.personID LEFT JOIN assettypes ast ON ast.ID = a.AssetTypeID WHERE m.BookInDate IS NOT NULL ORDER BY `m`.`BookInDate` DESC")
  const allnotLoans = await pool.query("SELECT DISTINCT a.ID, a.AssetNumber, a.CostCenter, a.SerialNumber, at.AssetType FROM assets a LEFT JOIN movements m ON a.ID = m.AssetID LEFT JOIN assettypes at ON at.ID = a.AssetTypeID")
 
  res.json(allnotLoans[0])
    } catch (err) {
        console.error(err.message)
       
    }
})


// get all persons
app.get("/allPersons", async(req,res) => {
    try {
        const allPersons = await pool.query("SELECT FirstName,LastName, Email, ID as personID FROM persons")
        res.json(allPersons[0])
    } catch (err) {
        console.error(err.message)
    }
})

//get information about the array that needs updating

app.put("/updates/:serialNumber", async (req,res) => {
    try {
        const {serialNumber} = req.params
        const updatedItem = await pool.query(`UPDATE movements SET BookInDate = CURRENT_TIMESTAMP(), BookOutDate = NULL WHERE AssetID = (SELECT a.ID FROM assets a WHERE a.SerialNumber = ?)`,[serialNumber])     
        res.json(updatedItem)

    } catch (err) {
        console.error(err.message)
    }
})

//get information about the array that needs updating

app.delete("/deleteasset/:SerialNumber", async (req,res) => {
    try {
        const {SerialNumber} = req.params
        const deleteasset = await pool.query(`DELETE FROM assets  WHERE SerialNumber = ?`,[SerialNumber])     
        res.json(deleteasset)

    } catch (err) {
        console.error(err.message)
    }
})


//Register and update new movement

// app.put("/newMovement/", async (req,res) => {
// const {chosenPersonID,chosenDeviceID} = req.body;
//     try {

//         const updateMovements = await pool.query(`UPDATE movements SET BookOutDate= CURRENT_TIMESTAMP(), BookInDate = NULL, PersonID = ? WHERE AssetID = ?`, [chosenPersonID, chosenDeviceID])
//         res.json(updateMovements)
//     } catch (err) {
//         console.error(err.message)
//     }
// })

app.post("/newMovement/", async (req,res) => {
    const {chosenPersonID,chosenDeviceID} = req.body;
        try {
    
            const updateMovements = await pool.query("INSERT INTO movements (BookOutDate, BookInDate, PersonID, AssetID, MovementDescription) VALUES (CURRENT_TIMESTAMP(), NULL, ?, ?, ?)", [chosenPersonID, chosenDeviceID, chosenDeviceID])
            res.json(updateMovements)
        } catch (err) {
            console.error(err.message)
        }
    })

app.get("/movements/:id", async (req,res) => {
    try {
        const { id }  = req.params;
        const getmovementbyid = await pool.query(`SELECT * FROM movements WHERE PersonID = ${id}`,[id]);
       res.json(getmovementbyid[0])
    
    } catch (err) {
        console.error(err.message)
    }
})

app.listen( 5000, () => {
    console.log("Server is running on port 5000");
});
