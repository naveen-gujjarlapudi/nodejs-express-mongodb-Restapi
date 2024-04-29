const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const employeeRoutes = require('./routes/employeeRoutes')



const app = express()

const PORT = process.env.PORT || 5000 
dotEnv.config()

app.use(bodyparser.json())
mongoose.connect(process.env.mongo_uri)
.then(
    ()=>{
        console.log("mongo db connected sucess fully")
    }
).catch(
    (error)=>{
        console.log(`${error}`);
    }
)

app.use('/employee',employeeRoutes);

app.listen(PORT,()=>{
    console.log(`server stated at port ${PORT}`)

})