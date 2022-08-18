const { Model, knex } = require('../config/objection');
const hash = require('md5');
const path = require('path');

class User extends Model {

	static get tableName() {
		return 'users';
	}

	static get idColumn() {
		return 'id';
	}

	static tableSchema(table) {
		table.increments('id').primary();
		table.string('nama');
		table.string('email').unique();
		table.string('password').defaultTo(hash('123456'));
		table.string('ttl');
		table.string('sekolah');
		table.text('alasan');
		table.string('avatar');
		table.string('hp');
	}

	static get relationMappings() {
		return {
			moduls: {
				relation: Model.HasManyRelation,
				modelClass: path.join(__dirname, 'modul'),
				join: {
					from: 'users.id',
					to: 'moduls.user_id'
				}
			},
			absens: {
				relation: Model.HasManyRelation,
				modelClass: path.join(__dirname, 'absen'),
				join: {
					from: 'users.id',
					to: 'absens.user_id'
				}
			},
			literasy: {
				relation: Model.HasManyRelation,
				modelClass: path.join(__dirname, 'literasi'),
				join: {
					from: 'users.id',
					to: 'literasy.user_id'
				}
			}
		}
	}

	static get relationGraph() {
		return {
			moduls: true,
			absens: true,
			literasy: true
		}
	}

	// static get relationMappings() {
	// 	return {
	// 		absen: {
	// 			relation: Model.HasManyRelation,
	// 			modelClass: require('./absen'),
	// 			join: {
	// 				from: 'users.id',
	// 				to: 'absens.user_id'
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
	Model: User,
	knex: knex
}