const Employee = require('../models/Employee');
const createEmployee = async (req,res)=>{
    try{
        const employee = new Employee({
            name:req.body.name,
            email:req.body.email,
            mobileno:req.body.mobileno,
            designation:req.body.designation,
            gender:req.body.gender,
            course:req.body.course,
            image:req.body.image
        })
        await employee.save();
        res.status(201).json({
            message:'Employee created successfully'
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

const  getAllEmployee = async (req,res)=>{
    try{
        const employee = await Employee.find();
        res.status(200).json({
            message:'All Employee',
            employee
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

const updateEmployee = async (req,res)=>{
    try{
        const employee = await Employee.findById(req.params.id);
        if(!employee){
            res.status(404).json({
                message:'Employee not found'
            })
        }else{
            employee.name = req.body.name;
            employee.email = req.body.email;
            employee.mobileno = req.body.mobileno;
            employee.designation = req.body.designation;
            employee.gender = req.body.gender;
            employee.course = req.body.course;
            employee.image = req.body.image;
            await employee.save();
            res.status(200).json({
                message:'Employee updated successfully'
            })
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

const deleteEmployee = async (req,res)=>{
    console.log("hello")
    console.log(req.params.id)
    try{
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if(!employee){
            res.status(404).json({
                message:'Employee not found'
            })
        }else{
            res.status(200).json({
                message:'Employee deleted successfully'
            })
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

module.exports ={
    createEmployee,
    getAllEmployee,
    updateEmployee,
    deleteEmployee
}