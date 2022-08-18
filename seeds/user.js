let faker = require('random-words');
let sluger = require('slugify');
let hash = require('md5');
let cfg = require('../config/config');

module.exports = () => {

	let limit = cfg.seeding.user.limit, seeds = [];
	let no = () => Math.floor(Math.random() * 2);

	seeds = [
		{
			nama: "Sabriel",
			email: "sabriel@gmail.com",
			password: hash('123456'),
			ttl: "Pekalongan",
			sekolah: "SMKMUHBLIGO",
			alasan: "Debugging",
			avatar: 'avatar/default'+no()+'.png'
		}
	];

	for (var i = 0; i < limit; i++) {
		let nama = faker({ min: 2, max: 3, join: ' '});
		let email = sluger(nama, '') + '@email.com';
		seeds.push({
			nama: nama,
			email: email,
			password: hash('123456'),
			ttl: "Pekalongan",
			sekolah: "SMKMUHBLIGO",
			alasan: "Debugging",
			avatar: 'avatar/default'+no()+'.png'
		});
	}

	return seeds;
}