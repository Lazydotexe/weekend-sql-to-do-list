const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');







router.post('/',  (req, res) => {
    let newToDo = req.body;
    console.log(`Adding book`, newToDo);
  
    let queryText = `INSERT INTO "TODO" ("task", "due_date", "Description", "completed")
                     VALUES ($1, $2, $3, $4);`;
    pool.query(queryText, [newToDo.task, newToDo.due_date, newToDo.description, newToDo.completed])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new item`, error);
        res.sendStatus(500);
      });
  });



module.exports = router;