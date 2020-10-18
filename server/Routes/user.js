var express = require('express');
var Router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/User');
var Restaurant = require('../models/Restaurant/restaurant');
var jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

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

Router.post('/signin', async (req, res, next) => {
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
		"message":"Signed in successfully"
    });
});


Router.get('/restaurant', async (req, res, next) => {
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
		const restaurant = await Restaurant.findOne({_id:req.params.id});
		res.json(restaurant);
	} catch (err) {
		res.json({
			message: err
		});
	}

});

Router.get('/restaurant/:id/dish', async (req, res, next) => {
	try {
		const restaurant = await Restaurant.findOne({_id:req.params.id}).populate('menu').exec();
		res.json(restaurant);
	} catch (err) {
		res.json({
			message: err
		});
	}

});


module.exports = Router;