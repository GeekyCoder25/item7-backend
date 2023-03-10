const express = require('express');
const {
	createAccount,
	loginAccount,
	allusers,
} = require('../controllers/authController');

const User = require('../models/users');
const router = express.Router();

router.post('/new-user', createAccount);
router.post('/user', loginAccount);
router.get('/allusers', allusers);
router.delete('/users', (req, res) => {
	User.deleteMany()
		.then(result => {
			res.status(200).json({...result, message: 'All Accounts Deleted'});
		})
		.catch(err => console.log(err));
});
router.get('/user/:id', (req, res) => {
	User.findById(req.params.id)
		.then(result => res.status(200).json(result))
		.catch(err => console.log(err));
});
router.put('/user/:id', (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	})
		.then(result => res.status(200).json(result))
		.catch(err => console.log(err));
});
module.exports = router;
