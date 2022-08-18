const cfg = require('../config/config');
const { Model } = require('../models/absen');

let table = Model.tableName;
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
			message: data.length+' absen finded successfully!',
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
			message: 'No absen found!',
			err: {}
		})

		return res.status(200).send({
			message: 'All absen finded successfully!',
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
		message: 'Table absen successfully counted!',
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
			message: 'No absen found with id '+id+'!',
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

exports.store = (req, res) => {
	if (!req.body) return res.status(400).send({
		message: 'Require content to update!',
		err: {}
	})
	
	return Model.query().insertAndFetch(req.body)
	.withGraphFetched(Model.relationGraph)
	.then(data => res.status(200).send({
		message: 'Absen successfully created!',
		data: data
	})).catch(err => res.status(500).send({
		message: 'Some error occured when inserting data!',
		err: err
	}))
}

exports.login = (id) => {
	if (!id) return {
		message: 'Require id to absen!',
		err: {}
	};

	return Model.query().insert({ user_id: id })
	.then(data => ({ data: data }))
	.catch(err => ({ err: err }))
}

exports.update = (req, res) => {
	let id = req.params.id;

	if (!req.body) return res.status(400).send({
		message: 'Require content to update!',
		err: {}
	})

	Model.query().updateAndFetchById(id, req.body)
	.withGraphFetched(Model.relationGraph)
	.then(data => res.status(200).send({
		message: 'Absen successfully updated!',
		data: data
	})).catch(err => res.status(500).send({
		message: 'Some error occured when updating data!',
		err: err
	}))
}

exports.destroy = (req, res) => {
	let id = req.params.id;

	Model.query().deleteById(id)
	.then(data => res.status(200).send({
		message: 'Absen successfully deleted!',
		data: data
	})).catch(err => res.status(500).send({
		message: 'Some error occured when deleting absen!',
		err: err
	}))
}