

module.exports = {
	
	/**
	 * Команда API GET user для получения публичных данных пользователей.
	 * @params {Mixed} id Идентификатор пользователя. Может иметь значения: authenticated | <useruri> | id<id>.
	 */
	get: function(req, res) {
		
		const models = req.app.get("models");
		let id = req.params.id;
		
		if (id == "authenticated") {
			// Получение данных текущего аутентифицированного пользователя
			if (req.isAuthenticated()) {
				res.send({
					success: true,
					user: publicUser(req.user)
				});
			} else {
				res.send({
					success: false,
					message: "Пользователь не аутентифицирован."
				});
			}
		} else {
			// Получение данных пользователя по его id или useruri
			
			let mode = "useruri";
			if (id.substr(0, 2).toLowerCase() == "id") {
				mode = "id";
				// Удаляем префикс id (id<что угодно> превращаем в <что угодно>)
				id = Number(id.replace("id", ""));
			}
			
			let promiseResult = null;
			switch (mode) {
				case "useruri":
					// <что угодно> ищем среди useruri
					promiseResult = models.user.getUserByUserUri(id).then(function(user) {
						res.send({
							success: true,
							user: publicUser(user)
						});
					});
					break;
				case "id":
					// <что угодно> ищем среди id
					promiseResult = models.user.getUserById(id).then(function(user) {
						res.send({
							success: true,
							user: publicUser(user)
						});
					});
					break;
			}
			promiseResult.catch(err => {
				res.send({
					success: false,
					message: err.message,
					err
				});
			});
			
		}
		
	},
	
	/**
	 * Команда API POST user для обновления данных аутентифицированного пользователя.
	 */
	post: function(req, res) {
		const models = req.app.get("models");
		
		let id = req.params.id;
		if (id.substr(0, 2).toLowerCase() == "id") {
			// Удаляем префикс id (id<что угодно> превращаем в <что угодно>)
			id = Number(id.replace("id", ""));
		}
		//var newProfileData = {};
		
		// описание функции preValidation:
		// функция ищет пользователя с указанным id
		// и удаляет из req.body поля, которые совпали
		// с теми, которые уже есть в бд
		
		models.user.preValidation(id, req.body).then(function() {
			
			/*models.user.fieldNames.forEach(function(n) {
				newProfileData[n] = req[n in req.body ? "body" : "user"][n];
			});*/
			
			req.checkBody(models.user.getValidateSchema());
			
			req.asyncValidationErrors().then(function() {
				models.user.update(id, req.body).then(function(updatedUser) {
					// Релогин мы делаем для обновления данных пользователя в сессии, 
					// так как у passportjs нет специальной функции для обновления данных
					// пользователя без отмены аутентификации.
					req.relogin(updatedUser, function(err) {
						if (err) {
							res.send({
								success: false,
								errors: err
							});
						} else {
							res.send({
								success: true,
								updatedUser: publicUser(updatedUser)
							});
						}
					});
				});
			}).catch(function(errors) {
				res.send({
					success: false,
					errors: errors
				});
			});
	
		});
		
		
	}
	
};


const publicFields = [
	"id",
	"useruri",
	"email",
	"firstname",
	"lastname",
	"gender",
	"birthday_date",
	"birthday_date_muted",
	"useruri",
	"avatar_id",
	"avatar_bg_id",
	"chevron"
];


function publicUser(user) {
	const publicUser = {};
	publicFields.forEach(fieldName => publicUser[fieldName] = user[fieldName]);
	return publicUser;
}


