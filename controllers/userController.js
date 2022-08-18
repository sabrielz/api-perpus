const Controller = require('./Controller');
const { Model } = require('../models/user');
const { IncomingForm } = require('formidable');
const crypto = require('crypto');
const path = require('path');
const hash = require('md5');
const fs = require('fs');
const cfg = require('../config/config');

exports.all = (req, res) => {
	if (req.query.hasOwnProperty('paginate')) {
		return exports.paginate(req, res);
	}

	Model.query().select('*')
	.withGraphFetched(Model.relationGraph)
	.then(data => {
		if (!data.length) return res.status(404).send({
			message: 'No user yet!',
			err: {}
		})

		return res.status(200).send({
			message: 'All users selected successfully!',
			query: req.query.paginate,
			data: data
		});
	}).catch(err => res.status(500).send({
		message: 'Some error occured when selecting users!',
		err: err
	}))
}

// exports.paginates = (req, res) => {
// 	Controller.test.prototype = () => {
		
// 	}
// 	return res.json({
// 		el: null
// 	})
// }

exports.paginate = (req, res) => {
	let page = req.query.page - 1 || 0;
	let limit = cfg.pagination.limit || cfg.pagination;
	let offset = page == 0 ? 0 : page*limit;
	
	Model.query().select('*')
	.offset(offset).limit(limit)
	.then(data => {
		return res.status(200).send({
			message: limit + ' user selected successfully!',
			data: data
		})
	}).catch(err => {
		return res.status(500).send({
			message: 'Some error occured when paginating user!',
			err: err
		})
	})
}

exports.get = (req, res) => {
	let id = req.params.id;

	Model.query().where({ id: id })
	.withGraphFetched(Model.relationGraph)
	.then(data => {
		if (!data.length) return res.status(404).send({
			message: 'User not found!',
			err: {}
		})

		return res.status(200).send({
			message: 'User finded successfully!',
			data: data
		})
	}).catch(err => res.status(500).send({
		message: 'Some error occured when selecting data!',
		err: err
	}))
}

exports.update = (req, res) => {
	let form = new IncomingForm({
		multiples: true,
	});

	form.parse(req, (err, fields, files) => {
		// if (!fields) return res.status(400).send({
		// 	message: 'Require data to sign up!',
		// 	err: {}
		// });

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
			message: 'Some error occured when inserting user!',
			err: err
		}));
	})
}

exports.destroy = (req, res) => {
	let id = req.params.id;

	Model.query().deleteById(id)
	.then(data => {
		return res.status(200).send({
			message: 'User deleted successfully!',
			data: data
		})
	}).catch(err => {
		return res.status(500).send({
			message: 'Some error occured when deleting data!',
			err :err
		})
	})
}