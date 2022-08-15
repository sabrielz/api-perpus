let faker = require('random-words');
let sluger = require('slugify');
let hash = require('md5');

module.exports = () => {

	let count = 50;
	let no = () => Math.floor(Math.random() * 2);
	// fields.avatar = 'avatar/default'+no()+'.png';

	let seeds = [
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

	for (var i = 0; i < count; i++) {
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