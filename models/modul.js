const { Model } = require('../config/objection');
const path = require('path');

class Modul extends Model {

	static get tableName() {
		return 'moduls';
	}

	static get idColumn() {
		return 'id';
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
		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: path.join(__dirname, 'user'),
				join: {
					from: 'moduls.user_id',
					to: 'users.id'
				}
			}
		}
	}

	static get relationGraph() {
		return {
			user: true
		}
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
	Model: Modul
}