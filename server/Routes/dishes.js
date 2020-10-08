const express = require('express');
const Router = express.Router();
const Dishes = require('../models/Dish');

//GET DISHES
Router.get("/dishes", async (req, res) => {
    try {
        const dishes = await Dishes.find();
        res.json(dishes);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

//ADD DISHES

Router.post("/dishes", async (req, res) => {
    const dish = new Dishes({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        category: req.body.category,
        desc: req.body.desc,
        quantity: req.body.quantity
    });
    try {
        const savedDish = await dish.save();
        res.json(savedDish)
    } catch (err) {
        res.json({
            message: err
        });
    };
})

//UPDATE DISHES

Router.patch('/dishes/:id', async (req, res) => {
    try {
        const updateDish = await Dishes.updateOne({
            _id: req.params.id
        }, {
            $set: {
                name: req.body.name,
                image: req.body.image,
                price: req.body.price,
                category: req.body.category,
                desc: req.body.desc,
                quantity: req.body.quantity
            }
        });
        res.json(updateDish);
    } catch (err) {
        res.json({
            message: err
        });
    };
})

//DELETE DISHES

Router.delete('/dishes/:id', async (req, res) => {
    try {
        const removeDish = await Dishes.deleteOne({
            _id: req.params.id
        });
        res.json(removeDish);
    } catch (err) {
        res.json({
            message: err
        });
    };
})

module.exports = Router;