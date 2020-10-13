var express = require('express');
var Router = express.Router();
var bcrypt = require('bcrypt');
var Admin = require('../models/Restaurant/restaurant');
var jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
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

// Router.get('/dishes', auth, async (req, res, next) => {
// 	try {
// 		const dishes = await Dishes.find();
// 		res.json(dishes);
// 	} catch (err) {
// 		res.json({
// 			message: err
// 		});
// 	}

// });
// Router.post("/restaurant/dish", auth, async (req, res, next) => {
// 	const restId = req.user._id;
// 	var rest = await Restaurant.findOne({
// 		_id: restId
// 	});
// 	//TODO: Create id and push it to data object
// 	var data = req.body; //{dishName,dishImageURL, dishType, dishPrice, dishDesc, dishQnt, dishID}
// 	rest.menu.push(data);
// 	rest.save();
// 	res.status(200).send(rest.menu);
// })

// Router.get("/restaurant/dish", auth, async (req, res, next) => {
// 	const restId = req.user._id;
// 	var rest = await Restaurant.findOne({
// 		_id: restId
// 	});
// 	res.status(200).send(rest.menu);
// })

// Router.delete("/restaurant/dish/:dishId", auth, async (req, res, next) => {
// 	const restId = req.user._id;
// 	const dishId = req.params.dishId;
// 	var rest = await Restaurant.findOne({
// 		_id: restId
// 	});
// 	var index = -1;
// 	for (var i = 0; i < rest.menu.length; i++) {
// 		if (rest.menu[i]._id == dishId) {
// 			index = i;
// 			break;
// 		}
// 	}
// 	if (index == -1) {
// 		return res.status(400).send({
// 			err: "Dish not found"
// 		})
// 	}
// 	rest.menu.splice(index, 1);
// 	rest.save();
// 	res.status(200).send(rest.menu);
// });

module.exports = Router;