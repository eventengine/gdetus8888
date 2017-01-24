
module.exports = {
	
	/**
	 * Получить пользователей, которые отправили заявки в друзья (incoming) пользователю user или 
	 * пользователей, которые получили заявки в друзья (outgoing) пользователю user.
	 * @param {String} req.query.where.requestType Тип заявки = incoming | outgoing
	 */
	get: (req, res, next) => {
		const models = req.app.get("models");
		let userId = req.params.user;
		models.user.selectFriendRequestUsers(userId, req.query).catch(next);
	}
	
};