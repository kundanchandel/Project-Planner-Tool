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
                type: Object
        }],
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);