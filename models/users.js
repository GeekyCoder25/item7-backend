const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isMobilePhone} = require('validator');
const UserSchema = new Schema(
	{
		firstName: {
			type: String,
			required: [true, 'Please input Your first name'],
		},
		lastName: {
			type: String,
			required: [true, 'Please input Your last name'],
		},
		phoneNumber: {
			type: String,
			required: [true, 'Please input your phone number'],
			unique: true,
			validate: [isMobilePhone, 'Invalid phone number'],
		},
		password: {
			type: String,
			required: [true, 'Please input a password'],
			minlength: [6, 'Your password must be at least 6 characters'],
		},
	},
	{timestamps: true}
);

module.exports = mongoose.model('user', UserSchema);
