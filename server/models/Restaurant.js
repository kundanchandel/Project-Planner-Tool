var mongoose = require('mongoose');

var restaurantSchema = new mongoose.Schema({
        username: {
                type: String,
                required: true
        },
        email: {
                type: String,
                required: true
        },
        phoneno: {
                type: String,
                required: true
        },
        password: {
                type: String,
                required: true
        },
        menu: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Dish"
        }],
}, {
        timestamps: true
});

module.exports = mongoose.model("Restaurant", restaurantSchema);