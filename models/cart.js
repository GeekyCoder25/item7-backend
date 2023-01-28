const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isMobilePhone} = require('validator');
const CartSchema = new Schema(
	{
		title: String,
		titlePlural: String,
		additionals: [String],
		desserts: [String],
		drinks: [String],
		price: Number,
		deliveryFee: String | Number,
		numberOfItem: Number,
		image: [String],
	},
	{timestamps: true}
);

module.exports = mongoose.model('cart', CartSchema);
