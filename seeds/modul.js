let faker = require('random-words');
let sluger = require('slugify');
let cfg = require('../config/config');

module.exports = () => {
	let seeds = [];
	let type = ['ebook', 'video'];
	let limit = cfg.seeding.modul.limit;

	for (var i = 1; i < limit; i++) {
		let title = faker({ exactly: 6, join: ' '});
		let slug = sluger(title, '-');
		seeds.push({
			title: title,
			slug: slug,
			desc: faker({ exactly: 15, join: ' ' }),
			thumbnail: 'http://localhost:4000/seed.jpg',
			file: 'http://localhost:4000/seed.jpg',
			type: type[Math.floor(Math.random() * 2)],
			user_id: Math.floor(Math.random() * 100)
		});
	}

	return seeds;
}