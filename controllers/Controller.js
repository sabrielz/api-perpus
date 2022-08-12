// const fs = require('fs');
// const path = require('path');

module.exports = (Model, knex) => new class Controller {

	constructor() {
		this.Model = Model;
		this.knex = knex;
		this.tableName = Model.tableName;
	}

	getparam = (params) => ({
		key: params.value ? params.key : 'id',
		value: params.value ? params.value : params.key
	})

	getseed = () => {
		let name = this.tableName.slice(0,-1);
		let raw = require('../seeds/'+name+'Seeder.js');
		// let raw = fs.readFileSync(path.join(__dirname, '..', 'json', 'seeder', name+'.json'));
		return JSON.parse(JSON.stringify(raw));
	}

	all = (req, res) => {
		knex(this.tableName).query().select([this.tableName+'.*'])
		.then(data => res.status(200).send({
			message: 'Table data selected successfully!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when selecting data!',
			err: err
		}))
	}

	find = (req, res) => {
		const param = this.getparam(req.params);
	
		knex(this.tableName).query().where(param.key, param.value)
		.then(data => res.status(200).send({
			message: 'Table data finded successfully!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when finding data!',
			err: err
		}));
	}

	store = (req, res) => {
		if (Object.keys(req.body).length < 1) return res.status(401).send({
			message: 'Validation error, input value required!',
		})
	
		knex(this.tableName).query().insertGraph(req.body)
		.then(data => res.status(200).send({
			message: 'Data inserted successfully!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when inserting data!',
			err: err
		}));
	}

	update = (req, res) => {
		if (Object.keys(req.body).length < 1) return res.status(401).send({
			message: 'Validation error, input value required!',
		})
	
		const param = this.getparam(req.params);
	
		knex(this.tableName).query().patch(req.body).where(param.key, param.value)
		.then(data => res.status(200).send({
			message: 'Data updated successfully!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when updating data!',
			err: err
		}));
	}
	
	destroy = (req, res) => {
		const param = this.getparam(req.params);

		knex(this.tableName).query().where(param.key, param.value).delete()
		.then(data => res.status(200).send({
			message: 'Data deleted successfully!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when deleting data!',
			err: err
		}));
	}

	migrate = (req, res) => {
		knex.schema.hasTable(this.tableName)
		.then(res => {
			console.log(res);
			if (res) {
				knex.schema.dropTable(this.tableName)
				.catch(err => res.status(500).send({
					message: 'Some error occured when dropping table!',
					err: err
				}))
			}
		}).catch(err => console.log(err))
		
		knex.schema.createTable(this.tableName, table => this.Model.tableSchema(table))
		.then(data => res.status(200).send({
			message: 'Table created successfully!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when creating table!',
			err: err
		}))
	}

	seed = (req, res) => {
		knex(this.tableName).query().truncate()
		.then(() => {

			knex(this.tableName).query().insertGraph(this.getseed())
			.then(data => res.status(200).send({
				message: 'Table truncated and seeded successfull!',
				data: data
			})).catch(err => res.status(500).send({
				message: 'Some error occured when seeding table!',
				err: err
			}));

		}).catch(err => res.status(500).send({
			message: 'Some error occured when truncating table!',
			err: err
		}));

	}

}