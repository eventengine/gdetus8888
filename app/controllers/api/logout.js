
module.exports = {
	get(req, res) {
		if (req.isAuthenticated()) {
			req.logout();
			res.clearCookie("remember_me");
			res.send({
				success: true,
				logout: true,
				message: "Авторизация успешно отменена."
			});
		} else {
			res.send({
				success: true,
				logout: false,
				message: "Пользователь не был авторизован."
			});
		}
	}
};