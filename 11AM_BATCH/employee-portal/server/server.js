const express = require('express');
const app = express();
const mongodb = require('./database/dbOperations');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const hostname = '127.0.0.1';
const port = 8000;

// Basic URL for Application Startup
app.get('/',(request,response) => {
    response.send('Welcome to Infosys Employee Portal: Please use "/api/" url');
});

// READ ALL Employees Operation
app.get('/api/employees/',(request,response) => {
    // get the connection Object
    let db = mongodb.getDB();
    db.collection('employees').find().toArray((err , employees) => {
        if(err) throw  err;
        console.log('Iam from GET All Employees');
        response.json(employees);
    });
});

// READ Single Employee
app.get('/api/employees/:id',(request,response) => {
    let empId = Number.parseInt(request.params.id);
    // get the connection Object
    let db = mongodb.getDB();
    db.collection('employees').find({ id: empId }).toArray((err , employees) => {
        if(err) throw  err;
        console.log('Iam from GET Single Employees');
        response.json(employees);
    });
});

// CREATE New Employee
app.post('/api/employees/', jsonParser , (request,response) => {
    // find the Max Id
    let empId = 1;
    let db = mongodb.getDB();
    db.collection('employees').find().sort({_id:-1}).limit(1).toArray((err , employees) => {
        if(err) throw  err;
        if(employees.length > 0){
            empId = employees[0].id + 1;
        }
        // get the form data
        let newEmployee = {
            id : empId,
            first_name : request.body.first_name,
            last_name : request.body.last_name,
            email : request.body.email,
            gender : request.body.gender,
            ip_address : request.body.ip_address
        };
        db.collection('employees').insertOne(newEmployee, (err , r) => {
            console.log('One Employee has been inserted to database');
            response.json(newEmployee);
        });
    });
});

// Update Employee
app.put('/api/employees/:id', jsonParser , (request,response) => {
    let empId = Number.parseInt(request.params.id);
    let updatedEmployee = {
        id : empId,
        first_name : request.body.first_name,
        last_name : request.body.last_name,
        email : request.body.email,
        gender : request.body.gender,
        ip_address : request.body.ip_address
    };
    // get db connection object
    let db = mongodb.getDB();
    db.collection('employees').findOneAndUpdate({id : empId} , { $set : updatedEmployee} , (err , r) => {
        if(err) throw  err;
        console.log('Employee Record is updated');
        response.json(updatedEmployee);
    });
});

// DELETE an Existing Employee
app.delete('/api/employees/:id', (request,response) => {
    let empId = Number.parseInt(request.params.id);
    // get db  connection
    let db = mongodb.getDB();
    db.collection('employees').deleteOne({id : empId}, (err , r) => {
        console.log('Employee Record is Deleted');
        response.json(r);
    });
});

// Create the Database Connection
mongodb.mongoConnect(() => {
    // server startup logic
    app.listen(port,hostname, () => {
        console.log(`Server is Started at http://${hostname}:${port}`);
    });
});



