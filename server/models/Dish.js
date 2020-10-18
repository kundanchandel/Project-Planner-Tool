const mongoose = require('mongoose');

const dishSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,

    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Dishes', dishSchema);