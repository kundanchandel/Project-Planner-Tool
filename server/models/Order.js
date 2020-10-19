const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    subTotal: {
        default: 0,
        type: Number
    },
    isPaid: {
        default: false,
        type: Boolean
    },
    dish: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dishes'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Orders', orderSchema);