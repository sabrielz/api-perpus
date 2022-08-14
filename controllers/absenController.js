const { Model, knex } = require('../models/absen');

exports.all = (req, res) => {
	knex(Model.tableName).select('*').orderBy('id', 'DESC')
	.then(data => {
		if (!data.length) return res.status(404).send({
			message: 'No user login yet!',
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

exports.findId = (req, res) => {
	let id = req.params.id;

	knex(Model.tableName).where({ user_id: id }).orderBy('id', 'DESC')
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