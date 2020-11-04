const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const isloggedin = require("../middleware/auth");
const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const Dish = require("../models/Dish");

const TOKENSECRET = "superSecretTokenOfQDineIn";

Router.post("/signup", async (req, res, next) => {
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
		password: hashedPassword,
	};
	const tempUser = await User.findOne({
		email: email,
	});
	if (tempUser)
		return res.status(400).send({
			err: "Email Already exist",
		});
	const user = await User.create(data);
	user.save();
	const token = await jwt.sign({
			userEmail: user.email,
		},
		TOKENSECRET
	);
	res.status(200).send({
		token: token,
	});
});

Router.post("/login", async (req, res, next) => {
	const {
		email,
		password
	} = req.body;
	const user = await User.findOne({
		email: email,
	});
	if (!user)
		return res.status(400).send({
			err: "Email Not found",
		});
	const validpass = await bcrypt.compare(password, user.password);
	if (!validpass)
		return res.status(400).send({
			err: "Invalid password",
		});
	const token = await jwt.sign({
			userEmail: user.email,
		},
		TOKENSECRET
	);
	res.status(200).json({
		message: "Signed in successfully",
	});
});

Router.get("/restaurant", isloggedin, async (req, res, next) => {
	try {
		const restaurant = await Restaurant.find();
		res.json(restaurant);
	} catch (err) {
		res.json({
			message: err,
		});
	}
});

Router.get("/restaurant/:id", async (req, res, next) => {
	try {
		const restaurant = await Restaurant.findOne({
			_id: req.params.id,
		});
		res.json(restaurant);
	} catch (err) {
		res.json({
			message: err,
		});
	}
});

Router.get("/restaurant/:id/menu", async (req, res, next) => {
	try {
		const restaurant = await Restaurant.findOne({
				_id: req.params.id,
			})
			.populate("menu")
			.exec();
		res.json(restaurant);
	} catch (err) {
		res.json({
			message: err,
		});
	}
});

Router.post("/restaurant/:id/order", isloggedin, async (req, res, next) => {
	const userEmail = req.user.userEmail;
	const user = await User.findOne({
		email: userEmail,
	});
	if (user.currentorder == null) {
		const data = req.body;
		var tempDish = []
		var orderTotal = 0;
		for (var i = 0; i < data.dish.length; i++) {
			let dishid = data.dish[i]._id;
			const orderDishes = await Dish.findOne({
				_id: dishid,
			});
			let total = orderDishes.price * data.dish[i].quantity;
			orderTotal = orderTotal + total;
			let tempData = {
				orderDishes,
				qnt: data.dish[i].quantity,
				total,
			};
			tempDish.push(tempData);
		}
		const order = await Order.create({
			dish: tempDish,
			user: user._id,
			orderTotal: orderTotal
		});
		user.currentorder = order._id;
		user.save();
		console.log(order, user);
		res.send(order);
	} else {
		const orderId = user.currentorder._id;
		const data = req.body;
		var updatedOrder = await Order.findOne({
			_id: orderId,
		});
		var orderTotal = updatedOrder.orderTotal;
		for (var i = 0; i < data.dish.length; i++) {
			let dishid = data.dish[i]._id;
			const orderDishes = await Dish.findOne({
				_id: dishid,
			});
			let total = orderDishes.price * data.dish[i].quantity;
			orderTotal = orderTotal + total;
			let tempData = {
				orderDishes,
				qnt: data.dish[i].quantity,
				total,
			};
			updatedOrder.dish.push(tempData);
		}
		updatedOrder.orderTotal = orderTotal;
		updatedOrder.save();
		res.json(updatedOrder);
	}
});

module.exports = Router;