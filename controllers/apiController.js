const { knex } = require('../config/objection');
const cfg = require('../config/config');
let models = cfg.model.list;

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

exports.migrates = (req, res) => {
	let result = async () => {
		return await models.map(async (name) => {
			const { Model, knex } = require('../models/'+name);
			let table = Model.tableName;

			await knex.schema.createTable(table, table => Model.tableSchema(table))
			.catch(err => {})
		})
	}

	return result().then(() => {
		return res.status(200).send({
			message: 'All table created successfully!',
		})
	}).catch(err => res.status(200).send({
		message: 'Some error occured when creating all table!',
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

exports.truncates = (req, res) => {
	let result = async () => {
		for (let name of models.reverse()) {
			const { Model } = require('../models/'+name);

			await knex.raw('TRUNCATE TABLE '+Model.tableName)
			.catch(err => {})
		}
	}

	return result().then(() => {
		return res.status(200).send({
			message: 'All table truncated successfully!',
		})
	}).catch(err => res.status(500).send({
		message: 'Some error occured when truncating all table!',
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

exports.drops = (req, res) => {
	let result = async() => {
		for (let name of models.reverse()) {
			const { Model } = require('../models/'+name);
	
			await knex.schema.dropTable(Model.tableName)
			.catch(err => {})
		}
	}

	return result().then(() => {
		return res.status(200).send({
			message: 'All table dropped successfully!',
		})
	}).catch(err => res.status(200).send({
		message: 'Some error occured when dropping all table!',
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
	// const { Model } = require('../models/'+req.params.table);
	const seed = require('../seeds/'+req.params.table);
	let model = cfg.model[req.params.table];
	let table = model.tableName;

	knex(table).insert(seed)
	.then(data => res.status(200).send({
		message: 'Table '+table+' seeded successfully!',
		data: data
	})).catch(err => res.status(500).send({
		message: 'Some error occured when seeding table '+table+'!',
		err: err
	}))
}

exports.seeds = (req, res) => {
	let result = async () => {
		for (let name of models) {
			// if (name == 'role') continue;
			const seed = require('../seeds/'+name);
			let table = cfg.model[name].tableName;

			await knex(table).insert(seed)
			.catch(err => {throw err});
		}
	}

	return result().then(() => res.status(200).send({
		message: 'All table seeded successfully!',
	})).catch(err => res.status(500).send({
		message: 'Some error occured when seeding all table!',
		err: err
	}))
}