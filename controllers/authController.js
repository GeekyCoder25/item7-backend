const User = require('../models/users');
const handleErrors = err => {
	let errors = {};
	console.log(err.message, err.code);
	Object.values(err.errors).forEach(({properties}) => {
		errors[properties.path] = properties.message;
	});

	return errors;
};

const handlephoneNumber = (req, res) => {
	if (req.body.phoneNumber.startsWith('0')) {
		const tempNumber = req.body.phoneNumber.replace('0', '+234');
		req.body.phoneNumber = tempNumber;
	} else if (
		req.body.phoneNumber.startsWith('7') ||
		req.body.phoneNumber.startsWith('8') ||
		req.body.phoneNumber.startsWith('9')
	) {
		const tempNumber = req.body.phoneNumber.replace(
			req.body.phoneNumber.charAt(0),
			`+234${req.body.phoneNumber.charAt(0)}`
		);
		req.body.phoneNumber = tempNumber;
	}
};
exports.createAccount = (req, res) => {
	console.log('new user');
	handlephoneNumber(req, res);
	User.create(req.body)
		.then(data =>
			res.status(200).json({
				success: 'Account Created Successfully',
				data: {
					firstName: data.firstName,
					lastName: data.lastName,
					phoneNumber: data.phoneNumber,
				},
			})
		)
		.catch(err => {
			process.env.NODE_ENV === 'development' && console.log(err);
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

exports.loginAccount = (req, res) => {
	handlephoneNumber(req, res);
	User.findOne({phoneNumber: req.body.phoneNumber})
		.then(result => {
			console.log(req.body);
			console.log(result);
			if (result === null) throw '';
			else if (req.body.password !== result.password)
				res.status(400).json('Incorect Password');
			else {
				res.status(200).json({
					data: {
						firstName: result.firstName,
						lastName: result.lastName,
						phoneNumber: result.phoneNumber,
					},
				});
			}
		})
		.catch(err => {
			res.status(400).json("Account doesn't exist");
			console.log(err);
		});
};
exports.allusers = (req, res) => {
	User.find()
		.then(result => res.status(200).json(result))
		.catch(err => console.log(err));
};
