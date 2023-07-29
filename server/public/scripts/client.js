$(document).ready(function () {
    console.log('jQuery sourced.');
    // refreshBooks();
    addClickHandlers();
    refreshToDo()
});

function addClickHandlers() {
    $('#submit').on('click', addToDo) // Button labled submit will run 'addToDo' on click




    // TODO - Add code for edit & delete buttons
}


//------------------------------------------------------------------------------------------------------------------------------------------------------

//         POST     // this will take the values from the inputs and bundle them up as objects
                    // and send them via POST on the server route.
                    // ** addToDo WILL run 'refreshToDo' whenever called. **
function addToDo() {
    console.log('Add button clicked.');
    let newToDo = {};
    newToDo.task = $('#taskInput').val();
    newToDo.date = $('#dateInput').val();
    newToDo.description = $('#descriptionInput').val();
    newToDo.completed = false;

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


function completeTask() {
    const taskId = $(this).parent().parent().data('id')

    console.log("mark as read:", taskId)


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


function deleteTask() {
    console.log("You clicked on: ", $(this))

    // getter
    const taskId = $(this).parent().parent().data('id')
    console.log("in deleteTask: id is...", taskId)

    $.ajax({
        method: 'DELETE',
        url: `/TODO/${taskId}`
    })
        .then((reponse) => {
            console.log(`Deleted book id: ${taskId}`)
            refreshToDo()
        })
}

//------------------------------------------------------------------------------------------------------------------------------------------------------

//          RENDER
function render(lists) {
    $('#todoList').empty();


    for (let i = 0; i < lists.length; i += 1) {

        let list = lists[i];

        let newRow = $(`
      <tr>
         <td>${list.task}</td>
         <td>${list.due_date}</td>
         <td>${list.Description}</td>
         <td><input type="checkbox" class="completed-checkbox">${list.completed}</td>
         <td class="actions">
          <button>Mark As Done</button>
          <button>Delete</button>
         </td>
      
      </tr>
        
        `)

        newRow.data('id', list.id);

        // if (koala.ready_to_transfer === true) {
        //     // If true, remove the "Mark For Ready" button
        //     newRow.find('.btn-ready').remove();
        // }

        $('#todoList').append(newRow);
    }
}