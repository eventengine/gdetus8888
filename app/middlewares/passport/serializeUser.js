
/**
 * Функция сериализации пользователя.
 */

module.exports = {
	create: function() {
		return function(user, done) {
			done(null, user);
		};
	}
};