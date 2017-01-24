
module.exports = {
	
	/**
	 * Команда API GET friendship для получения данных о дружбе пользователя с каким-либо другим пользователем.
	 * @param {Number} req.params.user Номер пользователя, для которого требуется получить данные.
	 * @param {Number} req.params.friend Номер друга.
	 */
	get: (req, res, next) => {
		const models = req.app.get("models");
		let userId = req.params.user;
		let friendId = req.params.friend;
		models.friendship.getFriendship(userId, friendId).then(friendship => {
			res.send({
				success: true,
				friendship
			});
		}).catch(next);
	}
	
};