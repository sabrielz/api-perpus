const { Model, knex } = require('../config/objection');

class Absen extends Model {

	static get modelName() {
		return 'absen';
	}

	static tableSchema(table) {
		table.increments('id').primary();
		table.timestamp('tanggal').defaultTo(knex.fn.now());
		table.integer('user_id').references('users.id').unsigned();
	}

	static get relationMappings() {
		const { Model: User } = require('./user');
		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: this.tableName+'.user_id',
					to: User.tableName+'.id'
				}
			}
		}
	}

}

module.exports = {
	Model: Absen,
	knex: knex
}