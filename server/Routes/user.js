const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const isloggedin = require("../middleware/auth");
const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const Dish = require("../models/Dish");
const mail = require("../utils/mail");

const TOKENSECRET = "superSecretTokenOfQDineIn";
require("dotenv").config();

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
<<<<<<< HEAD
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
=======
  const { email, password } = req.body;
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
  const token = await jwt.sign(
    {
      userEmail: user.email,
    },
    TOKENSECRET
  );
  res.status(200).json({
    message: "Signed in successfully",
    token,
  });
>>>>>>> 3dad4581af9cfd046da0d684049a6bd959dda996
});

Router.post("/resetpassword", isloggedin, async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const userEmail = req.user.userEmail;
  const user = await User.findOne({ email: userEmail });
  const validpass = await bcrypt.compare(oldPassword, user.password);
  if (validpass) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    user.save();
    res.status(200).json(user);
  } else {
    res.status(200).json({ err: "Incorrect old password" });
  }
});

Router.post("/forgotpassword", async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    var pass = "";
    var str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";
    for (i = 1; i <= 8; i++) {
      var char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);
    user.password = hashedPassword;
    user.save();
    mail(
      email,
      "Reset Password Link",
      `
  <p>Hello ${user.username}, 
  <br/><br/>
  We heard that you lost your password. Sorry about that! 
  <br/><br/>
  But don’t worry! You can use the following password to login and reset your password.
  <br/><br/>
  Password : ${pass}
  <br/><br/>
  If you did not request this, please ignore this email and your password will be ${pass}.
  <br/><br/>
  Thanks, <br/>
  QDine-In Team 
  </p>
  `
    );
    res.status(200).json({ msg: "Reset Password mail has been sent.." });
  } else {
    res.status(200).json({ err: "Invalid Email Address" });
  }
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
<<<<<<< HEAD
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
=======
  const userEmail = req.user.userEmail;
  const user = await User.findOne({
    email: userEmail,
  });
  if (user.currentorder == null) {
    const data = req.body;
    var tempDish = [];
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
      orderTotal: orderTotal,
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
>>>>>>> 3dad4581af9cfd046da0d684049a6bd959dda996
});

module.exports = Router;