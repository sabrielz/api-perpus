const { Model } = require('../models/user');
const jwt = require('../config/jwt');
const hash = require('md5');
const { IncomingForm } = require('formidable');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

exports.login = (req, res) => {
	let body = req.body;
	if (!req.body || Object.keys(req.body).length < 1) return res.status(400).send({
		message: 'Required data to sign up!',
		err: {}
	});

	Model.query().where({
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

		let { Model } = require('../models/absen');
		Model.query().insert({
			user_id: data.id,
		}).then(() => {

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
			message: 'Some error occured when inserting absen!',
			err: err
		}));

	}).catch(err => res.status(500).send({
		message: 'Some error occured when finding user!',
		err: err
	}));
}

exports.register = (req, res) => {
	let form = new IncomingForm({
		multiples: true,
	});

	form.parse(req, (err, fields, files) => {
		if (!fields) return res.status(400).send({
			message: 'Require data to sign up!',
			err: {}
		});

		if (err) return res.status(500).send({
			message: 'Some error occured when parsing form!',
			err: err
		})

		if (files.avatar) {
			let dotParse = files.avatar.originalFilename.split('.');
			let oldpath = files.avatar.filepath;
			let randpath = crypto.randomBytes(32).toString('hex');
			let newname = randpath+'.'+dotParse[dotParse.length-1];
			let newpath = path.join(__dirname, '../storage/avatar', newname);
	
			fs.rename(oldpath, newpath, err => {
				if (err) return res.status(500).send({
					message: 'Some error occured when uploading file!',
					err: err
				})
			})
	
			// fields.nama = crypto.randomBytes(8).toString('hex');
			// fields.email = fields.name + '@gmail.com';
			fields.avatar = 'avatar/'+newname;
		} else {
			let no = Math.floor(Math.random() * 2);
			fields.avatar = 'avatar/default'+no+'.png';
		}

		fields.password = hash(fields.password || '123456');
		Model.query().insert(fields)
		.then(data => {
			fields.id = data[0];
			delete fields.password;
			return res.status(200).send({
				message: 'User added successfully!',
				data: fields
			})
		}).catch(err => res.status(500).send({
			message: 'Some error occured when inserting data!',
			err: err
		}));
	})
}

exports.verify = (req, res, next) => {
	let token = req.body.token || req.query.token || req.headers.authorization || req.headers.Authorization || req.headers.token;
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