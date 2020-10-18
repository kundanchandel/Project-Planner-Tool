const express = require('express');
const Router = express.Router();
const bcrypt = require('bcrypt');
const Restaurant = require('../models/Restaurant/restaurant');
const Dishes = require('../models/Dish');
const jwt = require('jsonwebtoken');
const isloggedin = require('../middleware/auth');
const uuid = require('uuid');



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
	const tempAdmin = await Restaurant.findOne({
		email: email
	});
	if (tempAdmin) return res.status(400).send({
		err: 'Email Already exist'
	});
	const admin = await Restaurant.create(data);
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
	const admin = await Restaurant.findOne({
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


Router.get("/restaurant/dish", isloggedin, async (req, res, next) => {
	const restId = req.user._id;
	const rest = await Restaurant.findOne({
		_id: restId
	});
	res.status(200).send(rest.menu);
})

Router.delete("/restaurant/dish/:dishId", isloggedin, async (req, res, next) => {
	const restId = req.user._id;
	const dishId = req.params.dishId;
	const rest = await Restaurant.findOne({
		_id: restId
	});
	const index = -1;
	for (const i = 0; i < rest.menu.length; i++) {
		if (rest.menu[i]._id == dishId) {
			index = i;
			break;
		}
	}
	if (index == -1) {
		return res.status(400).send({
			err: "Dish not found"
		})
	}
	rest.menu.splice(index, 1);
	rest.save();
	res.status(200).send(rest.menu);
});


module.exports = Router;