const User = require('../models/User');

const createUser = async (req,res)=>{
    try{
        const user = new User({
            userName:req.body.userName,
            password:req.body.password,
        })
        await user.save();
        res.status(201).json({
            message:'User created successfully'
        })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}
const loginUser = async (req,res)=>{
    try{
        const user = await User.findOne({userName:req.body.userName,password:req.body.password});
        if(!user){
            res.status(401).json({
                message:'Invalid Credentials'
            })
        }else{
            res.status(200).json({
                message:'Login Successful',
                user
            })
        }
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

exports.createUser = createUser;
exports.loginUser = loginUser;