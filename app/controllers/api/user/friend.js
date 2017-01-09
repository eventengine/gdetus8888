
module.exports = {
	
	/**
	 * Команда API GET friend для получения списка друзей пользователя.
	 * @param {Number} userId Номер пользователя, для которого требуется получить список его друзей.
	 */
	get: (req, res, next) => {
		const models = req.app.get("models");
		let userId = req.params.user;
		models.friend.getList(userId).then(friends => {
			res.send({
				success: true,
				friends
			});
		}).catch(next);
	},
	
	post: function(req, res, next) {
		const models = req.app.get("models");
		let userId = req.params.user;
		let friendId = req.body.id;
		models.friend.insert(userId, friendId).then(none => {
			res.send({
				success: true
			});
		}).catch(next);
	},
	
	delete: function(req, res, next) {
		const models = req.app.get("models");
		let userId = req.params.user;
		let friendId = req.params.friend;
		models.friend.delete(userId, friendId).then(none => {
			res.send({
				success: true
			});
		}).catch(next);
	}
	
};