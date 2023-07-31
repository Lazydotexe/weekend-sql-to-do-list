# Project Name

TODO app


## Description
# TODO App Readme

The TODO app is a simple web application that allows users to input tasks and their descriptions, which are then stored in a database. The app provides an intuitive interface to add, complete, and delete tasks. This README provides an overview of the app's features and instructions on how to set it up and use it.


## Features

1. **Add Task:** Users can add new tasks along with their descriptions by entering the task details in the input fields provided.

2. **Complete Task:** When a task is completed, users can mark it as complete using the "Complete Task" button. The task will then be visually differentiated from the incomplete tasks.

3. **Delete Task:** If a user wants to remove a task from the list, they can click on the "Delete Task" button associated with that task, and it will be permanently removed from the database and the DOM.

## How to Use

Follow these instructions to run the Task Manager app on your local machine:

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org) installed on your computer.

### Installation

1. Clone this repository to your local machine using the following command:

   ```
   git clone https://github.com/Lazydotexe/weekend-sql-to-do-list/tree/main
   ```

2. Navigate to the project directory:

   ```
   cd weekend-sql-to-do-list
   ```

3. Install the required dependencies by running:

   ```
   npm install express
   npm install pg
   npm install

   * Add to your package.json
   "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server/server.js"
  },
   ```

### Configuration

1. Table template information and commands are saved in gatabase.sql

### Running the App

1. Once the dependencies are installed and the database is configured, you can start the app with:

   ```
   npm start
   ```

2. Open your web browser and go to `http://localhost:5000` to access the Task Manager app.

### Usage

1. To add a new task, enter the task title and description in the provided input fields and click the "Add Task" button.

2. To mark a task as complete, click the "Complete Task" button next to the corresponding task.

3. To delete a task, click the "Delete Task" button next to the corresponding task. This action is irreversible.

## Technologies Used

- Front-end: HTML, CSS, JavaScript
- Back-end: Node.js, Express.js
- Database: Postico

## Contributions

Contributions to this project are welcome. If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

The TODO app is open-source software licensed under the [MIT License](LICENSE).

---

Happy task managing! If you have any questions or need further assistance, please don't hesitate to contact me at andrew.cannon.exe@gmail.com

