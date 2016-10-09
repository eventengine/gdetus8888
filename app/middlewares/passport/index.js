
var passport = require('passport');

module.exports = function(config, models) {
	passport.use(require('./localStrategy').create(models));
	passport.use(require('./rememberMeStrategy').create(models));
	passport.serializeUser(require('./serializeUser').create(models));
	passport.deserializeUser(require('./deserializeUser').create(models));
	return passport;
};