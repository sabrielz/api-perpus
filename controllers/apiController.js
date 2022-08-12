exports.migrate = (req, res) => {
	const { Model, knex } = require('../models/'+req.params.table);
	let table = Model.tableName;
	knex.schema.createTableIfNotExists(table, table => Model.tableSchema(table))
	.then(data => res.status(200).send({
		message: 'Table '+table+' created successfully!',
		data: data
	})).catch(err => res.status(500).send({
		message: 'Some error occured when creating table '+table+'!',
		err: err
	}))
}

exports.truncate = (req, res) => {
	const { Model, knex } = require('../models/'+req.params.table);
	let table = Model.tableName;
	knex.raw('TRUNCATE TABLE '+table)
	.then(data => res.status(200).send({
		message: 'Table '+table+' truncated successfully!',
		data: data
	})).catch(err => res.status(500).send({
		message: 'Some error occured when truncating table '+table+'!',
		err: err
	}))
}

exports.drop = (req, res) => {
	const { Model, knex } = require('../models/'+req.params.table);
	let table = Model.tableName;
	knex.schema.dropTableIfExists(table)
	.then(data => res.status(200).send({
		message: 'Table '+table+' dropped successfully!',
		data: data
	})).catch(err => res.status(500).send({
		message: 'Some error occured when dropping table '+table+'!',
		err: err
	}))
}

exports.remigrate = (req, res) => {
	const { Model, knex } = require('../models/'+req.params.table);
	let table = Model.tableName;
	knex.schema.dropTableIfExists(table)
	.catch(err => res.status(500).send({
		message: 'Some error occured when dropping table '+table+'!',
		err: err
	}))

	knex.schema.createTableIfNotExists(table, table => Model.tableSchema(table))
	.then(data => res.status(200).send({
		message: 'Table '+table+' created successfully!',
		data: data
	})).catch(err => res.status(500).send({
		message: 'Some error occured when creating table '+table+'!',
		err: err
	}))
}

exports.seed = (req, res) => {
	const { Model, knex } = require('../models/'+req.params.table);
	const seed = require('../seeds/'+req.params.table)(knex);
	let table = Model.tableName;

	knex(table).insert(seed)
	.then(data => res.status(200).send({
		message: 'Table '+table+' seeded successfully!',
		data: JSON.parse(JSON.stringify(seed))
	})).catch(err => res.status(500).send({
		message: 'Some error occured when seeding table '+table+'!',
		err: err
	}))
}
