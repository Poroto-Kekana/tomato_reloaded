import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import express from "express";
import cors from "cors";

export default app.post('/api/forms/login', (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;
    
    res.json({
        username : username,
        isLoggedIn : true
    });
});