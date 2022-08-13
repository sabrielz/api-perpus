const { Model, knex } = require('../models/modul');

module.exports = (type, limit = 8) => new class ModulController {

	paginate(req, res) {
		let page = req.params.page || 1;
	
		knex(Model.tableName).where({ type: type })
		.offset(limit*page).limit(limit)
		.then(data => res.status(200).send({
			message: page + ' data successfully selected!',
			data: data,
		})).catch(err => res.status(500).send({
			message: 'Some error occured when selecting data!',
			err: err
		}))
	}
	
	store(req, res) {
		if (!req.body || Object.keys(req.body).length < 1) {
			return res.status(404).send({
				message: 'Require content to insert data!',
				err: {}
			});
		}
		
		let body = req.body;
		knex(Model.tableName).insert(body)
		.then(data => res.status(200).send({
			message: 'Data inserted successfully!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when inserting data!',
			err: err
		}))
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
