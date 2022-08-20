let faker = require('random-words');
let sluger = require('slugify');
let cfg = require('../config/config');

// module.exports = () => {
	let seeds = [];
	let type = ['ebook', 'video'];
	let limit = cfg.seeding.modul.limit;
	let rand = (lm) => {
		let num = Math.floor(Math.random() * lm);
		if (num <= 0 || num > lm) return rand(lm);
		else return num;
	};

	for (var i = 0; i < limit; i++) {
		let title = faker({ exactly: 6, join: ' '});
		let slug = sluger(title, '-');
		seeds.push({
			title: title,
			slug: slug,
			desc: faker({ exactly: 15, join: ' ' }),
			thumbnail: 'http://localhost:4000/modul/seed.jpg',
			file: 'http://localhost:4000/modul/seed.jpg',
			type: type[rand(2)],
			user_id: rand(cfg.seeding.user.limit)
		});
	}

	module.exports = seeds;
// }