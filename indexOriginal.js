const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database");


//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a person
app.post("/persons", async (req,res) => {
    try {
    const {FirstName,LastName} = req.body; 
    const newPerson = await pool.query("INSERT INTO persons (FirstName,LastName) VALUES (?,?)",[FirstName,LastName]);
    res.json(newPerson)
} catch (err) {
    console.error(err.message)
}})

//get all persons

app.get("/getpersons", async (req,res) => {
    try {
        const allpersons = await pool.query("SELECT * FROM persons")
    } catch (err) {
        console.error(err.message)
    }
})
//create an asset
//create a movement

//get all movements

app.get("/movements", async(req,res) => {
    try {
       const allMovements = await pool.query("SELECT SerialNumber FROM movements INNER JOIN assets ON movements.AssetID = assets.id INNER JOIN persons ON movements.PersonID = persons.id WHERE persons.FirstName = 'PYP' AND persons.LastName = '2' AND movements.BookInDate IS NULL AND assets.AssetTypeID=5 AND movements.BookOutDate IS NOT NULL");
       // const allMovements = await pool.query("SELECT * FROM movements");
        res.json(allMovements[0])
  //      console.log(allMovements)
    } catch (err) {
        console.error(err.message);
    }
})

//get all records that are on loan

app.get("/onloan", async (req,res) => {
    try {
        const allLoans = await pool.query("SELECT m.BookOutDate, CONCAT(p.FirstName, ' ', p.LastName)as full_name, p.Email, a.AssetNumber, a.SerialNumber, at.AssetType FROM movements m LEFT JOIN persons p ON p.ID = m.PersonID LEFT JOIN assets a ON a.ID = m.AssetID LEFT JOIN assettypes at ON at.ID = a.AssetTypeID WHERE m.BookInDate IS NULL AND a.AssetNumber IS NOT NULL");
       // const allLoans = await pool.query("SELECT m.BookOutDate, p.LastName, p.FirstName, p.Email, a.AssetNumber, a.SerialNumber, at.AssetType FROM movements m LEFT JOIN persons p ON p.ID = m.PersonID LEFT JOIN assets a ON a.ID = m.AssetID LEFT JOIN assettypes at ON at.ID = a.AssetTypeID WHERE m.BookInDate IS NULL"); 
       res.json(allLoans[0])
    //    console.log(allLoans)
    } catch (err) {
        console.error(err.message)
       
    }
})

//get information about the array that needs updating

app.put("/updates/:serialNumber", async (req,res) => {
    try {
        const {serialNumber} = req.params
        // const updatedItem = await pool.query(`SELECT m.BookOutDate, CONCAT(p.FirstName, ' ', p.LastName)as full_name, p.Email, a.AssetNumber, a.SerialNumber, at.AssetType FROM movements m LEFT JOIN persons p ON p.ID = m.PersonID LEFT JOIN assets a ON a.ID = m.AssetID LEFT JOIN assettypes at ON at.ID = a.AssetTypeID WHERE serialNumber = ?`, [serialNumber])
        //const updatedItem = await pool.query(`UPDATE movements SET BookOutDate = NULL WHERE = ?,[]`)
        const updatedItem = await pool.query(`UPDATE movements SET BookOutDate = NULL BookInDate = NOW() WHERE AssetID = (SELECT a.ID FROM assets a WHERE a.SerialNumber = ?)`,[serialNumber])
        res.json("Booking Date is removed")
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

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});