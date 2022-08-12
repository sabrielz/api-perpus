module.exports = app => {

	let Controller = require('../controllers/modulController');

	let Auth = require('../controllers/authController');

	app.use('/ebook', Auth.verify);

	app.use('/video', Auth.verify);

	app.get('/ebook', Controller.paginate);

	app.get('/video', Controller.paginate);

}