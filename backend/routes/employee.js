const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee');

router.post('/create',employeeController.createEmployee)
router.get('/all',employeeController.getAllEmployee)
router.put('/update/:id',employeeController.updateEmployee)
router.delete('/delete/:id',employeeController.deleteEmployee)

module.exports = router