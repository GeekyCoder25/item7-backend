const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema(
	{
		_id: String,
		name: {
			type: String,
			required: true,
		},
		aspect: {
			type: String,
			required: true,
		},
		startTime: {
			type: String,
			required: true,
		},
		endTime: {
			type: String,
			required: true,
		},
		price: String,
		country: {
			type: String,
			required: true,
			min: 6,
		},
		img: {
			type: String,
			required: true,
		},
		yearsExp: {
			type: String,
			required: true,
		},
		patients: {
			type: String,
			required: true,
		},
		field: {
			type: String,
			required: true,
		},
		fieldAmount: {
			type: String,
			required: true,
		},
		rating: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Doctor', DoctorSchema);
