const { Model } = require('../models/absen');

exports.all = (req, res) => {
	return Model.query().withGraphFetched({
		user: true
	}).orderBy('id', 'DESC')
	.then(data => {
		if (!data.length) return res.status(404).send({
			message: 'No user login yet!',
			err: {}
		})

		return res.status(200).send({
			message: 'Absen finded successfully!',
			data: data
		})
	}).catch(err => res.status(500).send({
		message: 'Some error occured when selecting data!',
		err: err
	}))
}

exports.get = (req, res) => {
	let id = req.params.id;

	return Model.query().where({ id: id })
	.withGraphFetched({
		user: true
	})
	.then(data => {
		if (!data.length) return res.status(404).send({
			message: 'Absen not found!',
			err: {}
		})

		return res.status(200).send({
			message: 'Absen finded successfully!',
			data: data[0]
		})
	}).catch(err => res.status(500).send({
		message: 'Some error occured when selecting data!',
		err: err
	}))
}

exports.find = (req, res) => {
	let id = req.params.id;

	return Model.query().where({ user_id: id })
	.withGraphFetched({
		user: true
	}).orderBy('id', 'DESC')
	.then(data => {
		if (!data.length) return res.status(404).send({
			message: 'Absen not found!',
			err: {}
		})

		return res.status(200).send({
			message: 'Absen finded successfully!',
			data: data
		})
	}).catch(err => res.status(500).send({
		message: 'Some error occured when selecting data!',
		err: err
	}))
}