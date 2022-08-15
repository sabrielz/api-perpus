const { Model, knex } = require('../config/objection');

class Absen extends Model {

	static get tableName() {
		return 'absens';
	}

	static get idColumn() {
		return 'id';
	}

	static tableSchema(table) {
		table.increments('id').primary();
		table.timestamp('tanggal').defaultTo(knex.fn.now());
		table.integer('user_id').unsigned();
	}

	// static get jsonSchema() {
	// 	return {
	// 		type: 'object',
	// 		required: ['key'],
	// 		properties: {
	// 			id: { type: 'integer' },
	// 			nama: { type: ['string', 'null'] },
	// 			hp: { type: ['string', 'null'] },
	// 			email: { type: 'string' },
	// 			password: { type: 'string' },
	// 			// firstName: { type: 'string', minLength: 1, maxLength: 255 },
	// 			// lastName: { type: 'string', minLength: 1, maxLength: 255 },
	// 		}
	// 	};
	// }

	// static get relationMappings() {
	// 	return {
	// 		user: {
	// 			relation: Model.BelongsToOneRelation,
	// 			modelClass: require('./user'),
	// 			join: {
	// 				from: 'absens.user_id',
	// 				to: 'users.id'
	// 			}
	// 		}
	// 	}
	// }

	// static get relationMappings() {
	// 	// Importing models here is one way to avoid require loops.
	// 	// const Animal = require('./Animal');
	// 	// const Movie = require('./Movie');

	// 	// return {
	// 	// 	pets: {
	// 	// 		relation: Model.HasManyRelation,
	// 	// 		// The related model. This can be either a Model
	// 	// 		// subclass constructor or an absolute file path
	// 	// 		// to a module that exports one. We use a model
	// 	// 		// subclass constructor `Animal` here.
	// 	// 		modelClass: Animal,
	// 	// 		join: {
	// 	// 			from: 'persons.id',
	// 	// 			to: 'animals.ownerId'
	// 	// 		}
	// 	// 	},

	// 	// 	movies: {
	// 	// 		relation: Model.ManyToManyRelation,
	// 	// 		modelClass: Movie,
	// 	// 		join: {
	// 	// 			from: 'persons.id',
	// 	// 			// ManyToMany relation needs the `through` object
	// 	// 			// to describe the join table.
	// 	// 			through: {
	// 	// 				// If you have a model class for the join table
	// 	// 				// you need to specify it like this:
	// 	// 				// modelClass: PersonMovie,
	// 	// 				from: 'persons_movies.personId',
	// 	// 				to: 'persons_movies.movieId'
	// 	// 			},
	// 	// 			to: 'movies.id'
	// 	// 		}
	// 	// 	},

	// 	// 	children: {
	// 	// 		relation: Model.HasManyRelation,
	// 	// 		modelClass: Person,
	// 	// 		join: {
	// 	// 			from: 'persons.id',
	// 	// 			to: 'persons.parentId'
	// 	// 		}
	// 	// 	},

	// 	// 	parent: {
	// 	// 		relation: Model.BelongsToOneRelation,
	// 	// 		modelClass: Person,
	// 	// 		join: {
	// 	// 			from: 'persons.parentId',
	// 	// 			to: 'persons.id'
	// 	// 		}
	// 	// 	}
	// 	// };
	// }


	// This object defines the relations to other models.
	// static get relationMappings() {
	// 	// Importing models here is one way to avoid require loops.
	// 	const Animal = require('./Animal');
	// 	const Movie = require('./Movie');

	// 	return {
	// 		pets: {
	// 			relation: Model.HasManyRelation,
	// 			// The related model. This can be either a Model
	// 			// subclass constructor or an absolute file path
	// 			// to a module that exports one. We use a model
	// 			// subclass constructor `Animal` here.
	// 			modelClass: Animal,
	// 			join: {
	// 				from: 'persons.id',
	// 				to: 'animals.ownerId'
	// 			}
	// 		},

	// 		movies: {
	// 			relation: Model.ManyToManyRelation,
	// 			modelClass: Movie,
	// 			join: {
	// 				from: 'persons.id',
	// 				// ManyToMany relation needs the `through` object
	// 				// to describe the join table.
	// 				through: {
	// 					// If you have a model class for the join table
	// 					// you need to specify it like this:
	// 					// modelClass: PersonMovie,
	// 					from: 'persons_movies.personId',
	// 					to: 'persons_movies.movieId'
	// 				},
	// 				to: 'movies.id'
	// 			}
	// 		},

	// 		children: {
	// 			relation: Model.HasManyRelation,
	// 			modelClass: Person,
	// 			join: {
	// 				from: 'persons.id',
	// 				to: 'persons.parentId'
	// 			}
	// 		},

	// 		parent: {
	// 			relation: Model.BelongsToOneRelation,
	// 			modelClass: Person,
	// 			join: {
	// 				from: 'persons.parentId',
	// 				to: 'persons.id'
	// 			}
	// 		}
	// 	};
	// }
}

module.exports = {
	Model: Absen,
	knex: knex
}