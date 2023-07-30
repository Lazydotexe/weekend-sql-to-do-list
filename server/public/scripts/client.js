$(document).ready(function () {
    console.log('jQuery sourced.');
    // refreshBooks();
    addClickHandlers();
    refreshToDo()
});

function addClickHandlers() {
    $('#submit').on('click', addToDo) // Button labled submit will run 'addToDo' on click
    $('#todoList').on('click', '#btn-complete', completeTask)
    $('#todoList').on('click', '#btn-delete', deleteTask)
}


//------------------------------------------------------------------------------------------------------------------------------------------------------

//         POST     // this will take the values from the inputs and bundle them up as objects
// and send them via POST on the server route.
// ** addToDo WILL run 'refreshToDo' whenever called. **
function addToDo() {
    console.log('Add button clicked.');
    let newToDo = {};
    newToDo.task = $('#taskInput').val();
    newToDo.description = $('#descriptionInput').val();
    newToDo.completed = false;
    $('input').val("")

    $.ajax({
        type: 'POST',
        url: '/TODO',
        data: newToDo,
    }).then(function (response) {
        console.log('Response from server.', response);
        refreshToDo() // **     CALLS REFRESHTODO FUNTCION     **
    }).catch(function (error) {
        console.log('Error in POST', error)
        alert('Unable to add item at this time. Please try again later.');
    });

}
//------------------------------------------------------------------------------------------------------------------------------------------------------
//         GET
// Sends GET request to our router. Saves the response as the variable 'list'
// then calls the function render(list) with our 'list' as a perameter.

function refreshToDo() {
    $.ajax({
        type: 'GET',
        url: '/TODO'
    }).then(function (response) {
        console.log(response);
        let list = response
        render(list);
    }).catch(function (error) {
        console.log('error in GET', error);
    });
}

//------------------------------------------------------------------------------------------------------------------------------------------------------
//         PUT
// sets a variable to the data('id') that is included in our GET but not rendered to the DOM
// 'this' is the button and it references its parent.parent element which is a <tr>
// Then a PUT request is sent to our router with our new variable as a destination.

function completeTask() {
    const taskId = $(this).parent().parent().data('id')

    console.log("mark as complete:", taskId)


    $.ajax({
        method: 'PUT',
        url: `/TODO/${taskId}`
    })
        .then((response) => {
            console.log("Success, for id: ", taskId)
            refreshToDo()
        })
        .catch((error) => {
            console.log(error)
        })
}

//------------------------------------------------------------------------------------------------------------------------------------------------------
//          DELETE
// creastes the same situation with the 'id' except we are sending a DELETE request to our router now.
// again we are accessing the `/TODO/${taskId}` url as we did in our PUT.

function deleteTask() {
    console.log("You clicked on: ", $(this))

    const taskId = $(this).parent().parent().data('id')
    console.log("in deleteTask: id is...", taskId)

    $.ajax({
        method: 'DELETE',
        url: `/TODO/${taskId}`
    })
        .then((response) => {
            console.log(`Deleted book id: ${taskId}`)
            refreshToDo()
        })
}

//------------------------------------------------------------------------------------------------------------------------------------------------------

//          RENDER
// first we empty our #todoList so that we dont keep stacking the same information over and over.
// Our render function takes in our list/response from our GET request so that we can render the Data
// that we reeived to our DOM. We itirate through our 'list' first checking if our list.completed is
// equil to true or false and set our variable accordingly.
// while also appending our variable newRow that has a string interpolation which includes our objects
// inside our 'list' variable.
// line 140 is a ternary operator(shorthand if/else statement) that is placed in line with the html
// and is in charge of whether to check to complete box or not depending on the switch statement we
// run on line 126


function render(lists) {
    $('#todoList').empty();

    for (let i = 0; i < lists.length; i += 1) {
        let list = lists[i];

        // Convert the completed value to 'Yes' or 'No' string
        let convertToString;
        switch (list.completed) {
            case true:
                convertToString = 'Yes';
                break;
            case false:
                convertToString = 'No';
                break;
        }
        //ternary operator line 140
        let newRow = $(`
        <tr>
          <td>${list.task}</td>
          <td>${list.Description}</td>
          <td><input type="checkbox" class="completed-checkbox" ${list.completed ? 'checked' : ''}>${convertToString}</td> 
          <td class="actions">
            <button id="btn-complete">Complete</button>
            <button id="btn-delete">Delete</button>
          </td>
        </tr>
      `);

        newRow.data('id', list.id);

        if (list.completed) { // if true the newRow will add the class from css and change the background to green
            newRow.addClass('completed-row');
        }

        $('#todoList').append(newRow);
    }
}






