const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const User = require('../models/user')

 router.post('/',(req, res)=>{
    User.find({email: req.body.email})
    .exec()
    .then(user=>{
        if(user.length < 1){
            // 401 means Authorization failed
            return res.status(401).json({message:'Auth failed'})
        }
        bcrypt.compare(req.body.password, user[0].password, (error, result)=>{
            if(error){
                return res.status(401).json({message:'Auth failed'})
            }
            if(result){
                const token = jwt.sign({
                    userId: user[0]._id,
                    firstName: user[0].firstName,
                    lastName: user[0].lastName,
                    email: user[0].email
                },
                require('../config/default').secret_key,
                {expiresIn: '1h'}
                )
                return res.status(200).json({message:'Auth Successful', token: token})
            }
            return res.status(401).json({message:'Auth failed'})
        })
    }).catch(error=>{
        console.log('error while signin user',error)
        res.status(500).json({error:error})
    })
 })
 module.exports=router