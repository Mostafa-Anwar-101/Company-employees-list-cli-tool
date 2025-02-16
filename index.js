const fs = require("fs");
const path = require("path");

// validation functions
function validateName(name) {
  if (!name || !/^[A-Za-z]+$/.test(name.trim())) {
    console.error("Error: Name must contain only letters and cannot be empty.");
    return false;
  }
  return true;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    console.error("Error: Invalid email format.");
    return false;
  }
  return true;
}

function validateLevel(level) {
  const levels = ["Jr", "Mid-Level", "Sr", "Lead"];
  if (!levels.includes(level)) {
    console.error(`Error: Level must be one of ${levels.join(", ")}`);
    return false;
  }
  return true;
}

function validateSalary(salary) {
  const salaryRegex = /^\d+(\.\d{1,2})?$/;
  if (!salary || !salaryRegex.test(salary) || parseFloat(salary) <= 0) {
    console.error("Error: Salary must be a positive number.");
    return false;
  }
  return true;
}

function validateYears(years) {
  const yearsRegex = /^[0-9]+$/;
  if (!yearsRegex.test(years) || parseInt(years, 10) < 0) {
    console.error("Error: Years of experience cannot be negative.");
    return false;
  }
  return true;
}

// read and write functions
function readrFile() {
  const employeesFile = path.join(__dirname, "employees.json");
  let data = fs.readFileSync(employeesFile, "utf8");
  let employees = JSON.parse(data);
  return employees;
}
function writeToFile(employees) {
  const employeesFile = path.join(__dirname, "employees.json");
  fs.writeFileSync(employeesFile, JSON.stringify(employees));
}

// add employee
function addEmployee() {

  let employee = {
    id: 0,
    name: "",
    email: "",
    level: "Jr",
    salary: "",
    years: 0,
  };
  const args = process.argv.slice(3);
  args.forEach((arg) => {
    if (arg.startsWith("--")) {
      const [key, value] = arg.slice(2).split("=");
      employee[`${key.toLowerCase()}`] = value;
    }
  });
  if (
    validateName(employee.name) &&
    validateEmail(employee.email) &&
    validateLevel(employee.level) &&
    validateSalary(employee.salary) &&
    validateYears(employee.years)
  ) {
    let employees = readrFile();
    employee.id = employees.length ? employees[employees.length - 1].id + 1 : 1;
    employees.push(employee);
    writeToFile(employees);
  }
}
// list all employees
function listEmployees() {
  let employees = readrFile();
  let stringTOBePrinted = "";
  employees.forEach((employee) => {
    Object.keys(employee).forEach((key) => {
      stringTOBePrinted += `${key} : ${employee[key]} `;
    });
    stringTOBePrinted += "\n";
  });
  if (stringTOBePrinted === "") {
    console.log("Error: No employees found.");
  }
  console.log(stringTOBePrinted);
}
// list employees with id
function listEmployeesWithId(_id) {
  let employees = readrFile();
  let stringTOBePrinted = "";
  employees.forEach((employee) => {
    if (employee.id == _id) {
      Object.keys(employee).forEach((key) => {
        stringTOBePrinted += `${key} : ${employee[key]}  `;
      });
      stringTOBePrinted += "\n";
    }
  });

  if (stringTOBePrinted === "") {
    console.log("Error: Employee not found.");
    return;
  }

  console.log(stringTOBePrinted);
}
// list employees with key
function listEmployeesWithKey(key, value) {
  key = key.toLowerCase();
  if (key.startsWith("--")) {
    key = key.slice(2);
  }

  let employees = readrFile();
  let stringTOBePrinted = "";
  employees.forEach((employee) => {
    if (employee[key] == value) {
      Object.keys(employee).forEach((key) => {
        stringTOBePrinted += `${key} : ${employee[key]}  `;
      });
      stringTOBePrinted += "\n";
    }
  });

  if (stringTOBePrinted === "") {
    console.log("Error: Employee not found.");
    return;
  }

  console.log(stringTOBePrinted);
}
// delete employee
function deleteEmployee(_id) {
  let employees = readrFile();
  let index = employees.findIndex((employee) => employee.id == _id);
  if (index === -1) {
    console.log("Error: Employee not found.");
    return;
  }
  employees.splice(index, 1);
  writeToFile(employees);
}
// update employee
function updateEmployee(_id, key, value) {
  if (key.startsWith("--")) {
    key = key.slice(2);
  }

  if (key === "id") {
    console.error("Error: ID cannot be updated.");
    return;
  } else if (key === "name") {
    if (!validateName(value)) {
      return;
    }
  } else if (key === "email") {
    if (!validateEmail(value)) {
      return;
    }
  } else if (key === "level") {
    if (!validateLevel(value)) {
      return;
    }
  } else if (key === "salary") {
    if (!validateSalary(value)) {
      return;
    }
  } else if (key === "years") {
    if (!validateYears(value)) {
      return;
    }
  }

  let employees = readrFile();
  let index = employees.findIndex((employee) => employee.id == _id);
  if (index === -1) {
    console.log("Error: Employee not found.");
    return;
  }
  employees[index][key] = value;
  writeToFile(employees);
}

// main
if (process.argv[2] === "add") {
  addEmployee();
} else if (process.argv[2] === "list" && process.argv[3] && process.argv[4]) {
  listEmployeesWithKey(process.argv[3], process.argv[4]);
} else if (process.argv[2] === "list" && !process.argv[3]) {
  listEmployees();
} else if (process.argv[2] === "list" && process.argv[3]) {
  listEmployeesWithId(process.argv[3]);
} else if (process.argv[2] === "delete" && process.argv[3]) {
  deleteEmployee(process.argv[3]);
} else if (
  process.argv[2] === "update" &&
  process.argv[3] &&
  process.argv[4] &&
  process.argv[5]
) {
  updateEmployee(process.argv[3], process.argv[4], process.argv[5]);
}
