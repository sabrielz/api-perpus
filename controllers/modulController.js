const { Model, knex } = require('../models/modul');
const { IncomingForm } = require('formidable');
const path = require('path');
const crypto = require('crypto');
const mv = require('mv');

module.exports = (type, limit = 8) => new class ModulController {

	paginate(req, res) {
		let page = req.query.page || 1;
		let offset = page == 0 ? 0 : page*limit;
	
		knex(Model.tableName).where({ type: type })
		.limit(limit).offset(offset)
		.then(data => res.status(200).send({
			message: limit + ' data successfully selected!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when selecting data!',
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

			let dotParse = files.file.originalFilename.split('.');
			let oldpath = files.file.filepath;
			let randpath = crypto.randomBytes(32).toString('hex');
			let newname = randpath+'.'+dotParse[dotParse.length-1];
			let newpath = path.join(__dirname, Model.uploadDir, newname);

			mv(oldpath, newpath, err => {
				if (err) return res.status(500).send({
					message: 'Some error occured when uploading file!',
					err: err
				})
			})

			fields.file = '/modul/'+newname;

			knex(Model.tableName).insert(fields)
			.then(data => res.status(200).send({
				message: 'Modul inserted successfully!',
				data: data[0]
			})).catch(err => res.status(500).send({
				message: 'Some error occured when inserting modul!',
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
		
		let id = req.params.id;
		let body = req.body;
		knex(Model.tableName).where({id:id, type:type}).update(body)
		.then(data => res.status(200).send({
			message: 'Data updated successfully!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when updating data!',
			err: err
		}))
	}

	destroy(req, res) {
		let id = req.params.id;

		knex(Model.tableName).where({id:id, type:type}).delete()
		.then(data => res.status(200).send({
			message: 'Data deleted successfully!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when deleting data!',
			err: err
		}))
	}

}
