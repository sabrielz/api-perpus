// const Controller = require('./Controller');
const { Model } = require('../models/user');
const { IncomingForm } = require('formidable');
const cfg = require('../config/config');
const crypto = require('crypto');
const path = require('path');
// const hash = require('md5');
const fs = require('fs');

exports.all = (req, res) => {
	let select = ['*'];
	if (req.query.select) {
		select = req.query.select.split(',');
	}

	if (req.query.page) {
		let page = req.query.page - 1 || 0;
		let limit = cfg.pagination.limit;
		let offset = page == 0 ? 0 : page*limit;
		
		return Model.query().select(select)
		.offset(offset).limit(limit)
		.withGraphFetched(Model.relationGraph)
		.then(data => {
			return res.status(200).send({
				message: data.length + ' user selected successfully!',
				data: data
			})
		}).catch(err => {
			return res.status(500).send({
				message: 'Some error occured when paginating user!',
				err: err
			})
		})
	}

	return Model.query().select(select)
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

exports.count = (req, res) => {
	return Model.query().count('id as count')
	.then(data => res.status(200).send({
		message: 'Table user successfully counted!',
		data: data[0].count
	})).catch(err => res.status(500).send({
		message: 'Some error occured when counting data!',
		err: err
	}))
}

exports.get = (req, res) => {
	let id = req.params.id;

	return Model.query().where({ id: id })
	.withGraphFetched(Model.relationGraph)
	.then(data => {
		if (!data.length) return res.status(404).send({
			message: 'No user found with id '+id+'!',
			err: {}
		})

		return res.status(200).send({
			message: 'User finded successfully!',
			data: data[0]
		})
	}).catch(err => res.status(500).send({
		message: 'Some error occured when selecting data!',
		err: err
	}))
}

exports.nis = (req, res) => {
	let nis = req.params.nis;

	return Model.query().where({ nis: nis })
	.withGraphFetched(Model.relationGraph)
	.then(data => {
		if (!data.length) return res.status(404).send({
			message: 'No user found with nis '+nis+'!',
			err: {}
		})

		return res.status(200).send({
			message: 'User finded successfully!',
			data: data[0]
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

	return form.parse(req, (err, fields, files) => {
		console.log(req.params.id);
		if (err) return res.status(500).send({
			message: 'Some error occured when parsing form!',
			err: err
		})
		
		if (!fields && !files) {
			return res.status(404).send({
				message: 'Require content to insert data!',
				err: {}
			});
		}

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
		}

		let id = req.params.id;

		return Model.query().updateAndFetchById(id, fields)
		.withGraphFetched(Model.relationGraph)
		.then(data => res.status(200).send({
			message: 'User updated successfully!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when updating user!',
			err: err
		}));
	})
}

exports.destroy = (req, res) => {
	let id = req.params.id;

	return Model.query().deleteById(id)
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