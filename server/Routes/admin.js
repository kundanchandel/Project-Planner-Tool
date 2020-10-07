var express = require('express');
var Router = express.Router();
var bcrypt = require('bcrypt');
var Admin = require('../models/Admin/admin');
var jwt = require('jsonwebtoken');



const TOKENSECRET = 'superSecretTokenOfQDineIn'

Router.post('/signup',async (req,res,next)=>{
        const {username,email,phoneno,password} = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const data = {
                username:username, email:email, phoneno:phoneno, password:hashedPassword
        }
        const tempAdmin = await Admin.findOne({email:email});
        if(tempAdmin) return res.status(400).send({err:'Email Already exist'});
        const admin = await Admin.create(data);
        admin.save()
        const token = await jwt.sign({adminEmail:admin.email},TOKENSECRET);
        res.status(200).send({token:token});
})

Router.post('/signin',async (req,res,next)=>{
        const {email,password} = req.body;
        const admin =await Admin.findOne({email:email});
        if(!admin) return res.status(400).send({err:"Email Not found"});
        const validpass = await bcrypt.compare(password,admin.password)
        if(!validpass) return res.status(400).send({err:"Invalid password"})
        const token = await jwt.sign({adminEmail:admin.email},TOKENSECRET);
        res.status(200).send({token:token});
})

module.exports = Router;