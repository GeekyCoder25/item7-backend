const {v4: uuidv4} = require('uuid');
const {Mongoose} = require('mongoose');
const UserDataModel = require('../models/userDataModel');

exports.getUserData = (req, res) => {
	// res.send(req.params.id);
	UserDataModel.findOne({phoneNumber: req.params.id}).then(result => {
		console.log('get', result);
		res.status(200).json(result);
	});
};
exports.postUserData = (req, res) => {
	UserDataModel.create({phoneNumber: req.params.id, ...req.body})
		.then(result => {
			console.log(result);
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			if (err.code === 11000) {
				res
					.status(400)
					.json('Phone number has already been used with another account');
			} else if (err.message.includes('user validation failed')) {
				const errors = handleErrors(err);
				res.status(400).json(Object.values(errors)[0]);
			}
		});
};
exports.postCart = (req, res) => {
	UserDataModel.updateOne({cart: req.body})
		.then(result => {
			console.log(result);
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			return res.send(err);
		});
};
exports.putCart = (req, res) => {
	UserDataModel.updateOne(
		{'cart._id': req.body._id},
		{
			$set: {
				'cart.$.numberOfItem': req.body.numberOfItem,
			},
		}
	)
		.then(result => {
			console.log(req.body._id);
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			return res.send(err);
		});
};
exports.deleteCart = (req, res) => {
	console.log(req.params);
	UserDataModel.updateOne(
		{phoneNumber: req.params.id},
		{$pull: {cart: {_id: req.params._id}}}
	)
		.then(result => {
			res.status(204).json({deleted: result});
		})
		.catch(err => {
			console.log(err);
			return res.send(err);
		});
};
exports.putUserData = (req, res) => {
	UserDataModel.findOneAndUpdate({phoneNumber: req.params.id}, req.body, {
		new: true,
		runValidators: true,
	})
		.then(result => {
			console.log(result);
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			if (err.code === 11000) {
				res
					.status(400)
					.json('Phone number has already been used with another account');
			} else if (err.message.includes('user validation failed')) {
				const errors = handleErrors(err);
				res.status(400).json(Object.values(errors)[0]);
			}
		});
};
const handleErrors = err => {
	let errors = {};
	console.log(err.message, err.code);
	Object.values(err.errors).forEach(({properties}) => {
		errors[properties.path] = properties.message;
	});

	return errors;
};
