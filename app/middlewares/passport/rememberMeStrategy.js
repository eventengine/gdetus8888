
var RememberMeStrategy = require('passport-remember-me').Strategy;

module.exports = {
	create: function(models) {
		return new RememberMeStrategy({
			key: 'remember_me',
			cookie: {
				maxAge: 604800000 // maxAge: 7 дней в миллисекундах.
			}
		}, function(token, done) {
		    models.tokensRememberMe.consume(token).then(function(userId) {
				models.user.getUserById(userId).then(function(user) {
					if (user) done(null, user); else done(null, false);
				});
		    })
		    .catch(function(err) {
		    	done(err);
		    });
		}, function(user, done) {
			var token = models.tokensRememberMe.generateToken();
			models.tokensRememberMe.save(token, user.id).then(function() {
				done(null, token);
			})
		    .catch(function(err) {
		    	done(err);
		    });
		});
	}
};
