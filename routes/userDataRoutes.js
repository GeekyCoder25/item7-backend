const express = require('express');
const {
	postUserData,
	getUserData,
	putUserData,
	putCart,
	deleteCart,
	postCart,
	postFavorite,
	getFavorite,
	getRecents,
	postRecents,
} = require('../controllers/userDataController');

const router = express.Router();

router.get('/userData/:id', getUserData);
router.post('/userData/:id', postUserData);
router.put('/userData/:id', putUserData);
router.post('/cart/:id', postCart);
router.put('/cart/:id', putCart);
router.delete('/cart/:id/:_id', deleteCart);
router.get('/favorites/:id/', getFavorite);
router.post('/favorites/:id', postFavorite);
router.get('/recents/:id/', getRecents);
router.post('/recents/:id', postRecents);
module.exports = router;
