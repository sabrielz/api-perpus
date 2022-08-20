const { Model, knex } = require('../config/objection');

class Literasi extends Model {

	static get modelName() {
		return 'literasi';
	}

	static tableSchema(table) {
		table.increments('id').primary();
		table.string('file');
		table.timestamp('tanggal').defaultTo(knex.fn.now());
		table.integer('user_id').references('users.id').unsigned();
		table.integer('modul_id').references('moduls.id').unsigned();
	}

	static get relationMappings() {
		const { Model: User } = require('./user');
		const { Model: Modul } = require('./modul');

		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: this.tableName+'.user_id',
					to: User.tableName+'.id'
				}
			},
			modul: {
				relation: Model.BelongsToOneRelation,
				modelClass: Modul,
				join: {
					from: this.tableName+'.modul_id',
					to: Modul.tableName+'.id'
				}
			},
		}
	}

}

module.exports = {
	Model: Literasi,
	knex: knex
}