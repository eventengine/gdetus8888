
/**
 * Функция десериализации пользователя.
 */

module.exports = {
	create: function(models) {
		return function(user, done) {
			models.user.getUserById(user.id).then(function(user) {
				if (user) {
					done(null, user);
				} else {
					throw Error(`passport.deserializeUser: Пользователь с номером ${user.id} не найден.`);
				}
			}).catch(function(err) {
				done(err);
			});
		};
	}
};