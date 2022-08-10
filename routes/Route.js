const path = require('path');
const fs = require('fs');

const dir = path.resolve(__dirname);

module.exports = app => {
	fs.readdir(dir, (err, files) => {
		if (err) throw err;
		for (var file of files) {
			if (file == 'Route.js') continue;
			require('./'+file)(app);
		}
	});
}