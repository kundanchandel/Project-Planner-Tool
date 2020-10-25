const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderTotal: {
        default: 0,
        type: Number
    },
    isPaid: {
        default: false,
        type: Boolean
    },
    dish: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dish"
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema);