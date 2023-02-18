const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isMobilePhone} = require('validator');
const CartSchema = new Schema({
	title: String,
	titlePlural: String,
	additionals: [String | Number],
	desserts: [String],
	drinks: [String],
	price: Number,
	deliveryFee: {type: Number, required: [true, 'Server Error, Try again']},
	numberOfItem: Number,
});
const UserDataSchema = new Schema(
	{
		phoneNumber: {
			type: String,
			required: [true, 'Please input your phone number'],
			unique: true,
			validate: [isMobilePhone, 'Invalid phone number'],
		},
		cart: [CartSchema],
		favorites: [String],
		recents: [String],
		orders: [String],
		inviteCode: String,
		userInfo: {
			firstName: String,
			lastName: String,
			username: String,
			email: String,
		},
		notifications: {
			no: Number,
			messages: [String],
		},
	},
	{timestamps: true}
);
module.exports = mongoose.model('userData', UserDataSchema);
