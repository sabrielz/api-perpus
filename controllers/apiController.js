exports.migrate = (req, res) => {
	const { Model, Knex } = require('../models/'+req.params.table);
	let table = Model.tableName;
	Knex.schema.createTable(table, table => Model.tableSchema(table))
	.then(data => res.status(200).send({
		message: 'Table '+table+' created successfully!',
		data: data
	})).catch(err => res.status(500).send({
		message: 'Some error occured when creating table '+table+'!',
		err: err
	}))
}

exports.truncate = (req, res) => {
	const { Model, Knex } = require('../models/'+req.params.table);
	let table = Model.tableName;
	Knex.schema.truncate(table)
	.then(data => res.status(200).send({
		message: 'Table '+table+' truncated successfully!',
		data: data
	})).catch(err => res.status(500).send({
		message: 'Some error occured when dropping table '+table+'!',
		err: err
	}))
}

exports.drop = (req, res) => {
	const { Model, Knex } = require('../models/'+req.params.table);
	let table = Model.tableName;
	Knex.schema.dropTable(table)
	.then(data => res.status(200).send({
		message: 'Table '+table+' dropped successfully!',
		data: data
	})).catch(err => res.status(500).send({
		message: 'Some error occured when dropping table '+table+'!',
		err: err
	}))
}

exports.remigrate = (req, res) => {
	const { Model, Knex } = require('../models/'+req.params.table);
	let table = Model.tableName;
	Knex.schema.hasTable(table)
	.then(data => {
		console.log(data);
		if (data) {
			Knex.schema.dropTable(table)
			.catch(err => res.status(500).send({
				message: 'Some error occured when dropping table '+table+'!',
				err: err
			}))
		}
	}).catch(err => console.log(err))
	
	Knex.schema.createTable(table, table => Model.tableSchema(table))
	.then(data => res.status(200).send({
		message: 'Table '+table+' created successfully!',
		data: data
	})).catch(err => res.status(500).send({
		message: 'Some error occured when creating table '+table+'!',
		err: err
	}))
}