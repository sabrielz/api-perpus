module.exports = app => {

	let types = ['ebook', 'video'];

	let Auth = require('../controllers/authController');
	
	types.map(type => {

		let base = '/'+type;
		
		let Controller = require('../controllers/modulController')(type);
		
		// app.use('/ebook', Auth.verify);

		app.get(base, Controller.all);
	
		app.get(base+'/count', Controller.count);
		
		app.get(base+'/:id', Controller.get);
	
		app.post(base, Controller.store);
	
		app.put(base+'/:id', Controller.update);
	
		app.delete(base+'/:id', Controller.destroy);

	})

}