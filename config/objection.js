const { Model } = require('objection');
const knex = require('./knex');
const cfg = require('./config');

class BaseModel extends Model {
	static get tableName() {
		return cfg.model[this.modelName].tableName || this.modelName+'s';
	}

	static get idColumn() {
		return cfg.model[this.modelName].idColumn || 'id';
	}

	static get relationGraph() {
		let relations = this.relationMappings, relate = {};
		for (let key in relations) {
			relate[key] = true;
		}
		return relate;
	}
}

BaseModel.knex(knex);

module.exports = {
	Model: BaseModel,
	knex: knex
};