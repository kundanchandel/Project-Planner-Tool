var express = require('express');
var Router = express.Router();
var bcrypt = require('bcrypt');
var Admin = require('../models/Restaurant/restaurant');
var jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Dish= require('../models/Dish');

const TOKENSECRET = 'superSecretTokenOfQDineIn'

Router.post('/signup', async (req, res, next) => {
	const {
		username,
		email,
		phoneno,
		password
	} = req.body;

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const data = {
		username: username,
		email: email,
		phoneno: phoneno,
		password: hashedPassword
	}
	const tempAdmin = await Admin.findOne({
		email: email
	});
	if (tempAdmin) return res.status(400).send({
		err: 'Email Already exist'
	});
	const admin = await Admin.create(data);
	admin.save()
	const token = await jwt.sign({
		adminEmail: admin.email
	}, TOKENSECRET);
	res.status(200).send({
		token: token
	});
})

Router.post('/signin', async (req, res, next) => {
	const {
		email,
		password
	} = req.body;
	const admin = await Admin.findOne({
		email: email
	});
	if (!admin) return res.status(400).send({
		err: "Email Not found"
	});
	const validpass = await bcrypt.compare(password, admin.password)
	if (!validpass) return res.status(400).send({
		err: "Invalid password"
	})
	const token = await jwt.sign({
		adminEmail: admin.email
	}, TOKENSECRET);
	res.status(200).send({
		token: token
	});
});

Router.get('/', auth.isloggedin,async(req, res, next)=>{
	const restEmail = req.user.adminEmail
	const rest = await Admin.findOne({email:restEmail}).populate('menu').exec()
	res.send(rest)
});

Router.post('/dish',auth.isloggedin, async(req, res,next)=>{
	const data = req.body
	const dish = await Dish.create(data)
	const restEmail = req.user.adminEmail
	const rest = await Admin.findOne({email:restEmail})
	rest.menu.push(dish._id)
	rest.save()
	res.send(dish)
});

Router.get('/dish/:dishid', async(req, res, next)=>{
	const dish = await Dish.findOne({_id: req.params.dishid})
	res.send(dish)
});

Router.put('/dish/:dishid', auth.isloggedin, async(req, res ,next) =>{
	const dish = await Dish.findOne({_id: req.params.dishid})
	const {name, image, price, desc, category} = req.body	
	dish.name= name
	dish.price= price
	dish.image= image
	dish.desc= desc
	dish.category= category
	dish.save()
	res.send(dish)
});

Router.delete('/dish/:dishid', auth.isloggedin, async(req, res ,next) =>{
	const dish = await Dish.findOneAndDelete({_id: req.params.dishid})
	const adminEmail = req.user.adminEmail
	const rest = await Admin.findOne({email:adminEmail})
	const index = rest.menu.indexOf(req.params.dishid)
	if(index!=-1) {
		rest.menu.splice(index, 1)
	}
	rest.save()
	res.send(dish)
});

module.exports = Router;