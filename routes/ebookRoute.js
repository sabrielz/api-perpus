module.exports = app => {

	let Controller = require('../controllers/modulController')('ebook');

	// let Auth = require('../controllers/authController');

	// app.use('/ebook', Auth.verify);

	app.get('/ebook?:page?', Controller.paginate);

	app.get('/ebook/count', Controller.count);

	app.get('/ebook/:id', Controller.read);

	app.post('/ebook', Controller.store);

	app.put('/ebook/:id', Controller.update);

	app.delete('/ebook/:id', Controller.destroy);

}