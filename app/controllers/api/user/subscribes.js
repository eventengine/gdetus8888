
module.exports = {
	
	delete: (req, res, next) => {
		const models = req.app.get("models");
		let userId = req.params.user;
		let subscribedUserId = req.params.subscribed;
		models.user.deleteSubscribe(userId, subscribedUserId).catch(next);
	}
	
};