module.exports = app => {

	let Controller = require('../controllers/authController');

	app.post('/login', Controller.login);

	app.post('/register', Controller.register);

	app.post('/check', Controller.check);

}