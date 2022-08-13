module.exports = app => {

	let Controller = require('../controllers/modulController')('ebook');

	// let Auth = require('../controllers/authController');

	// app.use('/ebook', Auth.verify);

	app.get('/ebook', Controller.paginate);

	app.post('/ebook', Controller.store);

	app.put('/ebook/:id', Controller.update);

	app.delete('/ebook/:id', Controller.destroy);

}