const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TestSchema = new Schema(
	{ title: String, value: String, rate: String, icon: String, istrue: Boolean },
	{ timestamps: true }
);

module.exports = mongoose.model('Test', TestSchema);
