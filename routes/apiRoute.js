module.exports = app => {

	let Controller = require('../controllers/apiController');

	app.get('/api/migrate', Controller.migrates);

	app.get('/api/migrate/:table', Controller.migrate);

	app.get('/api/drop', Controller.drops);

	app.get('/api/drop/:table', Controller.drop);

	app.get('/api/remigrate', Controller.remigrates);

	app.get('/api/remigrate/:table', Controller.remigrate);

	app.get('/api/truncate', Controller.truncates);

	app.get('/api/truncate/:table', Controller.truncate);

	app.get('/api/seed', Controller.seeds);

	app.get('/api/seed/:table', Controller.seed);

}