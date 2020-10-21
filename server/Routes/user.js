const express = require('express');
const Router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant/restaurant');
const jwt = require('jsonwebtoken');
const isloggedin = require('../middleware/auth');
const Order = require('../models/Order');

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
	const tempUser = await User.findOne({
		email: email
	});
	if (tempUser) return res.status(400).send({
		err: 'Email Already exist'
	});
	const user = await User.create(data);
	user.save()
	const token = await jwt.sign({
		userEmail: user.email
	}, TOKENSECRET);
	res.status(200).send({
		token: token
	});
})

Router.post('/login', async (req, res, next) => {
	const {
		email,
		password
	} = req.body;
	const user = await User.findOne({
		email: email
	});
	if (!user) return res.status(400).send({
		err: "Email Not found"
	});
	const validpass = await bcrypt.compare(password, user.password)
	if (!validpass) return res.status(400).send({
		err: "Invalid password"
	})
	const token = await jwt.sign({
		userEmail: user.email
	}, TOKENSECRET);
	res.status(200).json({
		"message": "Signed in successfully"
	});
});


Router.get('/restaurant', isloggedin, async (req, res, next) => {
	try {
		const restaurant = await Restaurant.find();
		res.json(restaurant);
	} catch (err) {
		res.json({
			message: err
		});
	}

});


Router.get('/restaurant/:id', async (req, res, next) => {
	try {
		const restaurant = await Restaurant.findOne({
			_id: req.params.id
		});
		res.json(restaurant);
	} catch (err) {
		res.json({
			message: err
		});
	}

});

Router.get('/restaurant/:id/menu', async (req, res, next) => {
	try {
		const restaurant = await Restaurant.findOne({
			_id: req.params.id
		}).populate('menu').exec();
		res.json(restaurant);
	} catch (err) {
		res.json({
			message: err
		});
	}

});


Router.post('/restaurant/:id/order', isloggedin, async (req, res, next) => {
	const userEmail = req.user.userEmail

	const user = await User.findOne({
		email: userEmail
	})

	if((user.pastorders==null && user.currentorder==null) || (user.currentorder==null)){
		const data = req.body
		const order = await Order.create(data)
		console.log(data.dish);
		
		if (Array.isArray(user.currentorder)) {
			user.currentorder.push(order._id)
		} else {
			user.currentorder = order._id;
		}
		user.save()
		res.json(order)
	}else {
		const data=req.body
		const orderId=user.currentorder._id;
		console.log(orderId)
		const updatedOrder = await Order.findOneAndUpdate({_id: orderId},
			{

				$push:{
					dish: data.dish
				}
			},{
				new: true
			})
			console.log(updatedOrder)
		res.json(updatedOrder)
	}
});



module.exports = Router;