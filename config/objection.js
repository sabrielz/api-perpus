const { Model } = require('objection');
const Knex = require('knex');

const knex = Knex({
	client: 'mysql',
	useNullAsDefault: true,
	connection: {
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: '',
		database: 'perpus'
	}
});

Model.knex(knex);

module.exports = {
	Model: Model,
	Knex: knex
};