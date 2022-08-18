module.exports = app => {
	
	let Auth = require('../controllers/authController');
	
	let types = ['absen', 'literasi'];
	
	// app.use('/literasi', Auth.verify);

	types.map(type => {
		
		let Controller = require('../controllers/'+type+'Controller');

		let base = '/'+type;

		app.get(base, Controller.all);
	
		app.get(base+'/count', Controller.count);
	
		app.get(base+'/user/:id', Controller.user);

		app.get(base+'/:id', Controller.get);
	
		app.post(base, Controller.store);
	
		app.put(base+'/:id', Controller.update);
	
		app.delete(base+'/:id', Controller.destroy);

	})

}