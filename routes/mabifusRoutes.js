const express = require('express');
const {createAccount, loginAccount} = require('../controllers/authController');

const Test = require('../models/tests');
const User = require('../models/users');
const router = express.Router();

router.post('/new-user', createAccount);
router.get('/users', loginAccount);
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
router.get('/tests', (req, res) => {
	Test.find()
		.then(result => res.status(200).json(result))
		.catch(err => console.log(err));
});

module.exports = router;
