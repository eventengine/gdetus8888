
var passport = require('passport');

module.exports = function(config, models) {
	passport.use(require('./localStrategy').create(models));
	passport.use(require('./rememberMeStrategy').create(models));
	passport.serializeUser(require('./serializeUser').create(models));
	passport.deserializeUser(require('./deserializeUser').create(models));
	
	/**
	 * Добавление функции req.relogin, которой нет в passportjs.
	 */
	const _initialize = passport.initialize;
	passport.initialize = function() {
		const middleware = _initialize.apply(passport, arguments);
		return function(req, res, next) {
			req.relogin = function(user, cb) {
				req.logout();
				req.login(user, cb);
			};
			return middleware(req, res, next);
		};
	};
	
	return passport;
};