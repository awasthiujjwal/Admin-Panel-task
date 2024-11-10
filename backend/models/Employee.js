const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    mobileno:{
        type:Number,
        required:true
    },
    designation:{
        type:String,
        required:true,
        enum:['HR','Manager','Sales']
    },
    gender:{
        type:String,
        required:true,
        enum:['male','female']
    },
    image:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true,
        enum:['MCA','BCA','BSC']
    },
   
},{timestamps:true})

module.exports = mongoose.model('employees',employeeSchema)