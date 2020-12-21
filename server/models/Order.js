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
		type: Object
	}],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	restaurant: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Restaurant'
	},
	tableNo:{
		type:Number,
		default:0
	}
}, {
	timestamps: true
})

module.exports = mongoose.model('Order', orderSchema);