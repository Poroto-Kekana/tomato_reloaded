import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import express from "express";
import cors from "cors";

const app = express()

app.use(cors())
app.use(express.json());

// set up the database
const  db = await  sqlite.open({
    filename:  './data_plan.db',
    driver:  sqlite3.Database
});

//migration
await db.migrate();

app.post('/api/forms/login', (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;
    
    res.json({
        username : username,
        isLoggedIn : true
    });
});

const PORT = process.env.PORT || 6012
app.listen(PORT, () => console.log(`listen on port ${PORT}...`))