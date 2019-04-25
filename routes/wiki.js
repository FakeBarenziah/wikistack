const express = require('express');
const router = express.Router();
const { addPage, wikiPage, main } = require('../views');
const { db, Page, User } = require('../models');

router.get('/', async (req, res, next) => {
	res.send(main(await Page.findAll()));
});

router.post('/', async (req, res, next) => {
	try {
		const [ user, wasCreated ] = await User.findOrCreate({
			where: {
				name: req.body.name,
				email: req.body.email
			}
		});

		const page = await Page.create(req.body);

		page.setAuthor(user);

		await page.save();
		res.redirect(`/wiki/${page.slug}`);
	} catch (error) {
		next(error);
	}
});

router.get('/add', (req, res, next) => {
	console.log('made it to wiki');
	res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
	try {
		const page = await Page.findOne({
			where: {
				slug: req.params.slug
			}
		});

		const user = await User.findByPk(page.authorId);

		res.send(wikiPage(page, user));
		// res.json(page);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
