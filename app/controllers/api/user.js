

module.exports = {
	
	/**
	 * Команда API GET user для получения публичных данных пользователей.
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
		
	}
	
};


const publicFields = [
	"id",
	"useruri",
	"email",
	"firstname",
	"lastname", 
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


