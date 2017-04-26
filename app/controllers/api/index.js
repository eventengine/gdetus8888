
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


/**
 * Контроллер доступа к файловому хранилищу.
 */
apiRouter.post("/file", require("./file").post);
//apiRouter.put("/file/crop", require("./file").crop);


/**
 * Контроллер доступа к профилям пользователей (и к возможности издевательств над ними).
 */
apiRouter.get("/user", require("./user").get);
apiRouter.get("/user/:id", require("./user").get);
apiRouter.post("/user/:id", require("./user").post);
apiRouter.put("/user/avatar", require("./user").putAvatar);



/**
 * Контроллеры друзей, заявок в друзья и подписок.
 */
/*apiRouter.get("/user/:user/friends", require("./user/friend").get);
apiRouter.delete("/user/:user/friends/:friend", require("./user/friend").delete);
apiRouter.get("/user/:user/friend-request/users", require("./user/friendRequestUsers").get);
apiRouter.post("/user/:user/friend-requests", require("./user/friendRequests").post);
apiRouter.patch("/user/:user/friend-requests", require("./user/friendRequests").patch);
apiRouter.delete("/user/:user/subscribes/:subscribed", require("./user/subscribes").delete);*/
