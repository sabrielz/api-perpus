module.exports = app => {

	const Controller = require('../controllers/userController');

	app.get('/user/:id', Controller.get);

}