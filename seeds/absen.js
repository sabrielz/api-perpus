let cfg = require('../config/config');

// module.exports = () => {

	let limit = cfg.seeding.absen.limit, seeds = [];
	let rand = (lm) => {
		let num = Math.floor(Math.random() * lm);
		if (num <= 0 || num > lm) return rand(lm);
		else return num;
	};

	for (let i = 0; i < limit; i++) {
		seeds.push({
			user_id: rand(cfg.seeding.user.limit),
		})
	}

	module.exports = seeds;

// }