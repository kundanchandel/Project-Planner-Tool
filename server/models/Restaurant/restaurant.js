var mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema({
        username: {
                type: String
        },
        email: {
                type: String
        },
        phoneno: {
                type: String
        },
        password: {
                type: String
        },
        menu: [{
                type:mongoose.Schema.Types.ObjectId,
                ref :"Dish"
            }
        ],
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);