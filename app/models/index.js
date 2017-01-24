
const mysql = require('mysql');

// определение моделей пользователя из архитектуры mvc
const models = {
	file: require("./file"),
	friendship: require("./friendship"),
	user: require("./user"),
	digits: require("./digits"),
	tokensRememberMe: require("./tokensRememberMe")
};

module.exports = {
	init(configDatabase) {
		require("./db").configure(configDatabase, mysql);
		require("./db").mysql = mysql;
		return models;
	}
};