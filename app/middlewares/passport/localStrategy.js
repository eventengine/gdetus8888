
var LocalStrategy = require('passport-local').Strategy;

module.exports = {
	create: function(models) {
		return new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password'
		}, function(email, password, done){
			models.user.getUser(email).then(function(user) {
				if (user) {
					if (models.user.checkPassword(user, password)) {
						done(null, user);
					} else {
						done(null, false, { message: 'Неправильный логин или пароль.' });
					}
				} else {
					done(null, false, { message: 'Неправильный логин или пароль.' });
				}
			}).catch(function(err) {
				done(err);
			});
		});
	}
};