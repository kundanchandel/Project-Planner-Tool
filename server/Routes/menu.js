const express = require('express');
const Router = express.Router();
const Dishes = require('../models/Dish');
const Restaurant = require('../models/Restaurant/restaurant');
const isloggedin = require('../middleware/auth');
const {
    aggregate
} = require('../models/Dish');
/************************GET ALL POSTS***************************/
Router.get('/dishes/:id', isloggedin, async (req, res, next) => {
    try {
        const dishes = await Restaurant.find({
            _id: req.params.id
        }).populate("Dishes");
        res.json(dishes);
    } catch (err) {
        res.json({
            message: err
        });
    }

});
Router.post("/dishes/:id", isloggedin, async (req, res, next) => {
    try {
        const user = req.params
        const userId = user.id;
        const {
            name,
            image,
            price,
            category,
            desc
        } = req.body;
        const dish = await Dishes.create({
            name,
            image,
            price,
            category,
            desc,
            owner: aggregate([userId])
        });
        await dish.save();
        const userById = await Restaurant.findById({
            "_id": ObjectId(req.params.id)
        });
        userById.menu.push(dish);
        await userById.save();
    } catch (err) {
        res.json({
            message: err
        });
    }
});

module.exports = Router;