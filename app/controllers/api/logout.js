
module.exports = {
	get(req, res) {
		req.logout();
		res.clearCookie("remember_me");
		res.send({
			success: true,
			message: "Авторизация успешно отменена."
		});
	}
};