
module.exports = {
	
	post: (req, res, next) => {
		const models = req.app.get("models");
		let userId = req.params.user;
		let friendId = req.body.friend;
		models.user.createFriendRequest(userId, friendId).catch(next);
	},
	
	/**
	 * Принять или отклонить заявку в друзья.
	 * @param {String} req.body.action Действие в отношении заявки в друзья принять или отклонить заявку accept | reject.
	 */
	patch: (req, res, next) => {
		const models = req.app.get("models");
		let userId = req.params.user;
		let friendId = req.body.friend;
		let action = req.body.action;
		switch(action) {
			case "accept": models.user.acceptFriendRequest(userId, friendId).catch(next); break;
			case "reject": models.user.rejectFriendRequest(userId, friendId).catch(next); break;
		}
	}
	
};