const express = require('express');
const app = express();
const port = 8080
const connectDB = require('./db');
const cors = require('cors')
connectDB();
const userRouter = require('./routes/user')
const employeeRouter = require('./routes/employee')

app.use(cors())
app.use(express.json({limit:'50mb'}))

app.get('/',(req,res)=>{
    res.send("welcome page")
})

app.use('/users',userRouter)
app.use('/employees',employeeRouter)

app.listen(port,()=>{
    console.log('server is running on port '+ port)
})