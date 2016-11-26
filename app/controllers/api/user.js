

module.exports = {
	
	/**
	 * Команда API GET user для получения публичных данных пользователей.
	 */
	get: function(req, res) {
		
		if (req.params.id == "authenticated") {
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


