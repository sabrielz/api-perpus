const cfg = require('../config/config');
const { Model } = require('../models/literasi');
const { IncomingForm } = require('formidable');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

let limit = cfg.pagination.limit || 8;

exports.all = (req, res) => {
	let select = ['*'];
	if (req.query.select) {
		select = req.query.select.split(',');
	}

	if (req.query.page) {
		let page = req.query.page - 1 || 0;
		let offset = page == 0 ? 0 : page*limit;
		
		return Model.query().select(select)
		.offset(offset).limit(limit)
		.withGraphFetched(Model.relationGraph)
		.orderBy('id', 'DESC')
		.then(data => res.status(200).send({
			message: data.length+' literasi finded successfully!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when paginating data!',
			err: err
		}))
	}

	return Model.query().select(select)
	.withGraphFetched(Model.relationGraph)
	.orderBy('id', 'DESC')
	.then(data => {
		if (!data.length) return res.status(404).send({
			message: 'No literasi found!',
			err: {}
		})

		return res.status(200).send({
			message: 'All literasi finded successfully!',
			data: data
		})
	}).catch(err => res.status(500).send({
		message: 'Some error occured when selecting data!',
		err: err
	}))
}

exports.count = (req, res) => {
	return Model.query().count('id as count')
	.then(data => res.status(200).send({
		message: 'Table literasi counted successfully!',
		data: data[0].count
	})).catch(err => res.status(500).send({
		message: 'Some error occured when counting data!',
		err: err
	}))
}

exports.get = (req, res) => {
	let id = req.params.id;

	return Model.query().findById(id)
	.withGraphFetched(Model.relationGraph)
	.then(data => {
		if (!data.length) return res.status(404).send({
			message: 'No literasi found with id '+id+'!',
			err: {}
		})

		return res.status(200).send({
			message: 'Literasi finded successfully!',
			data: data[0]
		})
	}).catch(err => res.status(500).send({
		message: 'Some error occured when selecting data!',
		err: err
	}))
}

exports.user = (req, res) => {
	let id = req.params.id;

	return Model.query().where({ user_id: id })
	.withGraphFetched(Model.relationGraph)
	.then(data => {
		if (!data.length) return res.status(404).send({
			message: 'No literasi found with id user '+id+'!',
			err: {}
		})

		return res.status(200).send({
			message: 'Literasi finded successfully!',
			data: data
		})
	}).catch(err => res.status(500).send({
		message: 'Some error occured when selecting data!',
		err: err
	}))
}

exports.store = (req, res) => {

	let form = new IncomingForm({
		multiples: true,
	});

	form.parse(req, (err, fields, files) => {
		if (!fields && !files) {
			return res.status(404).send({
				message: 'Require content to insert data!',
				err: {}
			});
		}

		if (err) return res.status(500).send({
			message: 'Some error occured when parsing form!',
			err: err
		})

		if (files.file) {
			let dotParse = files.file.originalFilename.split('.');
			let oldpath = files.file.filepath;
			let randpath = crypto.randomBytes(32).toString('hex');
			let newname = randpath+'.'+dotParse[dotParse.length-1];
			let newpath = path.join(__dirname, '../storage/literasi', newname);

			fs.rename(oldpath, newpath, err => {
				if (err) return res.status(500).send({
					message: 'Some error occured when uploading literasi!',
					err: err
				})
			})

			fields.file = 'literasi/'+newname;
		}

		return Model.query().insertAndFetch(fields)
		.withGraphFetched(Model.relationGraph)
		.then(data => res.status(200).send({
			message: 'Literasi created successfully!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when inserting data!',
			err: err
		}))
	})
}

exports.update = (req, res) => {

	let form = new IncomingForm({
		multiples: true,
	});

	form.parse(req, (err, fields, files) => {
		if (!fields && !files) {
			return res.status(404).send({
				message: 'Require content to insert data!',
				err: {}
			});
		}

		if (err) return res.status(500).send({
			message: 'Some error occured when parsing form!',
			err: err
		})

		if (files.file) {
			let dotParse = files.file.originalFilename.split('.');
			let oldpath = files.file.filepath;
			let randpath = crypto.randomBytes(32).toString('hex');
			let newname = randpath+'.'+dotParse[dotParse.length-1];
			let newpath = path.join(__dirname, '../storage/literasi', newname);

			fs.rename(oldpath, newpath, err => {
				if (err) return res.status(500).send({
					message: 'Some error occured when uploading literasi!',
					err: err
				})
			})

			fields.file = 'literasi/'+newname;
		}

		let id = req.params.id;

		return Model.query().updateAndFetchById(id, fields)
		.withGraphFetched(Model.relationGraph)
		.then(data => res.status(200).send({
			message: 'Literasi updated successfully!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when updating data!',
			err: err
		}))
	})
}

exports.destroy = (req, res) => {
	let id = req.params.id;

	Model.query().deleteById(id)
	.then(data => res.status(200).send({
		message: 'Literasi deleted successfully!',
		data: data
	})).catch(err => res.status(500).send({
		message: 'Some error occured when deleting literasi!',
		err: err
	}))
}