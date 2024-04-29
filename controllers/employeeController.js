const { get } = require('mongoose');
const Employee = require('../models/Employee');


const createEmployee = async(req,res)=>{
    try{
        const {names, email, phone, city} = req.body

        const employee =new Employee({
            names,
            email,
            phone,
            city
        })
        await employee.save()
        res.status(201).json(employee)

    }catch(error){
        console.log(" there is an error",error)
        res.status(500).json({message:'server error'})
    }
}

const getEmployees = async(req,res)=>{
    try{
        const employee = await Employee.find()
        res.status(200).json(employee)
    }catch(error){
        console.log("There is error",error)
        res.status(500).json({message:"server error"})
    }
}

const singleEmployee = async(req,res)=>{
    try{
        const employee = await Employee.findById(req.params.id)
        res.status(200).json(employee)
        if(!employee){
            return res.status(404).json({message:"Employee not found"})
        }
    }
    catch(error){
        console.error("there is a error",error)
        res.status(500).json({message:"server error"})

    }
    
    
}
const updateEmployee = async (req,res)=>{
    try{
        const{names, email, phone,city } = req.body
        const myEmployee  = await Employee.findByIdAndUpdate(
            req.params.id,
            {names,email,phone, city}

        )
        if(!myEmployee){
            return res.status(404).json({message:"employee not found"})
        }
        res.status(200).json(myEmployee)

    }catch(error){
        console.error("Record not found",error)
        res.status(500).json({message:"Server Error"})
    }
}
const deleteEmployee = async (req,res)=>{
    try{
        const deleteemployee = await Employee.findByIdAndDelete(req.params.id)
        res.status(204).send()
    }catch(error){
        console.error("Record not found",error)
        res.status(500).json({message:"Server Error"})
}}

module.exports ={ createEmployee ,getEmployees,singleEmployee, updateEmployee, deleteEmployee }