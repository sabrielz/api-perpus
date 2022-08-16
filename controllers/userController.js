const { Model, knex } = require('../models/user');

exports.get = (req, res) => {
	let id = req.params.id;

	Model.query().where({ id: id })
	.withGraphFetched({
		moduls: true,
		absens: true
	}).then(data => {
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