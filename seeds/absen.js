let cfg = require('../config/config');

module.exports = () => {

	let limit = cfg.seeding.absen.limit, seeds = [];
	let rand = (lm) => Math.floor(Math.random() * lm + 1);

	for (let i = 0; i < limit; i++) {
		seeds.push({
			user_id: rand(cfg.seeding.user.limit - 1),
		})
	}

	return seeds;

}