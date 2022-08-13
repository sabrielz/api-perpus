module.exports = app => {

	let Controller = require('../controllers/modulController')('video');

	// let Auth = require('../controllers/authController');

	// app.use('/video', Auth.verify);

	app.get('/video', Controller.paginate);

	app.post('/video', Controller.store);

	app.put('/video/:id', Controller.update);

	app.delete('/video/:id', Controller.destroy);

}