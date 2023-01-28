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
	}
	// {timestamps: true}
);
const UserDataSchema = new Schema(
	{
		phoneNumber: {
			type: String,
			required: [true, 'Please input your phone number'],
			unique: true,
			validate: [isMobilePhone, 'Invalid phone number'],
		},
		cart: [CartSchema],
		// favorites: [cart],
		// recents: [cart],
	},
	{timestamps: true}
);

module.exports = mongoose.model('userData', UserDataSchema);
