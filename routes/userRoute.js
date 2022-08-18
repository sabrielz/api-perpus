module.exports = app => {

	let Controller = require('../controllers/userController');

	let Auth = require('../controllers/authController');

	app.use('/user', Auth.verify);

	app.get('/user', Controller.all);

	app.get('/user/paginate', Controller.paginate);

	app.get('/user/:id', Controller.get);

	app.put('/user/:id', Controller.update);

	app.delete('/user/:id', Controller.destroy);

}