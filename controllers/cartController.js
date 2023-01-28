const CartModel = require('../models/cart');

exports.getUserData = (req, res) => {
	// res.send(req.params.id);
	CartModel.findOne({phoneNumber: req.params.id}).then(result => {
		console.log(result);
		res.status(200).json(result);
	});
};
exports.postUserData = (req, res) => {
	CartModel.create(req.body)
		.then(result => {
			console.log(result);
			res.status(200).json({
				_id: result._id,
				phoneNumber: result.phoneNumber,
				userData: result.userData,
			});
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
exports.putUserData = (req, res) => {
	CartModel.findOneAndUpdate({phoneNumber: req.params.id}, req.body, {
		new: true,
		runValidators: true,
	})
		.then(result => {
			console.log(result);
			res.status(200).json({
				_id: result._id,
				phoneNumber: result.phoneNumber,
				userData: result.userData,
			});
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
