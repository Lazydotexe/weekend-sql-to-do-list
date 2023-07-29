const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');





//          POST

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
//------------------------------------------------------------------------------------------------------------------------------------------------------

    //        GET
    router.get('/', (req, res) => {
        let queryText = `SELECT "task", TO_CHAR(due_date, 'DD Mon YYYY') AS "due_date", "completed", "Description" FROM "TODO" ;`;
        pool.query(queryText).then(result => {
          // Sends back the results in an object
          res.send(result.rows);
        })
        .catch(error => {
          console.log('error getting books', error);
          res.sendStatus(500);
        });
      });

 //------------------------------------------------------------------------------------------------------------------------------------------------------

    //        PUT
    router.put('/:id', (req, res) => {

        console.log("Req.params: ", req.params)
        
        let taskId = req.params.id
        let completed = 'TRUE';
        let queryParams = [completed, taskId]
      
        let queryText = `UPDATE "TODO" SET "completed" = $1 WHERE "id" = $2;`
        console.log(`Success connecting to /updaterank. bookId = ${taskId}, isRead = ${completed}`)
      
        pool.query(queryText, queryParams)
            .then((resposne) => {
                res.sendStatus(200)
            })
            .catch((error) => {
                console.log(error)
                res.sendStatus(500)
            })
      })

//------------------------------------------------------------------------------------------------------------------------------------------------------

//           DELETE
router.delete('/:id', (req, res) => {
    let taskToDeleteId = req.params.id
  
    let queryText = 'DELETE FROM TODO WHERE id=$1;'
  
    pool.query(queryText, [taskToDeleteId])
        .then((result) => {
            console.log("Task Deleted, id:", taskToDeleteId)
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('Error making database query:', queryText)
            console.log('Error Message:', error)
            res.sendStatus(500)
        })
  })
//------------------------------------------------------------------------------------------------------------------------------------------------------











module.exports = router;