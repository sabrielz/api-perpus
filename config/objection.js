const { Model } = require('objection');
const knex = require('./knex');

module.exports = {
	Model: Model,
	knex: knex
};