const { Model, knex } = require('../models/modul');

let limit = 10;

exports.paginate = (req, res) => {
	let page = req.params.page || 1;
	let type = req.originalUrl.split('/')[1].indexOf('ebook') > -1 ? 'ebook' :
		req.originalUrl.split('/')[1].indexOf('video') > -1 ? 'video' : null;

	knex(Model.tableName).where({ type: type })
	.offset(limit*page).limit(limit)
	.then(data => {
		return res.status(200).send({
			data: data,
		})
	}).catch(err => {
		return res.status(500).send({
			err: err
		})
	})
}

exports.store = (req, res) => {
	
}