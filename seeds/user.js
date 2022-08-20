let faker = require('random-words');
let sluger = require('slugify');
let hash = require('md5');
let cfg = require('../config/config');

// module.exports = {

	let limit = cfg.seeding.user.limit, seeds = [];
	let no = (lm = 2) => {
		let num = Math.floor(Math.random() * lm);
		if (num <= 0 || num >= lm+1) no(lm);
		else return num;
	};

	seeds = [
		{
			nama: "Sabriel",
			email: "sabriel@gmail.com",
			nis: 123456,
			password: hash('123456'),
			ttl: "Pekalongan",
			sekolah: "SMKMUHBLIGO",
			alasan: "Debugging",
			avatar: 'avatar/default'+no()+'.png',
			role_id: 3
		}
	];

	for (var i = 1; i < limit; i++) {
		let nama = faker({ min: 2, max: 3, join: ' '});
		let email = sluger(nama, '') + '@email.com';
		seeds.push({
			nama: nama,
			email: email,
			nis: no(999999),
			password: hash('123456'),
			ttl: "Pekalongan",
			sekolah: "SMKMUHBLIGO",
			alasan: "Debugging",
			avatar: 'avatar/default'+no()+'.png',
			role_id: no(2)
		});
	}

	module.exports = seeds;
// }