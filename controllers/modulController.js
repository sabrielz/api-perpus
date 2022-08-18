const { Model } = require('../models/modul');
const { IncomingForm } = require('formidable');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

module.exports = (type, limit = 8) => new class ModulController {

	all(req, res) {
		let select = ['*'];
		if (req.query.select) {
			select = req.query.select.split(',');
		}

		if (req.query.page || req.query.paginate == '') {
			let page = req.query.page || 0;
			page = page > 0 ? page - 1 : 0;
			let offset = page == 0 ? 0 : page*limit;
		
			return Model.query().where({ type: type })
			.orderBy('id', 'DESC').limit(limit).offset(offset)
			.withGraphFetched(Model.relationGraph)
			.then(data => res.status(200).send({
				message: limit+' '+ type +' successfully selected!',
				data: data
			})).catch(err => res.status(500).send({
				message: 'Some error occured when selecting '+type+'!',
				err: err
			}))
		}

		return Model.query().select(select).where({ type: type })
		.orderBy('id', 'DESC')
		.withGraphFetched(Model.relationGraph)
		.then(data => res.status(200).send({
			message: 'All '+type+' successfully selected!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when selecting '+type+'!',
			err: err
		}))
	}

	get(req, res) {
		let id = req.params.id

		return Model.query().where({ type: type, id: id })
		.withGraphFetched({
			user: true
		}).then(data => {
			if (!data.length) return res.status(200).send({
				message: 'No '+type+' selected with id '+id+'!',
				data: {}
			});

			return res.status(200).send({
				message: 'Table data successfully selected!',
				data: data[0],
			});
		}).catch(err => res.status(500).send({
			message: 'Some error occured when selecting data!',
			err: err
		}))
	}

	count(req, res) {
		return Model.query().where({ type: type }).count('id as count')
		.then(data => res.status(200).send({
			message: 'Table data successfully counted!',
			data: data[0].count
		})).catch(err => res.status(500).send({
			message: 'Some error occured when counting data!',
			err: err
		}))
	}
	
	store(req, res) {
		let form = new IncomingForm({
			multiples: true,
		});

		form.parse(req, (err, fields, files) => {
			if (!fields || Object.keys(fields).length < 1) {
				return res.status(404).send({
					message: 'Require content to insert data!',
					err: {}
				});
			}

			if (err) return res.status(500).send({
				message: 'Some error occured when parsing form!',
				err: err
			})

			if (files.thumbnail) {
				let dotParse = files.file.originalFilename.split('.');
				let oldpath = files.file.filepath;
				let randpath = crypto.randomBytes(32).toString('hex');
				let newname = randpath+'.'+dotParse[dotParse.length-1];
				let newpath = path.join(__dirname, '../storage/modul', newname);
	
				fs.rename(oldpath, newpath, err => {
					if (err) return res.status(500).send({
						message: 'Some error occured when uploading thumbnail!',
						err: err
					})
				})
	
				fields.thumbnail = 'modul/'+newname;
			}

			if (files.file) {
				let dotParse = files.file.originalFilename.split('.');
				let oldpath = files.file.filepath;
				let randpath = crypto.randomBytes(32).toString('hex');
				let newname = randpath+'.'+dotParse[dotParse.length-1];
				let newpath = path.join(__dirname, '../storage/modul', newname);
	
				fs.rename(oldpath, newpath, err => {
					if (err) return res.status(500).send({
						message: 'Some error occured when uploading '+type+'!',
						err: err
					})
				})
	
				fields.file = 'modul/'+newname;
			}

			return Model.query().insert(fields)
			.then(data => res.status(200).send({
				message: type[0].toUpperCase()+type.slice(1)+' inserted successfully!',
				data: data[0]
			})).catch(err => res.status(500).send({
				message: 'Some error occured when inserting '+type+'!',
				err: err
			}))
		})
	}

	update(req, res) {
		if (!req.body || Object.keys(req.body).length < 1) {
			return res.status(404).send({
				message: 'Require content to change data!',
				err: {}
			});
		}

		let form = new IncomingForm({
			multiples: true,
		});

		form.parse(req, (err, fields, files) => {
			if (!fields || Object.keys(fields).length < 1) {
				return res.status(404).send({
					message: 'Require content to insert data!',
					err: {}
				});
			}

			if (err) return res.status(500).send({
				message: 'Some error occured when parsing form!',
				err: err
			})

			if (files.thumbnail) {
				let dotParse = files.file.originalFilename.split('.');
				let oldpath = files.file.filepath;
				let randpath = crypto.randomBytes(32).toString('hex');
				let newname = randpath+'.'+dotParse[dotParse.length-1];
				let newpath = path.join(__dirname, '../storage/modul', newname);
	
				fs.rename(oldpath, newpath, err => {
					if (err) return res.status(500).send({
						message: 'Some error occured when uploading thumbnail!',
						err: err
					})
				})
	
				fields.thumbnail = 'modul/'+newname;
			}

			if (files.file) {
				let dotParse = files.file.originalFilename.split('.');
				let oldpath = files.file.filepath;
				let randpath = crypto.randomBytes(32).toString('hex');
				let newname = randpath+'.'+dotParse[dotParse.length-1];
				let newpath = path.join(__dirname, '../storage/modul', newname);
	
				fs.rename(oldpath, newpath, err => {
					if (err) return res.status(500).send({
						message: 'Some error occured when uploading '+type+'!',
						err: err
					})
				})
	
				fields.file = 'modul/'+newname;
			}

			return Model.query().where({ id:id, type:type }).update(fields)
			.then(data => res.status(200).send({
				message: 'Data updated successfully!',
				data: data
			})).catch(err => res.status(500).send({
				message: 'Some error occured when updating data!',
				err: err
			}))
		})
	}

	destroy(req, res) {
		let id = req.params.id;

		return Model.query().where({id:id, type:type}).delete()
		.then(data => res.status(200).send({
			message: 'Data deleted successfully!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when deleting data!',
			err: err
		}))
	}

	modul(req, res) {
		let select = ['*'];
		if (req.query.select) {
			select = req.query.select.split(',');
		}

		if (req.query.search) {
			let search = req.query.search;

			if (req.query.page || req.query.paginate == '') {
				let page = req.query.page || 0;
				page = page > 0 ? page - 1 : 0;
				let offset = page == 0 ? 0 : page*limit;

				return Model.query().select(select)
				.whereRaw(`\`title\` like '%${search}%'`)
				.orWhereRaw(`\`desc\` like '%${search}%'`)
				.orderBy('id', 'DESC')
				.limit(limit).offset(offset)
				.withGraphFetched(Model.relationGraph)
				.then(data => res.status(200).send({
					message: limit+' modul successfully selected!',
					data: data
				})).catch(err => res.status(500).send({
					message: 'Some error occured when selecting modul!',
					err: err
				}))
			}
			
			return Model.query().select(select)
			.whereRaw(`\`title\` like '%${search}%'`)
			.orWhereRaw(`\`desc\` like '%${search}%'`)
			.orderBy('id', 'DESC')
			.withGraphFetched(Model.relationGraph)
			.then(data => res.status(200).send({
				message: limit+' modul successfully selected!',
				data: data
			})).catch(err => res.status(500).send({
				message: 'Some error occured when selecting modul!',
				err: err
			}))
		}

		return Model.query().select(select)
		.orderBy('id', 'DESC')
		.withGraphFetched(Model.relationGraph)
		.then(data => res.status(200).send({
			message: 'All modul successfully selected!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when selecting modul!',
			err: err
		}))
	}

}
