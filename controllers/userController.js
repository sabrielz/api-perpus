const { Model, Knex } = require('../models/user');
const Controller = require('./Controller')(Model, Knex);

// ===== METHOD GET =====
exports.all = Controller.all;
exports.find = Controller.find;

// ===== METHOD POST =====
exports.store = Controller.store;

// ===== METHOD PUT =====
exports.update = Controller.update;

// ===== METHOD DELETE =====
exports.destroy = Controller.destroy;

// ===== METHOD INTERNAL =====
exports.migrate = Controller.migrate;
exports.seed = Controller.seed;