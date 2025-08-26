const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();

const port = 3000;
app.listen(port, () => {
    console.log("Server running on port 3000");
});

app.use(bodyParser.json());

const conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Meet@123",
    database : "mydb"
});

conn.connect((err) => {
    if(err) {
        console.error("DB connection failed:", err.stack);
        return;
    }
    console.log("connected to Mysql");
})

app.post("/sub", (req,res) => {
    const { name, email } = req.body;

    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
    conn.query(sql, [ name, email ], (err, res) => {
        if(err) {
            console.error("Insert error:", err);
            return res.status(500).send("Database insert failed");
        }
        res.send("Data inserted succesfully!!");
    });
});