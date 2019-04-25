const express = require('express');
const router = express.Router();
const { addPage } = require('../views');
const { db, Page, User } = require('../models');

router.get('/', async (req, res, next) => {
	res.send(await Page.findAll());
});

router.post('/', async (req, res, next) => {
	const page = new Page({
		title: req.body.title,
		content: req.body.content
	});

	try {
		await page.save();
		res.redirect('/');
	} catch (error) {
		next(error);
	}
});

router.get('/add', (req, res, next) => {
	console.log('made it to wiki');
	res.send(addPage());
});

module.exports = router;
