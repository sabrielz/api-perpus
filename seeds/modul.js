let faker = require('random-words');
let sluger = require('slugify');

module.exports = knex => {
	let seeds = [];
	let type = ['ebook', 'video'];

	for (var i = 0; i < 50; i++) {
		let title = faker({ exactly: 6, join: ' '});
		let slug = sluger(title, '-');
		seeds.push({
			title: title,
			slug: slug,
			desc: faker({ exactly: 15, join: ' ' }),
			thumbnail: 'http://localhost:4000/seed.jpg',
			type: type[Math.floor(Math.random() * 2)]
		});
	}

	return seeds;
}