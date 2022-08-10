module.exports = app => {

	const Controller = require('../controllers/userController');

	app.get('/user', Controller.all);

	app.get('/user/migrate', Controller.migrate);

	app.get('/user/seed', Controller.seed);

}