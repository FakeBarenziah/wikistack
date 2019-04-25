const express = require('express');
const morgan = require('morgan');
const app = express();
const { db, Page, User } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

app.use(express.static(__dirname + `/public`));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);
app.get('/', (req, res, next) => {
	res.redirect('/wiki');
});

const init = async () => {
	await db.sync({ force: true });
	app.listen(3000, () => {
		console.log('db server is listening');
	});
};

init();
