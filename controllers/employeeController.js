const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
    res.render("employee/addOrEdit",{
        viewTitle : "InsertEmployee"
    })
});

router.post('/', (req, res) => {
    InsertRecord(req,res);
});

function InsertRecord(req, res) {
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    console.log(req.body);
    employee.save((err, doc) => {
        if (!err) {
            res.redirect('employee/list');
        } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, body);
                res.render("employee/addOrEdit",{
                    viewTitle: "Insert Employee",
                    employee: req.body 
                });
            }
            console.log('Error during record insertion : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    res.json('from list');
});

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
    err.errors
}

module.exports = router;