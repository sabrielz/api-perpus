// const fs = require('fs');
// const path = require('path');

module.exports = (Model, Knex) => new class Controller {

	constructor() {
		this.Model = Model;
		this.Knex = Knex;
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
		this.Model.query().select([this.tableName+'.*'])
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
	
		this.Model.query().where(param.key, param.value)
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
	
		this.Model.query().insertGraph(req.body)
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
	
		this.Model.query().patch(req.body).where(param.key, param.value)
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

		this.Model.query().where(param.key, param.value).delete()
		.then(data => res.status(200).send({
			message: 'Data deleted successfully!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when deleting data!',
			err: err
		}));
	}

	migrate = (req, res) => {
		Knex.schema.hasTable(this.tableName)
		.then(res => {
			console.log(res);
			if (res) {
				Knex.schema.dropTable(this.tableName)
				.catch(err => res.status(500).send({
					message: 'Some error occured when dropping table!',
					err: err
				}))
			}
		}).catch(err => console.log(err))
		
		Knex.schema.createTable(this.tableName, table => this.Model.tableSchema(table))
		.then(data => res.status(200).send({
			message: 'Table created successfully!',
			data: data
		})).catch(err => res.status(500).send({
			message: 'Some error occured when creating table!',
			err: err
		}))
	}

	seed = (req, res) => {
		this.Model.query().truncate()
		.then(() => {

			this.Model.query().insertGraph(this.getseed())
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