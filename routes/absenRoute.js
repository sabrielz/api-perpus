module.exports = app => {

	let Controller = require('../controllers/absenController');

	// let Auth = require('../controllers/authController');

	// app.use('/ebook', Auth.verify);

	app.get('/absen', Controller.all);

	app.get('/absen/:id', Controller.findId);
}