const { Model, knex } = require('../config/objection');

class Modul extends Model {

	static get modelName() {
		return 'modul';
	}

	static tableSchema(table) {
		table.increments('id').primary();
		table.string('title');
		table.string('slug').unique();
		table.string('desc');
		table.string('thumbnail');
		table.string('file');
		table.string('type');
		table.integer('user_id').references('users.id').unsigned();
		table.timestamps(true, true, false);
	}

	static get relationMappings() {
		const { Model: User } = require('./user');
		const { Model: Absen } = require('./absen');

		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: this.tableName+'.user_id',
					to: User.tableName+'.id'
				}
			},
			absens: {
				relation: Absen.HasManyRelation,
				modelClass: Absen,
				join: {
					from: this.tableName+'.id',
					to: Absen.tableName+'.model_id'
				}
			}
		}
	}
	
}

module.exports = {
	Model: Modul,
	knex: knex
}