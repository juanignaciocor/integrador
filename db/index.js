var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/integradorback');

module.exports = db