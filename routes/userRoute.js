module.exports = app => {

	let Controller = require('../controllers/userController');

	let Auth = require('../controllers/authController');

	// app.use('/user', Auth.verify);

	app.get('/user', Controller.all);

	app.get('/user/count', Controller.count);

	app.get('/user/nis/:id', Controller.nis);

	app.get('/user/:id', Controller.get);

	app.put('/user/:id', Controller.update);

	app.delete('/user/:id', Controller.destroy);

}