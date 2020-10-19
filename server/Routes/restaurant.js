const express = require('express');
const Router = express.Router();
const bcrypt = require('bcrypt');
const Restaurant = require('../models/Restaurant/restaurant');
const Dishes = require('../models/Dish');
const jwt = require('jsonwebtoken');
const isloggedin = require('../middleware/auth');
const uuid = require('uuid');
const Dish = require('../models/Dish');
const fetch = require('node-fetch');

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
})
Router.get('/', isloggedin, async (req, res, next) => {
	const restEmail = req.user.adminEmail
	const rest = await Admin.findOne({
		email: restEmail
	}).populate('menu').exec()
	res.send(rest)
});

Router.post('/dish', isloggedin, async (req, res, next) => {
	const data = req.body
	const dish = await Dish.create(data)
	const restEmail = req.user.adminEmail
	const rest = await Admin.findOne({
		email: restEmail
	})
	rest.menu.push(dish._id)
	rest.save()
	res.send(dish)
});

Router.get('/dish/:dishid', async (req, res, next) => {
	const dish = await Dish.findOne({
		_id: req.params.dishid
	})
	res.send(dish)
});

Router.put('/dish/:dishid', isloggedin, async (req, res, next) => {
	const dish = await Dish.findOne({
		_id: req.params.dishid
	})
	const {
		name,
		image,
		price,
		desc,
		category
	} = req.body
	dish.name = name
	dish.price = price
	dish.image = image
	dish.desc = desc
	dish.category = category
	dish.save()
	res.send(dish)
});

Router.delete('/dish/:dishid', isloggedin, async (req, res, next) => {
	const dish = await Dish.findOneAndDelete({
		_id: req.params.dishid
	})
	const adminEmail = req.user.adminEmail
	const rest = await Admin.findOne({
		email: adminEmail
	})
	const index = rest.menu.indexOf(req.params.dishid)
	if (index != -1) {
		rest.menu.splice(index, 1)
	}
	rest.save()
	res.send(dish)
});


//FETCHING ORDER FROM USER
// Router.get('/restaurant/orders', isloggedin, async (req, res, next) => {
// 	const api = "http://localhost:7000/api/user/restaurant/5f8d6d1046fa624c9e823d6c/order";
// 	fetch(api)
// 		.then(response => {
// 			return response.json();
// 		})
// 		.then(data => {
// 			console.log(data);

// 		});

// })


module.exports = Router;