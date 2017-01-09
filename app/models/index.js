
// определение моделей пользователя из архитектуры mvc
var models = {
	file: require("./file"),
	friend: require("./friend"),
	user: require("./user"),
	digits: require("./digits"),
	tokensRememberMe: require("./tokensRememberMe")
};

module.exports = {
	init(configDatabase) {
		require("./db").configure(configDatabase);
		return models;
	}
};