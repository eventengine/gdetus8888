
module.exports = {
	
	/**
	 * Команда API GET friend для получения списка друзей пользователя.
	 * GET /api/user/:user/friends
	 * @param {Number} user Номер пользователя, для которого требуется получить список его друзей.
	 */
	get: (req, res, next) => {
		const models = req.app.get("models");
		let userId = req.params.user;
		models.user.selectFriends(userId, req.query).then(result => res.send(result)).catch(next);
	},
	
	/**
	 * DELETE /api/user/:user/friend/:friend
	 */
	delete: function(req, res, next) {
		const models = req.app.get("models");
		let userId = req.params.user;
		let friendId = req.params.friend;
		models.user.deleteFriend(userId, friendId).then(result => res.send(result)).catch(next);
	}
	
};