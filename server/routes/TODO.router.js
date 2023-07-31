const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');





//          POST
/* POST route that handles our PUT request from client.js.
sets our req.body (our data that was set from the client)
equil to newToDo variable. we include a specific command that postico (our sql)
will run once we send it with the pool.query command.
it will basically add our two inputs from the DOM plus a FALSE value added
behind the scenes to our table in the database.
*/
router.post('/', (req, res) => {
  let newToDo = req.body;
  console.log(`Adding book`, newToDo);

  let queryText = `INSERT INTO "TODO" ("task", "Description", "completed")
                     VALUES ($1, $2, $3);`;
  pool.query(queryText, [newToDo.task, newToDo.description, newToDo.completed])
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

/*This is our GET route that sends another command to our database packed into the variable
queryText same as above in our POST. The command will select all info in our table, order it by task 
and send it back to our client to be used as it sees fit. */
router.get('/', (req, res) => {
  let queryText = `SELECT * FROM "TODO"
        ORDER BY "task" DESC;`;
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

/* The PUT route will take the id sent from the client and set it to 'taskId'.
we will then set 'completed to 'TRUE'. 
Then we will set queryParams equil to both the above variables INSIDE of an array.
we then set another variable equil to another postico command that will update our tables comleted row
and set it to TRUE.*/
router.put('/:id', (req, res) => {

  console.log("Req.params: ", req.params)

  let taskId = req.params.id
  
  let queryParams = [taskId]

  let queryText =  `
  UPDATE "TODO" SET "completed" = NOT "completed" WHERE "id"=$1
`
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
/* Our DELETE route does about the same thing as our PUT except instead of changing a value it deletes 
the whole row depending on what button/id is clicked on DOM */
router.delete('/:id', (req, res) => {
  let taskToDeleteId = req.params.id

  let queryText = 'DELETE FROM "TODO" WHERE id=$1;'

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