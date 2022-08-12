let jwt = require('jsonwebtoken');

jwt.secretKey = 'smkmuhbligo';
jwt.algorithm = 'HS256';
jwt.expiresIn = '3h';

module.exports = jwt;