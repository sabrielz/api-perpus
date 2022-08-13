const { Model, knex } = require('../models/user');
const jwt = require('../config/jwt');
const hash = require('md5');

exports.login = (req, res) => {
	let body = req.body;
	if (!req.body || Object.keys(req.body).length < 1) return res.status(400).send({
		message: 'Required data to sign up!',
		err: {}
	});

	knex(Model.tableName).where({
		email: body.email,
		password: hash(body.password)
	}).then(data => {
		if (!data.length) {
			return res.status(404).send({
				message: 'User not found!',
				err: data
			})
		}
		
		data = data[0];
		delete data.password;
		jwt.sign({ data: data }, jwt.secretKey, {
			expiresIn: jwt.expiresIn,
			algorithm: jwt.algorithm
		}, (err, token) => {
			if (err) return res.status(500).send({
				message: 'Some error occured when generating token!',
				err: err
			});

			res.status(200).send({
				message: 'User finded successfully!',
				token: token,
				data: data
			})
		})
	}).catch(err => res.status(500).send({
		message: 'Some error occured when finding user!',
		err: err
	}));
}

exports.register = (req, res) => {
	if (!req.body || Object.keys(req.body).length < 1) {
		return res.status(400).send({
			message: 'Required data to sign up!',
			err: {}
		});
	}

	let body = req.body, insert = {
		nama: body.nama,
		password: hash(body.password || '123456'),
		email: body.email,
		ttl: body.ttl,
		sekolah: body.sekolah,
		alasan: body.alasan,
		hp: body.hp,
	}

	knex(Model.tableName).insert(insert)
	.then(data => {
		insert.id = data[0];
		delete insert.password;
		return res.status(200).send({
			message: 'User added successfully!',
			data: insert
		})
	}).catch(err => res.status(500).send({
		message: 'Some error occured when inserting data!',
		err: err
	}));
}

exports.verify = (req, res, next) => {
	let token = req.body.token || req.query.token || req.headers.authorization || req.headers.token;
	if (!token) return res.status(403).send({
		message: 'Required token to continue!',
		err: {}
	})

	jwt.verify(token, jwt.secretKey, {
		algorithm: jwt.algorithm,
	}, (err, decoded) => {
		if (err) return res.status(500).send({
			message: 'Failed to authenticate token!',
			err: err
		});

		req.decoded = decoded;
		next()
	})
}

exports.check = (req, res) => {
	let token = req.body.token || req.query.token || req.headers.authorization || req.headers.token;
	if (!token) return res.status(403).send({
		message: 'Required token to continue!',
		err: {}
	});

	jwt.verify(token, jwt.secretKey, {
		algorithm: jwt.algorithm,
	}, (err, data) => {
		if (err) return res.status(500).send({
			message: 'Failed to authenticate token!',
			err: err
		});

		data = data.data;
		return res.status(200).send({
			message: 'Token authenticated successfully!',
			data: data
		});
	})
}