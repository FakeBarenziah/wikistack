const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const { db, Page, User } = require('../models');

router.get('/', async (req, res, next) => {
	res.send(await User.findAll());
});

router.get('/:user', async (req, res, next) => {
	res.send(await User.findAll());
});

router.post('/', async (req, res, next) => {
	res.send(await Page.findAll());
});

router.put('/', async (req, res, next) => {
	res.send();
});

router.put('/', async (req, res, next) => {
	res.send();
});

module.exports = router;
