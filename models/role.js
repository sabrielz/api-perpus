const { Model, knex } = require('../config/objection');

class Absen extends Model {

	static get modelName() {
		return 'role';
	}

	static tableSchema(table) {
		table.increments('id').primary();
		table.string('name');
	}

	static get relationMappings() {
		let { Model: User } = require('./user');

		return {
			users: {
				relation: Model.HasManyRelation,
				modelClass: User,
				join: {
					from: this.tableName+'.id',
					to: User.tableName+'.role_id'
				}
			}
		}
	}

}

module.exports = {
	Model: Absen,
	knex: knex
}