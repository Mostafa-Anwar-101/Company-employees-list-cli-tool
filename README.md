# Company Employees List CLI Tool 🚀

This is a command-line tool for managing a company’s employee records efficiently. Built with Node.js, it allows users to list, add, update, and delete employees directly from the terminal.

## Features 🌟
- ✅ View the list of employees.
- ✅ Add new employees.
- ✅ Update existing employee records.
- ✅ Delete employees.
- ✅ Save employee data in a JSON file for persistence.

## Usage 📌
### List Employees 🏢
```sh
node index.js list
```
Displays a list of all employees.

### Add an Employee ➕
```sh
node index.js add --name "John Doe" --email "john.doe@example.com" --position "jr" --salary 60000
```
Adds a new employee with the given details.

### Update an Employee ✏️
```sh
node index.js update 1 --name "John Smith" --salary 65000
```
Updates the employee with ID `1`.

### Delete an Employee ❌
```sh
node index.js delete 1
```
Removes the employee with ID `1` from the records.

## Technologies Used 🖥️
- **Node.js**
- **fs Module** (for file operations)

## Future Improvements 🚀
- 🔹 Implement database storage instead of JSON.
- 🔹 Add search and filter functionality.
- 🔹 Improve error handling and validation.
- 🔹 Use Commander.js** (for handling CLI commands).
