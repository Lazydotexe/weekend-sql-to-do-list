$(document).ready(function(){
    console.log('jQuery sourced.');
    // refreshBooks();
    addClickHandlers();
  });
  
  function addClickHandlers() {
    $('#submit').on('click', addToDo)
    
  
  
  
    // TODO - Add code for edit & delete buttons
  }


  //------------------------------------------------------------------------------------------------------------------------------------------------------

  //         POST
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
        }).then(function(response) {
          console.log('Response from server.', response);
        //   refreshList();
        }).catch(function(error) {
          console.log('Error in POST', error)
          alert('Unable to add item at this time. Please try again later.');
        });
    
  }
  
 