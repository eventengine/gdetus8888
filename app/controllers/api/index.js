
const express = require('express');

const apiRouter = module.exports = express.Router();

/**
 * Контроллер авторизации.
 */
apiRouter.post("/login", require("./login").post, function(req, res, next) {
	// Issue a remember me cookie if the option was checked
	const models = req.app.get("models");
	
	if (!req.body.rememberme) return next();
	
	var token = models.tokensRememberMe.generateToken();
	models.tokensRememberMe.save(token, req.user.id).then(function() {
		res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days
		next();
	}).catch(function(err) {
		next(err);
	});
}, function(req, res, next) {
	const user = {};
	["email", "firstname", "lastname", "useruri"].forEach(fieldName => user[fieldName] = req.user[fieldName]);
	res.send({
		success: true,
		user: user
	});
});

/**
 * Контроллер отмены авторизации.
 */
apiRouter.get("/logout", require("./logout").get);

/**
 * Контроллер восстановления пароля.
 */
apiRouter.post("/passrestore", require("./passrestore").post);

/**
 * Контроллер регистрации пользователя.
 */
apiRouter.post("/register", require("./register").post);
