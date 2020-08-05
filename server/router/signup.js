const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const User = require('../models/user')
router.post('/', (req, res)=>{
    //200: Success
    User.find({email: req.body.email})
    .exec()
    .then(user=>{
        if(user.length !== 0 && user.length >= 1){
            //409: User already exist OR conflict
            return res.status(409).json({message:'User already exist'})
        }
        else{
            bcrypt.hash(req.body.password, 10, (error, hash)=>{
                if(error){
                    console.log('error while bcrypt', error)
                    //500: Internal server error
                    return res.status(500).json({error:error})
                }else{
                    const newUser = new User({
                        _id: mongoose.Types.ObjectId(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash
                    })
                    newUser.save().then(result =>{
                        console.log('result while saving new user',result)
                        //201: User created successfully
                        res.status(201).json({message: 'User created'})
                    }).catch(error=>{
                        console.log('error while save user',error)
                        res.status(500).json({error:error})
                    })
                }
            })
        }
    }).catch(error=>{
        console.log('error while user creation', error)
        return res.status(500).json({error:error})
    })
})
module.exports=router