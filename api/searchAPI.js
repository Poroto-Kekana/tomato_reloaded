import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import express from "express";
import cors from "cors";

export default app.post('/api/diseases/', async (request, response) => {
    const { disease_name } = request.body;
    await db.all(`SELECT * FROM diseases WHERE lower(disease_name) = ? `, disease_name.toLowerCase())
        .then(queryResults => {
            if (queryResults.length == 1) {
                response.json({
                    status: 'success',
                    isFound: true,
                    search_results: queryResults
                })
            } else {
                response.json({
                    status: "Disease Not Found",
                    isFound: false,
                })
            }

        })
})