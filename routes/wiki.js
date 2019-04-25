const express = require('express');
const router = express.Router();
const { addPage } = require('../views');
const { db, Page, User } = require('../models');

router.get('/', async (req, res, next) => {
	res.send(await Page.findAll());
});

router.post('/', async (req, res, next) => {
	res.send(await Page.findAll());
});

router.get('/add', (req, res, next) => {
	console.log('made it to wiki');
	res.send(addPage());
});

module.exports = router;
